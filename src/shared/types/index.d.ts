import { UserConfig as ViteConfiguration } from 'vite';

export { DefaultTheme } from './default-theme';

export interface Header {
  level: number;
  title: string;
  slug: string;
}

export interface SitePageData {
  title: string;
  description: string;
  frontmatter: Record<string, any>;
  lastUpdated?: number;
  headers: Header[];
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

export interface UserConfig<ThemeConfig = any> {
  /**
   * Base path of the site.
   * @default '/'
   */
  base?: string;
  /**
   * Language of the site.
   * @default 'en-US'
   */
  lang?: string;
  /**
   * Title of the site.
   * @default 'Island'
   */
  title?: string;
  /**
   * Description of the site.
   * @default 'Island SSG'
   */
  description?: string;
  /**
   * Custom head config.
   * @default []
   */
  head?: HeadConfig[];
  /**
   * Theme config.
   */
  themeConfig: ThemeConfig;
  /**
   * Locales config for every page.
   */
  locales?: Record<string, LocaleConfig>;
  /**
   * Output directory of the site.
   */
  outdir?: string;
  /**
   * Vite Configuration
   */
  vite?: ViteConfiguration;
  /**
   * Enable island architecture.
   */
  mpa?: boolean;
  /**
   * Whether to fail builds when there are dead links.
   * @default false
   */
  allowDeadLinks?: boolean;
}

export interface LocaleConfig {
  lang: string;
  title?: string;
  titleTemplate?: string | boolean;
  description?: string;
  head?: HeadConfig[];
  label?: string;
  selectText?: string;
}

export interface SiteConfig<ThemeConfig = any> extends UserConfig {
  root: string;
  srcDir: string;
  configPath?: string;
  configDeps?: string[];
  themeDir?: string;
  outDir?: string;
  themeConfig: ThemeConfig;
  pages: string[];
}
