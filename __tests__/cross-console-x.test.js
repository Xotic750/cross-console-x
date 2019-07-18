import con from '../src/cross-console-x';

describe('con', function() {
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
    'stamp',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ];

  it('is an object', function() {
    expect.assertions(2);
    expect(typeof con).toBe('object');
    expect(con === null).toBe(false);
  });

  it('all methods are functions', function() {
    expect.assertions(23);
    properties.forEach(function(property) {
      expect(con[property]).toBeInstanceOf(Function);
    });
  });

  it('all methods should not throw', function() {
    expect.assertions(1);
    properties.forEach(function(property) {
      con[property]('Hi');
    });
    expect(true).toBe(true);
  });
});
