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
        to="/ranking"
        :color="route === 'ranking' ? selectedButton : buttonColor"
        ><v-icon>$group</v-icon> <span>Ranking</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-menu
        top
        v-model="menu"
        :nudge-bottom="token && token.admin ? '155' : '105'"
        :nudge-left="token && token.admin ? '100' : '54'"
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
            <v-list-item
              v-if="token && token.admin"
              class="pl-3"
              v-on:click="$router.push('/admin')"
            >
              <v-icon medium class="pr-2">$admin</v-icon>
              <v-list-item-content
                ><v-list-item-title
                  >Admin Panel</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
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
        errorBackground: route === 'error',
      }"
    >
      <v-container
        fluid
        :fill-height="
          fillHeight.includes(route) || getStockPageInfo() || getNewsPageInfo()
        "
      >
        <v-btn
          v-if="!noFab.includes($route.name)"
          style="margin-left: 50px; margin-bottom: 100px"
          fixed
          bottom
          fab
          @click="globalModal = !globalModal"
          ><v-icon>$question</v-icon></v-btn
        >
        <v-fade-transition mode="out-in">
          <router-view> </router-view>
        </v-fade-transition>
        <v-dialog width="500" v-model="globalModal"
          ><v-card
            ><v-card-title>{{ getPageName() }}</v-card-title>
            <v-card-text>{{ getPageDescription() }}</v-card-text>
            <v-card-actions class="d-flex justify-center"
              ><v-btn @click="globalModal = false" color="success"
                >ok!</v-btn
              ></v-card-actions
            ></v-card
          ></v-dialog
        >
        <video
          autoplay
          muted
          loop
          id="myVideo"
          v-if="videoBackground.includes($route.name)"
        >
          <source src="./assets/video.mp4" type="video/mp4" />
        </video>
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
      if (this.noWs.includes(this.$route.name)) {
        this.closeWs();
      } else if (!this.connection) {
        this.startWs();
      }
    },
  },

  data: () => ({
    fillHeight: ["login", "register", "entry", "error", "accountCreated"],
    noFab: [
      "login",
      "register",
      "entry",
      "error",
      "accountCreated",
      "admin",
      "settings",
    ],
    videoBackground: ["login", "register", "entry", "accountCreated"],
    noWs: ["login", "entry", "register", "accountCreated"],
    drawer: false,
    selectedButton: "green",
    buttonColor: "white",
    connection: null,
    menu: "",
    wsData: null,
    globalModal: false,
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
    token() {
      return this.$store.getters["authentication/getToken"];
    },
  },
  methods: {
    getPageName() {
      const route = this.$route.name;
      if (route === "home") {
        return "Main Page";
      } else if (route === "stocks") {
        return "Stocks Page";
      } else if (route === "stock") {
        return "Stock Page";
      } else if (route === "portfolio") {
        return "Portfolio Page";
      } else if (route === "ranking") {
        return "Ranking Page";
      }
    },
    getPageDescription() {
      const route = this.$route.name;
      if (route === "home") {
        return "This is the main page on which you can find interesting news from the world of stocks";
      } else if (route === "stocks") {
        return "Currently you are on the stocks page! On this page you can find over 5 thousand various stocks from the NASDAQ stock market. If you want to know more about certain stock just click the row in the table and you will be transfered to the new page. Can't find the stock on the list? Type the company name or the stock symbol in the searchbar on the top";
      } else if (route === "stock") {
        return "Welcome to the stock page! On this page you can find a lot of informations regarding certain stock. Moreover you can also trade stocks here. Click the trading button and get right into it. More information about certain indicators, values etc. can be found after hovering the question marks";
      } else if (route === "portfolio") {
        return "Welcome to the most important page in the application! The Portfolio Page. Here you can see all of the informations regarding your purchases and performance. Many tables and charts are here to help you organise your work and give you insightful informations regarding your progress. To find more information abot certain indicators, values etc. hover the question marks";
      } else if (route === "ranking") {
        return "Welcome to the ranking page! Here you can see all of the best accounts and stocks that are most popular among players.";
      }
    },
    logout() {
      this.menu = false;
      this.$store.dispatch("authentication/logout");
    },
    startWs() {
      this.connection = new WebSocket(WS);
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

<style lang="scss">
@font-face {
  font-family: Chomsky;
  src: local("Chomsky"), url(./assets/Chomsky.otf) format("OpenType");
}
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
// .background {
//   background-image: url("./assets/stonks.png");
//   background-size: 100% 100%;
// }
.errorBackground {
  background-image: url("./assets/notStonks.png");
  background-size: 100% 100%;
}
.titleText {
  font-size: 17em;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.position {
  position: absolute !important;
  margin-left: auto !important;
  margin-right: auto !important;
  left: 0 !important;
  right: 0 !important;
  text-align: center !important;
}
.shadow {
  -webkit-box-shadow: 7px 8px 20px 7px #000000 !important;
  box-shadow: 7px 8px 20px 7px #000000 !important;
}
.headerColor {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.7567401960784313) 0%,
    rgba(0, 74, 255, 0.26934523809523814) 100%
  );
}
</style>

<style lang="scss" scoped>
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
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
