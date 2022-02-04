// @ts-check
"use strict";

const errors = [
  {
    message: "Some className value has unnecessary whitespace",
  },
];

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-unnecessary-whitespace");
const { parserOptions } = require("../../utils");

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run("no-unnecessary-whitespace", rule, {
  valid: [
    '<button className="bg-blue-300">Hello</button>;',
    '<button className={"bg-blue-300 block"}>Hello</button>;',
    '<button className="bg-blue-300 block">Hello</button>;',
    '<button className="bg-blue-300 another-class block">Hello</button>;',
    '<button className={"block"}>Hello</button>;',
    "<button className={`bg-blue-300 block`}>Hello</button>;",
    "<button className={`bg-red-400`}>Hello</button>;",
    "<button className={` bg-red-400`}>Hello</button>;",
    "<button className={`bg-red-400 `}>Hello</button>;",
    "<button className={`bg-red-400   flex`}>Hello</button>;",
    '<button className={clsx("class-name")}>Hello</button>;',
    '<button className={clsx("class-name second-class")}>Hello</button>;',
    '<button className={clsx("class-name", "second-class")}>Hello</button>;',
    "<button className={clsx(` ignore  template tags `)}>Hello</button>;",
    '<button className={classNames("class-name")}>Hello</button>;',
    '<button className={classNames("class-name second-class")}>Hello</button>;',
    '<button className={classNames("class-name", "second-class")}>Hello</button>;',
    "<button className={classNames(` ignore  template tags `)}>Hello</button>;",
    '<button className={classNames(true && "valid-class")}>Hello</button>;',
    '<button className={classNames(true ? "valid-class":"another-valid-class")}>Hello</button>;',
    '<button className={classNames(["valid-class", "another-valid-class"])}>Hello</button>;',
    `<div
    className={clsx(
      "xl:rounded-r",
      "xl:translate-x-0",
      "ease-in-out",
      "transition",
      "duration-500",
      "flex",
      "flex-1",
      "justify-start",
      "items-start",
      "w-full",
      "sm:w-64",
      "bg-gray-900",
      "flex-col",
      "h-full"
    )}
  />`,
  ],
  invalid: [
    {
      code: '<button className=" bg-blue-300 block">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },
    {
      code: '<button className="bg-blue-300 block ">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },
    {
      code: '<button className="bg-blue-300  block">Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },

    {
      code: '<button className={"bg-blue-300 block "}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },
    {
      code: '<button className={" bg-blue-300 block"}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },
    {
      code: '<button className={"bg-blue-300  block"}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },

    {
      code: '<button className={" bg-blue-300     block  "}>Hello</button>;',
      output: '<button className="bg-blue-300 block">Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx(" class-name")}>Hello</button>;',
      output: '<button className={clsx("class-name")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx("class-name ")}>Hello</button>;',
      output: '<button className={clsx("class-name")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx("class-name  second-class")}>Hello</button>;',
      output:
        '<button className={clsx("class-name second-class")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx("first-class","class-name ")}>Hello</button>;',
      output:
        '<button className={clsx("first-class","class-name")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx(true && "first-class ")}>Hello</button>;',
      output: '<button className={clsx(true && "first-class")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx("first-class","")}>Hello</button>;',
      output: '<button className={clsx("first-class")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx("","first-class")}>Hello</button>;',
      output: '<button className={clsx("first-class")}>Hello</button>;',
      errors,
    },
    {
      code: `<div
className={clsx(
  "xl:rounded-r",
  "xl:translate-x-0",
  "ease-in-out",
  "transition",
  "duration-500",
  "flex",
  	
  "flex-1",
  "justify-start",
  "items-start",
  "w-full",

  "sm:w-64",
  "bg-gray-900",
  "flex-col",
  "h-full"
)}
/>`,
      output: `<div
className={clsx(
  "xl:rounded-r",
  "xl:translate-x-0",
  "ease-in-out",
  "transition",
  "duration-500",
  "flex",
  "flex-1",
  "justify-start",
  "items-start",
  "w-full",
  "sm:w-64",
  "bg-gray-900",
  "flex-col",
  "h-full"
)}
/>`,
      errors,
    },
    {
      code: `<div
className={clsx(

  "flex",
  	
  "flex-1",
  "justify-start",
  "items-start",
  "w-full",

  "sm:w-64",

)}
/>`,
      output: `<div
className={clsx(
  "flex",
  "flex-1",
  "justify-start",
  "items-start",
  "w-full",
  "sm:w-64",
)}
/>`,
      errors,
    },
    {
      code: '<button className={clsx(true ? "first-class" : "second-class ")}>Hello</button>;',
      output:
        '<button className={clsx(true ? "first-class" : "second-class")}>Hello</button>;',
      errors,
    },
    {
      code: '<button className={clsx(true ? " first-class" : "second-class ")}>Hello</button>;',
      output:
        '<button className={clsx(true ? "first-class" : "second-class")}>Hello</button>;',
      errors: [
        {
          message: "Some className value has unnecessary whitespace",
        },
        {
          message: "Some className value has unnecessary whitespace",
        },
      ],
    },
    {
      code: '<button className={clsx([" whitespace-at-beginning", "valid"])}>Hello</button>;',
      output:
        '<button className={clsx(["whitespace-at-beginning", "valid"])}>Hello</button>;',
      errors,
    },
  ],
});
