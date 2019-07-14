/**
 * @file A cross-environment fix for missing methods.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module cross-console-x
 */

// Avoid `console` errors in environments that lack a console.

const properties = [
  'assert',
  'clear',
  'count',
  'debug',
  'dir',
  'dirxml',
  'error',
  'exception',
  'group',
  'groupCollapsed',
  'groupEnd',
  'info',
  'log',
  'markTimeline',
  'profile',
  'profileEnd',
  'table',
  'time',
  'timeEnd',
  'timeStamp',
  'trace',
  'warn',
];

const defineProperties = require('object-define-properties-x');
const defineProperty = require('object-define-property-x');
const isPrimitive = require('is-primitive');
const isFunction = require('is-function-x');
const forEach = require('for-each');
const assert = require('assert-x');
const inspect = require('inspect-x');
const slice = require('array-slice-x');
const hasOwn = require('has-own-property-x');
const format = require('util-format-x');
const noop = require('lodash.noop');
const now = require('date-now');
const collections = require('collections-x');
const safeToString = require('safe-to-string-x');
const objectKeys = require('object-keys-x');
const toISOString = require('to-iso-string-x');
const includes = require('array-includes');
const errorX = require('error-x');

const Trace = errorX.create('Trace');

const con = {};

if (typeof console !== 'undefined' && isPrimitive(console) === false) {
  const {apply} = Function.prototype;
  forEach(properties, function assigner1(property) {
    if (hasOwn(console, property)) {
      // eslint-disable-next-line no-console
      const method = console[property];
      let fn;

      if (isPrimitive(method) === false) {
        // eslint-disable-next-line no-unused-vars
        const f = function _f(context, args) {
          let result;
          try {
            result = apply.call(method, context, slice(args));
          } catch (e) {}

          return result;
        };

        // eslint-disable-next-line no-eval
        fn = eval(`(0,function ${property}(){return f(this,arguments);})`);
      }

      if (isFunction(fn)) {
        defineProperty(con, property, {
          value: fn,
        });
      }
    }
  });
}

const times = new collections.Map();
const shams = defineProperties(
  {},
  {
    consoleAssert: {
      enumerable: true,
      value: function consoleAssert() {
        const expression = arguments[0];

        if (Boolean(expression) === false) {
          assert.ok(false, format.apply(null, slice(arguments, 1)));
        }
      },
    },

    dir: {
      enumerable: true,
      value: function dir() {
        if (arguments.length > 0) {
          this.log(`${inspect(arguments[0])}\n`);
        } else {
          this.log();
        }
      },
    },

    error: {
      enumerable: true,
      value: function error() {
        this.warn.apply(this, slice(arguments));
      },
    },

    info: {
      enumerable: true,
      value: function info() {
        this.log.apply(this, slice(arguments));
      },
    },

    log: {
      enumerable: true,
      value: function log() {},
    },

    stamp: {
      enumerable: true,
      value: function stamp() {
        const type = arguments.length > 0 ? arguments[0] : null;

        if (includes(properties, type)) {
          const stampStr = format('[%s] [%s]', toISOString(new Date()), type);
          this[type].apply(this, [stampStr].concat(slice(arguments, 1)));
        }
      },
    },

    time: {
      enumerable: true,
      value: function time() {
        const label = arguments.length > 0 ? safeToString(arguments[0]) : 'default';
        times.set(label, now());
      },
    },

    timeEnd: {
      enumerable: true,
      value: function timeEnd() {
        const label = arguments.length > 0 ? safeToString(arguments[0]) : 'default';
        let duration;

        if (times.has(label)) {
          duration = now() - times.get(label);
          const key = 'delete';
          times[key](label);
        } else {
          duration = 0;
        }

        this.log(`${label}: ${duration}ms`);
      },
    },

    trace: {
      enumerable: true,
      value: function trace() {
        this.error(new Trace(format.apply(null, slice(arguments))));
      },
    },

    warn: {
      enumerable: true,
      value: function warn() {
        this.log.apply(this, slice(arguments));
      },
    },
  },
);

forEach(objectKeys(shams), function assigner2(key) {
  if (hasOwn(con, key) === false) {
    defineProperty(con, key, {
      value: shams[key],
    });
  }
});

forEach(properties, function assigner3(property) {
  if (hasOwn(con, property) === false) {
    defineProperty(con, property, {
      value: noop,
    });
  }
});

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
 * @example
 * var con = require('cross-console-x');
 * con.log('hi');
 * con.stamp('log', 'hi');
 */
module.exports = con;
