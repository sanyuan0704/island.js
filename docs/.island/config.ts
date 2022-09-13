export default {
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      // { text: '架构', link: '/arch/why', activeMatch: '^/$|^/arch/' },
      // {
      //   text: '构建实现',
      //   link: '/build/1-pre-bundle/esbuild',
      //   activeMatch: '^/build/'
      // },
      // { text: '生态', link: '/eco/plugin-vue', activeMatch: '^/eco/' }
    ],

    sidebar: {
      '/': getArchSidebar()
    }
  }
};

function getArchSidebar() {
  return [
    {
      text: '前言',
      items: [{ text: '初衷', link: '/' }]
    },
    {
      text: '架构',
      items: [
        { text: '快速开始', link: '/arch/engine' },
        { text: 'CLI 工具', link: '/arch/cli' }
      ]
    }
  ];
}
