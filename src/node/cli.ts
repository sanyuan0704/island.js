import cac from "cac";
import { createDevServer } from "./dev";

const cli = cac("island").version("0.0.1").help();

cli.command("dev [root]", "start dev server").action(async (root: string) => {
  const server = await createDevServer(root);
  await server.listen();
  server.printUrls();
});

cli
  .command("build [root]", "build in production")
  .action(async (root: string) => {
    console.log("build", root);
  });

cli.parse();

// 调试 CLI:
// 1. 在 package.json 中声明 bin 字段
// 2. 通过 npm link 将命令 link 到全局
// 3. 执行 island dev 命令
