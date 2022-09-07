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
    ],

    sidebar: {
      '/build/': getBuildSidebar(),
      '/eco/': getEcosystemSidebar(),
      '/': getArchSidebar()
    }
  }
});

function getArchSidebar() {
  return [
    {
      text: '前言',
      items: [{ text: '为什么写这本书？', link: '/arch/why' }]
    },
    {
      text: '架构',
      items: [
        { text: '内置双引擎', link: '/arch/engine' },
        { text: 'CLI 工具', link: '/arch/cli' },
        { text: '配置解析服务', link: '/arch/config' },
        { text: 'Dev Server 架构', link: '/arch/server-mode' },
        { text: '插件容器机制', link: '/arch/plugin-container' },
        { text: '仓库工作流', link: '/arch/workflow' }
      ]
    }
  ];
}

function getBuildSidebar() {
  return [
    {
      text: '预构建',
      items: [{ text: 'Esbuild 预构建', link: '/build/1-pre-bundle/esbuild' }]
    },
    {
      text: 'Dev Server 构建核心',
      items: [
        { text: 'HTTP 请求处理', link: '/build/2-dev/http' },
        { text: '模块图谱', link: '/build/2-dev/module-graph' },
        { text: '基于 ESM 的 HMR 实现', link: '/build/2-dev/esm-hmr' }
      ]
    },
    {
      text: '路径解析系统',
      items: [
        { text: 'Node Resolve 算法重写', link: '/build/3-resolve/node' },
        { text: 'Glob 语法糖', link: '/build/3-resolve/glob' },
        { text: '支持动态 import', link: '/build/3-resolve/dynamic-import' },
        { text: '开发环境路径分析流程', link: '/build/3-resolve/dev' },
        { text: '生产环境路径分析流程', link: '/build/3-resolve/prod' }
      ]
    },
    {
      text: '资源处理',
      items: [
        {
          text: 'Esbuild Transform 能力',
          link: '/build/4-resource/esbuild-transform'
        },
        { text: 'CSS 构建能力', link: '/build/4-resource/css' },
        { text: '静态资源打包', link: '/build/4-resource/asset' },
        { text: '模块预加载', link: '/build/4-resource/module-preload' }
      ]
    },
    {
      text: '生产环境打包',
      items: [{ text: 'HTML 产物构建', link: '/build/5-bundle/html' }]
    },
    {
      text: 'SSR 构建',
      items: [
        { text: 'ESM 代码转换', link: '/build/6-ssr/transform' },
        { text: 'External 依赖', link: '/build/6-ssr/external' },
        { text: 'Manifest 资源', link: '/build/6-ssr/manifest' },
        { text: 'SourceMap 错误栈追溯', link: '/build/6-ssr/error-stack' }
      ]
    }
  ];
}

function getEcosystemSidebar() {
  return [
    {
      text: '官方插件实现',
      items: [
        { text: 'plugin-vue 实现', link: '/eco/plugin-vue' },
        { text: 'plugin-react 实现', link: '/eco/plugin-react' }
      ]
    },
    {
      text: '第三方插件',
      items: []
    }
  ];
}
