import axios from 'axios';

export const state = () => ({
  summaries: [],
  news: {}, // targetごとにobject追加とする
});

export const mutations = {
  setSummaries(_state, summaries) {
    _state.summaries = summaries;
  },
  setContent(_state, { target, id, data }) {
    if (!_state[target]) return;
    const contents = { ..._state[target], [id]: data };
    _state[target] = contents;
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
      const data = fs.readFileSync(`${process.cwd()}/src/static/_contents/summaries.json`, 'utf8');
      commit('setSummaries', JSON.parse(data));
    }
  },
  async getMdFile({ state: _state, commit }, { target, id }) {
    if (!_state[target] || _state[target][id]) return;

    const url = process.server ? `http://localhost:${process.env.PORT}` : '';

    try {
      const { data } = await axios({
        method: 'get',
        url: `${url}/_contents/${target}.${id}`,
      });
      commit('setContent', { target, id, data });
    } catch (e) {
      // TODO: error handlingはどうすればいいのだろうか。。以下暫定的に
      commit('setContent', { target, id, data: {} });
    }
  },
};
