/**
 * @fileoverview Sorts imports based on alias.
 * @author blackboardd
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-alias");
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
  ruleTester.run("prefer-alias", rule, {
    valid: [
      {
        code: `
// Externals
import React from 'react';
import {
    Button as SemanticButton,
    Form,
    Icon,
    Popup,
    TextArea,
} from 'semantic-ui-react';
import 'styled-components/macro';
import * as tokens from '@sponsorcx/sponsorcx-style';

// Helpers
import { formatDollar } from '@/helpers/math';
        `,
      },
    ],

    invalid: [
      {
        code: `
// Externals
import React from 'react';
import {
    Button as SemanticButton,
    Form,
    Icon,
    Popup,
    TextArea,
} from 'semantic-ui-react';
import 'styled-components/macro';
import * as tokens from '@sponsorcx/sponsorcx-style';

// Helpers
import { formatDollar } from '../../math';
import { formatEuro } from './math';
        `,
        errors: [
          {
            message: "Relative imports should not be used. Use an alias instead.",
            line: 15,
            endLine: 15,
            column: 1,
            endColumn: 43,
          },
          {
            message: "Relative imports should not be used. Use an alias instead.",
            line: 16,
            endLine: 16,
            column: 1,
            endColumn: 37,
          },
        ]
      },
    ],
  });
}
