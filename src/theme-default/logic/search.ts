import FlexSearch from 'flexsearch';
import type { Index as SearchIndex, CreateOptions } from 'flexsearch';
import { getAllPages } from 'island/client';
import { uniqBy } from 'lodash-es';
import { normalizeHref } from './index';

const THRESHOLD_CONTENT_LENGTH = 100;

interface PageDataForSearch {
  title: string;
  headers: string[];
  content: string;
  path: string;
}

interface CommonMatchResult {
  title: string;
  header: string;
  link: string;
}

interface HeaderMatch extends CommonMatchResult {
  type: 'header';
  headerHighlightIndex: number;
}

interface ContentMatch extends CommonMatchResult {
  type: 'content';
  statement: string;
  statementHighlightIndex: number;
}

export type MatchResultItem = HeaderMatch | ContentMatch;

const cjkRegex =
  /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/giu;

export class PageSearcher {
  #index?: SearchIndex<PageDataForSearch[]>;
  #cjkIndex?: SearchIndex<PageDataForSearch[]>;
  #headerToIdMap: Record<string, string> = {};
  async init(options: CreateOptions = {}) {
    // Initial pages data and create index
    const pages = await getAllPages();
    const pagesForSearch: PageDataForSearch[] = pages.map((page) => ({
      title: page.title || '',
      headers: (page.toc || []).map((header) => header.text),
      content: page.content || '',
      path: page.routePath
    }));

    this.#headerToIdMap = pages.reduce((acc, page) => {
      (page.toc || []).forEach((header) => {
        acc[page.routePath + header.text] = header.id;
      });
      return acc;
    }, {} as Record<string, string>);

    const createOptions: CreateOptions = {
      encode: 'simple',
      tokenize: 'forward',
      split: /\W+/,
      async: true,
      doc: {
        id: 'path',
        field: ['title', 'headers', 'content']
      },
      ...options
    };
    // Init Search Indexes
    // English Index
    this.#index = FlexSearch.create(createOptions);
    // CJK: Chinese, Japanese, Korean
    this.#cjkIndex = FlexSearch.create({
      ...createOptions,
      encode: false,
      tokenize(str: string) {
        const cjkWords = [];
        let m = null;
        do {
          m = cjkRegex.exec(str);
          if (m) {
            cjkWords.push(m[0]);
          }
        } while (m);
        return cjkWords;
      }
    });
    this.#index!.add(pagesForSearch);
    this.#cjkIndex!.add(pagesForSearch);
  }

  async match(query: string, limit = 7) {
    const searchResult = await Promise.all([
      this.#index?.search({
        query,
        limit
      }),
      this.#cjkIndex?.search(query, limit)
    ]);
    const flattenSearchResult = searchResult
      .flat(2)
      .filter(Boolean) as PageDataForSearch[];
    const matchedResult: MatchResultItem[] = [];
    flattenSearchResult.forEach((item) => {
      // Header match
      const matchedHeader = this.#matchHeader(item, query, matchedResult);
      // If we have matched header, we don't need to match content
      // Because the header is already in the content
      if (matchedHeader) {
        return;
      }
      // Content match
      this.#matchContent(item, query, matchedResult);
    });
    const res = uniqBy(matchedResult, 'link');
    console.log(res);
    return res;
  }

  #matchHeader(
    item: PageDataForSearch,
    query: string,
    matchedResult: MatchResultItem[]
  ): boolean {
    const { headers } = item;
    for (const header of headers) {
      if (header.includes(query)) {
        const headerAnchor = this.#headerToIdMap[item.path + header];
        matchedResult.push({
          type: 'header',
          title: item.title,
          header,
          headerHighlightIndex: header.indexOf(query),
          link: `${item.path}#${headerAnchor}`
        });
        return true;
      }
    }
    return false;
  }

  #matchContent(
    item: PageDataForSearch,
    query: string,
    matchedResult: MatchResultItem[]
  ) {
    const { content, headers } = item;
    const queryIndex = content.indexOf(query);
    const headersIndex = headers.map((h) => content.indexOf(h));
    const currentHeaderIndex = headersIndex.findIndex((hIndex, position) => {
      if (position < headers.length - 1) {
        const next = headersIndex[position + 1];
        if (hIndex <= queryIndex && next >= queryIndex) {
          return true;
        }
      } else {
        return hIndex < queryIndex;
      }
    });
    const currentHeader = headers[currentHeaderIndex] ?? item.title;

    const statementStartIndex = content.slice(0, queryIndex).lastIndexOf('\n');
    const statementEndIndex = content.indexOf('\n', queryIndex + query.length);
    let statement = content.slice(statementStartIndex, statementEndIndex);
    if (statement.length > THRESHOLD_CONTENT_LENGTH) {
      statement = this.#normalizeStatement(statement, query);
    }
    matchedResult.push({
      type: 'content',
      title: item.title,
      header: currentHeader,
      statement,
      statementHighlightIndex: statement.indexOf(query),
      link: `${normalizeHref(item.path)}#${currentHeader}`
    });
  }

  #normalizeStatement(statement: string, query: string) {
    // If statement is too long, we will only show 120 characters
    const queryIndex = statement.indexOf(query);
    const maxPrefixOrSuffix = Math.floor(
      (THRESHOLD_CONTENT_LENGTH - query.length) / 2
    );
    let prefix = statement.slice(0, queryIndex);
    if (prefix.length > maxPrefixOrSuffix) {
      prefix =
        '...' + statement.slice(queryIndex - maxPrefixOrSuffix + 3, queryIndex);
    }
    let suffix = statement.slice(queryIndex + query.length);
    if (suffix.length > maxPrefixOrSuffix) {
      suffix =
        statement.slice(queryIndex + query.length, maxPrefixOrSuffix - 3) +
        '...';
    }
    return prefix + query + suffix;
  }
}
