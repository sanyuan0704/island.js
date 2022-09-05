import { Layout } from 'island:theme';
import React from 'react';
import { routes } from 'island:routes';
import { matchRoutes } from 'react-router-dom';

export async function waitForApp(path: string) {
  const matched = matchRoutes(routes, path)!;
  return matched;
}

export function App() {
  return <Layout />;
}
