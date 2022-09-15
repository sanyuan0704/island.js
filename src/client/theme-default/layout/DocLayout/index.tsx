import { SideBar } from '../../components/Siderbar/index';
import styles from './index.module.scss';
import { Aside } from '../../components/Aside/index';

import { DocFooter } from '../../components/DocFooter/index';
import { Content, usePageData } from 'island/client';

export function DocLayout() {
  const data = usePageData();
  const headers = data?.toc || [];
  const sidebar = data?.siteData?.themeConfig?.sidebar || [];

  const hasSidebar =
    (Array.isArray(sidebar) && sidebar.length > 0) ||
    Object.keys(sidebar).length > 0;

  const hasAside = headers.length > 0;

  return (
    <div className={styles.doc}>
      <div className={styles.sideBar}>{hasSidebar ? <SideBar /> : null}</div>
      <div
        className={`${styles.content} ${hasSidebar ? styles.hasSidebar : ''}`}
      >
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <main className={styles.main}>
              <div className="island-doc">
                <Content />
              </div>
              <DocFooter />
            </main>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.asideCurtain} />
          <div className={styles.asideContainer}>
            <div className={styles.asideContent}>
              {hasAside ? (
                <Aside __island headers={headers} pagePath={data.pagePath} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
