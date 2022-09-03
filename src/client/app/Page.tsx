import { useRoutes } from 'react-router-dom';
import React from 'react';
import MD1 from '../../../playground/src/1.md';

interface Route {
  path: string;
  component: () => Promise<React.ComponentType<any>>;
  element: React.ReactElement;
}

const routes = [
  {
    path: '/',
    element: <MD1 />
  }
];
export const Page = () => {
  const routesElement = useRoutes(routes);
  return routesElement;
};
