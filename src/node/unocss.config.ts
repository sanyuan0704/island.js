import { VitePluginConfig } from 'unocss/vite';
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({})],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'border-top': 'border t-1 b-0 border-solid divider-light'
  },
  rules: [],
  theme: {
    fontSize: {
      '6xl': ['3.5rem', '4rem']
    },
    colors: {
      brand: 'var(--island-c-green)',
      text: {
        1: 'var(--island-c-text-1)',
        2: 'var(--island-c-text-2)',
        3: 'var(--island-c-text-3)',
        4: 'var(--island-c-text-4)'
      },
      divider: {
        default: 'var(--island-c-divider)',
        light: 'var(--island-c-divider-light)',
        dark: 'var(--island-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--island-c-gray-light-1)',
          2: 'var(--island-c-gray-light-2)',
          3: 'var(--island-c-gray-light-3)',
          4: 'var(--island-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--island-c-bg)',
        soft: 'var(--island-c-bg-soft)'
      },
      nav: {
        'height-mobile': 'var(--island-nav-height-mobile)',
        'height-desktop': 'var(--island-nav-height-desktop)'
      }
    }
  }
};

export default options;
