/**
 * @fileoverview Sorts imports based on alias.
 * @author blackboardd
 */
"use strict";

//------------------------------------------------------------------------------
// Variables
//------------------------------------------------------------------------------
const defaultAliases = {
  "externals": "Externals",
  "gql": "GraphQL",
  "modals": "Modals",
  "helpers": "Helpers",
  "hooks": "Hooks",
  "interfaces": "Interfaces", "features": "Features",
  "pages": "Pages",
  "components": "Components",
  "utils": "Utils",
  "services": "Services",
  "inventory": "Inventory",
  "context": "Root",
}

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------
const formatAlias = (alias) => {
  return alias.replace(/[~@/]+/, '');
}

const getAliasFromImport = (importNode) => {
  const alias = importNode.source.value.match(/(?<=@\/)\w+(?=\/){0,1}/);
  return alias ? alias[0] : "externals";
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
      description: "Sorts imports based on alias.",
      category: "Fill me in",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        "type": "object",
        "additionalProperties": true
      },
      {
        "type": "string"
      }
    ]
  },

  create(context) {
    let externalError = false;
    let noGroupsError = false;
    let duplicateError = false;

    const comments = [];
    const nodes = [];
    const sourceCode = context.getSourceCode();


    const aliasToNameSchema = context.options[0] || defaultAliases;

    const aliasToName = Object.keys(aliasToNameSchema).reduce((_, key) => {
      _[formatAlias(key)] = aliasToNameSchema[key];
      return _;
    }, {});

    const nameToAlias = Object.keys(aliasToName).reduce((_, key) => {
      _[aliasToName[key]] = key;
      return _;
    }, {});

    return {
      ImportDeclaration(node) {
        const alias = getAliasFromImport(node);

        if (alias in aliasToName) {
          const comment = sourceCode.getCommentsBefore(node).reduce((_, comment) => {
            _.push(comment.value.trim());
            return _;
          }, []);

          if (comment[0]) {
            comments.push(comment[0]);

            nodes.push({
              node,
              comment
            });

            // check for duplicates in entire comments array
            if (
              !duplicateError
                && comments.filter(
                  (value, index, self) => self.indexOf(value) !== index
                ).length
            ) {
              duplicateError = true;

              context.report({
                node,
                message: `Duplicate group found. Please remove.`,
              });
            }

            if (
              !externalError
              && comments.indexOf("Externals") > -1
              && comments[0] !== "Externals"
            ) {
              context.report({
                node,
                message: `Externals should be the first import.`,
              });

              externalError = true;
            }
          }

          if (!noGroupsError && !comments.length) {
            noGroupsError = true;

            context.report({
              node,
              message: "Imports should be grouped.",
            });
          }

          if (
            !noGroupsError
              && nameToAlias[comments[comments.length - 1]] !== alias
          ) {
            const message = `@/${alias} should be in a ${aliasToName[alias]} group.`;
            context.report({
              node,
              message,
            });
          }
        }
      }
    };
  },
};
