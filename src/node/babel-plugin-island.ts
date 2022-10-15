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
import { normalizePath } from 'vite';

const ID = '__island';

export default declare((api) => {
  api.assertVersion(7);

  const visitor: Visitor<PluginPass> = {
    JSXOpeningElement(path, state) {
      const name = path.node.name;
      let bindingName: string;
      if (t.isJSXIdentifier(name)) {
        bindingName = name.name;
      } else if (t.isJSXMemberExpression(name)) {
        let object = name.object;
        while (t.isJSXMemberExpression(object)) {
          object = object.object;
        }
        bindingName = object.name;
      } else if (t.isJSXNamespacedName(name)) {
        bindingName = name.namespace.name;
      } else {
        return;
      }

      const binding = path.scope.getBinding(bindingName);
      if (binding?.path.parent.type === 'ImportDeclaration') {
        const source = (binding?.path.parent as t.ImportDeclaration).source;
        const attributes = (path.container as t.JSXElement).openingElement
          .attributes;
        for (let i = 0; i < attributes.length; i++) {
          const name = (attributes[i] as t.JSXAttribute).name;
          if (name?.name === ID) {
            (attributes[i] as t.JSXAttribute).value = t.stringLiteral(
              `${source.value}${MASK_SPLITTER}${normalizePath(
                state.filename || ''
              )}`
            );
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
