<template>
  <v-row
    :class="{ position: stockCandles.length === 0 }"
    style="max-width: 1400px; margin: auto"
  >
    <v-col cols="12" v-show="stockCandles.length != 0">
      <StocksChart
        :values="stockCandles.ohlcv"
        :name="$route.params.stockSymbol"
        :type="chartType"
      />
      <v-btn
        @click="
          chartType === 'Candles'
            ? (chartType = 'Spline')
            : (chartType = 'Candles')
        "
      ></v-btn>
    </v-col>
    <div class="position" v-if="stockCandles.length === 0">
      <ProgressCircle :array="stockCandles" />
    </div>
  </v-row>
</template>
<script>
import ProgressCircle from "../components/ProgressCircle.vue";
import StocksChart from "../components/charts/StocksChart.vue";
export default {
  name: "StockPage",
  components: {
    StocksChart,
    ProgressCircle,
  },
  created() {
    this.$store.dispatch(
      "stocks/fetchStockCandles",
      this.$route.params.stockSymbol
    );
  },
  data() {
    return {
      chartType: "Candles",
    };
  },
  computed: {
    stockCandles() {
      return this.$store.getters["stocks/getStockCandles"];
    },
  },
  destroyed() {
    this.$store.commit("stocks/SET_STOCK_CANDLES", []);
  },
};
</script>

<style lang="scss" scoped></style>
