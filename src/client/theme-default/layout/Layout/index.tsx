import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData } from 'island/client';
import { NotFoundLayout } from 'island/theme';

export const Layout: React.FC = () => {
  const { pageType } = usePageData();
  // Use doc layout by default
  const getContentLayout = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else if (pageType === '404') {
      return <NotFoundLayout />;
    } else {
      return <DocLayout />;
    }
  };

  return (
    <div>
      <Nav />
      {getContentLayout()}
    </div>
  );
};
