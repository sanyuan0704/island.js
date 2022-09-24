import { createHash as createHashFunc } from 'crypto';

export const dynamicImport = new Function(
  'modulePath',
  'return import(modulePath)'
);

export const createHash = (info: string): string => {
  if (!info) {
    throw new Error(`Invalid info: ${info}`);
  }
  return createHashFunc('sha256').update(info).digest('hex').slice(0, 8);
};

export const parseUrl = (
  url: string
): {
  url: string;
  query: string;
  hash: string;
} => {
  const [withoutHash, hash = ''] = url.split('#');
  const [cleanedUrl, query = ''] = withoutHash.split('?');
  return {
    url: cleanedUrl,
    query,
    hash
  };
};
