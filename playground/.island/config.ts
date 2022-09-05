import { defineConfig } from '../../dist/node/index';

export default defineConfig({
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
    ]
  }
});
