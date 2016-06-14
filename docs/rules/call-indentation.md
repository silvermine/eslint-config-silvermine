# Check indentation of function call (call-indentation)

This rule aims to keep consistent formatting on a function call.
A call to a function that spans multiple lines because of an array,
object or anonymous function call should begin and end with the
same indentation.

Invalid example:

```js
_.map(languages,
   function(lang) {
      return lang.name;
   });
```

The inner function should have started on the same line as the outer
and the inner function's closing bracket should be indented to the same level
as the line of the outer function.

Valid example:

```js
_.map(languages, function(lang) {
   return lang.name;
});
```
