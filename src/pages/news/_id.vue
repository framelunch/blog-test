<template>
  <div v-html="content[this.$route.params.id]"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
const category = 'news';

export default {
  validate({ params }) {
    return !isNaN(+params.id);
  },
  async fetch({ error, payload, route, store, app }) {
    // asyncDataと同じく、fetchでもthisは使えない
    if (payload) {
      // generate only
      store.commit('setContent', { category, id: route.params.id, data: payload });
    } else {
      return store.dispatch('getMdFile', { category, id: route.params.id });
    }
  },
  layout: 'news',

  computed: mapState({
    content: state => state.contents[category],
  }),
};
</script>
