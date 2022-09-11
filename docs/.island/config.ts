export default {
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '架构', link: '/arch/why', activeMatch: '^/$|^/arch/' },
      {
        text: '构建实现',
        link: '/build/1-pre-bundle/esbuild',
        activeMatch: '^/build/'
      },
      { text: '生态', link: '/eco/plugin-vue', activeMatch: '^/eco/' }
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
      items: [{ text: '为什么写这本书？', link: '/' }]
    },
    {
      text: '架构',
      items: [
        { text: '小结sdsd', link: '/arch/engine' },
        { text: 'CLI 工具', link: '/arch/cli' },
        { text: '配置解析服务', link: '/arch/config' },
        { text: 'Dev Server 架构', link: '/arch/server-mode' },
        { text: '插件容器机制', link: '/arch/plugin-container' },
        { text: '仓库工作流', link: '/arch/' }
      ]
    }
  ];
}
