import { defineConfig } from '../../dist';
export default defineConfig({
  lang: 'en-US',
  icon: '/icon.png',
  themeConfig: {
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
