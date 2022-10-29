import { createServer } from "vite";
import { pluginIndexHtml } from "./plugin-island/indexHtml";

export function createDevServer(root: string) {
  return createServer({
    root,
    plugins: [pluginIndexHtml()],
  });
}
