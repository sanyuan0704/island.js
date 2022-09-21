import { APPEARANCE_KEY } from '../../shared/constants';

export function useAppearance() {
  if (typeof localStorage === 'undefined') {
    return () => undefined;
  }
  const setClass = (dark: boolean): void => {
    classList[dark ? 'add' : 'remove']('dark');
  };

  const query = window.matchMedia('(prefers-color-scheme: dark)');

  const classList = document.documentElement.classList;

  let userPreference = localStorage.getItem(APPEARANCE_KEY) || 'auto';
  let isDark =
    userPreference === 'auto' ? query.matches : userPreference === 'dark';

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches));
    }
  };
  const toggle = () => {
    setClass((isDark = !isDark));

    userPreference = isDark
      ? query.matches
        ? 'auto'
        : 'dark'
      : query.matches
      ? 'light'
      : 'auto';

    localStorage.setItem(APPEARANCE_KEY, userPreference);
  };

  return toggle;
}
