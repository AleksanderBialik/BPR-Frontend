<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12">
      <v-card class="shadow">
        <v-card-title class="headerColor font-weight-bold"
          >Search for stocks</v-card-title
        >
        <v-divider></v-divider>
        <v-card-actions>
          <v-text-field
            v-model="search"
            prepend-icon="$search"
            color="green"
          ></v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col class="mt-3" cols="12">
      <v-card class="shadow">
        <v-card-title class="headerColor font-weight-bold">Stocks</v-card-title>
        <v-divider></v-divider>
        <v-data-table
          class="row-pointer"
          @click:row="chooseStock"
          :loading="stocks.length === 0"
          loading-text="No stocks found!"
          :headers="stocksHeaders"
          :items="stocks"
          :search="search"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50],
          }"
        ></v-data-table>
      </v-card>
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
      const stocks = this.$store.getters["stocks/getStocks"];
      const sortedStocks = stocks.sort((a, b) =>
        a.symbol.localeCompare(b.symbol)
      );
      return sortedStocks;
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
