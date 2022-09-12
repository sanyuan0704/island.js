
import { hydrateRoot, createRoot } from 'react-dom/client';
import { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './sideEffects';
import { DataContext } from './hooks';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<any>>;
    // The state for island.
    ISLAND_PROPS: any;
  }
}

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  // TODO: add SPA mode support
  if (import.meta.env.DEV) {
    // The App code will will be tree-shaking in production
    // So there is no need to worry that the complete hydration will be executed in production
    const { waitForApp, App } = await import('./app');
    const pageData = await waitForApp(window.location.pathname);
    createRoot(containerEl).render(
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    );
  } else {
    const islands = document.querySelectorAll('[__island]');
    for (let i = 0; i < islands.length; i++) {
      const island = islands[i];
      const [id, index] = island.getAttribute('__island')!.split(':');
      const Element = window.ISLANDS[id];
      hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]}></Element>);
    }
  }
}

renderInBrowser();
