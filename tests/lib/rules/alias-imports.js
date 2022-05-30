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

// Inventory
import { AgreementInventoryItem } from '@/inventory/interfaces';

// GraphQL
import { Package, PackageInvRel } from '@/gql/packageGql';

// Modals
import { calculatePackageInvRelRateFromPackageRate } from '@/modals/PackageCreate';

// Components
import { UnitEditInPlace } from '@/components/packageRow/styles';
import { ConfirmActionPopup } from '@/components/ConfirmActionPopup';
import { EditInPlaceField } from '@/components/EditInPlaceField';
import { RowItemProps, Table } from '@/components/Table';
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
            message: "@/gql should be in a GraphQL group.",
            line: 4,
            endLine: 4,
            column: 1,
            endColumn: 58,
          },
        ],
      },
      {
        code: `
import { ArtworkApproverType } from '@/modals/PreviewArtworkModal';
import { FTA } from '@/gql/fulfillmentTaskAssignmentGql';
import { FC, ReactElement } from 'react';
import { IconProps, SemanticShorthandItem } from 'semantic-ui-react';
import { CSSProp } from 'styled-components';
        `,
        errors: [
          {
            message: "Imports should be grouped.",
            line: 2,
            endLine: 2,
            column: 1,
            endColumn: 68,
          },
        ],
      },
    ],
  });
}
