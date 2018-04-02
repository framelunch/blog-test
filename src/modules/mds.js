const globby = require('globby');
const fs = require('fs');
module.exports = function() {
  if (process.env.NODE_ENV === 'production') return;
  globby.sync('src/md/**/*').forEach(filename => {
    this.options.plugins.push(filename.replace('src', '~'));
  });
};
