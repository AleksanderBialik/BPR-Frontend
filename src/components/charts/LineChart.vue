<template>
  <div class="small">
    <line-chart :options="options" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  components: {
    LineChart,
  },
  props: ["statistics"],
  data() {
    return {
      datacollection: null,
      options: null,
    };
  },
  watch: {
    statistics() {
      this.fillData();
    },
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.statistics.x,
        datasets: [
          {
            label: this.statistics.name,
            data: this.statistics.y,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      this.options = {
        maintainAspectRatio: false,
      };
    },
  },
};
</script>

<style>
.small {
  position: relative;
  margin: auto;
  width: 100%;
}
</style>
