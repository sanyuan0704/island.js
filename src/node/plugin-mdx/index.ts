import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';
import { pluginMdxHMR } from './pluginMdxHmr';
import { pluginMdxGit } from './pluginMdxLastUpdated';
import { SiteConfig } from 'shared/types/index';

export async function pluginMdx(
  config: SiteConfig,
  isServer: boolean
): Promise<Plugin[]> {
  return [
    await pluginMdxRollup(config, isServer),
    pluginMdxHMR(config),
    pluginMdxGit()
  ];
}
