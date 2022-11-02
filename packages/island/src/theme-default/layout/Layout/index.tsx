import React, { createContext } from 'react';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData, Content } from '@client';
import { Helmet } from 'react-helmet-async';
import { HomeLayout, NotFoundLayout } from '@theme';
import { APILayout } from '../APILayout';
import { DocLayoutProps } from '../DocLayout/index';
import { HomeLayoutProps } from '../HomeLayout/index';
import type { NavProps } from '../../components/Nav/index';
import { BackTop } from '@back-top';
import LoadingSvg from '../../assets/loading.svg';
import 'virtual:custom-styles';
import { LocalNav } from '../../components/LocalNav';
import { useSideBar } from './useSidebar';
import { BackDrop } from '../../components/BackDrop';
import { NavScreen } from '../../components/NavScreen';
import { useNav } from './useNav';

export type LayoutProps = {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
} & DocLayoutProps &
  HomeLayoutProps &
  NavProps;

export const Layout: React.FC<LayoutProps> = (props) => {
  const {
    top,
    bottom,
    beforeDocFooter,
    beforeDoc,
    afterDoc,
    beforeOutline,
    afterOutline,
    beforeNavTitle,
    afterNavTitle
  } = props;
  const { isScreenOpen, closeScreen, toggleScreen } = useNav();
  const {
    isOpen: isSidebarOpen,
    open: openSidebar,
    close: closeSidebar
  } = useSideBar();
  const docProps: DocLayoutProps = {
    beforeDocFooter,
    beforeDoc,
    afterDoc,
    beforeOutline,
    afterOutline,
    isSidebarOpen
  };
  const {
    // Inject by remark-plugin-toc
    title: articleTitle,
    frontmatter,
    siteData,
    pageType
  } = usePageData();
  const { backTop } = siteData.themeConfig;
  // Priority: front matter title > h1 title > site title
  const title = (frontmatter?.title ?? articleTitle) || siteData?.title;
  const description = frontmatter?.description || siteData.description;
  // Use doc layout by default
  const getContentLayout = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />;
      case 'doc':
        return <DocLayout {...docProps} />;
      case 'api':
        return <APILayout />;
      case '404':
        return <NotFoundLayout />;
      case 'custom':
        return (
          <Content
            fallback={
              <div flex="center">
                <div p="2" text="sm">
                  <LoadingSvg />
                </div>
              </div>
            }
          />
        );
      default:
        return <DocLayout {...docProps} />;
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <BackDrop closeSidebar={closeSidebar} isOpen={isSidebarOpen} />
      {isScreenOpen && <NavScreen></NavScreen>}
      <Helmet>
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Helmet>
      {top}
      <Nav
        closeScreen={closeScreen}
        toggleScreen={toggleScreen}
        isScreenOpen={isScreenOpen}
        beforeNavTitle={beforeNavTitle}
        afterNavTitle={afterNavTitle}
      />
      {pageType === 'doc' ? <LocalNav openSidebar={openSidebar} /> : null}
      <section style={{ paddingTop: 'var(--island-nav-height)' }}>
        {getContentLayout()}
      </section>
      {bottom}
      <BackTop __island backTop={backTop} />
    </div>
  );
};
