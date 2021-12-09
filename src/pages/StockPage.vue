<template>
  <v-row
    :class="{ position: stockCandles.length === 0 }"
    style="max-width: 1400px; margin: auto; background-color: white"
  >
    <v-col
      cols="12"
      :class="{
        'd-flex': true,
        'justify-space-between': true,
        'flex-column': $vuetify.breakpoint.mdAndDown,
      }"
    >
      <v-card
        :ripple="false"
        target="_blank"
        :href="stock.profile.weburl"
        width="30%"
        flat
        :class="{ 'flex-column': $vuetify.breakpoint.mdAndDown }"
      >
        <v-card
          :class="{ 'flex-column': $vuetify.breakpoint.mdAndDown }"
          flat
          class="d-flex justify-start align-start"
          ><v-card-title class="pb-0"
            ><v-img height="40px" width="40px" :src="stock.profile.logo"></v-img
            >{{ stock.profile.name }}</v-card-title
          >
        </v-card>
        <v-card-text class="py-0">{{ stock.profile.ticker }} </v-card-text>
        <v-card-text class="py-0">{{ stock.profile.exchange }}</v-card-text>
        <v-card-text class="pt-0">{{
          stock.profile.finnhubIndustry
        }}</v-card-text>
      </v-card>
      <v-card
        flat
        width="70%"
        class="d-flex justify-start"
        :class="{
          'flex-column': $vuetify.breakpoint.mdAndDown,
          'align-start': $vuetify.breakpoint.mdAndDown,
          'align-end': $vuetify.breakpoint.lgAndUp,
        }"
      >
        <v-card flat>
          <v-card-subtitle class="pb-1">Current price</v-card-subtitle>
          <v-card-text
            ><span style="font-size: 40px">{{ stock.stock.c }}</span>
            <span style="font-size: 20px">{{
              stock.profile.currency
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1">Change</v-card-subtitle>
          <v-card-text
            :class="{
              'red--text': stock.stock.c < stock.stock.pc,
              'green--text': stock.stock.c > stock.stock.pc,
            }"
            ><span style="font-size: 30px">{{ stock.stock.d }}</span>
            <span style="font-size: 30px">
              ({{ stock.stock.dp.toFixed(2) }}%)</span
            ></v-card-text
          >
        </v-card>

        <v-card flat>
          <v-card-subtitle class="pb-1">Today's high</v-card-subtitle>
          <v-card-text>
            <span style="font-size: 20px">{{ stock.stock.h }}</span>
            <span style="font-size: 10px">{{
              stock.profile.currency
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1">Today's low</v-card-subtitle>
          <v-card-text>
            <span style="font-size: 20px">{{ stock.stock.l }}</span>
            <span style="font-size: 10px">{{
              stock.profile.currency
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1">Market cap</v-card-subtitle>
          <v-card-text>
            <span style="font-size: 20px"
              >{{ stock.profile.marketCapitalization.toFixed(2) }}mln</span
            >
            <span style="font-size: 10px">{{
              stock.profile.currency
            }}</span></v-card-text
          >
        </v-card>
      </v-card>
    </v-col>
    <v-col ref="diagramCol" cols="12" v-show="stockCandles.length != 0">
      <StocksChart
        ref="chart"
        :width="diagramWidth"
        :values="stockCandles.ohlcv"
        :name="$route.params.stockSymbol"
      />
    </v-col>
    <v-col class="d-flex justify-center" cols="12">
      <v-btn @click="trade = !trade" class="ma-2 white--text" color="success"
        >Trading
      </v-btn>
    </v-col>
    <v-col v-if="trade" class="">
      <v-card flat class="d-flex justify-start align-end"
        ><div>
          <div class="d-flex justify-space-around pt-3">
            <div style="width: 50%">
              <v-select
                dense
                outlined
                label="Action"
                item-value="value"
                item-text="name"
                v-model="selectedAction"
                :items="actions"
                :menu-props="{ bottom: true, offsetY: true }"
              ></v-select>
            </div>
            <div style="width: 30%">
              <v-text-field
                type="number"
                label="Quantity"
                dense
                outlined
                v-model="quantity"
              ></v-text-field>
            </div>
          </div>
          <div>
            <v-card-actions class="d-flex justify-start pl-6"
              ><v-btn :disabled="selectedAction === null || quantity === null"
                >Order</v-btn
              >
              <v-btn @click="clear()">Clear</v-btn></v-card-actions
            >
          </div>
        </div>
      </v-card></v-col
    >
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
    this.$store.dispatch("stocks/fetchStock", this.$route.params.stockSymbol);
    window.addEventListener("resize", this.resizeHandler);
  },
  data() {
    return {
      diagramWidth: "",
      trade: false,
      actions: [
        { name: "Buy", value: "longBuy" },
        { name: "Sell", value: "longSell" },
        { name: "Short", value: "shortBuy" },
        { name: "Buy To Cover", value: "shortSell" },
      ],
      selectedAction: null,
      quantity: null,
    };
  },
  updated() {
    console.log(this.$refs.diagramCol.clientWidth);
    this.diagramWidth = this.$refs.diagramCol.clientWidth;
    this.$refs.chart.resetChart();
  },
  watch: {
    quantity() {
      if (this.quantity === "") {
        this.quantity = null;
      }
    },
    $route() {
      this.$store.dispatch(
        "stocks/fetchStockCandles",
        this.$route.params.stockSymbol
      );
      this.$store.dispatch("stocks/fetchStock", this.$route.params.stockSymbol);
    },
  },
  computed: {
    stockCandles() {
      return this.$store.getters["stocks/getStockCandles"];
    },
    stock() {
      return this.$store.getters["stocks/getStock"];
    },
  },
  methods: {
    resizeHandler() {
      this.diagramWidth = this.$refs.diagramCol.clientWidth;
    },
    clear() {
      this.selectedAction = null;
      this.quantity = null;
    },
  },
  destroyed() {
    this.$store.commit("stocks/SET_STOCK_CANDLES", []);
  },
};
</script>

<style lang="scss" scoped>
.v-card--link:before {
  background: none;
}
</style>
