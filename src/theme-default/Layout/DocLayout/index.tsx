import { usePageData, Content } from '@runtime';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../../components/Sidebar';
import styles from './index.module.scss';
import { DocFooter } from '../../components/DocFooter';
import { Aside } from '../../components/Aside';

export function DocLayout() {
  const { pathname } = useLocation();
  const { siteData, toc, pagePath } = usePageData();
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
      <div className={styles.content} flex="~">
        <div className={styles.docContent}>
          <div className="island-doc">
            <Content />
          </div>
          <DocFooter />
        </div>
        <div className={styles.asideContainer}>
          <Aside headers={toc} pagePath={pagePath} />
        </div>
      </div>
    </div>
  );
}
