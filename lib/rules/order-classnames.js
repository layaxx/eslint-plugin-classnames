// @ts-check
"use strict";

const { documentUrl } = require("../utils");

const { functions } = require("../config");

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
};

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta,
  create(context) {
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
            return { cname: arg.right.value, idx };
          }
          if (arg.type == "Literal" && typeof arg.value === "string") {
            return { cname: arg.value, idx };
          }
          return false;
        });

        const filteredClassNameObjects = classNames
          .filter(Boolean)
          .map((obj) => ({
            // @ts-ignore
            sortKey: ("" + obj.cname).split(":").pop(),
            ...obj,
          }));

        const sorted = Array.from(filteredClassNameObjects).sort((o1, o2) =>
          o1.sortKey.localeCompare(o2.sortKey)
        );

        const isViolated = sorted.some(
          (elem, idx) => elem.idx !== filteredClassNameObjects[idx].idx
        );

        let idx = 0;
        const replacer = classNames.map((val) =>
          !val ? false : sorted[idx++].cname
        );

        if (isViolated) {
          // @ts-ignore
          handleViolated(node, replacer);
        }
      },
    };

    /**
     * @param {import('estree').CallExpression} node
     * @param {(boolean|string)[]} replacer
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
              return fixer.replaceText(node, JSON.stringify(replacer[idx]));
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
