import { createRoot } from 'react-dom/client';
import { App, initPageData } from './app';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';
import { ComponentType } from 'react';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<unknown>>;
    ISLAND_PROPS: Record<string, unknown[]>;
  }
}

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  if (import.meta.env.DEV) {
    // 初始化 PageData
    const pageData = await initPageData(location.pathname);
    createRoot(containerEl).render(
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    );
  } else {
    const islands = document.querySelectorAll('[__island]');
    if (islands.length === 0) {
      return;
    }
    const { hydrateRoot } = await import('react-dom/client');

    for (let i = 0; i < islands.length; i++) {
      const island = islands[i];
      const [id, index] = island.getAttribute('__island')!.split(':');
      const Element = window.ISLANDS[id] as ComponentType<any>;
      hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]} />);
    }
  }
}

renderInBrowser();
