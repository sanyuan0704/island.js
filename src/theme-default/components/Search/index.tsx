import { useEffect, useState } from 'react';
import { MatchResultItem, PageSearcher } from '../../logic/search';
import SearchSvg from './icons/search.svg';

function SuggestionContent(props: {
  suggestion: MatchResultItem;
  query: string;
}) {
  const { suggestion, query } = props;
  const renderHeaderMatch = () => {
    if (suggestion.type === 'header') {
      const { header, headerHighlightIndex } = suggestion;
      const headerPrefix = header.slice(0, headerHighlightIndex);
      const headerSuffix = header.slice(headerHighlightIndex + query.length);
      return (
        <div font="medium">
          <span>{headerPrefix}</span>
          <span bg="brand-light" p="y-0.4 x-0.8" rounded="md" text="text-1">
            {query}
          </span>
          <span>{headerSuffix}</span>
        </div>
      );
    } else {
      return <div font="medium">{suggestion.header}</div>;
    }
  };
  const renderStatementMatch = () => {
    if (suggestion.type !== 'content') {
      return;
    }
    const { statementHighlightIndex, statement } = suggestion;
    const statementPrefix = statement.slice(0, statementHighlightIndex);
    const statementSuffix = statement.slice(
      statementHighlightIndex + query.length
    );
    return (
      <div font="normal" text="sm">
        <span>{statementPrefix}</span>
        <span bg="brand-light" p="y-0.4 x-0.8" rounded="md" text="text-1">
          {query}
        </span>
        <span>{statementSuffix}</span>
      </div>
    );
  };
  return (
    <div
      border-1=""
      table-cell=""
      p="x-3 y-2"
      hover="bg-[#f3f4f5]"
      className="border-right-none"
      transition="bg duration-300"
    >
      <div font="medium" text="sm">
        {renderHeaderMatch()}
      </div>
      {suggestion.type === 'content' && renderStatementMatch()}
    </div>
  );
}

export function Search() {
  const [suggestions, setSuggestions] = useState<MatchResultItem[]>([]);
  useEffect(() => {
    async function search() {
      const ps = new PageSearcher();
      await ps.init();
      const matched = await ps.match('title');
      setSuggestions(matched);
    }
    search();
  }, []);
  return (
    <div flex="" items-center="~" relative="" mr="4" font="semibold">
      <SearchSvg w="5" h="5" fill="currentColor" />
      <input
        cursor="text focus:auto"
        w="40"
        placeholder="Search"
        height="8"
        border="none"
        type="text"
        text="sm"
        p="t-0 r-2 b-0 l-2"
        transition="all duration-200 ease"
        className="rounded-sm"
        aria-label="Search"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul
          absolute=""
          z="60"
          pos="top-8"
          border-1=""
          p="2"
          list="none"
          bg="bg-default"
        >
          {suggestions.map((item) => (
            <li key={item.title} rounded="sm" cursor="pointer" w="100%">
              <a block="" href={item.link} className="whitespace-normal">
                <div table="" w="100%" className="border-collapse">
                  <div
                    w="35%"
                    border-1=""
                    border-left="none"
                    table-cell=""
                    align="middle right"
                    p="1.2"
                    text="sm right"
                    font="semibold"
                    className="bg-[#f5f5f5] "
                  >
                    {item.title}
                  </div>
                  <SuggestionContent suggestion={item} query={query} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
