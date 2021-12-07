<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-if="!fillHeight.includes($route.name)"
      fixed
      clipped
      color="green"
      v-model="drawer"
      right
      mobile-breakpoint="0"
      :width="$vuetify.breakpoint.name === 'xs' ? '101vw' : '280'"
    ></v-navigation-drawer> -->
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
            @click.stop="drawer = !drawer"
          >
            <v-icon v-if="menu" class="icon">$times</v-icon></v-app-bar-nav-icon
          >
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item class="pl-3">
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
      <DynamicMarquee class="mt-2" direction="row" reverse :hoverPause="true">
        <div class="d-flex justify-center">
          <span
            v-for="(item, index) in items"
            :key="index"
            style="color: white; margin-right: 100px"
          >
            {{ item }}</span
          >
        </div>
      </DynamicMarquee>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
import DynamicMarquee from "vue-dynamic-marquee";
export default {
  name: "App",
  components: { Snackbar, DynamicMarquee },

  created() {},
  watch: {
    $route() {
      console.log(this.$route.name);
      if (this.noWs.includes(this.$route.name)) {
        this.connection.close();
        this.connection = null;
      } else if (!this.connection) {
        this.connection = new WebSocket(
          "ws://ec2-3-8-48-95.eu-west-2.compute.amazonaws.com:3000/ws"
        );
        this.connection.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          this.wsData = data;
        };
        this.connection.onopen = function (event) {
          console.log(event);
        };
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
    wsData: {},
    items: [
      "a",
      "2",
      "3",
      "4",
      "1",
      "2",
      "b",
      "a",
      "2",
      "3",
      "4",
      "1",
      "2",
      "b",
    ],
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
      this.$store.dispatch("authentication/logout");
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
  transition-duration: 1s;
  transition-property: transform;
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
</style>
