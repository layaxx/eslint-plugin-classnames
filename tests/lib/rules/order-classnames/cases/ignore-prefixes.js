// @ts-check
"use strict";

module.exports = {
  /**
   *  @type  {{valid: (string | import("eslint").RuleTester.ValidTestCase)[], invalid: import("eslint").RuleTester.InvalidTestCase[]}}
   **/
  cases: {
    valid: [
      `<button
      className={classNames(
        "bg-blue-300",
        "xs:block", 
        "a-modifier:relative", 
        )}
    >
      Hello
    </button>;
`,

      `<button
        className={classNames(
          xVarIgnored && "bg-blue-300",
          "xs:block", 
          "a-modifier:relative", 
          )}
      >
        Hello
      </button>;

  `,
      `<button
        className={classNames(
          "multiple:prefixes:all:ignored:bg-blue-300",
          "xs:block", 
          "relative", 
          )}
      >
        Hello
      </button>;
  `,
      `<button
        className={clsx(
          "multiple:prefixes:all:ignored:bg-blue-300",
          "xs:bg-blue-300", 
          "relative", 
          )}
      >
        Hello
      </button>;
  `,
    ],
    invalid: [
      {
        code: `<button
      className={clsx(
        "md:wrong-order",
        "xs:bg-blue-300",
        "relative",
        )}
    >
      Hello
    </button>;`,
        output: `<button
      className={clsx(
        "xs:bg-blue-300",
        "relative",
        "md:wrong-order",
        )}
    >
      Hello
    </button>;`,
        errors: [{ messageId: "unsorted" }],
      },

      {
        code: `<button
        className={clsx(
          bool && "wrong-order",
          "xs:bg-blue-300",
          "relative",
          )}
      >
        Hello
      </button>;`,
        output: `<button
        className={clsx(
          "xs:bg-blue-300",
          "relative",
          bool && "wrong-order",
          )}
      >
        Hello
      </button>;`,
        errors: [{ messageId: "unsorted" }],
      },
    ],
  },
  title: "ignore-prefixes",
};
