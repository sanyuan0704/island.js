import React from 'react';
// import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';
import { DocLayout } from '../DocLayout';

export const Layout: React.FC = () => {
  return (
    <div>
      <Nav />
      {/* <HomeLayout /> */}
      <DocLayout></DocLayout>
    </div>
  );
};
