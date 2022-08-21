import { createDevServer } from "./server/index";
import { Manifest } from "./types";
import { fileURLToPath } from "url";
import { join } from "path";

// 入口
export function start(manifest: Manifest) {
  manifest.baseUrl = fileURLToPath(join(manifest.baseUrl, ".."));
  createDevServer(manifest);
}
