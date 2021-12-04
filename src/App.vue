<template>
  <v-app>
    <v-navigation-drawer
      v-if="!fillHeight.includes($route.name)"
      fixed
      clipped
      color="green"
      v-model="drawer"
      right
      mobile-breakpoint="0"
      :width="$vuetify.breakpoint.name === 'xs' ? '101vw' : '280'"
    ></v-navigation-drawer>
    <v-app-bar
      color="white"
      app
      clipped-right
      v-if="!fillHeight.includes($route.name)"
    >
      <v-spacer></v-spacer>
      <v-btn
        to="home"
        :color="route === 'home' ? buttonColor : ''"
        plain
        class="py-6"
        ><v-icon>$house</v-icon> <span>Main Page</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn plain class="py-6"
        ><v-icon>$search</v-icon> <span>Research</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="portfolio"
        :color="route === 'portfolio' ? buttonColor : ''"
        plain
        class="py-6"
        ><v-icon>$user</v-icon> <span>Portfolio</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="stocks"
        :color="route === 'stocks' ? buttonColor : ''"
        plain
        class="py-6"
        ><v-icon>$cart</v-icon> <span>Trade</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        style="color: black"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main
      :class="{
        background: stonksBackground.includes(route),
        errorBackground: route === 'error',
      }"
    >
      <v-container :fill-height="fillHeight.includes(route)">
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
    <Snackbar />
    <v-footer padless app v-if="!fillHeight.includes(route)"
      ><v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>StockX</strong>
      </v-col></v-footer
    >
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",
  components: { Snackbar },

  data: () => ({
    fillHeight: ["login", "register", "entry", "error", "accountCreated"],
    stonksBackground: ["login", "register", "accountCreated"],
    drawer: false,
    buttonColor: "green",
  }),
  computed: {
    route() {
      return this.$route.name;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #56d1f1;
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
</style>

<style lang="scss" scoped>
::v-deep .v-btn__content {
  display: flex;
  flex-direction: column;
}
</style>
