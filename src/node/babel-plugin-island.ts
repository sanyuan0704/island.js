/**
 * This adds component source path to JSX tags.
 *
 * == JSX Literals ==
 *
 * <sometag __island />
 *
 * becomes:
 *
 * <sometag __island="../comp/id.ts!!ISLAND!!/User/import.ts" />
 */
import { declare } from '@babel/helper-plugin-utils';
import { type PluginPass, types as t } from '@babel/core';
import type { Visitor } from '@babel/traverse';
import {} from 'vite';
import { MASK_SPLITTER } from './constants';

const TRACE_ID = '__island';

export default declare((api) => {
  api.assertVersion(7);

  const visitor: Visitor<PluginPass> = {
    JSXOpeningElement(path, state) {
      const name = path.node.name;
      if (name.type === 'JSXIdentifier') {
        const binding = path.scope.getBinding(name.name);
        if (binding?.path.parent.type === 'ImportDeclaration') {
          const source = (binding?.path.parent as t.ImportDeclaration).source;
          const attributes = (path.container as t.JSXElement).openingElement
            .attributes;
          for (let i = 0; i < attributes.length; i++) {
            const name = (attributes[i] as t.JSXAttribute).name;
            if (name?.name === TRACE_ID) {
              (attributes[i] as t.JSXAttribute).value = t.stringLiteral(
                `${source.value}${MASK_SPLITTER}${state.filename}`
              );
            }
          }
        }
      }
    }
  };

  return {
    name: 'transform-react-jsx-island',
    visitor
  };
});
