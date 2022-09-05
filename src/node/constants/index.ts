import { join } from 'path';

export const isProduction = () => process.env.NODE_ENV === 'production';

export const CLIENT_PATH = join(__dirname, '../../../src/client/app');

export const CLIENT_ENTRY_PATH = join(
  __dirname,
  '../../../src/client/app/client-entry.tsx'
);

export const SERVER_ENTRY_PATH = join(
  __dirname,
  '../../../src/client/app/ssr-entry.tsx'
);

export const THEME_PATH = join(__dirname, '../../../src/client/theme/index.ts');

export const THEME_ISLANDS_PATH = join(
  __dirname,
  '../../../src/client/theme/islands.ts'
);

export const TEMP_PATH = 'node_modules/.island';

export const SERVER_OUTPUT_PATH = join(TEMP_PATH, 'ssr', 'ssr-entry.mjs');

export const ROUTE_PATH = join(TEMP_PATH, 'routes.tsx');

export const DEFAULT_HTML_PATH = join(__dirname, '../../../template.html');
