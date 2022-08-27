import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './app';
import React, { createElement } from 'react';
import { Counter } from '../theme/components/Counter';

// island 数据，后续单独放到一个 bundle 中
// @ts-ignore
window.ISLANDS = {
  Counter
};

// @ts-ignore
window.ISLAND_PROPS = [{ count: 1 }];

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error(`#root element not found`);
  }
  if (import.meta.env.DEV) {
    createRoot(containerEl).render(<App />);
  } else {
    const islands = document.querySelectorAll('[__island]');
    for (let i = 0; i < islands.length; i++) {
      const island = islands[i];
      const [id, index] = island.getAttribute('__island')!.split(':');
      hydrateRoot(
        island,
        // @ts-ignore
        createElement(window.ISLANDS[id], window.ISLAND_PROPS[index])
      );
    }
  }
}

renderInBrowser();
