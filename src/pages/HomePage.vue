<template>
  <v-row
    :class="{ position: news.length === 0 }"
    style="max-width: 1400px; margin: auto"
    align-content="stretch"
  >
    <v-col class="text-center" v-show="news.length != 0"
      ><h1 class="header titleText">
        Stock New<span style="font-size: 65px">$</span>
      </h1></v-col
    >
    <v-col v-show="news.length != 0" cols="12"
      ><v-pagination
        circle
        :length="news.length % 9 > 0 ? news.length / 9 + 1 : news.length / 9"
        color="green"
        v-model="page"
      ></v-pagination
    ></v-col>
    <v-col
      v-show="news.length != 0"
      cols="12"
      sm="6"
      md="4"
      :class="{
        'column-margin':
          index + 1 == getSlicedNews().length &&
          ($vuetify.breakpoint.name === 'xs' ||
            $vuetify.breakpoint.name === 'sm') &&
          getSlicedNews().length % 2 != 0,
      }"
      v-for="(item, index) in getSlicedNews()"
      :key="index"
    >
      <NewsCard
        :title="item.headline"
        :src="item.image"
        :text="item.summary"
        :href="item.url"
        :source="item.source"
        :date="item.datetime"
      />
    </v-col>

    <v-col v-show="news.length != 0" cols="12"
      ><v-pagination
        circle
        color="green"
        :length="news.length % 9 > 0 ? news.length / 9 + 1 : news.length / 9"
        v-model="page"
      ></v-pagination
    ></v-col>
    <ProgressCircle :array="news"
  /></v-row>
</template>

<script>
import ProgressCircle from "../components/ProgressCircle.vue";
import NewsCard from "../components/NewsCard.vue";
export default {
  name: "HomePage",
  components: { NewsCard, ProgressCircle },
  created() {
    this.$store.dispatch("news/fetchNews");
  },
  computed: {
    news() {
      return this.$store.getters["news/getNews"];
    },
  },
  data: () => ({
    page: 1,
  }),
  watch: {
    page() {
      this.goUp();
    },
  },
  methods: {
    goUp() {
      window.scrollTo(0, 0);
    },
    getSlicedNews() {
      return this.news.slice(this.page * 9 - 9, this.page * 9);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  color: white;
  font-size: 90px;
  font-family: "Chomsky";
}
</style>
