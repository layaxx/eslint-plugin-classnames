// @ts-check
"use strict";

const { documentUrl } = require("../utils");

/**
 * @type {import('eslint').Rule.RuleMetaData}
 */
const meta = {
  type: "layout",

  docs: {
    description:
      "suggest omitting unnecessary whitespace (at start or end of string, double whitespace)",
    category: "Stylistic Issues",
    recommended: true,
    url: documentUrl("no-unnecessary-whitespace"),
  },

  fixable: "whitespace",

  messages: {
    hasWhitespace: "Some className value has unnecessary whitespace",
  },
};

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta,
  // @ts-expect-error
  create(context) {
    return {
      /**
       * @param {import('estree-jsx').JSXAttribute} node
       */
      JSXAttribute(node) {
        if (node.name.name !== "className") {
          return;
        }

        switch (node.value.type) {
          // className="bg-blue-300 block"
          case "Literal": {
            if (typeof node.value.value !== "string") {
              return;
            }

            return checkIfViolated(node, node.value.value);
          }

          // className={"bg-blue-300 block"}
          case "JSXExpressionContainer": {
            if (node.value.expression.type === "Literal") {
              if (typeof node.value.expression.value !== "string") {
                return;
              }
              return checkIfViolated(node, node.value.expression.value);
            }
          }
        }
      },
    };

    /**
     * @param {import('estree-jsx').JSXAttribute} node
     * @param {string} classString
     */
    function checkIfViolated(node, classString) {
      const regexMultipleWhitespace = /\s\s+/g;
      const regexStartHasWhitespace = /^\s/g;
      const regexEndHasWhitespace = /\s$/g;

      if (
        !regexMultipleWhitespace.test(classString) &&
        !regexStartHasWhitespace.test(classString) &&
        !regexEndHasWhitespace.test(classString)
      ) {
        return;
      }

      context.report({
        // @ts-expect-error
        node,
        messageId: "hasWhitespace",
        fix(fixer) {
          return fixer.replaceText(
            // @ts-expect-error
            node.value,
            `"${classString
              .replace(regexMultipleWhitespace, " ")
              .replace(regexStartHasWhitespace, "")
              .replace(regexEndHasWhitespace, "")}"`
          );
        },
      });
    }
  },
};

module.exports = rule;
