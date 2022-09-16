import { hydrateRoot, createRoot } from 'react-dom/client';
import { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './sideEffects';
import { DataContext } from './hooks';
import { loadableReady } from '@loadable/component';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<any>>;
    // The state for island.
    ISLAND_PROPS: any;
    ISLAND_PAGE_DATA: any;
  }
}

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }

  const enhancedApp = async () => {
    const { waitForApp, App } = await import('./app');
    const pageData = await waitForApp(window.location.pathname);
    return (
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    );
  };
  if (import.meta.env.DEV) {
    // The App code will will be tree-shaking in production
    // So there is no need to worry that the complete hydration will be executed in island mode
    createRoot(containerEl).render(await enhancedApp());
  } else {
    // In production
    // SPA mode
    if (import.meta.env.ENABLE_SPA) {
      const rootApp = await enhancedApp();
      loadableReady(() => {
        hydrateRoot(containerEl, rootApp);
      });
    } else {
      // MPA mode or island mode
      const islands = document.querySelectorAll('[__island]');
      for (let i = 0; i < islands.length; i++) {
        const island = islands[i];
        const [id, index] = island.getAttribute('__island')!.split(':');
        const Element = window.ISLANDS[id];
        hydrateRoot(
          island,
          <Element {...window.ISLAND_PROPS[index]}></Element>
        );
      }
    }
  }
}

renderInBrowser();
