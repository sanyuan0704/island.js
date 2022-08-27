import { join } from 'path';

export const isProduction = () => process.env.NODE_ENV === 'production';
export const CLIENT_APP_PATH = join(
  __dirname,
  '../../../dist/client/app/client-entry.js'
);

export const THEME_PATH = join(
  __dirname,
  '../../../dist/client/theme/index.js'
);
