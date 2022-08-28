import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './app';
import React, { createElement } from 'react';
import './island-inject';

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
