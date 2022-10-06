import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import type { MatchResultItem, PageSearcher } from '../../logic/search';
import { ComponentPropsWithIsland } from '../../../shared/types/index';
import SearchSvg from './icons/search.svg';
import LoadingSvg from './icons/loading.svg';
import { throttle } from 'lodash-es';
import { SuggestionContent } from './Suggestion';

const KEY_CODE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Search(
  props: ComponentPropsWithIsland & { langRoutePrefix: string }
) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MatchResultItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(-1);
  const psRef = useRef<PageSearcher>();
  const initPageSearcherPromiseRef = useRef<Promise<void>>();

  // initializing or searching
  const showLoading = !initialized || searching;
  // 1. page searcher has been initialized and finish searching
  // 2. result is empty
  const showNotFound = !showLoading && suggestions.length === 0;
  const initPageSearcher = useCallback(async () => {
    if (!psRef.current) {
      const { PageSearcher } = await import('../../logic/search');
      psRef.current = new PageSearcher(props.langRoutePrefix);
      await psRef.current.init();
      setInitialized(true);
    } else {
      return Promise.resolve();
    }
  }, [props.langRoutePrefix]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onQueryChanged = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      initPageSearcherPromiseRef.current =
        initPageSearcherPromiseRef.current || initPageSearcher();
      await initPageSearcherPromiseRef.current;
      setSearching(true);
      const matched = await psRef.current!.match(newQuery);
      setSearching(false);
      setSuggestions(matched);
    },
    [initPageSearcher]
  );

  useEffect(() => {
    const onKeyDown = throttle((e: KeyboardEvent) => {
      switch (e.code) {
        case KEY_CODE.ARROW_DOWN:
          e.preventDefault();
          setCurrentSuggestionIndex(
            (currentSuggestionIndex + 1) % suggestions.length
          );
          break;
        case KEY_CODE.ARROW_UP:
          e.preventDefault();
          setCurrentSuggestionIndex(
            (currentSuggestionIndex - 1 + suggestions.length) %
              suggestions.length
          );
          break;
        case KEY_CODE.ENTER:
          if (currentSuggestionIndex >= 0) {
            const suggestion = suggestions[currentSuggestionIndex];
            window.location.href = suggestion.link;
          }
          break;
        default:
          break;
      }
    }, 200);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [currentSuggestionIndex, suggestions]);

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
        onFocus={() => {
          setFocused(true);
          initPageSearcherPromiseRef.current = initPageSearcher();
        }}
      />
      {focused && query && (
        <ul
          absolute=""
          z="60"
          pos="top-8"
          border-1=""
          p="2"
          list="none"
          bg="bg-default"
          className="min-w-500px max-w-700px"
        >
          {/* Show the suggestions */}
          {suggestions.map((item, index) => (
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
                    className="bg-[#f5f5f5]"
                  >
                    {item.title}
                  </div>
                  <SuggestionContent
                    suggestion={item}
                    query={query}
                    isCurrent={index === currentSuggestionIndex}
                  />
                </div>
              </a>
            </li>
          ))}
          {/* Show the not found info */}
          {showNotFound && (
            <li flex="center">
              <div p="2" text="sm gray-light">
                No results found
              </div>
            </li>
          )}
          {/* Show the loading info */}
          {showLoading && (
            <li flex="center">
              <div p="2" text="sm">
                <LoadingSvg />
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
