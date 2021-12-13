import Vue from "vue";
import Vuex from "vuex";
import snackbar from "./store/Snackbar/snackbar";
import authentication from "./store/Authentication/authentication";
import news from "./store/News/news";
import stocks from "./store/Stocks/stocks";
import user from "./store/User/user";
import admin from "./store/Admin/admin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { snackbar, authentication, news, stocks, user, admin },
});
