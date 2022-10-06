import { Header } from 'shared/types';

export const isProduction = () => import.meta.env.PROD;

export function addLeadingSlash(url: string) {
  return url.charAt(0) === '/' ? url : '/' + url;
}

export function removeTrailingSlash(url: string) {
  return url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
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

export function backTrackHeaders(
  rawHeaders: Header[],
  index: number
): Header[] {
  let current = rawHeaders[index];
  let currentIndex = index;

  const res: Header[] = [current];
  while (current && current.depth > 2) {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const header = rawHeaders[i];
      if (header.depth > 1 && header.depth === current.depth - 1) {
        current = header;
        currentIndex = i;
        res.unshift(current);
        break;
      }
    }
  }
  return res;
}
