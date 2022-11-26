import { DefaultTheme } from 'shared/types/default-theme';
import { useLocaleSiteData } from './useLocaleSiteData';
import { isEqualPath } from './utils';
import { withBase } from '@runtime';

interface SidebarData {
  // The group name for the sidebar
  group: string;
  items: DefaultTheme.SidebarGroup[];
}

export function useSidebarData(currentPathname: string): SidebarData {
  const localeData = useLocaleSiteData();
  const sidebar = localeData.sidebar ?? {};
  for (const name of Object.keys(sidebar)) {
    // Such as `/api/`，it will return all the sidebar group
    if (isEqualPath(withBase(name), currentPathname)) {
      return {
        group: '',
        items: sidebar[name]
      };
    }
    // Such as `/guide/getting-started`, it will return the guide groups and the group name `Introduction`
    const result = sidebar[name].find((group) =>
      group.items.some(
        (item) => item.link && isEqualPath(withBase(item.link), currentPathname)
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
