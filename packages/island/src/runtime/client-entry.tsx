import { setup } from '@theme';
import { ComponentType } from 'react';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }

  const enhancedApp = async () => {
    const { waitForApp, App } = await import('./app');
    const { useState } = await import('react');
    const { BrowserRouter } = await import('react-router-dom');
    const { DataContext } = await import('@runtime');

    const initialPageData = await waitForApp(window.location.pathname);

    return function RootApp() {
      const [pageData, setPageData] = useState(initialPageData);
      return (
        <DataContext.Provider value={{ data: pageData, setData: setPageData }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataContext.Provider>
      );
    };
  };
  if (import.meta.env.DEV) {
    // The App code will will be tree-shaking in production
    // So there is no need to worry that the complete hydration will be executed in island mode
    const { createRoot } = await import('react-dom/client');
    const RootApp = await enhancedApp();
    createRoot(containerEl).render(<RootApp />);
  } else {
    // In production
    // SPA mode
    if (import.meta.env.ENABLE_SPA) {
      const RootApp = await enhancedApp();
      const { hydrateRoot } = await import('react-dom/client');
      hydrateRoot(containerEl, <RootApp />);
    } else {
      // MPA mode or island mode
      const islands = document.querySelectorAll('[__island]');
      if (islands.length === 0) {
        return;
      }
      const { hydrateRoot } = await import('react-dom/client');

      for (let i = 0; i < islands.length; i++) {
        const island = islands[i];
        const [id, index] = island.getAttribute('__island')!.split(':');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Element = window.ISLANDS[id] as ComponentType<any>;
        hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]} />);
      }
    }
  }
}

renderInBrowser().then(() => {
  // Binding the event after the first render
  setTimeout(() => {
    setup();
  });
});
