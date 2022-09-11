export const inBrowser = typeof window !== undefined;

export const omit = (obj: Record<string, any>, keys: string[]) => {
  const ret = { ...obj };
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
};
