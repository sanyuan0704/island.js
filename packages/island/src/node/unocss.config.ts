import { VitePluginConfig } from 'unocss/vite';
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({}), presetIcons()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    menu: 'flex justify-around items-center text-sm font-bold'
  },
  rules: [
    [
      'border-1',
      {
        border: '1px solid var(--island-c-divider-light)'
      }
    ],
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--island-c-divider-light)'
      })
    ],
    [
      /^nav-h-(\w+)$/,
      ([, w]) => ({
        height: `var(--island-nav-height-${w})`
      })
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
      'avoid-text-overflow',
      {
        'white-space': 'nowrap',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      }
    ],
    [
      'multi-line-ellipsis',
      {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        'webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical'
      }
    ]
  ],
  theme: {
    fontSize: {
      '6xl': ['3.5rem', '4rem']
    },
    breakpoints: {
      xs: '640px',
      sm: '768px',
      md: '960px',
      lg: '1280px'
    },
    colors: {
      brandLight: 'var(--island-c-brand-light)',
      brandDark: 'var(--island-c-brand-dark)',
      brand: 'var(--island-c-brand)',
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
        soft: 'var(--island-c-bg-soft)',
        mute: 'var(--island-c-bg-mute)'
      }
    }
  }
};

export default options;
