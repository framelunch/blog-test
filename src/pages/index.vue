<template>
  <section class="container">
    <div>
      <div>
        MAINイメージ
        <app-logo />
      </div>
      <div>{{ JSON.stringify(metas) }}</div>
      <div>
        nuxt-link:
        <nuxt-link to="/news/20180329/">news: 2018/03/29</nuxt-link>
      </div>
      <div>
        a:
        <a href="/news/20180329">news: 2018/03/29</a>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { metas: this.$store.state.metas };
  },
};
</script>
