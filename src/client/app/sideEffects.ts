import { inBrowser } from './utils';

const DEFAULT_NAV_HEIGHT = 72;

if (inBrowser) {
  function scrollTo(el: HTMLElement, hash: string, smooth = false) {
    let target: HTMLElement | null = null;

    try {
      target = el.classList.contains('header-anchor')
        ? el
        : document.querySelector(decodeURIComponent(hash));
    } catch (e) {
      console.warn(e);
    }

    if (target) {
      const targetPadding = parseInt(
        window.getComputedStyle(target).paddingTop,
        10
      );
      const targetTop =
        window.scrollY +
        target.getBoundingClientRect().top -
        DEFAULT_NAV_HEIGHT +
        targetPadding;

      window.scrollTo({
        left: 0,
        top: targetTop,
        behavior: 'smooth'
      });
    }
  }

  window.addEventListener(
    'click',
    (e) => {
      // Only handle a tag click
      const link = (e.target as Element).closest('a');
      if (link) {
        const { origin, pathname, hash, search, target } = link;
        const currentUrl = window.location;
        const extMatch = pathname.match(/\.\w+$/);
        // only intercept inbound links
        if (
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          !e.metaKey &&
          target !== `_blank` &&
          origin === currentUrl.origin &&
          // don't intercept if non-html extension is present
          !(extMatch && extMatch[0] !== '.html')
        ) {
          e.preventDefault();
          if (
            pathname === currentUrl.pathname &&
            search === currentUrl.search
          ) {
            // scroll between hash anchors in the same page
            if (hash && hash !== currentUrl.hash) {
              history.pushState(null, '', hash);
              // still emit the event so we can listen to it in themes
              window.dispatchEvent(new Event('hashchange'));
              // use smooth scroll when clicking on header anchor links
              scrollTo(link, hash, link.classList.contains('header-anchor'));
            }
          }
        }
      }
    },
    { capture: true }
  );

  window.addEventListener('hashchange', (e) => {
    e.preventDefault();
  });
}
