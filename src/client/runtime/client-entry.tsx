import { hydrateRoot, createRoot } from 'react-dom/client';
import { ComponentType, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './sideEffects';
import { DataContext } from './hooks';

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
    const initialPageData = await waitForApp(window.location.pathname);
    return () => {
      const [pageData, setPageData] = useState(initialPageData);

      return (
        <DataContext.Provider value={pageData}>
          <BrowserRouter>
            <App setPageData={setPageData} />
          </BrowserRouter>
        </DataContext.Provider>
      );
    };
  };
  if (import.meta.env.DEV) {
    // The App code will will be tree-shaking in production
    // So there is no need to worry that the complete hydration will be executed in island mode
    const RootApp = await enhancedApp();
    createRoot(containerEl).render(<RootApp />);
  } else {
    // In production
    // SPA mode
    if (import.meta.env.ENABLE_SPA) {
      const RootApp = await enhancedApp();
      hydrateRoot(containerEl, <RootApp />);
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
