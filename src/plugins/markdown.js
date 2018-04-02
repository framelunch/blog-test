const attr = require('markdown-it-attrs');
const container = require('markdown-it-container');
const meta = require('markdown-it-meta');
const hljs = require('highlight.js');

const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  injected: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
})
  .use(attr)
  .use(meta)
  .use(container)
  .use(container, 'warning');

module.exports = md;
