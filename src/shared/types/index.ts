import { ComponentType } from 'react';
import { UserConfig as ViteConfiguration } from 'vite';
import { DefaultTheme } from './default-theme';

export { DefaultTheme } from './default-theme';

export interface Header {
  id: string;
  text: string;
}
export interface SiteSiteData {
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
   */
  base?: string;
  /**
   * Path to html icon file.
   */
  icon?: string;
  /**
   * Source directory of the site.
   */
  srcDir?: string;
  /**
   * Language of the site.
   */
  lang?: string;
  /**
   * Title of the site.
   */
  title?: string;
  /**
   * Description of the site.
   */
  description?: string;
  /**
   * Custom head config.
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
  outDir?: string;
  /**
   * Temporary directory of the site.
   */
  tempDir?: string;
  /**
   * Vite Configuration
   */
  vite?: ViteConfiguration;
  /**
   * Enable single page application in production.
   */
  enableSpa?: boolean;
  /**
   * Whether to fail builds when there are dead links.
   */
  allowDeadLinks?: boolean;
  /**
   * Whether to fail builds when there are dead links.
   */
  scrollOffset?: string | number;
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

export interface SiteData<ThemeConfig = any> {
  base: string;
  lang: string;
  title: string;
  description: string;
  icon: string;
  head: HeadConfig[];
  themeConfig: ThemeConfig;
  scrollOffset: number | string;
  locales: Record<string, LocaleConfig>;
  // TODO: Available languages
  // langs: Record<string, { lang: string; label: string }>;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface SiteConfig<ThemeConfig = any>
  extends Omit<UserConfig, 'themeConfig'> {
  root: string;
  srcDir: string;
  configPath?: string;
  configDeps?: string[];
  themeDir?: string;
  outDir?: string;
  // Current page data
  siteData?: SiteData<ThemeConfig>;
}

export type ComponentPropsWithIsland<T = any> = T & { __island: boolean };

export interface PageModule<T extends ComponentType<any>> {
  default: T;
  [key: string]: unknown;
}

export interface PageData {
  siteData: SiteData<DefaultTheme.Config>;
  pagePath: string;
  title?: string;
  description?: string;
  pageType: 'home' | 'doc' | 'custom' | '404';
  toc?: Header[];
  features?: Feature[];
  hero?: Hero;
  icon?: string;
}
