(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var dict = dynreq('./dir2/dict');

module.exports = function(name) {
  return dict[name] || "(not found)"
}
},{}],2:[function(require,module,exports){
var module1 = require("mymodule1");
var print = require("./print");
var translate = require("./dir1/translate");
var pkg = require('./package.json');

module.exports = function() {
  print(module1);
  print(translate("apple"));
  print(pkg.name);
};

},{"./dir1/translate":1,"./package.json":4,"./print":5,"mymodule1":3}],3:[function(require,module,exports){
module.exports = "MyModule #1";
},{}],4:[function(require,module,exports){
module.exports={
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "author": "",
  "dependencies": {
    "mymodule1": "*"
  }
}

},{}],5:[function(require,module,exports){
module.exports = function(name) {
  console.log(name);
};

},{}]},{},[2]);
