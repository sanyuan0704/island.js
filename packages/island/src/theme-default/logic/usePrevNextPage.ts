import { DefaultTheme } from 'shared/types';
import { useLocation } from 'react-router-dom';
import { useLocaleSiteData } from './useLocaleSiteData';

export function usePrevNextPage() {
  const { pathname } = useLocation();
  const localesData = useLocaleSiteData();
  const sidebar = localesData.sidebar || {};
  const flattenTitles: DefaultTheme.SidebarItem[] = [];

  const walkThroughSidebar = (
    sidebar: DefaultTheme.Sidebar | DefaultTheme.SidebarGroup[]
  ) => {
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
