# Enforce formatting for chained calls (fluent-chaining)

This rule aims to keep a consistent format when working
with chained functions such as those provided by lodash
chained functions or Q based promises.

## Examples

Member expressions should not span more than 2 lines

Invalid example:

```js
a()

   .b();
```

Valid example:

```js
a()
   .b();
```

---

Once a statement is broken into multiple lines,
each member expression should be on its own line.

Invalid example:

```js
a()
   .b().c;
```

Valid example:

```js
a().b().c;

// OR

a()
   .b()
   .c;
```

---

Missing indentation when member expression is on multiple lines.

Invalid example:

```js
a()
.b();
```

Valid example:

```js
a()
   .b();
```

---

Chained function calls must have the same indentation as the previous call.

Invalid example:

```js
object.handleArray([
   'abc',
   'def',
])
   .doSomething(function(abc, def) {
   });
```

Valid example:

```js
object
   .handleArray([
      'abc',
      'def',
   ])
   .doSomething(function(abc, def) {
   });

// OR

var values;

values = [
   'abc',
   'def',
];

Q.handleArray(values)
   .doSomething(function(abc, def) {
   });
```
