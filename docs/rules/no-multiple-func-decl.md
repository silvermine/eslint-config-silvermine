# Multiple function declarations in a call expression should not be allowed. (no-multiple-inline-functions)

If an outer function takes more than one function in its arguments,
those functions must be declared elsewhere. They can not be declared inline.

Invalid example:

```js
promise.then(function(val) {
   console.log(val);
}, function(err) {
   console.log(err);
});
```

Valid example:

```js
var onFulfill, onReject;

onFulfill = function(val) {
   console.log(val);
};

onReject = function(err) {
   console.log(err);
};

promise.then(onFulfill, onReject);
```
