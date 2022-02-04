// @ts-check
"use strict";

const { documentUrl } = require("../utils");

/**
 * @type {import('eslint').Rule.RuleMetaData}
 */
const meta = {
  type: "suggestion",

  docs: {
    description: "suggest sorting of arguments to classNames/clsx",
    category: "Stylistic Issues",
    recommended: true,
    url: documentUrl("order-classnames"),
  },

  fixable: "code",

  messages: {
    unsorted: "Arguments to are not sorted properly.",
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
  create(context) {
    const [params = {}] = context.options;
    const { functionNames } = params;

    const functions = functionNames
      ? new Set(functionNames)
      : require("../config").functions;

    return {
      CallExpression(node) {
        if (
          node.callee.type !== "Identifier" ||
          !functions.has(node.callee.name)
        ) {
          return;
        }

        const classNames = node.arguments.map((arg, idx) => {
          if (
            arg.type === "LogicalExpression" &&
            arg.right.type === "Literal" &&
            typeof arg.right.value === "string"
          ) {
            return {
              originalValue: context.getSourceCode().getText(arg),
              sortKey: arg.right.value,
              idx,
            };
          }
          if (arg.type == "Literal" && typeof arg.value === "string") {
            return {
              originalValue: context.getSourceCode().getText(arg),
              sortKey: arg.value,
              idx,
            };
          }
          return false;
        });

        const filteredClassNameObjects = classNames
          .filter(Boolean)
          .map((obj) => ({
            ...obj,
            // @ts-ignore
            sortKey: ("" + obj.sortKey).split(":").pop(),
          }));

        const sorted = Array.from(filteredClassNameObjects).sort((o1, o2) =>
          o1.sortKey.localeCompare(o2.sortKey)
        );

        const isViolated = sorted.some(
          (elem, idx) => elem.idx !== filteredClassNameObjects[idx].idx
        );

        let idx = 0;
        const replacer = classNames.map((val) =>
          !val ? false : sorted[idx++].originalValue
        );

        if (isViolated) {
          // @ts-ignore
          handleViolated(node, replacer);
        }
      },
    };

    /**
     * @param {import('estree').CallExpression} node
     * @param {(false|string)[]} replacer
     */
    function handleViolated(node, replacer) {
      context.report({
        node,
        messageId: "unsorted",

        /**
         * @returns {import("eslint").Rule.Fix[]}
         */
        fix(fixer) {
          /**
           * @param {import("estree").Node | import("eslint").AST.Token} node
           * @param {number} idx
           * @returns {import("eslint").Rule.Fix | import("eslint").Rule.Fix[]}
           */
          function exchange(node, idx) {
            if (replacer[idx]) {
              // @ts-ignore
              return fixer.replaceText(node, replacer[idx]);
            }
          }

          return node.arguments
            .flatMap((a, idx) => exchange(a, idx))
            .filter(Boolean);
        },
      });
    }
  },
};

module.exports = rule;
