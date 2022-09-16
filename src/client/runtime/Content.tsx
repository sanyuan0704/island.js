import { useRoutes } from 'react-router-dom';
import { routes } from 'virtual:routes';
import { ReactElement, Suspense } from 'react';

export const Content = ({ fallback }: { fallback: ReactElement }) => {
  const routesElement = useRoutes(routes);
  return <Suspense fallback={fallback}>{routesElement}</Suspense>;
};
