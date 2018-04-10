<template>
  <div v-html="contents[$route.params.id].html" />
</template>

<script>
import { mapState } from 'vuex'; //eslint-disable-line

const target = 'news';

export default {
  layout: target,
  head() {
    const meta = this.contents[this.$route.params.id].meta || {};
    return {
      title: `${target} | ${meta.title}`,
    };
  },
  validate({ params }) {
    // TODO: 動的URLのバリデーション
    return params.id;
  },
  fetch({ payload, route, store }) {
    // asyncDataと同じく、fetchでもthisは使えない
    if (payload) {
      // generate only
      return store.commit('setContent', { target, id: route.params.id, data: payload });
    }
    return store.dispatch('getMdFile', { target, id: route.params.id });
  },
  computed: mapState({
    contents: state => state[target],
  }),
};
</script>
