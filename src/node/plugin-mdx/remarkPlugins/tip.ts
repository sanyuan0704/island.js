import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkPluginTip: Plugin = () => {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        const data = node.data || (node.data = {});
        data.hName = 'div';
        data.hProperties = {
          class: 'island-tip'
        };
        const children = node.children;

        node.children = [
          {
            type: 'element',
            data: {
              hProperties: {
                class: 'island-tip-title'
              }
            },
            children: [
              {
                type: 'element',
                data: {
                  hName: 'span',
                  hProperties: { class: 'island-tip-icon' }
                }
              },
              { type: 'text', value: node.name.toLocaleUpperCase() }
            ]
          },
          {
            type: 'element',
            data: {
              hProperties: { class: 'island-tip-content' }
            },
            children
          }
        ];
      }
    });
  };
};
