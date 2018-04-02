export const state = () => ({
  contents: {},
});

export const mutations = {
  setContents(_state, payload) {
    _state.contents = payload;
  },
};

export const actions = {
  nuxtServerInit({ commit }, context) {
    if (process.env.NODE_ENV === 'development' && process.server) {
      const md = require('../plugins/markdown');
      const globby = require('globby');
      const fs = require('fs');
      const contents = {};
      globby.sync('src/md/**/*').forEach(filename => {
        const data = md.render(fs.readFileSync(filename, 'utf8'));
        // TODO: ここでmd.metaで情報取れる
        contents[filename.replace('src/md', '').replace('.md', '')] = data;
      });

      commit('setContents', contents);
    }
  },
};
