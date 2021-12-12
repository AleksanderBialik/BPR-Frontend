<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12">
      <v-card class="shadow">
        <v-card-actions>
          <v-autocomplete
            color="black"
            v-model="stockSearch"
            :items="stocks"
            item-text="displaySymbol"
            :search-input.sync="search"
            prepend-icon="$search"
            :filter="filterObject"
          >
            <template v-slot:item="{ item }">
              <span class="font-weight-bold">{{ item.displaySymbol }}</span
              >&nbsp;&nbsp;
              {{ item.description }}
            </template></v-autocomplete
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col class="mt-3" cols="12">
      <v-data-table
        class="row-pointer shadow"
        @click:row="chooseStock"
        :loading="stocks.length === 0"
        loading-text="No stocks found!"
        :headers="stocksHeaders"
        :items="stocks"
        :search="stockSearch"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "StocksPage",
  components: {},
  created() {
    this.$store.dispatch("stocks/fetchStocks");
  },
  watch: {
    search() {
      if (this.search === "") this.stockSearch = null;
    },
  },
  data: () => ({
    stocksHeaders: [
      { text: "Symbol", value: "displaySymbol" },
      { text: "Type", value: "type" },
      { text: "Description", value: "description" },
    ],

    stockSearch: "",
    search: "",
  }),

  computed: {
    stocks() {
      return this.$store.getters["stocks/getStocks"];
    },
  },
  methods: {
    filterObject(item, queryText) {
      return (
        item.displaySymbol
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.description
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    chooseStock(data) {
      const stock = data.displaySymbol.split("/")[0];
      this.$router.push(`/stock/${stock}`);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {
  cursor: pointer;
}
</style>
