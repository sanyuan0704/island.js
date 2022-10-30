import { IslandPlugin } from '../../../../dist/node';
import path from 'path';

export function customCompPlugin(): IslandPlugin {
  return {
    name: 'island-plugin:custom-comp',
    globalUIComponents: [path.join(__dirname, 'Back.tsx')]
  };
}
