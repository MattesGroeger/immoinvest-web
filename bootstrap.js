/* eslint no-var: 0, prefer-const: 0, no-console: 0 */

// The above effectively disables those rules for this file,
// which is not babelified

process.env.NODE_ENV = process.env.ENV || process.env.NODE_ENV;

// Enable ES2015/2016 syntax with imports and classes and all
// that fancy stuff.
require('babel-core/register')({
  
});

// Bootstrap as a Server by default:
global.__CLIENT__ = false;
global.__SERVER__ = true;
