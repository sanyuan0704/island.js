import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';
import { usePageData } from 'island/client';

export const Layout: React.FC = () => {
  const { pageType } = usePageData();
  // Use doc layout by default
  let contentLayout = <DocLayout />;
  switch (pageType) {
    case 'home':
      contentLayout = <HomeLayout />;
      break;
    case 'doc':
    default:
      break;
  }
  return (
    <div>
      <Nav />
      {contentLayout}
    </div>
  );
};
