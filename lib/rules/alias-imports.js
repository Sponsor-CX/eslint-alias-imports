/**
 * @fileoverview Sorts imports based on alias.
 * @author blackboardd
 */
"use strict";

//------------------------------------------------------------------------------
// Variables
//------------------------------------------------------------------------------
const defaultAliasesPrimary = {
    "externals": "Externals",
    "internals": "Internals",
    "styles": "Internals",
    "urls": "Internals",
    "apollo": "Internals",
    "Context": "Internals",
    "assets": "Assets",
    "components": "Components",
    "gql": "GraphQL",
    "helpers": "Helpers",
    "hooks": "Hooks",
    "modals": "Modals",
    "pages": "Pages",
    "utils": "Utils",
    "interfaces": "Interfaces",
}
const defaultAliasesFeatures = [
    "organization",
    "icon",
    "agreement",
    "inventory",
    "account",
]

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------
const isRelativeImport = (node) => {
    const alias = node.source.value.match(/^\.{1,2}\//);
        return alias ? true : false;
    }

const reverseMap = (map) => {
    return Object.keys(map).reduce((_, key) => {
        _[map[key]] = key;
        return _;
    }, {})
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
                "primary": {
                    "type": "string"
                },
                "features": []
            }
        ]
    },

    create(context) {
        let externalError = false;
        let noGroupsError = false;
        let duplicateError = false;
        let relativeImportError = false;

        const comments = [];
        const nodes = [];
        const sourceCode = context.getSourceCode();

        const schema = {
            primary: defaultAliasesPrimary,
            features: defaultAliasesFeatures
        };

        const nameToPrimary = reverseMap(schema.primary);

        const getAliasFromImport = (importNode) => {
            let alias = importNode.source.value.match(/(?<=@\/)\w+(?=\/){0,1}/);

            if (alias && schema.features.includes(alias[0])) {
                alias = importNode.source.value.match(/(?<=@\/)\w+\/(\w+)/);
                return alias = alias ? alias[0] : "internals";
            }

            return alias ? alias[0] : "externals";
        }

        return {
            ImportDeclaration(node) {
                if (isRelativeImport(node)) {
                    relativeImportError = true;

                    context.report({
                        node,
                        message: "Relative imports should not be used. Use an alias instead.",
                    });
                }

                const alias = getAliasFromImport(node);

                if (!relativeImportError && (alias in schema.primary || alias in schema.features)) {
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
                        && nameToPrimary[comments[comments.length - 1]] !== alias
                    ) {
                        const message = `@/${alias} should be in the ${schema.primary[alias]} group.`;
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
