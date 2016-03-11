require("babel-polyfill");
require('../bootstrap');

// behave as if we were always on the client for now
global.__CLIENT__ = true;
global.__SERVER__ = false;
