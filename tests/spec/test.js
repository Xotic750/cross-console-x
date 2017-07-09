'use strict';

var con;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  con = require('../../index.js');
} else {
  con = returnExports;
}

describe('con', function () {
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
    'stamp',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn'
  ];

  it('is an object', function () {
    expect(typeof con).toBe('object');
    expect(con === null).toBe(false);
  });

  it('all methods are functions', function () {
    properties.forEach(function (property) {
      expect(function () {
        var method = con[property];
        if (typeof method !== 'function') {
          throw new Error('Not a function');
        }
      }).not.toThrow();
    });
  });

  it('all methods should not throw', function () {
    properties.forEach(function (property) {
      expect(function () {
        con[property]('Hi');
      }).not.toThrow();
    });
  });
});
