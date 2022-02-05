// @ts-check
"use strict";

module.exports = {
  rules: {
    "prefer-classnames-function": require("./rules/prefer-classnames-function"),
    "one-by-one-arguments": require("./rules/one-by-one-arguments"),
    "no-unnecessary-whitespace": require("./rules/no-unnecessary-whitespace"),
    "order-classnames": require("./rules/order-classnames"),
  },
  configs: {
    recommended: {
      plugins: ["classnames"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "prefer-classnames-function": "warn",
        "one-by-one-arguments": "warn",
        "no-unnecessary-whitespace": "error",
        "order-classnames": "warn",
      },
    },
  },
};
