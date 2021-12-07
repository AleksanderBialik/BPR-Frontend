<template>
  <v-row>
    <v-col cols="12">
      <StocksChart />
    </v-col>
  </v-row>
</template>
<script>
import StocksChart from "../components/charts/StocksChart.vue";

export default {
  name: "Portfolio",
  components: {
    StocksChart,
  },
};
</script>

<style lang="scss" scoped></style>
