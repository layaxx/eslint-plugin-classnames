# eslint-plugin-classnames

## This is a fork from fsubal:
[Original Repository](https://github.com/fsubal/eslint-plugin-classnames)

They have written `classnames/prefer-classnames-function` and `classnames/one-by-one-arguments`, I added the rest.


Warn and formats long classNames usage in JSX, removes unnecessary whitespace from arguments and className strings

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-classnames`:

```
$ npm install eslint-plugin-classnames --save-dev
```

## Usage

Add `classnames` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["classnames"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "classnames/prefer-classnames-function": [2, {"functionName": "clsx"}],
    "classnames/no-unnecessary-whitespace": 2,
  }
}
```

## Supported Rules

✔: Enabled in the [`recommended`](#recommended) configuration.\
🔧: Fixable with [`eslint --fix`](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems).

|  ✔  | 🔧  | Rule                                                                              | Description                                                                     |
| :-: | :-: | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
|  ✔  | 🔧  | [classnames/prefer-classnames-function](docs/rules/prefer-classnames-function.md) | suggest using className() or clsx() in JSX className                            |
|  ✔  | 🔧  | [classnames/one-by-one-arguments](docs/rules/one-by-one-arguments.md)             | suggest not to include multiple classes in an argument of className() or clsx() |
|  ✔  | 🔧  | [classnames/no-unnecessary-whitespace](docs/rules/no-unnecessary-whitespace.md)  | suggest not to include whitespace in arguments to className() or clsx() or strings in className attribute |
|  ✔  | 🔧  | [classnames/order-classnames](docs/rules/no-unnecessary-whitespace.md)  | orders arguments to className() or clsx() in className attribute |


## TODO
- advise against using literal arrays as argument to classNames/clsx
