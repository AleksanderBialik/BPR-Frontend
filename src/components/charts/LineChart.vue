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
  data() {
    return {
      datacollection: null,
      options: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      this.datacollection = {
        labels: months,
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40, 1],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "My First Dataset",
            data: [60, 1, 2, 31, 46, 5, 66, 2],
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
