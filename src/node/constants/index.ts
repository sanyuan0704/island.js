import { join } from 'path';

export const isProduction = () => process.env.NODE_ENV === 'production';
export const CLIENT_ENTRY_PATH = join(
  __dirname,
  '../../../dist/client/app/client-entry.js'
);

export const SERVER_ENTRY_PATH = join(
  __dirname,
  '../../../dist/client/app/ssr-entry.js'
);

export const THEME_PATH = join(
  __dirname,
  '../../../dist/client/theme/index.js'
);

export const TEMP_PATH = 'node_modules/.island';

export const SERVER_OUTPUT_PATH = join(TEMP_PATH, 'ssr-entry.mjs');
