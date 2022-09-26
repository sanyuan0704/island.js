// import { hydrateRoot, createRoot } from 'react-dom/client';
// import type { ComponentType } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { DataContext } from 'island/client';
import { setupEffects } from './sideEffects';

// // Type shim for window.ISLANDS
// declare global {
//   interface Window {
//     ISLANDS: Record<string, ComponentType<unknown>>;
//     // The state for island.
//     ISLAND_PROPS: Record<string, unknown[]>;
//     ISLAND_PAGE_DATA: unknown;
//   }
// }

// async function renderInBrowser() {
//   const containerEl = document.getElementById('root');
//   if (!containerEl) {
//     throw new Error('#root element not found');
//   }

//   const enhancedApp = async () => {
//     const { waitForApp, App } = await import('./app');
//     const { useState } = await import('react');
//     const initialPageData = await waitForApp(window.location.pathname);
//     return function RootApp() {
//       const [pageData, setPageData] = useState(initialPageData);
//       return (
//         <DataContext.Provider value={{ data: pageData, setData: setPageData }}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </DataContext.Provider>
//       );
//     };
//   };
//   if (import.meta.env.DEV) {
//     // The App code will will be tree-shaking in production
//     // So there is no need to worry that the complete hydration will be executed in island mode
//     const { createRoot } = await import('react-dom/client');
//     const RootApp = await enhancedApp();
//     createRoot(containerEl).render(<RootApp />);
//   } else {
//     // In production
//     // SPA mode
//     if (import.meta.env.ENABLE_SPA) {
//       const { hydrateRoot } = await import('react-dom/client');
//       const RootApp = await enhancedApp();
//       hydrateRoot(containerEl, <RootApp />);
//     } else {
//       // MPA mode or island mode
//       if (!window.ISLAND_PROPS) {
//         return;
//       }
//       const { hydrateRoot } = await import('react-dom/client');
//       const islands = document.querySelectorAll('[__island]');
//       for (let i = 0; i < islands.length; i++) {
//         const island = islands[i];
//         const [id, index] = island.getAttribute('__island')!.split(':');
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const Element = window.ISLANDS[id] as ComponentType<any>;
//         hydrateRoot(
//           island,
//           <Element {...window.ISLAND_PROPS[index]}></Element>
//         );
//       }
//     }
//   }
// }

// renderInBrowser().then(() => {
// });

setupEffects();
