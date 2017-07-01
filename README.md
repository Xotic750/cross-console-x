<a name="module_cross-console-x"></a>

## cross-console-x
<a href="https://travis-ci.org/Xotic750/cross-console-x"
title="Travis status">
<img
src="https://travis-ci.org/Xotic750/cross-console-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/cross-console-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/cross-console-x.svg"
alt="Dependency status" height="18"/>
</a>
<a
href="https://david-dm.org/Xotic750/cross-console-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/cross-console-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/cross-console-x" title="npm version">
<img src="https://badge.fury.io/js/cross-console-x.svg"
alt="npm version" height="18">
</a>

A cross-environment fix for missing methods.

Requires ES3 or above.

**Version**: 1.3.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_cross-console-x--module.exports"></a>

### `module.exports` ⏏
The cross-console-x object provides access to the browser's debugging console
(e.g., the Web Console in Firefox). The specifics of how it works vary from
browser to browser, but there is a de facto set of features that are
typically provided.

Missing methods are shimmed when possible, otherwise they provide no
operation.

Additional stamp() method provided.
A thin wrapper to any method that prepends a timestamp.

**Kind**: Exported member  
**See**: [https://developer.mozilla.org/en/docs/Web/API/console](https://developer.mozilla.org/en/docs/Web/API/console)  
**Example**  
```js
var con = require('cross-console-x');
con.log('hi');
con.stamp('log', 'hi');
```
