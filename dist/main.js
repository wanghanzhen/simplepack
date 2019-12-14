
(function(modules) {
  function require(moduleId) {
    var fn = modules[moduleId];
    var module = { exports: {} };

    fn(module, module.exports, require);
    return module.exports;
  }
  require('/Users/volare/Code/simplepack/src/index.js');
})({
'/Users/volare/Code/simplepack/src/index.js':
function(module, exports, require) {
  "use strict";

var _hello = _interopRequireDefault(require("./hello.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.write((0, _hello["default"])());
},
'./hello.js':
function(module, exports, require) {
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hello;

function hello() {
  return 'hello world';
}
},})