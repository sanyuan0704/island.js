import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Element } from 'hast';

// https://github.com/rehypejs/rehype
export const rehypePluginPreWrapper: Plugin<[], import('hast').Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // <pre><code>...</code></pre>
      if (
        node.tagName === 'pre' &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code' &&
        !node.data?.isVisited
      ) {
        const codeNode = node.children[0];
        const codeClassName = codeNode.properties?.className?.toString() || '';
        const lang = codeClassName.split('-')[1];
        if (!codeClassName || !lang) {
          return;
        }
        codeNode.properties!.className = '';
        const shallowClonedNode: Element = {
          type: 'element',
          tagName: 'pre',
          // Attach a flag to prevent infinite recursion
          data: {
            isVisited: true
          },
          children: node.children
        };

        node.tagName = 'div';
        node.properties = node.properties || {};
        node.properties.className = codeClassName;
        node.children = [
          {
            type: 'element',
            tagName: 'button',
            properties: {
              className: 'copy'
            },
            children: [
              {
                type: 'text',
                value: ''
              }
            ]
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          shallowClonedNode
        ];
      }
    });
  };
};
