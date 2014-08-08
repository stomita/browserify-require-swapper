var assert = require('power-assert');
var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var swapper = require('../index.js');

function readFixtureData(name) {
  return fs.readFileSync(path.join(__dirname, "./fixture/" + name), 'utf8');
}

describe("require-swapper", function() {

  var cwd = process.cwd();

  before(function() {
    process.chdir(path.join(__dirname, './project'));
  });

  after(function() {
    process.chdir(cwd);
  });

  it("should build bundle not-swapped", function(done) {
    browserify()
      .add('./index.js')
      .transform(swapper, {
        fn: 'dynreq',
        modules: [ './unmatched/*', 'nosuchmodule' ]
      })
      .bundle(function(err, code) {
        if (err) { return done(err); }
        code = code.toString('utf-8');
        assert(code === readFixtureData('bundle-noswap.js'));
        done();
      });
  })

  it("should build swapped bundle for package require fn", function(done) {

    browserify()
      .add('./index.js')
      .transform(swapper, {
        fn: 'dynreq',
        modules: [ 'mymodule1' ]
      })
      .bundle(function(err, code) {
        if (err) { return done(err); }
        code = code.toString('utf-8');
        assert(code === readFixtureData('bundle-mymodule1-swapped.js'));
        done();
      });
  })

  it("should build swapped bundle for local path require fn", function(done) {

    browserify([ './index.js' ])
      .transform(swapper, {
        fn: 'dynreq',
        modules: './dir2/**/*'
      })
      .bundle(function(err, code) {
        if (err) { return done(err); }
        code = code.toString('utf-8');
        assert(code === readFixtureData('bundle-dict-swapped.js'));
        done();
      });
  })

});

