import { visit } from 'unist-util-visit';

export const rehypePluginLineNumbers = () => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // after preWrapperPlugin, <div class="language-xxx"><pre><code></code></pre></div>
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const parentClassName = parent.properties?.className?.toString() || '';
        parent.properties = parent.properties || {};
        parent.properties.className = `${parentClassName} line-numbers-mode`;

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
                value: index + 1
              }
            ]
          }))
        };
        const children = parent.children;
        parent.children = [...children, lineNumbersCode];
      }
    });
  };
};
