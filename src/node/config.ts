import { join } from 'path';
import { SiteData } from '../shared/types/types';

export async function resolveConfig(root: string): Promise<SiteData> {
  // const userConfig = { root };
  // 1. TODO: 解析用户配置文件
  // 2. 与默认配置合并
  const siteData: SiteData = {
    root: process.cwd(),
    base: '/',
    outDir: 'dist',
    srcDir: 'docs',
    themeDir: join(__dirname, '../../../src/client/theme'),
    themeConfig: {},
    title: 'island',
    description: 'island ssg',
    lang: 'zh-CN',
    pages: ['index', 'about']
  };

  return siteData;
}
