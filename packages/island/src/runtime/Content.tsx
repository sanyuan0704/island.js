import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from 'virtual:routes';
import { Suspense } from 'react';

interface LocationState {
  from?: string;
}

export const Content = () => {
  const routesElement = useRoutes(routes);
  const location = useLocation();
  let prevRouteElement: React.ReactNode = null;
  if (import.meta.env.ENABLE_SPA) {
    const prevRoute = (location.state as LocationState)?.from;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    prevRouteElement = prevRoute ? useRoutes(routes, prevRoute) : null;
  }
  return <Suspense fallback={prevRouteElement}>{routesElement}</Suspense>;
};
