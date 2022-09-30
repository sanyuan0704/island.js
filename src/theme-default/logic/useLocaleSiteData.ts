import { DefaultTheme } from 'shared/types';
import { addLeadingSlash, removeTrailingSlash } from './index';

export function useLocaleSiteData(
  themeConfig: DefaultTheme.Config,
  pathname: string
): DefaultTheme.LocaleConfig {
  const locales = themeConfig.locales;
  if (!locales || Object.keys(locales).length === 0) {
    return {
      nav: themeConfig.nav,
      sidebar: themeConfig.sidebar
    };
  }
  const localeKeys = Object.keys(locales);
  const localeKey =
    localeKeys.find((locale) => {
      return pathname.startsWith(addLeadingSlash(removeTrailingSlash(locale)));
    }) || localeKeys[0];

  return locales[localeKey];
}
