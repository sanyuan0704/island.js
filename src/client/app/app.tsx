import { Layout } from 'island:theme';
import React from 'react';
import { routes } from 'virtual:routes';
import { matchRoutes, Route } from 'react-router-dom';

export async function waitForApp(path: string) {
  const matched = matchRoutes(routes, path)!;
  // @ts-ignore
  const mod = await import(/* @vite-ignore */ matched[0].route.componentPath);
  return mod;
}

export function App() {
  return <Layout />;
}
