<template>
  <div>
    <div v-html="data"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  validate({ params }) {
    return !isNaN(+params.id);
  },
  asyncData({ error, payload, route, store, app }) {
    if (payload) {
      return { data: payload };
    }
    return { data: store.state.contents[route.path] };
  },
  layout: 'news',
  data() {
    return { data: 'test' };
  },
};
</script>
