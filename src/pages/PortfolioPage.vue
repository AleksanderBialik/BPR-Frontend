<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12">
      <v-card class="shadow">
        <div class="d-flex justify-start align-center headerColor">
          <v-card-title class="font-weight-bold">Statistics</v-card-title>

          <v-card-actions>
            <v-select
              item-color="green"
              hide-details
              dense
              outlined
              label="Statistics type"
              item-value="value"
              color="black"
              item-text="name"
              v-model="statisticsType"
              :items="statisticsTypes"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select
          ></v-card-actions>
        </div>
        <v-divider></v-divider>
        <LineChart :statistics="getStatistics()"
      /></v-card>
    </v-col>
    <v-col cols="12"
      ><v-card class="shadow">
        <v-card-title class="headerColor font-weight-bold"
          >Account details</v-card-title
        >
        <v-divider></v-divider>
        <v-card flat class="d-flex justify-start">
          <v-card flat>
            <v-card-subtitle class="pb-1"
              >Cash
              <tooltip text="Total amount of cash that is available for trades"
            /></v-card-subtitle>
            <v-card-text
              ><span style="font-size: 30px; color: black"
                >{{ formatCurrency(portfolio.credits) }}
              </span>
            </v-card-text></v-card
          >
          <v-card flat>
            <v-card-subtitle class="pb-1"
              >Account value <tooltip text="Total value of your portfolio" />
            </v-card-subtitle>
            <v-card-text
              ><span style="font-size: 30px; color: black">{{
                formatCurrency(portfolio.accountValue)
              }}</span>
            </v-card-text></v-card
          >
          <v-card flat>
            <v-card-subtitle class="pb-1"
              >Total Gain/Loss
              <tooltip text="Total gains/loses of all your positions"
            /></v-card-subtitle>

            <v-card-text
              ><span
                :class="{
                  'red--text': getTotalGainLoss() < 0,
                  'green--text': getTotalGainLoss() > 0,
                }"
                style="font-size: 30px; color: black"
                >{{ formatCurrency(getTotalGainLoss()) }}</span
              >
            </v-card-text></v-card
          ></v-card
        >
      </v-card></v-col
    >
    <v-col cols="12">
      <v-card class="shadow">
        <v-card-title class="headerColor font-weight-bold"
          >Holdings</v-card-title
        >
        <v-divider></v-divider>
        <v-tabs color="green" v-model="tab">
          <v-tab>Long</v-tab>
          <v-tab>Short</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            ><v-card
              ><v-data-table :headers="longHeaders" :items="portfolio.holdLong">
                <template v-slot:[`item.g`]="{ item }">
                  <div>
                    <div
                      :class="{
                        'red--text': item.g < 0,
                        'green--text': item.g > 0,
                      }"
                    >
                      {{ formatCurrency(item.g) }}
                    </div>
                    <div
                      :class="{
                        'red--text': item.gp < 0,
                        'green--text': item.gp > 0,
                      }"
                    >
                      {{ item.gp.toFixed(2) }}%
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.p`]="{ item }">
                  <span>{{ formatCurrency(item.p) }}</span>
                </template>
                <template v-slot:[`item.c`]="{ item }">
                  <span>{{ formatCurrency(item.c) }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <div class="pl-1">
                    <div class="textChange" @click="buyLong(item)">
                      Buy More
                    </div>
                    <div class="textChange" @click="sellLong(item)">Sell</div>
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item
            ><v-card
              ><v-data-table
                :headers="shortHeaders"
                :items="portfolio.holdShort"
              >
                <template v-slot:[`item.g`]="{ item }">
                  <div>
                    <div
                      :class="{
                        'red--text': item.g < 0,
                        'green--text': item.g > 0,
                      }"
                    >
                      {{ formatCurrency(item.g) }}
                    </div>
                    <div
                      :class="{
                        'red--text': item.gp < 0,
                        'green--text': item.gp > 0,
                      }"
                    >
                      {{ item.gp.toFixed(2) }}%
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.p`]="{ item }">
                  <span>{{ formatCurrency(item.p) }}$</span>
                </template>
                <template v-slot:[`item.c`]="{ item }">
                  <span>{{ formatCurrency(item.c) }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <div class="pl-1">
                    <div class="textChange" @click="shortMore(item)">
                      Short More
                    </div>
                    <div class="textChange" @click="buyToCover(item)">
                      Buy To Cover
                    </div>
                  </div>
                </template></v-data-table
              ></v-card
            ></v-tab-item
          >
        </v-tabs-items>
      </v-card>
    </v-col>
    <v-col cols="12"
      ><v-card class="shadow">
        <div class="d-flex justify-start align-center headerColor">
          <v-card-title class="font-weight-bold">Trades History</v-card-title>
          <v-card-actions>
            <v-select
              item-color="green"
              hide-details
              dense
              outlined
              label="Trade type"
              item-value="value"
              color="black"
              item-text="name"
              v-model="tradeType"
              :items="tradeTypes"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select
          ></v-card-actions>
        </div>
        <v-divider></v-divider>
        <v-data-table :headers="tradeHeaders" :items="getTradeType()">
          <template v-slot:[`item.d`]="{ item }">
            <span>{{ formatDate(item.d) }}</span>
          </template>
          <template v-slot:[`item.p`]="{ item }">
            <span>{{ formatCurrency(item.p) }}</span>
          </template></v-data-table
        ></v-card
      ></v-col
    >
  </v-row>
</template>
<script>
import moment from "moment";
import LineChart from "../components/charts/LineChart.vue";
import Tooltip from "../components/Tooltip.vue";
export default {
  name: "Portfolio",
  components: { LineChart, Tooltip },
  created() {
    this.$store.dispatch("user/fetchPortfolio");
    this.$store.dispatch("user/fetchStatistics");
  },
  data() {
    return {
      tab: "",
      longHeaders: [
        { text: "Stock", value: "s" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "c" },
        { text: "Total Gain/Loss", value: "g" },
        { text: "Trade Actions", value: "actions", sortable: false },
      ],
      shortHeaders: [
        { text: "Stock", value: "s" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "c" },
        { text: "Total Gain/Loss", value: "g" },
        {
          text: "Trade Actions",
          value: "actions",
          sortable: false,
          width: "200px",
        },
      ],
      tradeHeaders: [
        { text: "Stock", value: "s" },
        { text: "Transaction date", value: "d" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
      ],
      tradeTypes: [
        { name: "Bought", value: "bought" },
        { name: "Sold", value: "sold" },
        { name: "Shorted", value: "shorted" },
        { name: "Bought to cover", value: "cover" },
      ],
      statisticsTypes: [
        { name: "Account value", value: "value" },
        { name: "Credits", value: "credits" },
        { name: "Amount of owned stocks", value: "stocks" },
        { name: "Total gain/loss", value: "gain/loss" },
      ],
      statisticsType: "",
      tradeType: "bought",
    };
  },
  computed: {
    portfolio() {
      return this.$store.getters["user/getPortfolio"];
    },
    statistics() {
      return this.$store.getters["user/getStatistics"];
    },
  },
  updated() {
    if (this.statisticsType === "") {
      this.statisticsType = "value";
    }
  },
  watch: {
    statistics() {
      this.count += 1;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, HH:mm:ss");
    },
    buyLong(item) {
      this.$router.push(`/stock/${item.s}?action=Buy`);
    },
    sellLong(item) {
      this.$router.push(`/stock/${item.s}?action=Sell`);
    },
    shortMore(item) {
      this.$router.push(`/stock/${item.s}?action=Short`);
    },
    buyToCover(item) {
      this.$router.push(`/stock/${item.s}?action=Cover`);
    },
    getTradeType() {
      if (this.tradeType === "bought") {
        return this.portfolio.boughtStocks;
      } else if (this.tradeType === "sold") {
        return this.portfolio.soldStocks;
      } else if (this.tradeType === "shorted") {
        return this.portfolio.shortStocks;
      } else if (this.tradeType === "cover") {
        return this.portfolio.boughtToCover;
      }
    },
    getStatistics() {
      if (this.statisticsType === "value") {
        return this.statistics[0];
      } else if (this.statisticsType === "credits") {
        return this.statistics[1];
      } else if (this.statisticsType === "stocks") {
        return this.statistics[2];
      } else if (this.statisticsType === "gain/loss") {
        return this.statistics[3];
      }
    },
    formatCurrency(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    getTotalGainLoss() {
      let total = 0;
      for (let i = 0; i < this.portfolio.holdLong.length; i++) {
        total += this.portfolio.holdLong[i].g;
      }
      for (let i = 0; i < this.portfolio.holdShort.length; i++) {
        total += this.portfolio.holdShort[i].g;
      }
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
.textChange:hover {
  text-decoration: underline;
  cursor: pointer;
}
.textChange {
  font-weight: bold;
  color: green;
}
</style>
