// @ts-check
"use strict";

const { documentUrl } = require("../utils");

const functions = new Set(["clsx", "classNames"]);

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

            if (node.value.expression.type === "CallExpression") {
              if (
                node.value.expression.callee.type == "Identifier" &&
                functions.has(node.value.expression.callee.name)
              ) {
                // @ts-ignore
                const txt = context.getSourceCode().getText(node);

                /* handle empty arguments */
                if (/"",/g.test(txt) || /'',/g.test(txt)) {
                  context.report({
                    // @ts-ignore
                    node,
                    messageId: "hasWhitespace",
                    fix(fixer) {
                      return fixer.replaceTextRange(
                        node.range,
                        txt.replace(/"",/g, "").replace(/'',/g, "")
                      );
                    },
                  });
                }
                if (/,""\s*\)/g.test(txt) || /,''\s*\)/g.test(txt)) {
                  context.report({
                    // @ts-ignore
                    node,
                    messageId: "hasWhitespace",
                    fix(fixer) {
                      return fixer.replaceTextRange(
                        node.range,
                        txt.replace(/,""\s*\)/g, ")").replace(/,''\s*\)/g, ")")
                      );
                    },
                  });
                } else {
                  if (/""\s*\)/g.test(txt) || /''\s*\)/g.test(txt)) {
                    context.report({
                      // @ts-ignore
                      node,
                      messageId: "hasWhitespace",
                      fix(fixer) {
                        return fixer.replaceTextRange(
                          node.range,
                          txt.replace(/""\s*\)/g, ")").replace(/''\s*\)/g, ")")
                        );
                      },
                    });
                  }
                }

                /* handle blank lines */
                if (/^\s*[\r\n]/gm.test(txt)) {
                  context.report({
                    // @ts-ignore
                    node,
                    messageId: "hasWhitespace",
                    fix(fixer) {
                      return fixer.replaceTextRange(
                        node.range,
                        txt.replace(/^\s*[\r\n]/gm, "")
                      );
                    },
                  });
                }

                /*  */
                node.value.expression.arguments.forEach(handleElem);
              }
            }
          }
        }
      },
    };

    /**
     * @param {import('estree-jsx').Node} arg
     */
    function handleElem(arg) {
      if (arg.type == "Literal" && typeof arg.value === "string") {
        return checkIfViolated2(arg);
      }
      if (arg.type == "ArrayExpression") {
        arg.elements.forEach(handleElem);
      }
      if (
        arg.type == "LogicalExpression" &&
        arg.right.type == "Literal" &&
        typeof arg.right.value === "string"
      ) {
        /* handle Logical Expression */
        return checkIfViolated2(arg.right);
      }
      if (
        arg.type == "ConditionalExpression" &&
        arg.consequent.type == "Literal" &&
        typeof arg.consequent.value === "string"
      ) {
        /* handle Logical Expression */
        checkIfViolated2(arg.consequent);
      }
      if (
        arg.type == "ConditionalExpression" &&
        arg.alternate.type == "Literal" &&
        typeof arg.alternate.value === "string"
      ) {
        /* handle Logical Expression part 2 */
        checkIfViolated2(arg.alternate);
      }
    }

    /**
     * @param {import('estree-jsx').Literal} node
     */
    function checkIfViolated2(node) {
      const regexMultipleWhitespace = /\s\s+/g;
      const regexStartHasWhitespace = /^\s/g;
      const regexEndHasWhitespace = /\s$/g;

      const str = "" + node.value;

      if (
        !regexMultipleWhitespace.test(str) &&
        !regexStartHasWhitespace.test(str) &&
        !regexEndHasWhitespace.test(str)
      ) {
        return;
      }

      context.report({
        node,
        messageId: "hasWhitespace",
        fix(fixer) {
          return fixer.replaceTextRange(
            node.range,
            `"${str
              .replace(regexMultipleWhitespace, " ")
              .replace(regexStartHasWhitespace, "")
              .replace(regexEndHasWhitespace, "")}"`
          );
        },
      });
    }

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
