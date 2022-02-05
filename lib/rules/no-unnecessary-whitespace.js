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

  schema: [
    {
      type: "object",
      functionName: false,
      properties: {
        functionNames: {
          type: "array",
        },
      },
    },
  ],
};

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta,
  // @ts-expect-error
  create(context) {
    const [params = {}] = context.options;
    const { functionNames } = params;

    const functions = functionNames
      ? new Set(functionNames)
      : require("../config").functions;

    return {
      /**
       * @param {import('estree-jsx').JSXAttribute} node
       */
      JSXAttribute(node) {
        if (node.name.name !== "className") {
          return;
        }

        if (node.value.type === "Literal") {
          return (
            typeof node.value.value === "string" &&
            // @ts-ignore
            checkAndFixAttribute(node, node.value.value)
          );
        }

        // className={"bg-blue-300 block"}
        if (node.value.type === "JSXExpressionContainer") {
          handleExpressionContainer(node);
        }
      },
    };

    /**
     * @param {import('estree-jsx').JSXAttribute} node
     */
    function handleExpressionContainer(node) {
      if (node.value.type !== "JSXExpressionContainer") {
        return;
      }

      if (node.value.expression.type === "Literal") {
        return (
          typeof node.value.expression.value === "string" &&
          // @ts-ignore
          checkAndFixAttribute(node, node.value.expression.value)
        );
      }

      if (node.value.expression.type === "CallExpression") {
        if (
          node.value.expression.callee.type == "Identifier" &&
          functions.has(node.value.expression.callee.name)
        ) {
          /* @ts-ignore  -  handle empty arguments & blank lines  */
          handleEmptyArguments(node);

          node.value.expression.arguments.forEach(handleArgument);
        }
      }
    }

    /**
     * @param {import('estree').Node} node
     */
    function handleEmptyArguments(node) {
      const txt = context.getSourceCode().getText(node);

      const replacer = [
        { regex: /"",/g, str: "" },
        { regex: /'',/g, str: "" },
        { regex: /,\s*""\s*\)/g, str: ")" },
        { regex: /,\s*''\s*\)/g, str: ")" },
        { regex: /\(\s*""\s*\)/g, regexReplace: /\s*""\s*\)/g, str: ")" },
        { regex: /\(\s*''\s*\)/g, regexReplace: /\s*''\s*\)/g, str: ")" },
        { regex: /^\s*[\r\n]/gm, str: "" }, // blank lines
      ];

      replacer.forEach(
        ({ regex, str, regexReplace }) =>
          regex.test(txt) &&
          context.report({
            node,
            messageId: "hasWhitespace",
            fix(fixer) {
              return fixer.replaceTextRange(
                node.range,
                txt.replace(regexReplace || regex, str)
              );
            },
          })
      );
    }

    /**
     * @param {import('estree-jsx').Node} arg
     */
    function handleArgument(arg) {
      if (arg.type == "Literal" && typeof arg.value === "string") {
        return checkAndFixLiteral(arg);
      }
      if (arg.type == "ArrayExpression") {
        arg.elements.forEach(handleArgument);
      }
      if (arg.type == "ConditionalExpression") {
        handleConditionalArgument(arg);
      }
      if (
        arg.type == "LogicalExpression" &&
        arg.right.type == "Literal" &&
        typeof arg.right.value === "string"
      ) {
        /* handle Logical Expression */
        return checkAndFixLiteral(arg.right);
      }
    }

    /**
     * @param {import('estree-jsx').ConditionalExpression} arg
     */
    function handleConditionalArgument(arg) {
      if (
        arg.consequent.type == "Literal" &&
        typeof arg.consequent.value === "string"
      ) {
        /* handle Logical Expression */
        checkAndFixLiteral(arg.consequent);
      }
      if (
        arg.alternate.type == "Literal" &&
        typeof arg.alternate.value === "string"
      ) {
        /* handle Logical Expression part 2 */
        checkAndFixLiteral(arg.alternate);
      }
    }

    /**
     * @param {import('estree-jsx').Literal} node
     */
    function checkAndFixLiteral(node) {
      const replacer = [
        { regex: /\s\s+/g, replace: " " },
        { regex: /^\s/ },
        { regex: /\s$/ },
      ];

      const str = "" + node.value;

      if (replacer.every(({ regex }) => !regex.test(str))) {
        return;
      }

      context.report({
        node,
        messageId: "hasWhitespace",
        fix(fixer) {
          return fixer.replaceTextRange(
            node.range,
            JSON.stringify(
              replacer.reduce(
                (str, { regex, replace }) => str.replace(regex, replace || ""),
                str
              )
            )
          );
        },
      });
    }

    /**
     * @param {import('estree').Node} node
     * @param {string} classString
     */
    function checkAndFixAttribute(node, classString) {
      const replacer = [
        { regex: /\s\s+/g, replace: " " },
        { regex: /^\s/ },
        { regex: /\s$/ },
      ];

      if (replacer.every(({ regex }) => !regex.test(classString))) {
        return;
      }

      context.report({
        node,
        messageId: "hasWhitespace",
        fix(fixer) {
          return fixer.replaceText(
            // @ts-ignore
            node.value,
            JSON.stringify(
              replacer.reduce(
                (str, { regex, replace }) => str.replace(regex, replace || ""),
                classString
              )
            )
          );
        },
      });
    }
  },
};

module.exports = rule;
