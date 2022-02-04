module.exports = {
  cases: {
    valid: [
      {
        code: `<button
      className={classNames(
        "bg-blue-300",
        "xs:block", 
        "a-modifier:relative", 
        )}
    >
      Hello
    </button>;
`,
      },
      {
        code: `<button
        className={classNames(
          xVarIgnored && "bg-blue-300",
          "xs:block", 
          "a-modifier:relative", 
          )}
      >
        Hello
      </button>;
  `,
      },
      {
        code: `<button
        className={classNames(
          "multiple:prefixes:all:ignored:bg-blue-300",
          "xs:block", 
          "relative", 
          )}
      >
        Hello
      </button>;
  `,
      },
      {
        code: `<button
        className={clsx(
          "multiple:prefixes:all:ignored:bg-blue-300",
          "xs:bg-blue-300", 
          "relative", 
          )}
      >
        Hello
      </button>;
  `,
      },
    ],
    invalid: [],
  },
  title: "ignore-prefixes",
};
