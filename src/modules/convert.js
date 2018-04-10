const fs = require('fs');
/* eslint-disable */
const globby = require('globby');
const serialize = require('serialize-javascript');
const attr = require('markdown-it-attrs');
const container = require('markdown-it-container');
const meta = require('markdown-it-meta');
const hljs = require('highlight.js');
const md = require('markdown-it')({
  /* eslint-enable */
  html: true,
  linkify: true,
  breaks: true,
  injected: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) {} //eslint-disable-line
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
})
  .use(attr)
  .use(meta)
  .use(container)
  .use(container, 'warning');

/* eslint-disable */
module.exports = function({ isDev }) {
  /* eslint-enable */
  if (isDev || process.env.NODE_ENV === 'production') {
    const staticPath = `${process.cwd()}/src/static/_contents/`;
    const summary = [];
    globby.sync('md/**/*').forEach(filename => {
      const html = md.render(fs.readFileSync(filename, 'utf8'));
      const path = filename
        .replace('md/', '')
        .replace('.md', '.html')
        .split('/')
        .join('.');

      fs.writeFileSync(`${staticPath}${path}`, html, 'utf8');

      md.meta.url = path
        .replace('.html', '')
        .split('.')
        .join('/');
      summary.push(md.meta);
    });
    // FIXME: なぜかJSON.stringifyを使うとエラーになってしまう。。serialize-javasciprtを使う
    fs.writeFileSync(`${staticPath}summary.json`, serialize(summary, { isJSON: true }), 'utf8');
  }
};
