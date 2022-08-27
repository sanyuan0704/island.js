import { bundle } from './bundle';
import { join } from 'path';
import { dynamicImport } from '../utils';
import { renderPage } from './render';
import { SERVER_OUTPUT_PATH } from '../constants';
import React from 'react';

export async function build(root = process.cwd()) {
  const bundleResult = await bundle(root);
  if (!bundleResult) return;
  const [clientBundle, _serverBundle] = bundleResult;
  const serverEntryPath = join(root, SERVER_OUTPUT_PATH);
  // Avoid `React is not defined` error.
  global.React = React;
  const { render } = await dynamicImport(serverEntryPath);
  await renderPage(render, root, clientBundle);
}
