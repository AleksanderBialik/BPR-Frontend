import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/vee-validate";
import Tooltip from "./components/Tooltip";

Vue.config.productionTip = false;
Vue.component("tooltip", { Tooltip });

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
