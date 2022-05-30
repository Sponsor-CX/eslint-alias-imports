/**
 * @fileoverview Sorts imports based on alias.
 * @author blackboardd
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require("../../../lib/rules/alias-imports");
const RuleTester = require("eslint").RuleTester;


// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const jsRuleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 2019,
  }
});
const tsRuleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 2019,
  },
});

for (const ruleTester of [jsRuleTester, tsRuleTester]) {
  ruleTester.run("alias-imports", rule, {
    valid: [
      {
        code: `
// Externals
import { FC, ReactElement } from 'react';
import { IconProps, SemanticShorthandItem } from 'semantic-ui-react';
import { CSSProp } from 'styled-components';

// GraphQL
import { ArtworkApproval } from '@/gql/betaArtworkApprovalGql';
import { POP } from '@/gql/betaPOPGql';
import { FulfillmentTask } from '@/gql/fulfillmentTaskGql';
        `,
      },
    ],

    invalid: [
      {
        code: `
// Modals
import { ArtworkApproverType } from '@/modals/PreviewArtworkModal';
import { FTA } from '@/gql/fulfillmentTaskAssignmentGql';

// Externals
import { FC, ReactElement } from 'react';
import { IconProps, SemanticShorthandItem } from 'semantic-ui-react';
import { CSSProp } from 'styled-components';
        `,
        errors: [
          {
            message: "Externals should be the first import.",
            line: 3,
            endLine: 3,
            column: 1,
            endColumn: 68,
          },
          {
            message: "@/gql should not be in the Modals group.",
            line: 4,
            endLine: 4,
            column: 1,
            endColumn: 58,
          },
        ],
      },
    ],
  });
}
