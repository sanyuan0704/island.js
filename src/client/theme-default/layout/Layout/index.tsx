import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData, Content } from 'island/client';
import { NotFoundLayout } from 'island/theme';

export const Layout: React.FC = () => {
  const { pageType } = usePageData();
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
      <Nav />
      <section style={{ paddingTop: '72px' }}>{getContentLayout()}</section>
    </div>
  );
};
