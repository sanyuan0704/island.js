import { defineConfig } from '../../dist';

export default defineConfig({
  lang: 'en-US',
  icon: '/icon.png',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sanyuan0704/island'
      }
    ],
    lastUpdatedText: 'Last Updated',
    editLink: '',
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
      text: 'Guide',
      items: [{ text: 'Getting Started', link: '/guide/getting-started' }]
    }
    // {
    //   text: 'Advance',
    //   items: []
    // }
  ];
}
