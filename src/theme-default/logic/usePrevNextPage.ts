import { DefaultTheme, SiteData } from 'shared/types';
import { useLocation } from 'react-router-dom';

export function usePrevNextPage(siteData: SiteData<DefaultTheme.Config>) {
  const themeConfig = siteData.themeConfig || {};
  const sidebar = themeConfig.sidebar || [];
  const flattenTitles: DefaultTheme.SidebarItem[] = [];
  const { pathname } = useLocation();

  const walkThroughSidebar = (sidebar: DefaultTheme.Sidebar) => {
    if (Array.isArray(sidebar)) {
      sidebar.forEach((sidebarGroup) => {
        sidebarGroup.items.forEach((item) => {
          flattenTitles.push(item);
        });
      });
    } else {
      Object.keys(sidebar).forEach((key) => {
        walkThroughSidebar(sidebar[key]);
      });
    }
  };

  walkThroughSidebar(sidebar);

  const pageIndex = flattenTitles.findIndex((item) => item.link === pathname);

  const prevPage = flattenTitles[pageIndex - 1] || null;
  const nextPage = flattenTitles[pageIndex + 1] || null;

  return {
    prevPage,
    nextPage
  };
}
