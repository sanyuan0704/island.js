import { add } from "./util.cjs";

export function foo() {
  console.log(add(1, 2));
}

foo();

// 根本原因
// CJS 同步加载 require
// ESM 异步加载 import
