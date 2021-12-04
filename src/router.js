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
import jwt_decode from "jwt-decode";
import store from "./store";
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
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage,
    },
    {
      path: "/stocks",
      name: "stocks",
      component: StocksPage,
    },

    // {
    //   path: "/favourites",
    //   name: "favourites",
    //   component: FavouritesPage,
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
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
      router.push({ name: "home" });
      store.dispatch(
        "snackbar/setSnackbar",
        {
          color: "red",
          icon: "exclamation-triangle",
          message: "Log in to see your favourites list",
        },
        { root: true }
      );
      store.dispatch("snackbar/toggleSnackbar", true, { root: true });
    }
  } else {
    next();
  }
  next();
});

export default router;
