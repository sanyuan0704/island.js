// TODO: withBase is a important runtime api
// import { usePageData } from '@client';
// import { useLocaleSiteData } from './useLocaleSiteData';
// import { addLeadingSlash, removeTrailingSlash } from './utils';

// export function withBase(url: string) {
//   url = addLeadingSlash(url);
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const localesData = useLocaleSiteData();
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const pageData = usePageData();
//   const baseUrl = pageData.siteData.base || '/';
//   const routePrefix = localesData.routePrefix;
//   const normalize = (str: string): string =>
//     addLeadingSlash(removeTrailingSlash(str));
//   let prefix = baseUrl === '/' ? '' : normalize(baseUrl);
//   if (routePrefix && !url.startsWith(routePrefix)) {
//     prefix += normalize(routePrefix);
//   }
//   return `${prefix}${url}`;
// }
