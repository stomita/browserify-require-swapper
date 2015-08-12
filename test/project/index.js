var module1 = require("mymodule1");
var print = require("./print");
var translate = require("./dir1/translate");
var pkg = require('./package.json');

module.exports = function() {
  print(module1);
  print(translate("apple"));
  print(pkg.name);
};
