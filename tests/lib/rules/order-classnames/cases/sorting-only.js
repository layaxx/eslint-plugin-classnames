module.exports = {
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
        errors: [
          {
            messageId: "unsorted",
          },
        ],
      },

      {
        code: `<button className={classNames("block", "bg-blue-300", style.someClass)}>
      Hello
    </button>;`,
        output: `<button className={classNames("bg-blue-300", "block", style.someClass)}>
      Hello
    </button>;`,
        errors: [{ messageId: "unsorted" }],
      },
    ],
  },
  title: "sorting-only",
};
