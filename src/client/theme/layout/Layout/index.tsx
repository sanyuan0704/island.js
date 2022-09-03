import React from 'react';
import { HomeLayout } from '../HomeLayout';
import { Nav } from '../../components/Nav';

export const Layout: React.FC = () => {
  return (
    <div>
      <Nav />
      <HomeLayout />
    </div>
  );
};
