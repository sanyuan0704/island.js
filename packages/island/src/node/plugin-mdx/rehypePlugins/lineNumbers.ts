import { visit } from 'unist-util-visit';
import { Root, Element } from 'hast';
import { Plugin } from 'unified';

export const rehypePluginLineNumbers: Plugin<[], Root> = () => {
  return (tree) => {
    visit(
      tree,
      'element',
      (node: Element, _index, parent: Root | Element | null) => {
        // after preWrapperPlugin, <div class="language-xxx"><pre><code></code></pre></div>
        if (
          node.tagName === 'pre' &&
          node.children?.[0]?.type === 'element' &&
          node.children[0].tagName === 'code' &&
          parent
        ) {
          if ('properties' in parent) {
            const parentClassName =
              parent?.properties?.className?.toString() || '';
            parent.properties = parent.properties || {};
            parent.properties.className = `${parentClassName} line-numbers-mode`;
          }

          const codeContent = node.children[0].children.filter(
            (item) => item.type === 'text'
          );
          const lineNumbersCode: Element = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: 'line-numbers-wrapper'
            },
            children: [...Array(codeContent.length)].map((line, index) => ({
              type: 'element',
              tagName: 'span',
              properties: {
                className: 'line-number'
              },
              children: [
                {
                  type: 'text',
                  value: String(index + 1)
                }
              ]
            }))
          };
          const children = parent.children;
          parent.children = [...children, lineNumbersCode];
        }
      }
    );
  };
};
