(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var module1 = dynreq("mymodule1");
var print = require("./print");
var translate = require("./dir1/translate");

module.exports = function() {
  print(module1);
  print(translate("apple"));
};
},{"./dir1/translate":2,"./print":4}],2:[function(require,module,exports){
var dict = require('../dir2/dict');

module.exports = function(name) {
  return dict[name] || "(not found)"
}
},{"../dir2/dict":3}],3:[function(require,module,exports){
module.exports = {
  "apple": "manzana",
  "orange": "naranja",
  "strawberry": "fresa",
  "pineapple": "piña"
};
},{}],4:[function(require,module,exports){
module.exports = function(name) {
  console.log(name);
};

},{}]},{},[1]);
