import { APPEARANCE_KEY } from '../../shared/constants';

let isDark = true;
let classList: DOMTokenList;
// Determine if the theme mode of the user's operating system is dark
let userPreference: string;
let query: MediaQueryList;
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  userPreference = localStorage.getItem(APPEARANCE_KEY) || 'auto';
  query = window.matchMedia('(prefers-color-scheme: dark)');
  // When user preference is auto,the island theme will change with the system user's operating system theme.
  isDark =
    userPreference === 'auto' ? query.matches : userPreference === 'dark';
  query.onchange = (e) => {
    // If user preference is not auto, the island theme will not change with the system user's operating system theme.
    if (userPreference === 'auto') {
      setClass((isDark = e.matches));
    }
  };
}

const setClass = (dark: boolean): void => {
  classList[dark ? 'add' : 'remove']('dark');

  // When using Code Hike(a remark plugin for MDX v2) and its built-in themes, the two built-in themes both support switching light/dark mode by changing the CSS selector.
  // see: https://codehike.org/docs/themes#lightdark-mode
  const chThemeEls = document.querySelectorAll("[data-ch-theme='github-from-css'], [data-ch-theme='material-from-css']")
  const mode = dark ? '' : 'light'
  chThemeEls.forEach(el => el.setAttribute('data-theme', mode))
};

export const getToggle = () => {
  if (typeof window !== 'undefined' && classList === undefined) {
    classList = document.documentElement.classList;
    const storageChange = (): void => {
      const userPreference = localStorage.getItem(APPEARANCE_KEY) || 'auto';
      if (classList) {
        setClass(
          userPreference === 'auto' ? query.matches : userPreference === 'dark'
        );
        isDark = !isDark;
      }
    };
    window.addEventListener('storage', storageChange);
  }
  return () => {
    setClass((isDark = !isDark));
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      if (isDark) {
        // When the user's operating system theme is light, and actively switch the theme to dark，that mean the user preference is dark.
        userPreference = query.matches ? 'auto' : 'dark';
      } else {
        // When the user's operating system theme is dark, and actively switch the theme to light，that mean user Preference is light
        userPreference = query.matches ? 'light' : 'auto';
      }
      localStorage.setItem(APPEARANCE_KEY, userPreference);
    }
  };
};
