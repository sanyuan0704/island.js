import { APPEARANCE_KEY } from '../../shared/constants';

export function useAppearance() {
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
