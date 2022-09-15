import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData, Content } from 'island/client';
import { NotFoundLayout } from 'island/theme';
import { Helmet } from 'react-helmet-async';

export const Layout: React.FC = () => {
  const { pageType, title: pageTitle, description, siteData } = usePageData();
  // Priority page title > site title
  const title = pageTitle || siteData?.title;
  // Use doc layout by default
  const getContentLayout = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />;
      case 'doc':
        return <DocLayout />;
      case '404':
        return <NotFoundLayout />;
      case 'custom':
        return <Content />;
      default:
        return <DocLayout />;
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Helmet>
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Helmet>
      <Nav />
      <section style={{ paddingTop: 'var(--island-nav-height)' }}>
        {getContentLayout()}
      </section>
    </div>
  );
};
