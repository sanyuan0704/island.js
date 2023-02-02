import { useEffect, useRef } from 'react';
import { Header } from 'shared/types';
import { scrollToTarget, bindingAsideScroll } from '../../logic/asideScroll';
import { useHeaders } from '../../logic/useHeaders';

export function Aside(props: { headers: Header[]; pagePath: string }) {
  const headers = useHeaders(props.headers || [], props.pagePath);
  const hasOutline = headers.length > 0;
  // For outline text highlight
  const markerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unbinding = bindingAsideScroll();
    return unbinding;
  }, []);

  const renderHeader = (header: Header) => {
    return (
      <li key={header.id}>
        <a
          href={`#${header.id}`}
          className="block leading-7 text-text-2 hover:text-text-1"
          avoid-text-overflow=""
          transition="color duration-300"
          style={{
            paddingLeft: (header.depth - 2) * 12
          }}
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(header.id);
            target && scrollToTarget(target, false);
          }}
        >
          {header.text}
        </a>
      </li>
    );
  };

  return (
    <div flex="~ col 1" w="56">
      <div>
        {hasOutline && (
          <div
            id="aside-container"
            className="relative divider-left pl-4 text-13px font-medium"
          >
            <div
              ref={markerRef}
              style={{
                left: '-1px',
                transition:
                  'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s'
              }}
              id="aside-marker"
              className="absolute top-33px opacity-0 w-1px h-18px bg-brand"
            ></div>
            <div block="~" leading-7="" text="13px" font="semibold">
              ON THIS PAGE
            </div>
            <nav>
              <ul relative="">{headers.map(renderHeader)}</ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
