import { ComponentType } from 'react';
import { islands } from '/@island/theme';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<any>>;
    // The state for island.
    ISLAND_PROPS: any;
  }
}
if (import.meta.env.PROD) {
  const Islands = islands;

  window.ISLANDS = Islands;
  window.ISLAND_PROPS = JSON.parse(
    document.getElementById('island-props')!.textContent!
  );
}
