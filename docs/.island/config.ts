import { defineConfig } from '../../dist/node';

export default defineConfig({
  lang: 'en-US',
  title: 'Island.js',
  icon: '/island.png',
  vite: {
    // custom config for vite
  },
  themeConfig: {
    outlineTitle: 'ON THIS PAGE',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sanyuan0704/island'
      }
    ],
    lastUpdatedText: 'Last Updated',
    editLink: {
      pattern:
        'https://github.com/sanyuan0704/island.js/tree/master/docs/:path',
      text: '📝 Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '^/guide/'
      },
      {
        text: 'API',
        link: '/api/',
        activeMatch: '^/api'
      }
    ],

    sidebar: {
      '/': getTutorialSidebar(),
      '/api/': getApiSidebar()
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Xingyuan Yang'
    }
  }
});

function getTutorialSidebar() {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Configure Your Site', link: '/guide/configure-site' }
      ]
    },
    {
      text: 'Architecture',
      items: [
        { text: 'SPA vs MPA', link: '/guide/spa-vs-mpa' },
        { text: 'Islands Architecture', link: '/guide/islands-arch' }
      ]
    }
  ];
}

function getApiSidebar() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Basic Config', link: '/api/config-basic' },
        { text: 'Theme Config', link: '/api/config-theme' }
      ]
    }
  ];
}
