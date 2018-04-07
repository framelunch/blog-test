import axios from 'axios';

export const state = () => ({
  contents: {},
});

export const mutations = {
  setContent(_state, { category, id, data }) {
    const contents = { ..._state.contents[category], [id]: data };
    _state.contents[category] = contents;
  },
};

export const actions = {
  nuxtServerInit({ commit }, { isStatic, req }) {
    // FIXME: mdファイルを編集後、呼ばれるのでhtml変換処理を行う。開発中のみ。
    if (process.env.NODE_ENV === 'development' && process.server && !isStatic) {
      /**
       * TODO:
       * 全てのファイルを再変換ではなく、変更のあったファイルだけhtmlに変換したい
       * req.urlから判別できそうな気もする
       */
      require('../modules/convert')();
    }
  },
  async getMdFile({ state, commit }, { category, id }) {
    if (state.contents[category] && state.contents[category][id]) return;

    const url = process.server ? `http://localhost:${process.env.PORT}` : '';
    const { data } = await axios({
      method: 'get',
      url: `${url}/_contents/${category}-${id}.html`,
    });

    commit('setContent', { category, id, data: data });
  },
};
