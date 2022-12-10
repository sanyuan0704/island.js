import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';

export async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup()];
}
