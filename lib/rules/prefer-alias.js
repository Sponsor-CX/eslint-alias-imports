/**
 * @fileoverview Use alias imports over relative imports.
 * @author blackboardd
 */
"use strict";

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------
const isRelativeImport = (node) => {
    const alias = node.source.value.match(/^\.{1,2}\//);
        return alias ? true : false;
    }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: "Use alias imports over relative imports.",
            category: "Fill me in",
            recommended: false,
            url: null,
        },
        fixable: 'code',
        schema: [],
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                if (isRelativeImport(node)) {
                    context.report({
                        node,
                        message: "Relative imports should not be used. Use an alias instead.",
                    });
                }
            }
        };
    },
};
