import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MatchResultItem, PageSearcher } from '../../logic/search';
import SearchSvg from './icons/search.svg';
import { ComponentPropsWithIsland } from '../../../shared/types/index';

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
      <div font="normal" text="sm gray-light" w="100%">
        <span>{statementPrefix}</span>
        <span bg="brand-light" p="y-0.4 x-0.8" rounded="md" text="[#000]">
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
      transition="bg duration-200"
    >
      <div font="medium" text="sm">
        {renderHeaderMatch()}
      </div>
      {suggestion.type === 'content' && renderStatementMatch()}
    </div>
  );
}

export function Search(_props: ComponentPropsWithIsland) {
  const [suggestions, setSuggestions] = useState<MatchResultItem[]>([]);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const showSuggestions = focused && suggestions.length > 0;
  const psRef = useRef<PageSearcher>();
  useEffect(() => {
    async function search() {
      psRef.current = new PageSearcher();
      await psRef.current.init();
    }
    search();
  }, []);
  const onQueryChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (psRef.current) {
      psRef.current.match(newQuery).then((matched) => {
        setSuggestions(matched);
      });
    }
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
        onChange={onQueryChanged}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        onFocus={() => setFocused(true)}
      />
      {showSuggestions && (
        <ul
          display={showSuggestions ? 'block' : 'none'}
          absolute=""
          z="60"
          pos="top-8"
          border-1=""
          p="2"
          list="none"
          bg="bg-default"
          className="min-w-500px max-w-700px"
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
