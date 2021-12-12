<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12">
      <v-card><LineChart /></v-card>
    </v-col>
    <v-col cols="12"
      ><v-card height="100%"
        ><v-card flat>
          <v-card-subtitle class="pb-1">Cash</v-card-subtitle>
          <v-card-text
            ><span style="font-size: 30px">{{ portfolio.credits }}</span>
            <span style="font-size: 30px"> </span
          ></v-card-text> </v-card></v-card
    ></v-col>
    <v-col cols="12">
      <v-tabs v-model="tab">
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
              <template v-slot:[`item.p`]="{ item }">
                <span>{{ item.p }}USD</span>
              </template>
              <template v-slot:[`item.actions`]="{}">
                <div class="d-flex flex-column justify-center align-center">
                  <span>Buy</span>
                  <span>Sell</span>
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
            ></v-data-table></v-card
        ></v-tab-item>
      </v-tabs-items>
    </v-col>
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
  },
  data() {
    return {
      tab: "",
      longHeaders: [
        { text: "Stock", value: "s" },
        { text: "Transaction date", value: "d" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "cr" },
        { text: "Gain/Loss", value: "cr" },
        { text: "Trade Actions", value: "actions", sortable: false },
      ],
      shortHeaders: [
        { text: "Stock", value: "s" },
        { text: "Transaction date", value: "d" },
        { text: "Amount", value: "am" },
        { text: "Buying price", value: "p" },
        { text: "Current price", value: "p" },
        { text: "Gain/Loss", value: "cr" },
        { text: "Trade Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    portfolio() {
      return this.$store.getters["user/getPortfolio"];
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, HH:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped></style>
