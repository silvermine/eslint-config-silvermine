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
