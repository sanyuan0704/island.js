import { DefaultTheme } from 'shared/types/default-theme';
import { normalizeHref } from './index';
export function useSidebarData(
  siderbar: DefaultTheme.Sidebar,
  currentPathname: string
): DefaultTheme.SidebarGroup | DefaultTheme.SidebarGroup[] | undefined {
  if (Array.isArray(siderbar)) {
    return siderbar.find((group) =>
      group.items.some(
        (item) => normalizeHref(item.link) === normalizeHref(currentPathname)
      )
    );
  } else {
    for (const name of Object.keys(siderbar)) {
      const result = siderbar[name].find((group) =>
        group.items.some(
          (item) => normalizeHref(item.link) === normalizeHref(currentPathname)
        )
      );
      if (result) {
        return siderbar[name];
      }
    }
  }
}
