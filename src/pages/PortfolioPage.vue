<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12">
      <v-card class="shadow">
        <div class="d-flex justify-start align-center">
          <v-card-title>Statistics</v-card-title>
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
        <LineChart :statistics="getStatistics()"
      /></v-card>
    </v-col>
    <v-col cols="12"
      ><v-card class="shadow">
        <v-card-title>Account details</v-card-title>
        <v-divider></v-divider>
        <v-card flat class="d-flex justify-start">
          <v-card flat>
            <v-card-subtitle class="pb-1">Cash</v-card-subtitle>
            <v-card-text
              ><span style="font-size: 30px"
                >{{ portfolio.credits }}<span style="font-size: 20px">USD</span>
              </span>
            </v-card-text></v-card
          >
          <v-card flat>
            <v-card-subtitle class="pb-1">Account value </v-card-subtitle>
            <v-card-text
              ><span style="font-size: 30px"
                >{{ portfolio.accountValue
                }}<span style="font-size: 20px">USD</span></span
              >
            </v-card-text></v-card
          ></v-card
        >
      </v-card></v-col
    >
    <v-col cols="12">
      <v-card class="shadow">
        <v-card-title>Holdings</v-card-title>
        <v-divider></v-divider>
        <v-tabs color="green" v-model="tab">
          <v-tab>Long</v-tab>
          <v-tab>Short</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            ><v-card
              ><v-data-table :headers="longHeaders" :items="portfolio.holdLong">
                <template v-slot:[`item.d`]="{ item }">
                  <span>{{ formatDate(item.d) }}</span>
                </template>
                <template v-slot:[`item.g`]="{ item }">
                  <div>
                    <div
                      :class="{
                        'red--text': item.g < 0,
                        'green--text': item.g > 0,
                      }"
                    >
                      {{ item.g.toFixed(2) }}$
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
                  <span>{{ item.p }}$</span>
                </template>
                <template v-slot:[`item.c`]="{ item }">
                  <span>{{ item.c }}$</span>
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
                <template v-slot:[`item.d`]="{ item }">
                  <span>{{ formatDate(item.d) }}</span>
                </template>
                <template v-slot:[`item.g`]="{ item }">
                  <div>
                    <div
                      :class="{
                        'red--text': item.g < 0,
                        'green--text': item.g > 0,
                      }"
                    >
                      {{ item.g.toFixed(2) }}$
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
                  <span>{{ item.p }}$</span>
                </template>
                <template v-slot:[`item.c`]="{ item }">
                  <span>{{ item.c }}$</span>
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
    <v-col md="6" cols="12"
      ><v-card class="shadow">
        <div class="d-flex justify-start align-center">
          <v-card-title>Trades</v-card-title>
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
            <span>{{ item.p }}$</span>
          </template></v-data-table
        ></v-card
      ></v-col
    >
    <v-col md="6" cols="12"
      ><v-card class="shadow"
        ><v-card-title>Pending Trades</v-card-title> <v-divider></v-divider
        ><v-data-table></v-data-table></v-card
    ></v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import LineChart from "../components/charts/LineChart.vue";
export default {
  name: "Portfolio",
  components: { LineChart },
  created() {
    this.$store.dispatch("user/fetchPortfolio");
    this.$store.dispatch("user/fetchStatistics");
  },
  data() {
    return {
      tab: "",
      longHeaders: [
        { text: "Stock", value: "s" },
        { text: "Transaction date", value: "d" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "c" },
        { text: "Gain/Loss", value: "g" },
        { text: "Trade Actions", value: "actions", sortable: false },
      ],
      shortHeaders: [
        { text: "Stock", value: "s" },
        { text: "Transaction date", value: "d" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "c" },
        { text: "Gain/Loss", value: "g" },
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
      ],
      statisticsType: "value",
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
        return this.portfolio.soldtStocks;
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.textChange:hover {
  text-decoration: underline;
  font-weight: bold;
  color: green;
  cursor: pointer;
}
</style>
