import { createServer } from "vite";

export function createDevServer(root: string) {
  return createServer({
    root,
  });
}
