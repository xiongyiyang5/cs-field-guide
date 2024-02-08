// Generated by CoffeeScript 1.10.0

/* Author James "The Jamesernator" Browning
    2015
 */

(function() {
  "use strict";
  var async,
    slice = [].slice;

  module.exports = async = function(gen_func) {
    var wrapper;
    return wrapper = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return new Promise(function(resolve, reject) {
        var gen, iter;
        gen = gen_func.apply(null, args);
        iter = (function*() {
          var done, err, error, error1, error2, promise, ref, result, total_failure, value;
          result = void 0;
          while (true) {
            try {
              ref = gen.next(result), value = ref.value, done = ref.done;
            } catch (error) {
              err = error;
              reject(err);
            }
            if (done) {
              resolve(value);
              return;
            }
            promise = Promise.resolve(value);
            try {
              result = (yield promise.then(iter.next.bind(iter))["catch"](function(err) {
                if (err.constructor !== Error) {
                  return iter["throw"](new Error(err));
                } else {
                  return iter["throw"](err);
                }
              }));
            } catch (error1) {
              err = error1;
              try {
                gen["throw"](err);
              } catch (error2) {
                total_failure = error2;
                reject(total_failure);
              }
            }
          }
        })();
        return iter.next();
      });
    };
  };

  async.run = function(func, err_callback) {
    if (err_callback == null) {
      err_callback = console.log;
    }

    /* This tries running the async function given and if it
        fails it calls the err_callback with the error given
        by the async function
     */
    return async(function*() {
      var err, error;
      try {
        return (yield async(func)());
      } catch (error) {
        err = error;
        return err_callback(err);
      }
    })();
  };

  async.main = function(func) {

    /* Although async.run has err_callback as console.log we'll just print
        the stack
     */
    return async.run(func, function(err) {
      return console.log(err.stack);
    });
  };

  async.from = function(iterable) {

    /* Creates a async function from an existing iterable */
    var gen_func;
    gen_func = function*() {
      return (yield* iterable);
    };
    return async(gen_func);
  };

}).call(this);
