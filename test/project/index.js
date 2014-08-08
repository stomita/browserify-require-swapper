var module1 = require("mymodule1");
var print = require("./print");
var translate = require("./dir1/translate");

module.exports = function() {
  print(module1);
  print(translate("apple"));
};