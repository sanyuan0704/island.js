import FlexSearch from 'flexsearch';
import type { Index as SearchIndex, CreateOptions } from 'flexsearch';
import { getAllPages } from 'island/client';
import { uniqBy } from 'lodash-es';
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
  async init(options: CreateOptions = {}) {
    // Initial pages data and create index
    const pages = await getAllPages();
    const pagesForSearch: PageDataForSearch[] = pages.map((page) => ({
      title: page.title || '',
      headers: (page.toc || []).map((header) => header.text),
      content: page.content || '',
      path: page.routePath
    }));

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
      const { headers } = item!;
      // Header match
      for (const header of headers) {
        if (header.includes(query)) {
          matchedResult.push({
            type: 'header',
            title: item.title,
            header,
            headerHighlightIndex: header.indexOf(query),
            link: `${item.path}#${header}`
          });
          return;
        }
      }
      // Content match
      const content = item.content;
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

      const statementStartIndex = content
        .slice(0, queryIndex)
        .lastIndexOf('\n');
      const statementEndIndex = content.indexOf(
        '\n',
        queryIndex + query.length
      );
      const statement = content.slice(
        statementStartIndex + 1,
        statementEndIndex
      );
      matchedResult.push({
        type: 'content',
        title: item.title,
        header: currentHeader,
        statement,
        statementHighlightIndex: statement.indexOf(query),
        link: `${item.path}#${currentHeader}`
      });
    });
    const res = uniqBy(matchedResult, 'link');
    console.log(res);
    return res;
  }
}
