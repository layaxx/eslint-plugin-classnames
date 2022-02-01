# Rule to suggest omitting unnecessary whitespace in JSX className (classnames/no-unnecessary-whitespace)

When your className= attribute has unnecessary whitespace, this rule suggests a cleaner version.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<button className=" bg-blue-300 block">Hello</button>; // Whitespace at beginning
<button className="bg-blue-300 block ">Hello</button>; // Whitespace at end
<button className={"bg-blue-300  block"}>Hello</button>; // multiple consecutive whitespaces
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
"classnames/no-unnecessary-whitespace": [<enabled>]
...
```


