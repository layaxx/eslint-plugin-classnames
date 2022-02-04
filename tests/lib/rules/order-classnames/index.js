// @ts-check
"use strict";

const ruleName = "order-classnames";

const glob = require("glob"),
  path = require("path");
const caseObjects = glob
  .sync(`./tests/lib/rules/${ruleName}/cases/**/*.js`)
  .map((file) => require(path.resolve(file)));
const RuleTester = require("eslint").RuleTester;
const rule = require("../../../../lib/rules/" + ruleName);
const { parserOptions } = require("../../../utils");

const ruleTester = new RuleTester({ parserOptions });

caseObjects.forEach(({ title, cases }) =>
  ruleTester.run(ruleName + " - " + title, rule, cases)
);
