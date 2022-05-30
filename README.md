# eslint-plugin-sponsorcx

The full suite of SponsorCX ESLint rules.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-sponsorcx`:

```sh
npm install eslint-plugin-sponsorcx --save-dev
```

## Usage

Add `sponsorcx` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sponsorcx"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "sponsorcx/alias-imports": 2
    }
}
```

## Supported Rules
- [Alias Imports](docs/rules/alias-imports.md)

