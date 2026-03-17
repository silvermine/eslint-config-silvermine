/* eslint-disable */
/**
 * @fileoverview This file contains examples of valid chained expressions
 */

a()
   .b(function() {
      return a()
         .b(function() {});
   });

function test() {
   a()
      .b(function() {
         return a()
            .b(function() {});
      });
}

a()
   .b(function() {
      return a()
         .b(function() {});
   })
   .c(function() {
      return 'c-valid';
   })
   .d()
   .e
   .f();

var fn;

fn = function(a, b, c) {
   return a + ':' + b + ':' + c;
};

a({ test: 1 }, fn)
   .b({ anotherTest: 1 }, function(a, b, c) {

   });

// VALID - another valid way of doing the same thing
// This is actually our preferred way.

function validCase() {
   var onFulfill, onReject;

   onFulfill = function(val) {
      console.log(val);
   };

   onReject = function(err) {
      console.log(err);
   };

   return promise.then(onFulfill, onReject);
}

function validCase() {
   return promise
      .then(function(val) {
         console.log(val);
      })
      .catch(function(err) {
         console.log(err);
      });
}

// VALID - you can call functions on something that was an argument to the
// initial chained call
function validCase() {
   return service.doSomething(c)
      .then(function(d) {
         return x;
      }.bind(this));
}

function validCase() {
   return promise
      .then(function(val) {
         console.log(val);
      })
      // test comment
      .catch(function(err) {
         console.log(err);
      });
}

aPromise
   .then(function(val) {
      return val;
   })
   // these comments
   // should not make us error
   .catch(function(err) {
      return err;
   });

aPromise
   .then(function(val) {
      return val;
   })
   .then(namedFunction) //comment on same line
   .catch(function(err) {
      return err;
   });

aPromise
   .then(function(val) {
      return val;
   })
   .then(namedFunction) //comment on same line
   // comment on new line
   .catch(function(err) {
      return err;
   });

// VALID - array accessors used on call expressions are an accepted pattern
'https://google.com/#home?greeting=hello'
   // Remove any query string:
   .split('?')[0]
   // Remove any hash:
   .split('#')[0];
