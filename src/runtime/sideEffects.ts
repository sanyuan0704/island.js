import { APPEARANCE_KEY } from '../shared/constants';
import { inBrowser } from './utils';

const DEFAULT_NAV_HEIGHT = 60;

function bindingAppearanceToggle() {
  // Appearance click event
  const appearanceEl = document.getElementById('appearance');

  function getAppearanceToggle() {
    if (typeof localStorage === 'undefined') {
      return () => undefined;
    }
    const setClass = (dark: boolean): void => {
      classList[dark ? 'add' : 'remove']('dark');
    };
    // Determine if the theme mode of the user's operating system is dark
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    const classList = document.documentElement.classList;

    let userPreference = localStorage.getItem(APPEARANCE_KEY) || 'auto';
    // When user preference is auto,the island theme will change with the system user's operating system theme.
    let isDark =
      userPreference === 'auto' ? query.matches : userPreference === 'dark';

    query.onchange = (e) => {
      // If user preference is not auto, the island theme will not change with the system user's operating system theme.
      if (userPreference === 'auto') {
        setClass((isDark = e.matches));
      }
    };
    const toggle = () => {
      setClass((isDark = !isDark));
      if (isDark) {
        // When the user's operating system theme is light, and actively switch the theme to dark，that mean the user preference is dark.
        userPreference = query.matches ? 'auto' : 'dark';
      } else {
        // When the user's operating system theme is dark, and actively switch the theme to light，that mean user Preference is light
        userPreference = query.matches ? 'light' : 'auto';
      }

      localStorage.setItem(APPEARANCE_KEY, userPreference);
    };

    return toggle;
  }
  appearanceEl!.addEventListener('click', getAppearanceToggle());
}

// Control the scroll behavior of the browser when user clicks on a link
function bindingWindowScroll() {
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
        const { origin, hash, target, pathname, search } = link;
        const currentUrl = window.location;
        // only intercept inbound links
        if (hash && target !== '_blank' && origin === currentUrl.origin) {
          // scroll between hash anchors in the same page
          if (
            pathname === currentUrl.pathname &&
            search === currentUrl.search &&
            hash &&
            hash !== currentUrl.hash &&
            link.classList.contains('header-anchor')
          ) {
            e.preventDefault();
            history.pushState(null, '', hash);
            // use smooth scroll when clicking on header anchor links
            scrollTo(link, hash, true);
            // still emit the event so we can listen to it in themes
            window.dispatchEvent(new Event('hashchange'));
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

export function setupEffects() {
  if (!inBrowser()) {
    return;
  }
  bindingAppearanceToggle();
  bindingWindowScroll();
}
