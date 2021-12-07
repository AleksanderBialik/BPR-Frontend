<template>
  <trading-vue
    style="margin: auto"
    :title-txt="name"
    :data="chart"
    ref="tradingVue"
  ></trading-vue>
</template>
<script>
import TradingVue from "trading-vue-js";

export default {
  name: "StocksChart",
  components: { TradingVue },
  props: ["values", "name", "type"],

  watch: {
    values() {
      this.chart.chart.data = this.values;
      this.$refs.tradingVue.resetChart();
    },
    type() {
      this.change();
    },
  },
  methods: {
    change() {
      this.chart.chart.type = this.type;
    },
  },
  data() {
    return {
      chart: {
        chart: {
          type: "Spline",
          data: [],
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
