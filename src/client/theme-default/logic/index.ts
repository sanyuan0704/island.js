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
  return addLeadingSlash(`${url}.html`);
}
