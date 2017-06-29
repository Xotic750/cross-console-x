/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/console-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/console-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/console-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/console-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/console-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/console-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/console-x" title="npm version">
 * <img src="https://badge.fury.io/js/console-x.svg"
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
 * @module console-x
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

var isPrimitive = require('is-primitive');
var isFunction = require('is-function-x');
var forEach = require('for-each');
var assert = require('assert-x');
var inspect = require('inspect-x');
var slice = require('array-slice-x');
var hasOwn = require('has-own-property-x');
var format = require('util-format-x');
var noop = require('lodash.noop');
var now = function _now() {
  return new Date().getTime();
};

var times = {};
var con = {
  consoleAssert: function _consoleAssert(expression) {
    if (!expression) {
      assert.ok(false, format.apply(null, slice(arguments, 1)));
    }
  },

  dir: function _dir(object) {
    con.log(inspect(object) + '\n');
  },

  error: function _error() {
    con.warn.apply(con, slice(arguments));
  },

  info: function _info() {
    con.log.apply(con, slice(arguments));
  },

  log: function _log() {},

  time: function _time(label) {
    times[label] = now();
  },

  timeEnd: function _timeEnd(label) {
    var time = times[label];
    if (!time) {
      throw new Error('No such label: ' + label);
    }

    var duration = now() - time;
    con.log(label + ': ' + duration + 'ms');
  },

  trace: function _trace() {
    var err = new Error();
    err.name = 'Trace';
    err.message = format.apply(null, slice(arguments));
    con.error(err.stack);
  },

  warn: function _warn() {
    con.log.apply(con, slice(arguments));
  }
};

if (typeof console !== 'undefined' && isPrimitive(console) === false) {
  forEach(properties, function (property) {
    if (hasOwn(console, property)) {
      // eslint-disable-next-line no-console
      var method = console[property];
      if (isFunction(method)) {
        con[property] = method;
      }
    } else {
      con[property] = noop;
    }
  });
}

/**
 * The console-x object provides access to the browser's debugging console
 * (e.g., the Web Console in Firefox). The specifics of how it works vary from
 * browser to browser, but there is a de facto set of features that are
 * typically provided.
 *
 * Missing methods are shimmed when possible, otherwise they provide no
 * operation.
 *
 * @param {*} [target] The target.
 * @throws {Error} If target is not undefined.
 * @return {*} The target.
 * @see {@link https://developer.mozilla.org/en/docs/Web/API/console}
 * @example
 * var con = require('console-x');
 * con.log('hi');
 */
module.exports = con;
