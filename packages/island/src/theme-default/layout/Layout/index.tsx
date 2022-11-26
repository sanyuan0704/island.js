import React from 'react';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData, Content } from '@runtime';
import { Helmet } from 'react-helmet-async';
import { HomeLayout, NotFoundLayout } from '@theme';
import { APILayout } from '../APILayout';
import { DocLayoutProps } from '../DocLayout/index';
import { HomeLayoutProps } from '../HomeLayout/index';
import type { NavProps } from '../../components/Nav/index';
import { BackTop } from '@back-top';
import 'virtual:custom-styles';

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
  const docProps: DocLayoutProps = {
    beforeDocFooter,
    beforeDoc,
    afterDoc,
    beforeOutline,
    afterOutline
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
        return <Content />;
      default:
        return <DocLayout {...docProps} />;
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Helmet>
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Helmet>
      {top}
      <Nav beforeNavTitle={beforeNavTitle} afterNavTitle={afterNavTitle} />
      <section style={{ paddingTop: 'var(--island-nav-height)' }}>
        {getContentLayout()}
      </section>
      {bottom}
      <BackTop __island backTop={backTop} />
    </div>
  );
};
