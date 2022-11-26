import { normalizeHref } from '@runtime';

export function isEqualPath(a: string, b: string) {
  return normalizeHref(a) === normalizeHref(b);
}

export function isActive(currentPath: string, targetLink?: string) {
  if (!targetLink) {
    return false;
  }
  if (targetLink === '' || targetLink.endsWith('/')) {
    return currentPath === targetLink;
  }
  return currentPath.startsWith(targetLink);
}
