# browserify-require-swapper 
[![Build Status](https://secure.travis-ci.org/stomita/browserify-require-swapper.png?branch=master)](http://travis-ci.org/stomita/browserify-require-swapper)

[Browserify](http://browserify.org) v2 transform to swap CommonJS require call to custom function call

## Installation ##

``` bash
npm install require-swapper browserify
```

## Usage ##

Require-swapper swaps all CommonJS `require()` function calls in your code to specified custom function, or for certain module which matches given target module list.


## Example ###

Suppose you have following index.js and swapping require function to `myrequire()` for module `aaa`,

``` javascript
var aaa = require('aaa')
  , bbb = require('./dir1/bbb')
  , ccc = require('./dir2/ccc')

module.exports = function() {
  aaa(bbb, ccc);
}
```

It will output the folowing content to downstream.

``` javascript
var aaa = myrequire('aaa')
  , bbb = require('./dir1/bbb')
  , ccc = require('./dir2/ccc')

module.exports = function() {
  aaa(bbb, ccc);
}
```

As the loading function for module `aaa` become swapped, browserify worker will not resolve and bundle the module `aaa` statically.
It is anticipated that your custom loader function `myrequire` would resolve it.

Combining browserify CLI, you can use it like following:

``` bash
browserify index.js -t [ require-swapper --fn 'myrequire' --module 'aaa'  ] > bundle.js
```


## Options ##

**options.fn**

Specify your custom function name to swap `require()` call.

**options.modules**

A target module list or glob pattern to swap `require()`. If the option is not specified, all `require()` call will be replaced.

