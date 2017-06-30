/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/cross-console-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/cross-console-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/cross-console-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/cross-console-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/cross-console-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/cross-console-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/cross-console-x" title="npm version">
 * <img src="https://badge.fury.io/js/cross-console-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * A cross-environment fix for missing methods.
 *
 * Requires ES3 or above.
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module cross-console-x
 */

'use strict';

// Avoid `console` errors in environments that lack a console.

var properties = [
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
  'warn'
];

var defineProperties = require('object-define-properties-x');
var defineProperty = require('object-define-property-x');
var isPrimitive = require('is-primitive');
var isFunction = require('is-function-x');
var forEach = require('for-each');
var assert = require('assert-x');
var inspect = require('inspect-x');
var slice = require('array-slice-x');
var hasOwn = require('has-own-property-x');
var format = require('util-format-x');
var noop = require('lodash.noop');
var now = require('date-now');
var collections = require('collections-x');
var safeToString = require('safe-to-string-x');
var objectKeys = Object.keys || require('object-keys');

var con = {};
if (typeof console !== 'undefined' && isPrimitive(console) === false) {
  forEach(properties, function assigner(property) {
    if (hasOwn(console, property)) {
      // eslint-disable-next-line no-console
      var method = console[property];
      if (isFunction(method)) {
        defineProperty(con, property, {
          value: method
        });
      }
    }
  });
}

var times = new collections.Map();
var shams = defineProperties({}, {
  consoleAssert: {
    value: function consoleAssert(expression) {
      if (!expression) {
        assert.ok(false, format.apply(null, slice(arguments, 1)));
      }
    }
  },

  dir: {
    value: function dir(object) {
      this.log(inspect(object) + '\n');
    }
  },

  error: {
    value: function error() {
      this.warn.apply(this, slice(arguments));
    }
  },

  info: {
    value: function info() {
      this.log.apply(this, slice(arguments));
    }
  },

  log: {
    value: function log() {}
  },

  time: {
    value: function time(label) {
      times.set(safeToString(label), now());
    }
  },

  timeEnd: {
    value: function timeEnd(label) {
      var name = safeToString(label);
      if (times.has(name) === false) {
        throw new Error('No such label: ' + name);
      }

      var duration = now() - times.get(name);
      this.log(name + ': ' + duration + 'ms');
    }
  },

  trace: {
    value: function trace() {
      var err = new Error();
      err.name = 'Trace';
      err.message = format.apply(null, slice(arguments));
      this.error(err.stack);
    }
  },

  warn: {
    configurable: true,
    value: function warn() {
      this.log.apply(this, slice(arguments));
    },
    writable: true
  }
});

objectKeys(shams).forEach(function (key) {
  if (hasOwn(con, key) === false) {
    defineProperty(con, key, {
      value: shams[key]
    });
  }
});

forEach(properties, function assigner(property) {
  if (hasOwn(con, property) === false) {
    defineProperty(con, property, {
      value: noop
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
 * @see {@link https://developer.mozilla.org/en/docs/Web/API/console}
 * @example
 * var con = require('cross-console-x');
 * con.log('hi');
 */
module.exports = con;
