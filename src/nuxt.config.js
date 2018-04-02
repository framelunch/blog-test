const globby = require('globby');
const fs = require('fs');
const md = require('./plugins/markdown');

module.exports = {
  build: {
    vendor: ['animejs'],
    extend(config, { isServer }) {
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      });
    },
  },

  css: [
    { src: './assets/css/main.css', lang: 'postcss' },
    { src: 'highlight.js/styles/agate.css' },
  ],

  generate: {
    dir: 'public',
    routes() {
      let docs = [];
      globby.sync('src/md/**/*').forEach(filename => {
        const payload = md.render(fs.readFileSync(filename, 'utf8'));
        // TODO: ここでmd.metaで情報取れる
        docs.push({
          route: filename.replace('src/md', '').replace('.md', ''),
          payload,
        });
      });
      return docs;
    },
  },

  head: {
    title: 'nuxt-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: ['~/modules/mds'],

  plugins: ['~/plugins/global'],

  srcDir: 'src',
};
