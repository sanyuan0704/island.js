import { SidebarItem, SidebarGroup, Sidebar } from 'shared/types';
import { useLocation } from 'react-router-dom';
import { usePageData } from '@runtime';

export function usePrevNextPage() {
  const { pathname } = useLocation();
  const { siteData } = usePageData();
  const sidebar = siteData.themeConfig?.sidebar || {};
  const flattenTitles: SidebarItem[] = [];

  const walkThroughSidebar = (sidebar: Sidebar | SidebarGroup[]) => {
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
