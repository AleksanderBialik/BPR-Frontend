<template>
  <v-row align-content="stretch">
    <v-col
      cols="6"
      sm="6"
      md="4"
      lg="4"
      xl="3"
      :class="{
        'column-margin':
          index + 1 == news.length &&
          ($vuetify.breakpoint.name === 'xs' ||
            $vuetify.breakpoint.name === 'sm') &&
          news.length % 2 != 0,
      }"
      v-for="(item, index) in news"
      :key="index"
    >
      <NewsCard
        :title="item.headline"
        :src="item.image"
        :text="item.summary"
        :href="item.url"
        :source="item.source"
      />
    </v-col>
  </v-row>
</template>

<script>
import NewsCard from "../components/NewsCard.vue";
export default {
  name: "HomePage",
  components: { NewsCard },
  created() {
    this.$store.dispatch("news/fetchNews");
  },
  computed: {
    news() {
      return this.$store.getters["news/getNews"];
    },
  },
};
</script>

<style></style>
