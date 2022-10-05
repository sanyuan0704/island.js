import { DefaultTheme } from 'shared/types';
import { addLeadingSlash, removeTrailingSlash } from './index';
import { usePageData } from '../../runtime';
import { useLocation } from 'react-router-dom';

export function useLocaleSiteData(): DefaultTheme.LocaleConfig {
  const { siteData } = usePageData();
  const { pathname } = useLocation();
  const { themeConfig } = siteData;
  const locales = themeConfig.locales;
  if (!locales || Object.keys(locales).length === 0) {
    return {
      nav: themeConfig.nav,
      sidebar: themeConfig.sidebar
    } as DefaultTheme.LocaleConfig;
  }
  const localeKeys = Object.keys(locales);
  const localeKey =
    localeKeys.find((locale) => {
      return pathname.startsWith(addLeadingSlash(removeTrailingSlash(locale)));
    }) || localeKeys[0];

  return locales[localeKey];
}
