import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from 'virtual:routes';
import { Suspense } from 'react';

interface LocationState {
  from?: string;
}

export const Content = () => {
  const routesElement = useRoutes(routes);
  const location = useLocation();
  const prevRoute = (location.state as LocationState)?.from;
  const prevRouteElement = useRoutes(routes, prevRoute);
  return <Suspense fallback={prevRouteElement}>{routesElement}</Suspense>;
};
