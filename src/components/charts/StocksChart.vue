<template>
  <div>
    <v-btn
      class="ml-2 mt-2"
      fab
      icon
      absolute
      :color="buttonColor"
      small
      style="z-index: 99999"
      @click="change()"
    >
      <v-icon>$eye</v-icon></v-btn
    >
    <tooltip
      color="white"
      cls
      bottom
      medium
      absolute
      text="O: Opening price of the day</br> H: Highest price of the day</br> L: Lowest price of the day</br> C: Closing price of the day</br> V: Volume- it is simply the number of shares traded in a particular stock, index, or other investment over a specific period of time."
    />
    <trading-vue
      :width="width - 24"
      style="margin-left: auto; margin-right: auto"
      :title-txt="name"
      :data="chart"
      ref="tradingVue"
      :toolbar="true"
    ></trading-vue>
  </div>
</template>
<script>
import Tooltip from "../Tooltip.vue";
import TradingVue from "trading-vue-js";

export default {
  name: "StocksChart",
  components: { TradingVue, Tooltip },
  props: ["values", "name", "type", "width"],

  watch: {
    values() {
      this.resetChart();
    },
    type() {
      this.change();
    },
  },
  methods: {
    change() {
      if (this.chart.chart.type === "Candles") {
        this.chart.chart.type = "Spline";
        this.buttonColor = "green";
      } else {
        this.chart.chart.type = "Candles";
        this.buttonColor = "red";
      }
    },
    resetChart() {
      this.chart.chart.data = this.values;
      this.$refs.tradingVue.resetChart();
    },
    setData() {
      this.chart.chart.data = this.values;
    },
  },
  data() {
    return {
      chart: {
        chart: {
          type: "Candles",
          data: [],
        },
      },
      buttonColor: "red",
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .trading-vue-toolbar {
  z-index: 1 !important;
}
</style>
