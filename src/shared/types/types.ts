import { UserConfig as ViteConfiguration } from 'vite';

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

export interface UserConfig {
  base?: string;
  lang?: string;
  title?: string;
  description?: string;
  srcExclude?: string[];
  outdir?: string;
  /**
   * Vite Configuration
   */
  vite?: ViteConfiguration;
}

export interface SiteData<ThemeConfig = any> extends UserConfig {
  root: string;
  srcDir: string;
  configPath?: string;
  configDeps?: string[];
  themeDir?: string;
  outDir?: string;
  pages: string[];
  themeConfig: ThemeConfig;
}

export interface ThemeConfig {
  title: string;
}
