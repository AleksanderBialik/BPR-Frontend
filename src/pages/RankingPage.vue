<template>
  <v-row style="max-width: 1400px; margin: auto">
    <v-col cols="12"
      ><v-card
        ><v-card-title class="headerColor font-weight-bold"
          >User ranking</v-card-title
        >
        <v-divider></v-divider
        ><v-data-table :headers="users" :items="ranking.accountValue"
          ><template v-slot:[`item.accountValue`]="{ item }">
            <span>{{ formatCurrency(item.accountValue) }}</span>
          </template>
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ ranking.accountValue.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:item="{ item }">
            <tr>
              <td
                :class="{
                  gold: ranking.accountValue.indexOf(item) === 0,
                  silver: ranking.accountValue.indexOf(item) === 1,
                  bronze: ranking.accountValue.indexOf(item) === 2,
                }"
              >
                {{ ranking.accountValue.indexOf(item) + 1 }}
                <v-icon v-if="ranking.accountValue.indexOf(item) === 0"
                  >$trophy</v-icon
                >
                <v-icon v-if="ranking.accountValue.indexOf(item) === 1"
                  >$medal</v-icon
                >
                <v-icon v-if="ranking.accountValue.indexOf(item) === 2"
                  >$medal</v-icon
                >
              </td>
              <td
                :class="{
                  gold: ranking.accountValue.indexOf(item) === 0,
                  silver: ranking.accountValue.indexOf(item) === 1,
                  bronze: ranking.accountValue.indexOf(item) === 2,
                }"
              >
                {{ item.username }}
              </td>
              <td
                :class="{
                  gold: ranking.accountValue.indexOf(item) === 0,
                  silver: ranking.accountValue.indexOf(item) === 1,
                  bronze: ranking.accountValue.indexOf(item) === 2,
                }"
              >
                {{ formatCurrency(item.accountValue) }}
              </td>
            </tr>
          </template>
        </v-data-table></v-card
      ></v-col
    >
    <v-col cols="12"
      ><v-card
        ><v-card-title class="headerColor font-weight-bold"
          >Popular stocks</v-card-title
        >
        <v-divider></v-divider
        ><v-data-table
          class="row-pointer"
          :headers="stocks"
          :items="ranking.stockAmount"
          @click:row="chooseStock"
        >
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ ranking.stockAmount.indexOf(item) + 1 }}</span>
          </template></v-data-table
        ></v-card
      ></v-col
    >
  </v-row>
</template>

<script>
export default {
  name: "RankingPage",
  created() {
    this.$store.dispatch("ranking/fetchRanking");
  },
  computed: {
    ranking() {
      return this.$store.getters["ranking/getRanking"];
    },
  },
  data() {
    return {
      users: [
        { text: "#", value: "index", sortable: false },
        { text: "Username", value: "username", sortable: false },
        { text: "Account value", value: "accountValue" },
      ],
      stocks: [
        { text: "#", value: "index", sortable: false },
        { text: "Symbol", value: "symbol", sortable: false },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    chooseStock(data) {
      this.$router.push(`/stock/${data.symbol}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.gold {
  background-color: rgb(254, 225, 1) !important;
}
.silver {
  background-color: rgb(215, 215, 215) !important;
}
.bronze {
  background-color: rgb(130, 74, 2) !important;
}
::v-deep .row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {
  cursor: pointer;
}
</style>
