const Compiler = require('./complier');
const options  = require('../simplepack.config');

new Compiler(options).run();