import React from 'react';
import { HomeLayoutProps } from './src/theme-default/layout/HomeLayout';
import { LayoutProps } from './src/theme-default/layout/Layout';

export const Layout: React.FC<LayoutProps>;
export const HomeLayout: React.FC<HomeLayoutProps>;
export const NotFoundLayout: React.FC;
export const setup: () => void;

export default {
  Layout,
  HomeLayout,
  NotFoundLayout,
  setup
}
