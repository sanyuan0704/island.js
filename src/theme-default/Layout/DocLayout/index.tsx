import { usePageData } from '@runtime';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../../components/Sidebar';

export function DocLayout() {
  const { pathname } = useLocation();
  const { siteData } = usePageData();
  const allSidebarData = siteData.themeConfig.sidebar || {};

  const matchedSidebarKey = Object.keys(allSidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });

  const matchedSidebar = allSidebarData[matchedSidebarKey] || [];
  return (
    <div>
      <SideBar sidebarData={matchedSidebar} pathname={pathname} />
    </div>
  );
}
