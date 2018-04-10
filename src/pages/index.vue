<template>
  <section class="container">
    <div>
      <div>
        MAINイメージ
        <app-logo />
      </div>

      <div v-for="(item, index) in summary"
           :key="index">
        <p>{{ item.title }}</p>
        <nuxt-link :to="item.url">
          {{ $date(item.created_at, 'YYYY/MM/DD HH:mm') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'; //eslint-disable-line

export default {
  computed: mapState({
    summary: state => state.summary,
  }),
};
</script>
