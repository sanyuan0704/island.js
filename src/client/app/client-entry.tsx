import { hydrateRoot, createRoot } from 'react-dom/client';
import React, { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App, waitForApp } from './app';
import './island-inject';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  if (import.meta.env.DEV) {
    // App 组件的代码会在生产环境被 Tree Shaking 掉
    await waitForApp('/');
    createRoot(containerEl).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
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
