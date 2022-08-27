export const dynamicImport = new Function(
  'modulePath',
  'return import(modulePath)'
);
