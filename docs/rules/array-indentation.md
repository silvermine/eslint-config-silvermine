# Check indentation of a literal array expression (array-indentation)

This rule aims to keep consistent formatting on a literal array expression.
Multi-line arrays should end at the same indentation as the line where they started.

Invalid example:

```js
a = [
   3, 4];
```

Valid example:

```js
a = [
   3, 4
];

// OR

a = [
   3,
   4
];
--
```
