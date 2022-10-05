import { DefaultTheme } from 'shared/types/default-theme';
import { normalizeHref } from './index';
import { useLocaleSiteData } from './useLocaleSiteData';

interface SitebarData {
  // The group name ofr the sidebar
  group: string;
  items: DefaultTheme.SidebarGroup[];
}

export function useSidebarData(currentPathname: string): SitebarData {
  const localeData = useLocaleSiteData();
  const sidebar = localeData.sidebar ?? {};
  for (const name of Object.keys(sidebar)) {
    const result = sidebar[name].find((group) =>
      group.items.some(
        (item) => normalizeHref(item.link) === normalizeHref(currentPathname)
      )
    );
    if (result) {
      const sidebarGroup = sidebar[name];
      return {
        group: result.text || '',
        items: sidebarGroup
      };
    }
  }
  return {
    group: '',
    items: []
  };
}
