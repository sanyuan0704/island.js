import { hydrate } from "react-dom";
import { createElement } from "react";

export function revive() {
  const islands = document.querySelectorAll("[__island]");
  for (let i = 0; i < islands.length; i++) {
    const island = islands[i];
    const [id, index] = island.getAttribute("__island")!.split(":");
    hydrate(
      // @ts-ignore
      createElement(window.ISLANDS[id], window.ISLAND_PROPS[index]),
      island
    );
  }
}
