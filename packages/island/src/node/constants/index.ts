import { join } from 'path';
import { fileURLToPath } from 'url';

export const isProduction = () => process.env.NODE_ENV === 'production';

export const TS_REGEX = /(c|m)?tsx?$/;

export const MD_REGEX = /\.mdx?$/;

export const PACKAGE_ROOT_PATH = join(
  fileURLToPath(import.meta.url),
  '../../..'
);

export const CLIENT_RUNTIME_PATH = join(PACKAGE_ROOT_PATH, 'src/runtime');

export const SHARED_PATH = join(PACKAGE_ROOT_PATH, 'src/shared');

export const CLIENT_EXPORTS_PATH = join(CLIENT_RUNTIME_PATH, 'index.ts');

export const CLIENT_ENTRY_PATH = join(CLIENT_RUNTIME_PATH, 'client-entry.tsx');

export const SERVER_ENTRY_PATH = join(CLIENT_RUNTIME_PATH, 'ssr-entry.tsx');

export const DEFAULT_THEME_PATH = join(PACKAGE_ROOT_PATH, 'src/theme-default');

export const PUBLIC_DIR = 'public';

export const TEMP_PATH = join(PACKAGE_ROOT_PATH, 'node_modules', '.island');

export const DIST_PATH = join('.island', 'dist');

export const SERVER_BUNDLE_FILE = 'ssr-entry.mjs';

export const SERVER_OUTPUT_PATH = join(TEMP_PATH, 'ssr', SERVER_BUNDLE_FILE);

export const ROUTE_PATH = join(TEMP_PATH, 'routes.tsx');

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT_PATH, 'template.html');

export const MASK_SPLITTER = '!!ISLAND!!';

export const DEFAULT_EXTERNALS: string[] = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime'
];

export const CLI_BUNDLE_OUTDIR = join(PACKAGE_ROOT_PATH, 'dist', 'node');

export const RUNTIME_BUNDLE_OUTDIR = join(PACKAGE_ROOT_PATH, 'dist', 'runtime');

export const ISLAND_JSX_RUNTIME_PATH = RUNTIME_BUNDLE_OUTDIR;

export const ISLAND_CLI_PATH = join(CLI_BUNDLE_OUTDIR, 'cli.js');

export const VENDOR_PATH = join(PACKAGE_ROOT_PATH, 'vendors');

export const DIRECTIVE_TYPES: string[] = ['tip', 'warning', 'danger', 'info'];

export const CUSTOM_GLOBAL_STYLE = 'virtual:custom-styles';

export const CUSTOM_UI_COMPONENTS = 'virtual:ui-components';
