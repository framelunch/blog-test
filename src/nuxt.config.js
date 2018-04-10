const globby = require('globby'); //eslint-disable-line
const fs = require('fs');

module.exports = {
  build: {
    babel: {
      presets: ['vue-app', 'flow'],
    },
    vendor: ['axios', 'animejs'],
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

  css: [{ src: './assets/css/main.css', lang: 'postcss' }, { src: 'highlight.js/styles/agate.css' }],

  generate: {
    dir: 'public',
    routes() {
      const docs = [];
      // FIXME: modules/convert.jsで対応する <- generate時にsummaryを出力するタイミングが欲しい
      globby.sync(['src/static/_contents/**/*', '!src/static/_contents/summary.json']).forEach(filename => {
        const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const path = filename
          .replace('src/static/_contents', '')
          .split('.')
          .join('/');
        docs.push({
          route: path,
          payload: data,
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
      { hid: 'description', name: 'description', content: 'Nuxt test' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: ['~/modules/convert', '~/modules/mds'],

  plugins: ['~/plugins/global'],

  srcDir: 'src',
};
