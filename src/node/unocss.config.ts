import { VitePluginConfig } from 'unocss/vite';
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({})],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    menu: 'flex justify-around items-center text-sm font-bold'
  },
  rules: [
    [
      'divider-top',
      {
        'border-top': '1px solid var(--island-c-divider-light)'
      }
    ],
    [
      'divider-bottom',
      {
        'border-bottom': '1px solid var(--island-c-divider-light)'
      }
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--island-c-divider-light)',
        content: '" "'
      }
    ],
    [
      'nav-h-mobile',
      {
        height: 'var(--island-nav-height-mobile)'
      }
    ],
    [
      'nav-h-desktop',
      {
        height: 'var(--island-nav-height-desktop)'
      }
    ]
  ],
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
      }
    }
  }
};

export default options;
