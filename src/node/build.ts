import { build as viteBuild, InlineConfig } from "vite";
import type { RollupOutput } from "rollup";
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";
import { join } from "path";
import * as fs from "fs-extra";

export const okMark = "\x1b[32m✓\x1b[0m";
export const failMark = "\x1b[31m✖\x1b[0m";

const dynamicImport = new Function("m", "return import(m)");

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: "production",
    root,
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm",
        },
      },
    },
  });
  const { default: ora } = await dynamicImport("ora");
  const spinner = ora();
  spinner.start(`Building client + server bundles...`);
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true)),
    ]);
    spinner.stopAndPersist({
      symbol: okMark,
    });
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
    spinner.stopAndPersist({
      symbol: failMark,
    });
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  const { default: ora } = await dynamicImport("ora");
  const spinner = ora();
  spinner.start(`Rendering page in server side...`);
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, "build"));
  await fs.writeFile(join(root, "build/index.html"), html);
  spinner.stopAndPersist({
    symbol: okMark,
  });
  await fs.remove(join(root, ".temp"));
}

export async function build(root: string = process.cwd()) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root);
  // 2. 引入 server-entry 模块
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  const { render } = require(serverEntryPath);
  // 3. 服务端渲染，产出 HTML
  await renderPage(render, root, clientBundle);
}
