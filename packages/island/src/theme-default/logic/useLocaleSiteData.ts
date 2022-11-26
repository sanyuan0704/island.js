import { DefaultTheme } from 'shared/types';
import { usePageData, withBase } from '@runtime';
import { useLocation } from 'react-router-dom';
import { normalizeSlash } from '@shared/utils/index';

export function useLocaleSiteData(): DefaultTheme.LocaleConfig {
  const pageData = usePageData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = import.meta.env.SSR ? useLocation() : location;
  const themeConfig = pageData?.siteData?.themeConfig ?? {};
  const locales = themeConfig?.locales;
  if (!locales || Object.keys(locales).length === 0) {
    return {
      nav: themeConfig.nav,
      sidebar: themeConfig.sidebar,
      prevPageText: themeConfig.prevPageText,
      nextPageText: themeConfig.nextPageText
    } as DefaultTheme.LocaleConfig;
  }
  const localeKeys = Object.keys(locales);
  const localeKey =
    localeKeys.find((locale) => {
      const normalizedLocalePrefix = withBase(normalizeSlash(locale));
      return pathname.startsWith(normalizedLocalePrefix);
    }) || localeKeys[0];

  return {
    ...locales[localeKey],
    langRoutePrefix: localeKey
  };
}
