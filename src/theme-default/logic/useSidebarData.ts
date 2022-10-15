import { DefaultTheme } from 'shared/types/default-theme';
import { normalizeHref } from './index';
import { useLocaleSiteData } from './useLocaleSiteData';

interface SidebarData {
  // The group name ofr the sidebar
  group: string;
  items: DefaultTheme.SidebarGroup[];
}

export function useSidebarData(currentPathname: string): SidebarData {
  const localeData = useLocaleSiteData();
  const sidebar = localeData.sidebar ?? {};
  const normalizedCurrentPath = normalizeHref(currentPathname);
  for (const name of Object.keys(sidebar)) {
    // Such as `/api/`，it will return all the sidebar group
    if (currentPathname === normalizeHref(name)) {
      return {
        group: '',
        items: sidebar[name]
      };
    }
    // Such as `/guide/getting-started`, it will return the guide groups and the group name `Introduction`
    const result = sidebar[name].find((group) =>
      group.items.some(
        (item) => normalizeHref(item.link) === normalizedCurrentPath
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
