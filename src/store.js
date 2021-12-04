import Vue from "vue";
import Vuex from "vuex";
import snackbar from "./store/Snackbar/snackbar";
import authentication from "./store/Authentication/authentication";
import news from "./store/News/news";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { snackbar, authentication, news },
});
