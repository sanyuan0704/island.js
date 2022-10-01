import { defineConfig } from '../../dist/node';

function getI18nHelper(lang: 'zh' | 'en') {
  const cn = lang === 'zh';
  const prefix = cn ? '/zh' : '/en';
  const getLink = (str: string) => `${prefix}${str}`;
  const getText = (cnText: string, enText: string) => (cn ? cnText : enText);
  return { getText, getLink };
}

export default defineConfig({
  lang: 'en-US',
  title: 'Island.js',
  icon: '/island.png',
  vite: {
    // custom config for vite
  },
  markdown: {
    rehypePlugins: [],
    remarkPlugins: []
  },
  route: {
    exclude: ['custom.tsx']
  },
  themeConfig: {
    locales: {
      '/zh/': {
        lang: 'zh',
        label: '简体中文',
        selectText: '语言',
        ariaLabel: '语言',
        lastUpdatedText: '上次更新',
        nav: getNavbar('zh'),
        sidebar: getSidebar('zh'),
        title: 'Island.js',
        outlineTitle: '目录',
        prevPageText: '上一页',
        nextPage: '下一页',
        description: '基于孤岛架构的 SSG 框架',
        editLink: {
          pattern:
            'https://github.com/sanyuan0704/island.js/tree/master/docs/:path',
          text: '📝 在 GitHub 上编辑此页'
        }
      },
      '/en/': {
        lang: 'en',
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Languages',
        lastUpdated: 'Last Updated',
        nav: getNavbar('en'),
        sidebar: getSidebar('en'),
        title: 'Island.js',
        description: 'SSG Framework based on island architecture'
      }
    },
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

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Xingyuan Yang'
    }
  }
});

function getSidebar(lang: 'zh' | 'en') {
  const { getLink, getText } = getI18nHelper(lang);

  return {
    [getLink('/guide/')]: [
      {
        text: getText('介绍', 'Getting Started'),
        items: [
          {
            text: getText('快速开始', 'Getting Started'),
            link: getLink('/guide/getting-started')
          },
          {
            text: getText('配置站点', 'Configure Your Site'),
            link: getLink('/guide/configure-site')
          }
        ]
      },
      {
        text: getText('架构', 'Architecture'),
        items: [
          {
            text: getText('SPA 和 MPA 对比', 'SPA vs MPA'),
            link: getLink('/guide/spa-vs-mpa')
          },
          {
            text: getText('孤岛架构', 'Island Architecture'),
            link: getLink('/guide/islands-arch')
          }
        ]
      },
      {
        text: getText('核心功能', 'Features'),
        items: [
          {
            text: getText('约定式路由', 'Conventional Routing'),
            link: getLink('/guide/conventional-route')
          },
          {
            text: getText('使用 MDX 语法', 'Using MDX'),
            link: getLink('/guide/use-mdx')
          },
          {
            text: getText('自定义页面', 'Custom Page'),
            link: getLink('/guide/custom-page')
          },
          {
            text: getText('SPA 模式', 'SPA Mode'),
            link: getLink('/guide/spa-mode')
          },
          {
            text: getText('静态资源', 'Static Assets'),
            link: getLink('/guide/static-assets')
          },
          {
            text: getText('能力扩展', 'Extension'),
            link: getLink('/guide/extension')
          }
        ]
      }
    ],
    [getLink('/api/')]: [
      {
        text: getText('配置项', 'Config'),
        items: [
          {
            text: getText('基础配置', 'Basic Config'),
            link: getLink('/api/config-basic')
          },
          {
            text: getText('主题配置', 'Theme Config'),
            link: getLink('/api/config-theme')
          },
          {
            text: getText('Front Matter 配置', 'Front Matter Config'),
            link: getLink('/api/config-front-matter')
          },
          {
            text: getText('扩展配置', 'Extension Config'),
            link: getLink('/api/config-extension')
          }
        ]
      }
    ]
  };
}

function getNavbar(lang: 'zh' | 'en') {
  const { getLink, getText } = getI18nHelper(lang);

  return [
    {
      text: getText('指南', 'Guide'),
      link: getLink('/guide/getting-started'),
      activeMatch: '/guide/'
    },
    {
      text: getText('API', 'API'),
      link: getLink('/api/'),
      activeMatch: '/api/'
    }
  ];
}
