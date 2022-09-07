import path from 'path';
import {
  SiteConfig,
  DefaultTheme,
  UserConfig,
  PageData
} from '../shared/types';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { DEFAULT_THEME_PATH } from './constants/index';

const { pathExistsSync } = fs;

type RawConfig<ThemeConfig = any> =
  | UserConfig<ThemeConfig>
  | Promise<UserConfig<ThemeConfig>>
  | (() => UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>>);

const resolve = (root: string, ...files: string[]) =>
  path.resolve(root, '.island', ...files);

export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<[string, UserConfig, string[]]> {
  const supportExtensions = ['js', 'ts'];
  const [configPath] = supportExtensions
    .map((extension) => resolve(root, `config.${extension}`))
    .filter(pathExistsSync);
  // Use vite internal config loader
  const result = await loadConfigFromFile({ command, mode }, configPath, root);
  if (result) {
    const {
      config: rawConfig = {} as RawConfig,
      dependencies = [],
      path: configPath
    } = result;
    // Support multi config type:
    // 1. object
    // 2. promise
    // 3. function (async/sync)
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig as UserConfig, dependencies];
  } else {
    return [configPath, {} as UserConfig, []];
  }
}

export function resolvePageData(userConfig: UserConfig): PageData {
  return {
    lang: userConfig.lang || 'en-US',
    title: userConfig.title || 'Island',
    description: userConfig.description || 'Island',
    themeConfig: userConfig.themeConfig || {},
    head: userConfig.head || [],
    base: userConfig.base || '/',
    scrollOffset: userConfig.scrollOffset || 90,
    locales: userConfig.locales || {}
  };
}

export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<SiteConfig> {
  const [configPath, userConfig, configDeps] = await resolveUserConfig(
    root,
    command,
    mode
  );
  const srcDir = path.resolve(root, userConfig.srcDir || '.');
  const outDir = path.resolve(root, userConfig.outDir || 'dist');
  const userThemeDir = resolve(root, 'theme');
  const themeDir = pathExistsSync(userThemeDir)
    ? userThemeDir
    : DEFAULT_THEME_PATH;

  const siteConfig: SiteConfig<DefaultTheme.Config> = {
    root,
    srcDir,
    outDir,
    themeDir,
    configPath,
    configDeps,
    tempDir: resolve(root, 'node_modules', '.island'),
    vite: userConfig.vite || {},
    allowDeadLinks: userConfig.allowDeadLinks || false,
    pageData: resolvePageData(userConfig)
  };

  return siteConfig;
}

export function defineConfig<ThemeConfig = DefaultTheme.Config>(
  config: UserConfig<ThemeConfig>
) {
  return config;
}
