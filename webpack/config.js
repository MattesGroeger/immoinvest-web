module.exports = require(process.env.ENV === 'production' ? './production.js' : './development.js');
