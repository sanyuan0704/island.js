/**
 * In production build, we should do following steps:
 * 1. Bundle client and ssr entry code, get clientBundle and serverBundle
 * 2. Execute serverBundle to get render function and routes
 * 3. Render pages to static html string (renderToString)
 * 4. Get island components from render process, and bundle the components together.We call this bundle as islandBundle,
    and the island components will be hang on window so that client bundle can access them.
 * 5. Inject islandBundle and client bundle to html string, as well as island props data.
 * 6. Write html string to file.   
 */

import { resolveConfig } from './config';

class SSGBuilder {}

async function build(root: string) {
  const config = await resolveConfig(root, 'build', 'production');
  const builder = await SSGBuilder();
}
