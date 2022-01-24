<template>
  <div class="small">
    <line-chart :options="options" :chartData="datacollection"></line-chart>
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
            borderColor: this.randomRgb(),
            tension: 0.1,
          },
        ],
      };
      if (this.statistics.name === "Amount of owned stocks") {
        this.options = {
          maintainAspectRatio: false,
        };
      } else {
        this.options = {
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    var formatter = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    });
                    return formatter.format(value);
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItems, data) {
                var formatter = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                });
                return (
                  data.datasets[0].label +
                  " : " +
                  formatter.format(tooltipItems.yLabel)
                );
              },
            },
          },
        };
      }
    },
    calculateStepSize() {
      let min = this.statistics.y[0];
      let max = 0;

      this.statistics.y.forEach((element) => {
        if (max < element) {
          max = element;
        }
      });
      this.statistics.y.forEach((element) => {
        if (min > element) {
          min = element;
        }
      });
      const diff = ((max - min) / 15).toFixed();
      return diff;
    },
    randomRgb() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
    },

    formatCurrency(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
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
