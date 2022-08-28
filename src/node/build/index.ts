import { bundle } from './bundle';
import { join } from 'path';
import { dynamicImport } from '../utils';
import { renderPage } from './render';
import { SERVER_OUTPUT_PATH } from '../constants';

export async function build(root = process.cwd()) {
  const bundleResult = await bundle(root);
  if (!bundleResult) return;
  const [clientBundle, _serverBundle] = bundleResult;
  const serverEntryPath = join(root, SERVER_OUTPUT_PATH);
  const { render } = await dynamicImport(serverEntryPath);
  await renderPage(render, root, clientBundle);
}
