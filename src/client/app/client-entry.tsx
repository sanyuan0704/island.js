import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './app';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error(`#root element not found`);
  }
  if (import.meta.env.DEV) {
    createRoot(containerEl).render(<App />);
  } else {
    hydrateRoot(containerEl, <App />);
  }
}

renderInBrowser();
