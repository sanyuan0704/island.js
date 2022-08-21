import Koa from "koa";
import Router from "koa-router";
import { Manifest } from "../types";
import React, { createElement, ElementType, Fragment } from "react";
import { renderToString } from "react-dom/server";
import { Bundler } from "./Bundler";
import { join } from "path";
import { fileURLToPath } from "url";

interface Island {
  id: string;
  component: any;
}

// Islands container
let ISLANDS: any[] = [];
let ISLAND_PROPS: any[] = [];
let ENCOUNTER_ISLANDS: Island[] = [];
const originCreateElement = React.createElement;

// @ts-ignore
React.createElement = (type: ElementType, props: any, ...children: any[]) => {
  let matchedIsland: Island | undefined;
  if (
    typeof type === "function" &&
    (matchedIsland = ISLANDS.find(({ component }) => component === type))
  ) {
    ISLAND_PROPS.push(props);
    ENCOUNTER_ISLANDS.push(matchedIsland);
    return originCreateElement(
      `div`,
      {
        __island: `${matchedIsland.id}:${ISLAND_PROPS.length - 1}`,
      },
      originCreateElement(type, props, ...children)
    );
  }
  return originCreateElement(type, props, ...children);
};

export function createDevServer(manifest: Manifest) {
  const app = new Koa();
  const router = new Router();
  const bundle = new Bundler(manifest);
  console.log(manifest.routes);
  Object.entries(manifest.routes).forEach(([path, mod]) => {
    router.get(path, async (ctx, next) => {
      function renderFn(data: any) {
        ISLAND_PROPS = [];
        ENCOUNTER_ISLANDS = [];
        const bodyHtml = renderToString(createElement(mod.default, data));
        const importmap = {
          imports: {
            react: "https://esm.sh/react@18.2.0",
            "react-dom": "https://esm.sh/react-dom@18.2.0",
          },
        };
        const hydrateScript = [
          `import { revive } from "/revive";`,
          ENCOUNTER_ISLANDS.map((island) => {
            return `import ${island.id.split("/").pop()} from "${island.id}";`;
          }).join(""),
          `window.ISLANDS = {${ENCOUNTER_ISLANDS.map(
            ({ id }) => `"${id}": ${id.split("/").pop()}`
          ).join(",")}};`,
          `window.ISLAND_PROPS = [${ISLAND_PROPS.map((props) =>
            JSON.stringify(props)
          )}];`,
          `revive();`,
        ].join("");
        const template = (head: string, body: string) => {
          return `<!DOCTYPE html>
<html lang="en">
<head>
  ${head}
<script type="importmap">${JSON.stringify(importmap)}</script>
</head>
<body>
  ${body}
<script type="module">${hydrateScript}</script>
</body>
</html>`;
        };
        return template("", bodyHtml);
      }
      ctx.body = await mod.handler(ctx.request, {
        render: renderFn,
      });
    });
  });

  Object.entries(manifest.islands).forEach(([path, mod]) => {
    ISLANDS.push({
      id: path,
      component: mod.default,
    });
    router.get(path, async (ctx, next) => {
      const absPath = join(manifest.baseUrl, path);
      const file = await bundle.get(absPath);
      ctx.body = file;
      ctx.type = "application/javascript";
      ctx.status = 200;
    });
  });

  app.use(async (ctx, next) => {
    // 处理 runtime 资源
    await next();
    if (ctx.status === 404) {
      const absPath = join(
        fileURLToPath(import.meta.url),
        "../../runtime",
        ctx.path.slice(1)
      );
      const file = await bundle.get(absPath);
      ctx.body = file;
      ctx.type = "application/javascript";
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
  });
  return app;
}
