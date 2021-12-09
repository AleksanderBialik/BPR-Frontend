<template>
  <v-app>
    <v-app-bar
      color="#00264d"
      app
      clipped-right
      v-if="!fillHeight.includes($route.name)"
    >
      <v-spacer></v-spacer>
      <v-btn
        to="/home"
        :color="route === 'home' ? selectedButton : buttonColor"
        plain
        class="py-6"
        ><v-icon>$house</v-icon> <span>Main Page</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="/stocks"
        plain
        class="py-6"
        :color="route === 'stocks' ? selectedButton : buttonColor"
        ><v-icon>$search</v-icon> <span>Research</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="/portfolio"
        :color="route === 'portfolio' ? selectedButton : buttonColor"
        plain
        class="py-6"
        ><v-icon>$user</v-icon> <span>Portfolio</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        plain
        class="py-6"
        :color="route === 'portfolio' ? selectedButton : buttonColor"
        ><v-icon>$cart</v-icon> <span>Trade</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-menu
        top
        v-model="menu"
        :close-on-click="closeOnClick"
        nudge-bottom="105"
        nudge-left="54"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            color="white"
            @click="icon = !menu"
            v-bind="attrs"
            v-on="on"
            style="color: black"
          >
            <v-icon v-if="menu" class="icon">$times</v-icon></v-app-bar-nav-icon
          >
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item :to="{ path: `/settings` }" class="pl-3">
              <v-icon medium class="pr-2">$gear</v-icon>
              <v-list-item-content>
                <v-list-item-title
                  >Settings</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
            <v-list-item class="pl-3" v-on:click="logout()">
              <v-icon medium class="pr-2">$logout</v-icon>
              <v-list-item-content
                ><v-list-item-title
                  >Logout</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main
      :class="{
        background: stonksBackground.includes(route),
        errorBackground: route === 'error',
      }"
    >
      <v-container
        fluid
        :fill-height="
          fillHeight.includes(route) || getStockPageInfo() || getNewsPageInfo()
        "
      >
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
    <Snackbar />
    <v-footer
      height="50"
      color="#00264d"
      app
      class="pl-0 pr-0"
      v-if="!fillHeight.includes(route)"
    >
      <DynamicMarquee
        v-if="wsData"
        class="mt-1"
        direction="row"
        reverse
        :hoverPause="true"
      >
        <div class="d-flex justify-center">
          <div
            v-for="(data, index) in wsData"
            :key="index"
            style="margin-right: 100px"
          >
            <v-chip
              :color="getChipColor(data.r)"
              :text-color="getChipTextColor(data.r)"
              style="width: 200px; cursor: pointer"
              class="justify-center"
              :to="{ path: `/stock/${data.s}` }"
            >
              <span style="font-size: 17px" class="mr-2 font-weight-bold">
                {{ data.s }}
              </span>
              <span style="font-size: 14px" class="mr-1">{{
                data.c.toFixed(2)
              }}</span>
              <span style="font-size: 13px d-flex justify-center"
                >({{ data.p.toFixed(2) }}%)</span
              >
            </v-chip>
          </div>
        </div>
      </DynamicMarquee>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
import DynamicMarquee from "vue-dynamic-marquee";
import { WS } from "./axios";
export default {
  name: "App",
  components: { Snackbar, DynamicMarquee },

  created() {
    if (!this.noWs.includes(this.$route.name)) {
      this.startWs();
    }
  },
  watch: {
    $route() {
      console.log(this.$route.name);
      if (this.noWs.includes(this.$route.name)) {
        this.closeWs();
      } else if (!this.connection) {
        this.startWs();
      }
    },
  },

  data: () => ({
    fillHeight: ["login", "register", "entry", "error", "accountCreated"],
    stonksBackground: ["login", "register", "accountCreated"],
    noWs: ["login", "entry", "register", "accountCreated"],
    drawer: false,
    selectedButton: "green",
    buttonColor: "white",
    connection: null,
    menu: "",
    wsData: null,
  }),
  computed: {
    route() {
      return this.$route.name;
    },
    stockCandles() {
      return this.$store.getters["stocks/getStockCandles"];
    },
    news() {
      return this.$store.getters["news/getNews"];
    },
  },
  methods: {
    logout() {
      this.menu = false;
      this.$store.dispatch("authentication/logout");
    },
    startWs() {
      this.connection = new WebSocket(WS);
      console.log("CONNECTED");
      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.wsData = data;
      };
    },
    closeWs() {
      this.connection.close();
      this.connection = null;
    },
    getStockPageInfo() {
      if (this.stockCandles.length === 0 && this.$route.name === "stock") {
        return true;
      } else false;
    },
    getNewsPageInfo() {
      if (this.news.length === 0 && this.$route.name === "home") {
        return true;
      } else false;
    },
    getChipColor(item) {
      if (item === -1) {
        return "#FF0000";
      } else if (item === 0) {
        return "white";
      } else {
        return "#02a119";
      }
    },
    getChipTextColor(item) {
      if (item === -1 || item === 1) {
        return "white";
      } else {
        return "black";
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/background.png");
  background-repeat: repeat;
}
.break {
  word-break: break-word;
}
html {
  overflow-y: auto;
}
.background {
  background-image: url("./assets/stonks.png");
  background-size: 100% 100%;
}
.errorBackground {
  background-image: url("./assets/notStonks.png");
  background-size: 100% 100%;
}
.titleText {
  font-size: 17em;
}
.position {
  position: absolute !important;
  margin-left: auto !important;
  margin-right: auto !important;
  left: 0 !important;
  right: 0 !important;
  text-align: center !important;
}
</style>

<style lang="scss" scoped>
::v-deep .v-btn__content {
  display: flex;
  flex-direction: column;
}
.icon {
  transition-duration: 0.5s;
  transition-property: transform;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
</style>
