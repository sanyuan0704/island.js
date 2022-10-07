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
  const [disableInput, setDisableInput] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const onFocus = () => {
    setFocused(true);
    if (inputRef.current) {
      inputRef.current.style.width = '160px';
      inputRef.current.focus();
    }
    initPageSearcherPromiseRef.current = initPageSearcher();
  };

  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 200);
    if (inputRef.current) {
      // mobile
      if (window.innerWidth < 768) {
        inputRef.current.style.width = '0';
      }
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    setDisableInput(false);
  }, []);

  return (
    <div flex="" items-center="~" relative="" mr="sm:4" font="semibold">
      <div onClick={onFocus}>
        <SearchSvg w="5" h="5" fill="currentColor" cursor="pointer" />
      </div>

      <input
        ref={inputRef}
        disabled={disableInput}
        w="0 sm:40 focus:40"
        cursor="text focus:auto"
        placeholder="Search"
        height="8"
        border="none"
        type="text"
        text="sm"
        p="t-0 b-0 l-2"
        transition="all duration-200 ease"
        className="sm:rounded-sm border-box"
        aria-label="Search"
        autoComplete="off"
        onChange={onQueryChanged}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {focused && query && (
        <ul
          pos="fixed sm:absolute top-12 sm:top-8 left-0"
          z="60"
          border-1=""
          p="2"
          list="none"
          bg="bg-default"
          className="w-100% sm:min-w-500px sm:max-w-700px"
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
