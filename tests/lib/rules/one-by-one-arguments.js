// @ts-check
"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/one-by-one-arguments");
const { parserOptions } = require("../../utils");

const ruleTester = new RuleTester({ parserOptions });

const errors = [
  {
    messageId: "splitArguments",
  },
];

ruleTester.run("one-by-one-arguments", rule, {
  valid: [
    `<button
      className={classNames(
        "bg-blue-300",
        "block",
        "relative",
        "text-white",
        "hover:text-grey-100"
      )}
    >
      Hello
    </button>;
`,
    `<button
      className={classNames(["bg-blue-300", "block"], "relative", foo && [
        "text-white",
        "hover:text-grey-100",
      ])}
    >
      Hello
    </button>;
`,
    `<button className={classNames("bg-blue-300", "block", style.someClass)}>
      Hello
    </button>;
`,
    `
<button
  className={classNames(
    {
      "bg-blue-300 block": true,
    },
    "relative",
    ["text-white", "hover:text-grey-100"]
  )}
>
  Hello
</button>;
`,
    '<i className={notClassNames("class-name-1 class-name-2 class-name-3")}/>',
    '<i className={this.classNames("class-name-1 class-name-2 class-name-3")}/>',
  ],

  invalid: [
    {
      code: `
<button
  className={classNames(
    "bg-blue-300 block",
    "relative",
    "text-white hover:text-grey-100"
  )}
>
  Hello
</button>;`,
      output: `
<button
  className={classNames(
    "bg-blue-300", "block",
    "relative",
    "text-white", "hover:text-grey-100"
  )}
>
  Hello
</button>;`,
      errors,
    },

    {
      code: `
<button
  className={classNames("bg-blue-300 block", foo && [
    "relative",
    "text-white hover:text-grey-100",
  ])}
>
  Hello
</button>;`,
      output: `
<button
  className={classNames("bg-blue-300", "block", foo && [
    "relative",
    "text-white", "hover:text-grey-100",
  ])}
>
  Hello
</button>;`,
      errors,
    },

    {
      code: `
<button className={classNames("bg-blue-300 block", style.someClass)}>
  Hello
</button>;`,
      output: `
<button className={classNames("bg-blue-300", "block", style.someClass)}>
  Hello
</button>;`,
      errors,
    },

    {
      code: `
<button
  className={clsx(
    "bg-blue-300 block",
    "relative",
    foo ? "text-white hover:text-grey-100" : "text-black"
  )}
>
  Hello
</button>;`,
      options: [
        {
          functionName: "clsx",
        },
      ],
      output: `
<button
  className={clsx(
    "bg-blue-300", "block",
    "relative",
    foo ? ["text-white", "hover:text-grey-100"] : "text-black"
  )}
>
  Hello
</button>;`,
      errors,
    },
  ],
});
