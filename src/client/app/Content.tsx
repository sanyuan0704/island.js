import { useRoutes } from 'react-router-dom';
import { routes } from 'island:routes';
import React from 'react';

export const Content = () => {
  const routesElement = useRoutes(routes);
  return <>{routesElement}</>;
};
