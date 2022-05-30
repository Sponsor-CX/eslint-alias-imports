# Use alias imports over relative imports. (prefer-alias)

This rule came about as a way to enforce alias imports.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

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

```

Examples of **correct** code for this rule:

```js

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

```

