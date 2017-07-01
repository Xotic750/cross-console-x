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
  it('is an object', function () {
    expect(typeof con).toBe('object');
    expect(con === null).toBe(false);
  });

  it('all methods are functions', function () {
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

    properties.forEach(function (property) {
      expect(function () {
        var method = con[property];
        if (Object(method) !== method) {
          throw new Error('Not an object');
        }

        if (method.call !== Function.call) {
          throw new Error('Missing call');
        }

        if (method.apply !== Function.apply) {
          throw new Error('Missing apply');
        }
      }).not.toThrow();
    });
  });
});
