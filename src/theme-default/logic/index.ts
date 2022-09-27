export const isProduction = () => import.meta.env.PROD;

export function addLeadingSlash(url: string) {
  return url.charAt(0) === '/' ? url : '/' + url;
}

export function normalizeHref(url?: string) {
  if (!url) {
    return '/';
  }
  if (!isProduction() || url.startsWith('http')) {
    return url;
  }

  let suffix = '';
  if (!import.meta.env.ENABLE_SPA) {
    suffix += '.html';
    if (url.endsWith('/')) {
      suffix = 'index' + suffix;
    }
  }
  return addLeadingSlash(`${url}${suffix}`);
}

export { useAsideAnchor } from './useAsideAnchor';
export { usePrevNextPage } from './usePrevNextPage';
export { useEditLink } from './useEditLink';
export { useAppearance } from './useAppearance';
export { useSidebarData } from './useSidebarData';
export { useLastUpdated } from './useLastUpdated';
