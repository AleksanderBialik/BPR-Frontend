<template>
  <v-row
    :class="{ position: stockCandles.length === 0 }"
    class="shadow"
    style="
      max-width: 1400px;
      margin: auto;
      background-color: white;
      border-radius: 4px;
    "
    :justify="isEmpty() ? 'center' : ''"
  >
    <v-col cols="6" v-if="isEmpty()"
      ><v-card class="justify-center d-flex" flat
        ><v-card-title>This stock has no data. Sorry!</v-card-title></v-card
      ></v-col
    >
    <v-col
      v-if="!isEmpty()"
      cols="12"
      :class="{
        'd-flex': true,
        'justify-space-between': true,
        'flex-column': $vuetify.breakpoint.mdAndDown,
      }"
    >
      <v-card
        :ripple="false"
        width="30%"
        flat
        :class="{ 'flex-column': $vuetify.breakpoint.mdAndDown }"
      >
        <v-card
          :class="{ 'flex-column': $vuetify.breakpoint.mdAndDown }"
          flat
          class="d-flex justify-start align-start"
        >
          <a target="_blank" :href="stock.profile.weburl"
            ><v-card-title class="pb-0"
              ><v-img
                v-if="stock.profile.logo != ''"
                contain
                height="40px"
                width="40px"
                :src="stock.profile.logo"
              ></v-img>
              <v-img
                v-else
                contain
                height="40px"
                width="40px"
                src="../assets/noimage.png"
              ></v-img
              ><span class="ml-2">{{ stock.profile.name }}</span></v-card-title
            >
          </a>
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
          <v-card-subtitle class="pb-1"
            >Current price <tooltip
          /></v-card-subtitle>
          <v-card-text
            ><span style="font-size: 40px">{{
              formatCurrency(stock.stock.c)
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1">Change <tooltip /></v-card-subtitle>
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
          <v-card-subtitle class="pb-1"
            >Today's high <tooltip
          /></v-card-subtitle>
          <v-card-text>
            <span style="font-size: 20px">{{
              formatCurrency(stock.stock.h)
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1"
            >Today's low <tooltip
          /></v-card-subtitle>
          <v-card-text>
            <span style="font-size: 20px">{{
              formatCurrency(stock.stock.l)
            }}</span></v-card-text
          >
        </v-card>
        <v-card flat>
          <v-card-subtitle class="pb-1">Market cap <tooltip /></v-card-subtitle>
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
    <v-col
      v-if="!isEmpty()"
      ref="diagramCol"
      cols="12"
      v-show="stockCandles.length != 0"
    >
      <StocksChart
        ref="chart"
        :width="diagramWidth"
        :values="stockCandles.ohlcv"
        :name="$route.params.stockSymbol"
      />
    </v-col>
    <v-col v-if="!isEmpty()" cols="12">
      <v-card flat class="d-flex justify-center"
        ><v-card-title
          >Currently you have
          {{ stock.hold.holdLong.length > 0 ? stock.hold.holdLong[0].am : "0" }}
          long and
          {{
            stock.hold.holdShort.length > 0 ? stock.hold.holdShort[0].am : "0"
          }}
          short positions of {{ $route.params.stockSymbol }} stock</v-card-title
        ></v-card
      ></v-col
    >
    <v-col v-if="!isEmpty()" class="d-flex justify-center" cols="12">
      <v-btn @click="trade = !trade" class="ma-2 white--text" color="success">
        <span
          ><span>Trading</span>
          <v-icon dense class="ml-1" :class="{ flip: trade }"> $up </v-icon>
        </span>
      </v-btn>
    </v-col>
    <v-col v-if="trade && !isEmpty()">
      <v-card-title class="pl-0 pb-0"
        >Cash: {{ formatCurrency(stock.credits) }}</v-card-title
      >
      <v-card flat class="d-flex justify-start align-end"
        ><div style="width: 100%">
          <div style="width: 50%" class="d-flex justify-space-around pt-3">
            <div style="width: 70%" class="d-flex flex-row align-center">
              <v-select
                hide-details=""
                item-color="green"
                dense
                outlined
                label="Action"
                item-value="value"
                color="black"
                item-text="name"
                v-model="selectedAction"
                :items="actions"
                :menu-props="{ bottom: true, offsetY: true }"
              ></v-select>
              <tooltip />
            </div>
            <!-- <div class="ml-3" style="width: 30%">
              <tooltip />
              <v-select
                item-color="green"
                dense
                outlined
                label="Order Type"
                item-value="value"
                color="black"
                item-text="name"
                v-model="orderType"
                :items="orderTypes"
                :menu-props="{ bottom: true, offsetY: true }"
              ></v-select>
            </div>
            <div
              v-if="orderType != 'market' && orderType != null"
              class="ml-3"
              style="width: 20%"
            >
              <tooltip />
              <v-text-field
                type="number"
                label="Price"
                color="black"
                dense
                outlined
                v-model.number="price"
              ></v-text-field>
            </div> -->
            <div class="ml-6 d-flex flex-row align-center" style="width: 30%">
              <v-text-field
                hide-details
                type="number"
                label="Quantity"
                color="black"
                dense
                outlined
                v-model.number="quantity"
              ></v-text-field>
              <tooltip
                text="dsakndb  dsadasd asdnsajk ndasdasd sad asd as as dasd sandjaskl ndsjlakndl"
              />
            </div>
          </div>
          <div>
            <v-card-actions class="d-flex justify-start pl-0"
              ><v-btn
                color="success"
                @click="placeOrder()"
                :disabled="selectedAction === null || quantity === null"
                >Trade</v-btn
              >
              <v-btn @click="clear()">Clear</v-btn>
              <v-card-text
                ><span style="font-size: 17px">Total: </span>
                <span style="font-weight: bold">{{
                  quantity ? formatCurrency(quantity * stock.stock.c) : "0"
                }}</span></v-card-text
              ></v-card-actions
            >
          </div>
        </div>
      </v-card></v-col
    >
    <div class="position" v-if="stockCandles.length === 0 && !isEmpty()">
      <ProgressCircle :array="stockCandles" />
    </div>
  </v-row>
</template>
<script>
import ProgressCircle from "../components/ProgressCircle.vue";
import StocksChart from "../components/charts/StocksChart.vue";
import Tooltip from "../components/Tooltip.vue";
export default {
  name: "StockPage",
  components: {
    StocksChart,
    ProgressCircle,
    Tooltip,
  },
  created() {
    this.$store.dispatch(
      "stocks/fetchStockCandles",
      this.$route.params.stockSymbol
    );
    this.$store.dispatch("stocks/fetchStock", this.$route.params.stockSymbol);
    window.addEventListener("resize", this.resizeHandler);
    this.checkQuery();
  },
  data() {
    return {
      diagramWidth: "",
      trade: false,
      actions: [
        { name: "Buy", value: "longBuy" },
        { name: "Sell", value: "longSell" },
        { name: "Short", value: "shortSell" },
        { name: "Buy To Cover", value: "shortCover" },
      ],
      orderTypes: [
        { name: "Limit", value: "limit" },
        { name: "Market", value: "market" },
        { name: "Stop Limit", value: "stopLimit" },
      ],
      selectedAction: null,
      orderType: null,
      quantity: null,
      price: null,
    };
  },
  updated() {
    this.diagramWidth = this.$refs.diagramCol.clientWidth;
    this.$refs.chart.setData();
  },
  watch: {
    quantity() {
      if (this.quantity === "") {
        this.quantity = null;
      }
      if (this.quantity < 0) {
        this.quantity = this.quantity * -1;
      }
      // if (this.quantity === 0) {
      //   this.quantity = "";
      // }
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
    placeOrder() {
      let object = {
        symbol: "",
        amount: 0,
        type: "",
        action: "",
      };
      object.symbol = this.$route.params.stockSymbol;
      object.amount = this.quantity;
      if (this.selectedAction === "longBuy") {
        object.type = "long";
        object.action = "buy";
      } else if (this.selectedAction === "longSell") {
        object.type = "long";
        object.action = "sell";
      } else if (this.selectedAction === "shortSell") {
        object.type = "short";
        object.action = "sell";
      } else {
        object.type = "short";
        object.action = "cover";
      }
      this.$store.dispatch("stocks/tradeStocks", object);
      this.selectedAction = null;
      this.orderType = null;
      this.price = null;
      this.quantity = null;
    },
    resizeHandler() {
      this.diagramWidth = this.$refs.diagramCol.clientWidth;
    },
    clear() {
      this.selectedAction = null;
      this.quantity = null;
    },
    checkQuery() {
      if (this.$route.query.action) {
        this.trade = true;
        const action = this.$route.query.action;
        if (action === "Buy") {
          this.selectedAction = "longBuy";
        } else if (action === "Sell") {
          this.selectedAction = "longSell";
        } else if (action === "Short") {
          this.selectedAction = "shortSell";
        } else if (action === "Cover") {
          this.selectedAction = "shortCover";
        }
      }
    },
    isEmpty() {
      return Object.keys(this.stock.profile).length === 0;
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
  destroyed() {
    this.$store.commit("stocks/SET_STOCK_CANDLES", []);
  },
};
</script>

<style lang="scss" scoped>
.v-card--link:before {
  background: none;
}
a {
  text-decoration: none;
  color: black !important;
}
.flip {
  transform: rotateX(180deg);
}
</style>
