# Rule to automatically order classes in arguments to className() or clsx() (classnames/order-classnames)

Suggest alphabetical order of (string or conditional) arguments to className() or clsx()

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<button
  className={classNames(
    "bg-blue-300",
    "relative",
    "another-class"
  )}
>
  Hello
</button>;

<button
  className={classNames(
    "bg-blue-300 another-class", 
    "relative",
  )}
>
  Hello
</button>;

<button className={classNames("block", "bg-blue-300", style.someClass)}>
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
  )}
>
  Hello
</button>;

// this rule tries to group by actual className, rather then by prefixes like tailwindcss' modifiers (e.g. xl:bg-blue-300 is sorted as if it started with b as opposed to x). actual className is defined as matching /:.*$/ iff the className contains one or more instances of :
<button
  className={classNames(
    "bg-blue-300",
    "xl:bg-blue-400",
    "block",
    "relative",
    "text-white",
  )}
>
  Hello
</button>;

// this rule tries to group by actual className, ignoring logic expressions
<button
  className={classNames(
    "bg-blue-300",
    someVariable && "bg-blue-400",
    "block",
    "relative",
    "text-white",
  )}
>
  Hello
</button>;

// This rule ignores classes inside arrays, as keys of an object and in conditionals
<button
  className={classNames(
    {
      "bg-blue-300 another-class": true,
    },
    "relative",
    ["text-white", "hover:text-grey-100"],
    bool ? "a-class" : "other-class"
  )}
>
  Hello
</button>;

<button className={classNames("bg-blue-300", "block", style.someClass)}>
  Hello
</button>;
```

## Rule Options

```json
...
"classnames/order-classnames":  [<enabled>, {
  "functionNames": [<string>]
}]
...
```

Provide an array of strings for `functionNames` to apply this rule to all calls for these functions. Empty Array effectively disables this rule. If not provided, defaults to ["clsx", "classNames"].

## Additional Information

This rule is intended to be used in combination with the `classnames/one-by-one-arguments` rule

This rule considers arguments to the functions: clsx, classNames

This rule ignores: arrays, objects, conditionals (var ? val1 : val2), template strings

=> To be more precise, this rule only considers literal strings and literal strings on the right side of a conditional (e.g. bool && "literal-string")

This rule ignores prefixes separated from the class name via ":" (c.f. tailwindcss' modifiers)
