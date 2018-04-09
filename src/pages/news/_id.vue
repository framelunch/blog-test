<template>
  <div v-html="content[this.$route.params.id]" />
</template>

<script>
/* global isNaN */
import { mapState, mapActions } from 'vuex'; //eslint-disable-line

const category = 'news';

export default {
  validate({ params }) {
    // TODO: 動的URLのバリデーション
    return true;
  },
  fetch({ payload, route, store }) {
    // asyncDataと同じく、fetchでもthisは使えない
    if (payload) {
      // generate only
      return store.commit('setContent', { category, id: route.params.id, data: payload });
    }
    return store.dispatch('getMdFile', { category, id: route.params.id });
  },
  layout: 'news',

  computed: mapState({
    content: state => state.contents[category],
  }),
};
</script>
