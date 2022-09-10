import { join } from 'path';
import { dynamicImport } from '../utils';
import { SERVER_OUTPUT_PATH } from '../constants';
import { renderPages } from './render';
import { bundle } from './bundle';

export async function build(root = process.cwd()) {
  const bundleResult = await bundle(root);
  if (!bundleResult) {
    return;
  }
  const [clientBundle, serverBundle, builder] = bundleResult;
  const serverEntryPath = join(root, SERVER_OUTPUT_PATH);
  const { render } = await dynamicImport(serverEntryPath);
  await renderPages(render, root, clientBundle, serverBundle, builder);
}
