import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';

export function pluginMdx(): Plugin[] {
  return [pluginMdxRollup()];
}
