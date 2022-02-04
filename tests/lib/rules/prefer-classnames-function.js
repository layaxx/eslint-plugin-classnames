// @ts-check
"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/prefer-classnames-function");
const { parserOptions } = require("../../utils");

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run("prefer-classnames-function", rule, {
  valid: [
    {
      code: '<button className="bg-blue-300">Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 1,
        },
      ],
    },
    {
      code: '<button className={classNames("bg-blue-300", "block")}>Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 1,
        },
      ],
    },
    {
      code: `
<button
  className={classNames("bg-blue-300", "block", isRelative && "relative")}
>
  Hello
</button>;
      `,
      options: [
        {
          maxSpaceSeparatedClasses: 1,
        },
      ],
    },
    {
      code: '<button className={clsx("bg-blue-300", "block")}>Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 1,
        },
      ],
    },
    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 2,
        },
      ],
    },
    '<i notClassName="some-class another-class a-third-class" />',
  ],
  invalid: [
    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 1,
          functionName: "className",
        },
      ],
      output:
        '<button className={className("bg-blue-300", "block")}>Hello</button>;',
      errors: [
        {
          message:
            "The className has more than 1 classes. Use className() instead.",
        },
      ],
    },

    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 1,
          functionName: "clsx",
        },
      ],
      output:
        '<button className={clsx("bg-blue-300", "block")}>Hello</button>;',
      errors: [
        {
          message: "The className has more than 1 classes. Use clsx() instead.",
        },
      ],
    },

    {
      code: '<button className="bg-blue-300 block relative">Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 2,
        },
      ],
      output:
        '<button className={classNames("bg-blue-300", "block", "relative")}>Hello</button>;',
      errors: [
        {
          message:
            "The className has more than 2 classes. Use classNames() instead.",
        },
      ],
    },

    // avoid className
    {
      code: '<button className={classNames("bg-blue-300")}>Hello</button>;',
      output: '<button className="bg-blue-300">Hello</button>;',
      errors: [
        {
          message:
            "Do not use classNames() when you have no greater than 1 classes.",
        },
      ],
    },

    {
      code: '<button className={clsx("bg-blue-300", "text-white")}>Hello</button>;',
      options: [
        {
          maxSpaceSeparatedClasses: 2,
        },
      ],
      output: '<button className="bg-blue-300 text-white">Hello</button>;',
      errors: [
        {
          message:
            "Do not use classNames() when you have no greater than 2 classes.",
        },
      ],
    },

    // using template literal
    {
      code: "<button className={`bg-blue-300 block`}>Hello</button>;",
      output:
        '<button className={classNames("bg-blue-300", "block")}>Hello</button>;',
      errors: [
        {
          message:
            "The className has more than 1 classes. Use classNames() instead.",
        },
      ],
    },
  ],
});
