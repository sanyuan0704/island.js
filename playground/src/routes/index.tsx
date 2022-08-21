import React from "react";
import Counter from "../islands/Counter";

export async function handler(req: any, ctx: any) {
  const title = "标题数据";
  return ctx.render({ title });
}

export default function Index(props: { title: string }) {
  return (
    <div>
      <h1>标题: {props.title}</h1>
      <p>一些内容</p>
      <Counter start={3}></Counter>
    </div>
  );
}
