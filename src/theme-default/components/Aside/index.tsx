/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';
import { ComponentPropsWithIsland, Header } from 'shared/types/index';
import { bindingAsideScroll } from '../../logic';

export function Aside(
  props: ComponentPropsWithIsland<{
    headers: Header[];
    pagePath: string;
    outlineTitle: string;
  }>
) {
  const [headers, setHeaders] = useState(props.headers || []);
  const hasOutline = headers.length > 0;
  // For outline text highlight
  const markerRef = useRef<HTMLDivElement>(null);
  // We promise: in complete dev/prod render process, the hooks order will be consistent
  if (import.meta.env.ENABLE_SPA || import.meta.env.DEV) {
    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.style.opacity = '0';
      }
      const unbinding = bindingAsideScroll();
      window.scrollTo(0, 0);
      return unbinding;
    }, [headers]);
  }

  useEffect(() => {
    setHeaders(props.headers);
  }, [props.headers]);

  useEffect(() => {
    // Handle aside hmr:
    // When mdx file changed, server will send a custom event to client.
    // Then we listen the event and pull the latest page module so we can get and render the new headers.
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath }) => {
        if (filePath !== props.pagePath) {
          return;
        }
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            setHeaders(mod.toc);
          }
        );
      });
    }
  }, [props.pagePath]);

  const renderHeader = (header: Header) => {
    const isNested = header.depth > 2;
    return (
      <li key={header.text}>
        <a
          href={`#${header.id}`}
          block=""
          leading-7=""
          text="text-2"
          avoid-text-overflow=""
          hover="text-text-1"
          transition="color duration-300"
          className={`${isNested ? 'pl-3' : ''}`}
        >
          {header.text}
        </a>
      </li>
    );
  };

  return (
    <div flex="~ col 1">
      <div display={`${hasOutline ? 'block' : 'none'}`}>
        <div
          relative=""
          divider-left=""
          p="l-4"
          text="13px"
          font-medium=""
          id="aside-container"
        >
          <div
            absolute=""
            pos="top-33px"
            opacity="0"
            w="1px"
            h="18px"
            bg="brand"
            ref={markerRef}
            style={{
              left: '-1px',
              transition:
                'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s'
            }}
            id="aside-marker"
          ></div>
          <div block="~" leading-7="" text="13px" font="semibold">
            {props.outlineTitle}
          </div>
          <nav>
            <ul relative="">{headers.map(renderHeader)}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
