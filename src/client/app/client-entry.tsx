import { hydrateRoot, createRoot } from 'react-dom/client';
import React, { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  // TODO: add SPA mode support
  if (import.meta.env.DEV || import.meta.env.SPA) {
    // The App code will will be tree-shaking in production
    // So there is no need to worry that the complete hydration will be executed in production
    const { waitForApp, App } = await import('./app');

    await waitForApp('/');
    createRoot(containerEl).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } else {
    await import('./island-inject');
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
