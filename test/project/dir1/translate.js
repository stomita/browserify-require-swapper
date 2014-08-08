var dict = require('../dir2/dict');

module.exports = function(name) {
  return dict[name] || "(not found)"
}