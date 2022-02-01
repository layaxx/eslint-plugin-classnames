// @ts-check
"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-unnecessary-whitespace");
const { parserOptions } = require("../../utils");

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run("no-unnecessary-whitespace", rule, {
  valid: [
    {
      code: '<button className="bg-blue-300">Hello</button>;',
    },
    {
      code: '<button className={"bg-blue-300 block"}>Hello</button>;',
    },
    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
    },
    {
      code: '<button className="bg-blue-300 another-class block">Hello</button>;',
    },
    {
      code: '<button className={"block"}>Hello</button>;',
    },
    {
      code: "<button className={`bg-blue-300 block`}>Hello</button>;",
    },
    {
      code: "<button className={`bg-red-400`}>Hello</button>;",
    },
    {
      code: "<button className={` bg-red-400`}>Hello</button>;",
    },
    {
      code: "<button className={`bg-red-400 `}>Hello</button>;",
    },
    {
      code: "<button className={`bg-red-400   flex`}>Hello</button>;",
    },
    {
      code: '<button className={clsx("class-name")}>Hello</button>;',
    },
    {
      code: '<button className={clsx("class-name second-class")}>Hello</button>;',
    },
    {
      code: '<button className={clsx("class-name", "second-class")}>Hello</button>;',
    },
    {
      code: "<button className={clsx(` ignore  template tags `)}>Hello</button>;",
    },
    {
      code: '<button className={classNames("class-name")}>Hello</button>;',
    },
    {
      code: '<button className={classNames("class-name second-class")}>Hello</button>;',
    },
    {
      code: '<button className={classNames("class-name", "second-class")}>Hello</button>;',
    },
    {
      code: "<button className={classNames(` ignore  template tags `)}>Hello</button>;",
    },
  ],
  invalid: [
    {
      code: '<button className=" bg-blue-300 block">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className="bg-blue-300 block ">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className="bg-blue-300  block">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },

    {
      code: '<button className={"bg-blue-300 block "}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={" bg-blue-300 block"}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={"bg-blue-300  block"}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },

    {
      code: '<button className={" bg-blue-300     block  "}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx(" class-name")}>Hello</button>;',
      output: '<button className={clsx("class-name")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx("class-name ")}>Hello</button>;',
      output: '<button className={clsx("class-name")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx("class-name  second-class")}>Hello</button>;',
      output:
        '<button className={clsx("class-name second-class")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx("first-class","class-name ")}>Hello</button>;',
      output:
        '<button className={clsx("first-class","class-name")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx("first-class","")}>Hello</button>;',
      output: '<button className={clsx("first-class")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
  ],
});
