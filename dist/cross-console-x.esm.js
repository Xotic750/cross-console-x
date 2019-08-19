import defineProperties, { defineProperty } from 'object-define-properties-x';
import isPrimitive from 'is-primitive-x';
import isFunction from 'is-function-x';
import forEach from 'array-for-each-x';
import assert from 'assert-x';
import inspect from 'inspect-x';
import slice from 'array-slice-x';
import hasOwn from 'has-own-property-x';
import { format } from 'util-format-x';
import { MapConstructor } from 'collections-x';
import safeToString from 'to-string-symbols-supported-x';
import objectKeys from 'object-keys-x';
import toISOString from 'to-iso-string-x';
import includes from 'array-includes-x';
import { create } from 'error-x';
import attempt from 'attempt-x';
import toBoolean from 'to-boolean-x';
import methodize from 'simple-methodize-x';
import call from 'simple-call-x';
var DateCtr = Date;
var getTime = methodize(DateCtr.prototype.getTime);
/* eslint-disable-next-line no-void */

var UNDEFINED = void 0;
var properties = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
var Trace = create('Trace');

var getFn = function getFn(method, property) {
  if (isPrimitive(method) === false) {
    var f = function f(context, args) {
      var res = attempt(function attemptee() {
        return call(method, context, slice(args));
      });
      return res.threw ? UNDEFINED : res.value;
    };
    /* eslint-disable-next-line no-new-func */


    return Function('f', "return function ".concat(property, "(){return f(this,arguments)}"))(f);
  }

  return UNDEFINED;
};
/**
 * The cross-console-x object provides access to the browser's debugging console
 * (e.g., the Web Console in Firefox). The specifics of how it works vary from
 * browser to browser, but there is a de facto set of features that are
 * typically provided.
 *
 * Missing methods are shimmed when possible, otherwise they provide no
 * operation.
 *
 * Additional stamp() method provided.
 * A thin wrapper to any method that prepends a timestamp.
 *
 * @see {@link https://developer.mozilla.org/en/docs/Web/API/console}
 */


var con = {};

if (typeof console !== 'undefined' && isPrimitive(console) === false) {
  forEach(properties, function assigner1(property) {
    if (hasOwn(console, property)) {
      /* eslint-disable-next-line no-console */
      var method = console[property];
      var fn = getFn(method, property);

      if (isFunction(fn)) {
        defineProperty(con, property, {
          value: fn
        });
      }
    }
  });
}

var times = new MapConstructor();
var get = methodize(times.get);
var set = methodize(times.set);
var has = methodize(times.has);
var shams = defineProperties({}, {
  consoleAssert: {
    enumerable: true,
    value: function consoleAssert() {
      /* eslint-disable-next-line prefer-rest-params */
      var expression = arguments[0];

      if (toBoolean(expression) === false) {
        /* eslint-disable-next-line prefer-rest-params */
        assert.ok(false, call(format, null, slice(arguments, 1)));
      }
    }
  },
  dir: {
    enumerable: true,
    value: function dir() {
      if (arguments.length > 0) {
        /* eslint-disable-next-line prefer-rest-params */
        this.log("".concat(inspect(arguments[0]), "\n"));
      } else {
        this.log();
      }
    }
  },
  error: {
    enumerable: true,
    value: function error() {
      /* eslint-disable-next-line prefer-rest-params */
      call(this.warn, this, slice(arguments));
    }
  },
  info: {
    enumerable: true,
    value: function info() {
      /* eslint-disable-next-line prefer-rest-params */
      call(this.log, this, slice(arguments));
    }
  },
  log: {
    enumerable: true,

    /* eslint-disable-next-line lodash/prefer-noop */
    value: function log() {}
  },
  stamp: {
    enumerable: true,
    value: function stamp() {
      /* eslint-disable-next-line prefer-rest-params */
      var type = arguments.length > 0 ? arguments[0] : null;

      if (includes(properties, type)) {
        var stampStr = format('[%s] [%s]', toISOString(new DateCtr()), type);
        /* eslint-disable-next-line prefer-rest-params */

        call(this[type], this, [stampStr, slice(arguments, 1)]);
      }
    }
  },
  time: {
    enumerable: true,
    value: function time() {
      /* eslint-disable-next-line prefer-rest-params */
      var label = arguments.length > 0 ? safeToString(arguments[0]) : 'default';
      set(times, label, getTime(new DateCtr()));
    }
  },
  timeEnd: {
    enumerable: true,
    value: function timeEnd() {
      /* eslint-disable-next-line prefer-rest-params */
      var label = arguments.length > 0 ? safeToString(arguments[0]) : 'default';
      var duration;

      if (has(times, label)) {
        duration = getTime(new DateCtr()) - get(times, label);
        var key = 'delete';
        times[key](label);
      } else {
        duration = 0;
      }

      this.log("".concat(label, ": ").concat(duration, "ms"));
    }
  },
  trace: {
    enumerable: true,
    value: function trace() {
      /* eslint-disable-next-line prefer-rest-params */
      this.error(new Trace(call(format, null, slice(arguments))));
    }
  },
  warn: {
    enumerable: true,
    value: function warn() {
      /* eslint-disable-next-line prefer-rest-params */
      call(this.log, this, slice(arguments));
    }
  }
});
forEach(objectKeys(shams), function assigner2(key) {
  if (hasOwn(con, key) === false) {
    defineProperty(con, key, {
      value: shams[key]
    });
  }
});
forEach(properties, function assigner3(property) {
  if (hasOwn(con, property) === false) {
    defineProperty(con, property, {
      /* eslint-disable-next-line lodash/prefer-noop */
      value: function value() {}
    });
  }
});
export default con;

//# sourceMappingURL=cross-console-x.esm.js.map