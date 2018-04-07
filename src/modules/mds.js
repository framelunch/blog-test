const globby = require('globby');
module.exports = function() {
  if (process.env.NODE_ENV === 'production') return;
  globby.sync('md/**/*').forEach(filename => {
    // this.options.plugins.push(filename.replace('src', '~'));
    this.options.plugins.push(process.cwd() + '/' + filename);
  });
};
