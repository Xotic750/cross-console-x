let con;

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
    expect.assertions(1);
    expect(typeof con).toBe('object');
    expect(con === null).toBe(false);
  });

  it('all methods are functions', function() {
    expect.assertions(1);
    properties.forEach(function(property) {
      expect(function() {
        const method = con[property];

        if (typeof method !== 'function') {
          throw new Error('Not a function');
        }
      }).not.toThrowErrorMatchingSnapshot();
    });
  });

  it('all methods should not throw', function() {
    expect.assertions(1);
    properties.forEach(function(property) {
      expect(function() {
        con[property]('Hi');
      }).not.toThrowErrorMatchingSnapshot();
    });
  });
});
