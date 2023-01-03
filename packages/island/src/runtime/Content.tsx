import { useRoutes } from 'react-router-dom';
import { routes } from 'virtual:routes';
import { Suspense } from 'react';

export const Content = () => {
  const routesElement = useRoutes(routes);
  return <Suspense fallback={null}>{routesElement}</Suspense>;
};
