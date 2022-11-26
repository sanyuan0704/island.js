import styles from './index.module.scss';
import { Aside } from '../../components/Aside/index';
import { DocFooter } from '../../components/DocFooter/index';
import { Content, usePageData } from '@runtime';
import { useHeaders, useLocaleSiteData, useSidebarData } from '../../logic';
import { SideMenu } from '../../components/LocalSideBar';
import { normalizeSlash } from '@runtime';
import { useLocation } from 'react-router-dom';

export interface DocLayoutProps {
  beforeDocFooter?: React.ReactNode;
  beforeDoc?: React.ReactNode;
  afterDoc?: React.ReactNode;
  beforeOutline?: React.ReactNode;
  afterOutline?: React.ReactNode;
}

export function DocLayout(props: DocLayoutProps) {
  const { beforeDocFooter, beforeDoc, afterDoc, beforeOutline, afterOutline } =
    props;
  const { toc = [], siteData, pagePath, frontmatter } = usePageData();
  const [headers] = useHeaders(toc, pagePath);
  const themeConfig = siteData.themeConfig;
  const localesData = useLocaleSiteData();
  const sidebar = localesData.sidebar || [];
  const { pathname } = useLocation();
  const { items: sidebarData } = useSidebarData(pathname);
  const langRoutePrefix = normalizeSlash(localesData.routePrefix || '');
  // siderbar Priority
  // 1. frontmatter.sidebar
  // 2. themeConfig.locales.sidebar
  // 3. themeConfig.sidebar
  const hasSidebar =
    frontmatter?.sidebar !== false &&
    ((Array.isArray(sidebar) && sidebar.length > 0) ||
      Object.keys(sidebar).length > 0);
  const outlineTitle =
    localesData?.outlineTitle || themeConfig?.outlineTitle || 'ON THIS PAGE';
  const hasAside =
    headers.length > 0 &&
    (frontmatter?.outline ?? themeConfig?.outline ?? true);
  const isDisableLineNumbers =
    frontmatter?.lineNumbers === undefined ? false : !frontmatter.lineNumbers;

  return (
    <div p="t-0 x-6 b-24 sm:6" className={styles.docLayout}>
      {beforeDoc}
      {hasSidebar ? (
        <SideMenu
          pathname={pathname}
          langRoutePrefix={langRoutePrefix}
          sidebarData={sidebarData}
          __island
        ></SideMenu>
      ) : null}
      <div flex="~ 1 shrink-0" m="x-auto" className={`${styles.content}`}>
        <div m="x-auto" flex="~ col" className="max-w-100%">
          <div
            relative="~"
            m="x-auto"
            p="l-2"
            className={`w-100% md:max-w-712px lg:min-w-640px ${
              hasAside ? '' : styles.contentArticle
            }`}
            style={{
              maxWidth: hasAside ? '' : '1024px'
            }}
          >
            <div
              className={`island-doc ${
                isDisableLineNumbers ? 'line-number-disable' : ''
              }`}
            >
              <Content />
            </div>
            {beforeDocFooter}
            <DocFooter />
          </div>
        </div>
        <div
          relative="~"
          display="none lg:block"
          order="2"
          flex="1"
          p="l-8"
          className="max-w-256px"
        >
          <div className={styles.asideContainer}>
            <div
              flex="~ col"
              p="b-8"
              style={{
                minHeight:
                  'calc(100vh - (var(--island-nav-height-desktop) + 32px))'
              }}
            >
              {hasAside ? (
                <div>
                  {beforeOutline}
                  <Aside
                    headers={headers}
                    outlineTitle={outlineTitle}
                    pagePath={pagePath}
                  />
                  {afterOutline}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {afterDoc}
    </div>
  );
}
