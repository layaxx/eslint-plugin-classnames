const errors = [{ messageId: "unsorted" }];
module.exports = {
  cases: {
    valid: [
      {
        code: `<button
      className={classNames(["bg-blue-300", "block"], "relative", foo && [
        "text-white",
        "hover:text-grey-100",
      ])}
    >
      Hello
    </button>;
`,
      },
      {
        code: `
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
      },
      {
        code: `<button
      className={classNames(
        {
          "x-whatever": someVariable,
          "bg-blue-300 another-class": true,
        },
        "relative",
        ["text-white", "hover:text-grey-100"],
        bool ? "a-class" : "other-class"
      )}
    >
      Hello
    </button>;`,
      },
    ],
    invalid: [
      {
        code: `<button
  className={classNames(
    {
      "bg-blue-300 block": true,
    },
    "relative",
    ["text-white", "hover:text-grey-100"],
    "a-class"
  )}
>
  Hello
</button>;
`,
        output: `<button
  className={classNames(
    {
      "bg-blue-300 block": true,
    },
    "a-class",
    ["text-white", "hover:text-grey-100"],
    "relative"
  )}
>
  Hello
</button>;
`,
        errors,
      },

      {
        code: `<button
    className={classNames(
      "wrong-order",
      {
        "bg-blue-300 block": true,
      },
      "relative",
      someVar ? "ignored" : "also-ignored",
      "a-class"
    )}
  >
    Hello
  </button>;
  `,
        output: `<button
    className={classNames(
      "a-class",
      {
        "bg-blue-300 block": true,
      },
      "relative",
      someVar ? "ignored" : "also-ignored",
      "wrong-order"
    )}
  >
    Hello
  </button>;
  `,
        errors,
      },
    ],
  },
  title: "ignore-arrays-objects-conditionals",
};
