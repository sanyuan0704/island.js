import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData, Content } from 'island/client';
import { NotFoundLayout } from 'island/theme';
import { Helmet } from 'react-helmet-async';
import { APILayout } from '../APILayout';

export const Layout: React.FC = () => {
  const {
    // Inject by remark-plugin-toc
    title: articleTitle,
    frontmatter,
    siteData,
    pageType
  } = usePageData();
  // Priority: front matter title > h1 title > site title
  const title = (frontmatter?.title ?? articleTitle) || siteData?.title;
  const description = frontmatter?.description || siteData.description;
  // Use doc layout by default
  const getContentLayout = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />;
      case 'doc':
        return <DocLayout />;
      case 'api':
        return <APILayout />;
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
