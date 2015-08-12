var through = require('through');
var estraverse = require('estraverse');
var esprima = require('esprima');
var path = require('path');
var minimatch = require('minimatch');
var typeName = require('type-name');

function debug() {
  if (process.env.DEBUG) { console.log.apply(console, arguments); }
}

function isDynamicModule(moduleName, options) {
  if (options.targetModules) {
    if (moduleName[0] === ".") {
      moduleName = path.resolve(path.dirname(options.file), moduleName);
      moduleName = "./" + path.relative(options.baseDir, moduleName);
    }
    var patterns = options.targetModules;
    patterns = typeName(patterns) === 'Array' ? patterns : [ patterns ];
    for (var i=0, len=patterns.length; i<len; i++) {
      var pattern = patterns[i];
      debug("**** pattern : ", pattern, " => module : ", moduleName, "*****");
      if (/[\*\?\!\{\}]/.test(pattern) ? minimatch(moduleName, pattern) : moduleName === pattern) {
        debug(" <<< matched >>> ");
        return true;
      }
    }
  } else {
    return true;
  }
}

function fixModulePath(moduleName, options) {
  if (moduleName[0] === ".") {
    moduleName = path.resolve(path.dirname(options.file), moduleName);
    moduleName = "./" + path.relative(options.baseDir, moduleName);
  }
  return moduleName;
}

function swapRequire(code, newRequireName, options) {
  var chunks = [], start = 0;
  var ast = esprima.parse(code, { range: true });
  estraverse.traverse(ast, {
    enter: function(node, parent, parent2) {
      if (parent && parent.type === 'CallExpression' &&
          node.type === 'Identifier' && node.name === 'require' &&
          parent.arguments.length === 1 && parent.arguments[0].type === 'Literal') {
        var moduleName = parent.arguments[0].value;
        if (isDynamicModule(moduleName, options)) {
          chunks.push(code.substring(start, parent.range[0]));
          chunks.push(newRequireName + "('" + fixModulePath(moduleName, options) + "')");
          start = parent.range[1];
        }
      }
    }
  });
  chunks.push(code.substring(start));
  return chunks.join('');
}

function swap(file, options) {
  if (/\.json$/.test(file)) {
    return through();
  }
  var swappingTo = options.fn || 'dynRequire';
  var chunks = [];
  var stream = through(write, end);
  function write(chunk, enc) {
    chunks.push(chunk.toString(enc));
  }
  function end() {
    var code = chunks.join('');
    try {
      code = swapRequire(code, swappingTo, {
        baseDir: options.baseDir || process.cwd(),
        targetModules: options.module || options.modules,
        file: file
      });
    } catch(e) {
      stream.emit('error', e);
    }
    stream.queue(code);
    stream.queue(null);
  }
  return stream;
}

module.exports = swap;
