import Vue from "vue";
import Router from "vue-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import EntryPage from "./pages/EntryPage";
import AccountCreatedPage from "./pages/AccountCreatedPage";
import PortfolioPage from "./pages/PortfolioPage";
import StocksPage from "./pages/StocksPage";
import StockPage from "./pages/StockPage";
import jwt_decode from "jwt-decode";
import store from "./store";
// import store from "./store";
// import moment from "moment";
// import axios from "./axios"

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: { name: "entry" },
    },
    {
      path: "/entry",
      name: "entry",
      component: EntryPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/accountCreated",
      name: "accountCreated",
      component: AccountCreatedPage,
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/stocks",
      name: "stocks",
      component: StocksPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/stock/:stockSymbol",
      name: "stock",
      component: StockPage,
    },
    {
      path: "*",
      name: "error",
      component: ErrorPage,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      jwt_decode(window.localStorage.getItem("token"));
    } catch (err) {
      store.dispatch("authentication/logout");
    }
  } else {
    next();
  }
  next();
});

export default router;
