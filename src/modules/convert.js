const globby = require('globby');
const fs = require('fs');

const attr = require('markdown-it-attrs');
const container = require('markdown-it-container');
const meta = require('markdown-it-meta');
const hljs = require('highlight.js');
const md = require('markdown-it')({
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

module.exports = () => {
  globby.sync('md/**/*').forEach(filename => {
    const html = md.render(fs.readFileSync(filename, 'utf8'));
    const path = filename
      .replace('md/', '')
      .replace('.md', '.html')
      .split('/')
      .join('.');

    fs.writeFileSync(`${process.cwd()}/src/static/_contents/${path}`, html, 'utf8');
  });
};
