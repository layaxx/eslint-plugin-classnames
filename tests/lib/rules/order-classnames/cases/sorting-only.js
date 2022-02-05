// @ts-check
"use strict";

const errors = [{ messageId: "unsorted" }];

module.exports = {
  /**
   *  @type  {{valid: (string | import("eslint").RuleTester.ValidTestCase)[], invalid: import("eslint").RuleTester.InvalidTestCase[]}}
   **/
  cases: {
    valid: [
      {
        code: `<button
        className={classNames(
          "bg-blue-300",
          "block",
          "relative",
          "text-white"
        )}
      >
        Hello
      </button>;
  `,
      },
      {
        code: `<i className={clsx("bg-blue-300", "block", style.someClass)} />;`,
      },
      {
        code: `<i className={clsx("bg-blue-300", "another-class")} />;`,
        options: [{ functionNames: ["customFunction"] }],
      },
      {
        code: `<button
      className={classNames("bg-blue-300", "xl:block", "relative")}
    >
      Hello
    </button>;
  `,
      },
    ],
    invalid: [
      {
        code: '<button className={classNames("flex","bg-blue-300")}>Hello</button>;',
        output:
          '<button className={classNames("bg-blue-300","flex")}>Hello</button>;',
        errors,
      },

      {
        code: '<button className={customFunction("flex","bg-blue-300")}>Hello</button>;',
        output:
          '<button className={customFunction("bg-blue-300","flex")}>Hello</button>;',
        options: [{ functionNames: ["customFunction"] }],
        errors,
      },

      {
        code: `<button className={classNames("block", "bg-blue-300", style.someClass)}>
      Hello
    </button>;`,
        output: `<button className={classNames("bg-blue-300", "block", style.someClass)}>
      Hello
    </button>;`,
        errors,
      },
    ],
  },
  title: "sorting-only",
};
