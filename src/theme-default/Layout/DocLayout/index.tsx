import { usePageData } from '@runtime';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/index';

export function DocLayout() {
  const { siteData } = usePageData();
  const sidebarData = siteData.themeConfig?.sidebar || {};
  const { pathname } = useLocation();
  const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });

  const matchedSidebar = sidebarData[matchedSidebarKey] || [];

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
    </div>
  );
}
