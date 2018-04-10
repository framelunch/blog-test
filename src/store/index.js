import axios from 'axios';

export const state = () => ({
  summary: [],
  contents: {},
});

export const mutations = {
  setSummary(_state, summary) {
    _state.summary = summary;
  },
  setContent(_state, { category, id, data }) {
    const contents = { ..._state.contents[category], [id]: data };
    _state.contents[category] = contents;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { isStatic }) {
    // FIXME: mdファイルを編集後、呼ばれるのでhtml変換処理を行う。開発中のみ。
    if (process.env.NODE_ENV === 'development' && process.server && !isStatic) {
      /**
       * TODO:
       * 全てのファイルを再変換ではなく、変更のあったファイルだけhtmlに変換したい
       * req.urlから判別できそうな気もする
       */
      require('../modules/convert')({ isDev: true }); //eslint-disable-line
    }

    if (process.server) {
      const fs = require('fs'); //eslint-disable-line
      const data = fs.readFileSync(`${process.cwd()}/src/static/_contents/summary.json`, 'utf8');
      commit('setSummary', JSON.parse(data));
    }
  },
  async getMdFile({ state: _state, commit }, { category, id }) {
    if (_state.contents[category] && _state.contents[category][id]) return;

    const url = process.server ? `http://localhost:${process.env.PORT}` : '';
    const { data } = await axios({
      method: 'get',
      url: `${url}/_contents/${category}.${id}.html`,
    });

    commit('setContent', { category, id, data });
  },
};
