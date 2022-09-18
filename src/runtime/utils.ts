export const inBrowser = () => typeof window !== 'undefined';

export const omit = (obj: Record<string, any>, keys: string[]) => {
  const ret = { ...obj };
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
};

export const queryRE = /\?.*$/s;
export const hashRE = /#.*$/s;

export const cleanUrl = (url: string): string =>
  url.replace(hashRE, '').replace(queryRE, '');
