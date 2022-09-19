import { defineConfig } from '../../dist';

export default defineConfig({
  lang: 'en-US',
  title: 'Island.js',
  icon: '/island.png',
  themeConfig: {
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
        activeMatch: '^/$|^/guide/'
      }
    ],

    sidebar: {
      '/': getTutorialSidebar()
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
