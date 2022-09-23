import path from 'path';
import {
  SiteConfig,
  DefaultTheme,
  UserConfig,
  HeadConfig,
  SiteData
} from '../shared/types';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { DEFAULT_THEME_PATH, DIST_PATH } from './constants';
import { APPEARANCE_KEY } from '../shared/constants';

const { pathExistsSync } = fs;

type RawConfig<ThemeConfig = unknown> =
  | UserConfig<ThemeConfig>
  | Promise<UserConfig<ThemeConfig>>
  | (() => UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>>);

const resolve = (root: string, ...files: string[]) =>
  path.resolve(root, '.island', ...files);

export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<[string, UserConfig<DefaultTheme.Config>, string[]]> {
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
    return [
      configPath,
      userConfig as UserConfig<DefaultTheme.Config>,
      dependencies
    ];
  } else {
    return [configPath, {} as UserConfig<DefaultTheme.Config>, []];
  }
}

function resolveSiteDataHead(userConfig?: UserConfig): HeadConfig[] {
  const head = userConfig?.head ?? [];

  // add inline script to apply dark mode, if user enables the feature.
  // this is required to prevent "flush" on initial page load.
  if (userConfig?.appearance ?? true) {
    head.push([
      'script',
      { id: 'check-dark-light' },
      `
        ;(() => {
          const saved = localStorage.getItem('${APPEARANCE_KEY}')
          const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          if (!saved || saved === 'auto' ? prefereDark : saved === 'dark') {
            document.documentElement.classList.add('dark')
          }
        })()
      `
    ]);
  }

  return head;
}

export function resolveSiteData(
  userConfig: UserConfig<DefaultTheme.Config>,
  root: string
): SiteData<DefaultTheme.Config> {
  return {
    lang: userConfig.lang || 'en-US',
    title: userConfig.title || 'Island',
    description: userConfig.description || 'Island',
    themeConfig: userConfig.themeConfig || {},
    head: resolveSiteDataHead(userConfig),
    base: userConfig.base || '/',
    locales: userConfig.locales || {},
    icon: userConfig.icon || '',
    root,
    appearance: userConfig.appearance ?? true
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
  const srcDir = path.resolve(root, userConfig.srcDir || '');
  const outDir = path.resolve(root, userConfig.outDir || DIST_PATH);
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
    vite: userConfig.vite ?? {},
    allowDeadLinks: userConfig.allowDeadLinks ?? false,
    siteData: resolveSiteData(userConfig, root),
    enableSpa: userConfig.enableSpa ?? false
  };

  return siteConfig;
}

export function defineConfig<ThemeConfig = DefaultTheme.Config>(
  config: UserConfig<ThemeConfig>
) {
  return config;
}
