import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';
import { pluginMdxHMR } from './pluginMdxHmr';
import { SiteConfig } from 'shared/types/index';

export async function pluginMdx(config: SiteConfig): Promise<Plugin[]> {
  return [await pluginMdxRollup(config), pluginMdxHMR()];
}
