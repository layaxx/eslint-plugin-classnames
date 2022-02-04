# Rule to suggest omitting unnecessary whitespace in JSX className (classnames/no-unnecessary-whitespace)

When your className= attribute has unnecessary whitespace, this rule suggests a cleaner version.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<button className=" bg-blue-300 block">Hello</button>; // Whitespace at beginning
<button className="bg-blue-300 block ">Hello</button>; // Whitespace at end
<button className={"bg-blue-300  block"}>Hello</button>; // multiple consecutive whitespace chars
```

Examples of **correct** code for this rule:

```jsx
<button className="bg-blue-300">Hello</button>;
<button className={"bg-blue-300 block"}>Hello</button>;
<button className={`bg-blue-300   block `}>Hello </button>; // Template literals are ignored
```

## Rule Options

```js
...
"classnames/no-unnecessary-whitespace": [<enabled>, {
  "functionNames": [<string>]
}]
...
```

Provide an array of strings for `functionNames` to apply this rule to all calls for these functions inside className attributes. Empty Array means this rule only applies to literal strings provided to the className attribute. If not provided, defaults to ["clsx", "classNames"].
