import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './app';
import React, { ComponentType, createElement } from 'react';
import { islands } from '/@island/theme';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<any>>;
    // The state for island.
    ISLAND_PROPS: any;
  }
}

window.ISLANDS = islands;
window.ISLAND_PROPS = JSON.parse(
  document.getElementById('island-props')!.textContent!
);

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error(`#root element not found`);
  }
  if (import.meta.env.DEV) {
    // App Will be tree shaking in production.
    // So complete application code is removed and only island component code is reserved.
    createRoot(containerEl).render(<App />);
  } else {
    const islands = document.querySelectorAll('[__island]');
    for (let i = 0; i < islands.length; i++) {
      const island = islands[i];
      const [id, index] = island.getAttribute('__island')!.split(':');
      hydrateRoot(
        island,
        createElement(window.ISLANDS[id], window.ISLAND_PROPS[index])
      );
    }
  }
}

renderInBrowser();
