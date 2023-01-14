import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({}), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--island-c-divider-light)'
      })
    ]
  ]
};

export default options;
