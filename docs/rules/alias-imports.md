# Sorts imports based on alias. (alias-imports)

This rule came about as a desire to better organize imports, specifically base on their aliases.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

// Modals
import { ArtworkApproverType } from '@/modals/PreviewArtworkModal';
import { FTA } from '@/gql/fulfillmentTaskAssignmentGql';

// Externals
import { FC, ReactElement } from 'react';
import { IconProps, SemanticShorthandItem } from 'semantic-ui-react';
import { CSSProp } from 'styled-components';

```

Examples of **correct** code for this rule:

```js

// Externals
import { FC, ReactElement } from 'react';
import { IconProps, SemanticShorthandItem } from 'semantic-ui-react';
import { CSSProp } from 'styled-components';

// GraphQL
import { ArtworkApproval } from '@/gql/betaArtworkApprovalGql';
import { POP } from '@/gql/betaPOPGql';
import { FulfillmentTask } from '@/gql/fulfillmentTaskGql';

```

### Options

To use this in your eslint config file, you will define a list of aliases and
friendly names for them, such as the defaults:

```json
  "alias-imports": [
      1,
      {
        "externals": "Externals",
        "gql": "GraphQL",
        "modals": "Modals",
        "helpers": "Helpers",
        "hooks": "Hooks",
        "interfaces": "Interfaces",
        "features": "Features",
        "pages": "Pages",
        "components": "Components",
        "utils": "Utils",
        "services": "Services"
      }
  ],
```

