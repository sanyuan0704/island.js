import { inBrowser } from './utils';

const DEFAULT_NAV_HEIGHT = 72;

// Control the scroll behavior of the browser when user clicks on a link
if (inBrowser()) {
  // eslint-disable-next-line no-inner-declarations
  function scrollTo(el: HTMLElement, hash: string, isSmooth = false) {
    let target: HTMLElement | null = null;
    try {
      target = el.classList.contains('header-anchor')
        ? el
        : document.getElementById(decodeURIComponent(hash.slice(1)));

      target;
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
      // Only scroll smoothly in page header anchor
      window.scrollTo({
        left: 0,
        top: targetTop,
        ...(isSmooth ? { behavior: 'smooth' } : {})
      });
    }
  }

  window.addEventListener(
    'click',
    (e) => {
      // Only handle a tag click
      const link = (e.target as Element).closest('a');
      if (link) {
        const { origin, hash, target } = link;
        const currentUrl = window.location;
        // only intercept inbound links
        if (hash && target !== '_blank' && origin === currentUrl.origin) {
          e.preventDefault();
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
    },
    { capture: true }
  );

  window.addEventListener('hashchange', (e) => {
    e.preventDefault();
  });
}
