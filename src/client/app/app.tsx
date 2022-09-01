import { Layout } from '/@island/theme';
import React from 'react';
// import { matchRoutes } from 'react-router-dom';

// interface Route {
//   path: string;
//   component: () => Promise<React.ComponentType<any>>;
// }

export async function waitForApp(path: string) {
  // const matched = matchRoutes(routes, path)!;
  // const comp = await (matched[0].route as Route).component();
  // console.log(comp);
}

export function App() {
  return <Layout />;
}
