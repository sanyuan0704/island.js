import { cleanUrl } from '../shared/utils';

export const isProduction = () => import.meta.env.PROD;

export const omit = (obj: Record<string, unknown>, keys: string[]) => {
  const ret = { ...obj };
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
};

export const getRelativePagePath = (
  routePath: string,
  filePath: string,
  base: string
) => {
  const extname = filePath.split('.').pop();
  let pagePath = cleanUrl(routePath);
  if (pagePath.startsWith(base)) {
    pagePath = pagePath.slice(base.length);
  }
  if (extname) {
    pagePath += `.${extname}`;
  }
  return pagePath.replace(/^\//, '');
};

export function addLeadingSlash(url: string) {
  return url.charAt(0) === '/' ? url : '/' + url;
}

export function removeTrailingSlash(url: string) {
  return url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
}

export function normalizeSlash(url: string) {
  return removeTrailingSlash(addLeadingSlash(url));
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
