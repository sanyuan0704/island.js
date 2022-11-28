import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { APPEARANCE_KEY } from '../shared/constants';
import { DEFAULT_THEME_PATH, DIST_PATH } from './constants';
import {
  DefaultTheme,
  HeadConfig,
  SiteConfig,
  SiteData,
  UserConfig
} from '../shared/types';
import { loadConfigFromFile } from 'vite';

const { pathExistsSync } = fs;

type RawConfig<ThemeConfig = unknown> =
  | UserConfig<ThemeConfig>
  | Promise<UserConfig<ThemeConfig>>
  | (() => UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>>);

/**
 * resolve .island files
 */
const resolve = (root: string, ...files: string[]) =>
  path.resolve(root, '.island', ...files);

/**
 * Get default config fileName or user custom config fileName.
 */
const getConfigFileName = (customizePath?: string) => {
  if (customizePath) {
    const [path] = customizePath.split('.');
    return path;
  } else {
    return 'config';
  }
};
/**
 * Get user config path.
 */
const getUserConfigPath = (root: string, customizePath?: string) => {
  try {
    const supportExtensions = ['js', 'ts'];
    const configFileName = getConfigFileName(customizePath);
    const configPath = supportExtensions
      .map((extension) => resolve(root, `${configFileName}.${extension}`))
      .find(pathExistsSync);
    if (configFileName !== 'config' && !pathExistsSync(configPath!)) {
      const errorPath = resolve(root, `${customizePath}`);
      throw new Error(`failed to load config from ${errorPath}`);
    }
    return configPath;
  } catch (e) {
    console.log(pc.red('failed to load config file'));
    throw e;
  }
};
/**
 * resolve user`s config
 */
export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production',
  customizeConfig?: string
): Promise<[string, UserConfig<DefaultTheme.Config>, string[]]> {
  const configPath = getUserConfigPath(root, customizeConfig)!;
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
    base: userConfig.base || '',
    icon: userConfig.icon || '',
    root,
    appearance: userConfig.appearance ?? true
  };
}

export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production',
  customizeConfig?: string
): Promise<SiteConfig> {
  const [configPath, userConfig, configDeps] = await resolveUserConfig(
    root,
    command,
    mode,
    customizeConfig
  );
  const srcDir = path.resolve(root, userConfig.srcDir || '');
  const outDir = path.resolve(root, userConfig.outDir || DIST_PATH);
  const userThemeDir = resolve(root, 'theme');
  const themeDir = pathExistsSync(userThemeDir)
    ? userThemeDir
    : DEFAULT_THEME_PATH;

  // In Node.js, there is no access to delete the cache of a es module.
  // https://github.com/nodejs/help/issues/2806
  // So we need to clear the cache of the config file manually.
  // Then, when you modify the plugin code, then the dev server will reload the latest plugin code and make the development more convenient.
  const { pluginSearch } = await import(
    `@islandjs/plugin-search/dist/index.js?t=${Date.now()}`
  );

  const { pluginBackTop } = await import(
    `@islandjs/plugin-backtop/dist/index.js?t=${Date.now()}`
  );

  const DEFAULT_PLUGINS = [pluginSearch(), pluginBackTop()];
  const siteConfig: SiteConfig<DefaultTheme.Config> = {
    root,
    srcDir,
    outDir,
    themeDir,
    configPath,
    configDeps,
    base: userConfig.base || '',
    tempDir: resolve(root, 'node_modules', '.island'),
    vite: {
      ...userConfig.vite,
      base: userConfig.base ?? '/'
    },
    allowDeadLinks: userConfig.allowDeadLinks ?? false,
    siteData: resolveSiteData(userConfig, root),
    enableSpa: userConfig.enableSpa ?? false,
    route: userConfig.route ?? {},
    markdown: userConfig.markdown ?? {},
    plugins: DEFAULT_PLUGINS.concat(userConfig.plugins || [])
  };

  return siteConfig;
}

export function defineConfig<ThemeConfig = DefaultTheme.Config>(
  config: UserConfig<ThemeConfig>
) {
  return config;
}
