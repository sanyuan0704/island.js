import { throttle } from 'lodash-es';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from 'shared/types/index';

function isBottom() {
  return (
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.scrollHeight
  );
}

const NAV_HEIGHT = 72;

export function useAsideAnchor(
  prevActiveLinkRef: React.MutableRefObject<HTMLAnchorElement | null>,
  headers: Header[],
  asideRef: React.MutableRefObject<HTMLDivElement | null>,
  markerRef: React.MutableRefObject<HTMLDivElement | null>
) {
  let pathname;
  if (import.meta.env.ENABLE_SPA) {
    // Notice: useLocation is not available in Island mode
    // Whether to set enableSpa or not, the hook execute order is always the same
    // So we can tree shaking the react-router-dom code in island mode and there is no hook order problem
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    pathname = location.pathname;
  }

  useEffect(() => {
    if (markerRef.current && (!headers.length || window.screenY === 0)) {
      markerRef.current.style.opacity = '0';
      return;
    }
    // Util function to set dom ref after determining the active link
    const activate = (links: NodeListOf<HTMLAnchorElement>, index: number) => {
      if (prevActiveLinkRef.current) {
        prevActiveLinkRef.current.classList.remove('aside-active');
      }
      if (links[index]) {
        links[index].classList.add('aside-active');
        const id = links[index].getAttribute('href');
        const hash = id?.slice(1);
        const tocIndex = headers.findIndex((item: Header) => item.id === hash);
        const currentLink = asideRef.current?.querySelector(
          `a[href="#${hash}"]`
        );
        if (currentLink) {
          prevActiveLinkRef.current = currentLink as HTMLAnchorElement;
          // Activate the a link element in aside
          prevActiveLinkRef.current.classList.add('aside-active');
          // Activate the marker element
          markerRef.current!.style.top = `${33 + tocIndex * 28}px`;
          markerRef.current!.style.opacity = '1';
        }
      }
    };
    const setActiveLink = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        '.island-doc .header-anchor'
      );
      if (isBottom()) {
        activate(links, links.length - 1);
      } else {
        // Compute current index
        for (let i = 0; i < links.length; i++) {
          const currentAnchor = links[i];
          const nextAnchor = links[i + 1];
          const scrollTop = window.scrollY;
          const currentAnchorTop =
            currentAnchor.parentElement!.offsetTop - NAV_HEIGHT;

          if (!nextAnchor) {
            activate(links, i);
            break;
          }

          const nextAnchorTop =
            nextAnchor.parentElement!.offsetTop - NAV_HEIGHT;

          if (scrollTop > currentAnchorTop && scrollTop < nextAnchorTop) {
            activate(links, i);
            break;
          }
        }
      }
    };
    const throttledSetLink = throttle(setActiveLink, 100);
    requestAnimationFrame(setActiveLink);

    window.addEventListener('scroll', throttledSetLink);

    return () => {
      window.removeEventListener('scroll', throttledSetLink);
    };
  }, [asideRef, headers, headers.length, markerRef, prevActiveLinkRef]);

  useEffect(
    () => {
      if (markerRef.current) {
        markerRef.current.style.opacity = '0';
        window.scrollTo(0, 0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    import.meta.env.ENABLE_SPA ? [markerRef, pathname] : [markerRef]
  );
}
