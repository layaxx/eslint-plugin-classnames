# Rule to avoid having multiple classes in an argument of className() or clsx() (classnames/one-by-one-arguments)

Suggest not to include multiple classes in an argument of className() or clsx()

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<button
  className={classNames(
    "bg-blue-300 block",
    "relative",
    "text-white hover:text-grey-100"
  )}
>
  Hello
</button>;

<button
  className={classNames("bg-blue-300 block", [
    "relative",
    "text-white hover:text-grey-100",
  ])}
>
  Hello
</button>;

<button className={classNames("bg-blue-300 block", style.someClass)}>
  Hello
</button>;
```

Examples of **correct** code for this rule:

```jsx
<button
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

<button
  className={classNames(["bg-blue-300", "block"], "relative", [
    "text-white",
    "hover:text-grey-100",
  ])}
>
  Hello
</button>;

// We do not split class if it's in a key of an object
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

<button className={classNames("bg-blue-300", "block", style.someClass)}>
  Hello
</button>;
```

## Rule Options

```js
...
"classnames/one-by-one-arguments": [<enabled>, {
  "functionNames": [<string>]
}]
...
```

Provide an array of strings for `functionNames` to apply this rule to all calls for these functions. Empty Array effectively disables this rule. If not provided, defaults to ["clsx", "classNames"]

You can set `functionName` to `classNames` or `clsx`. Defaults to `classNames`

## When Not To Use It

If you want to allow space-separeted class strings, you can disable this rule.
