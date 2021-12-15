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
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import RankingPage from "./pages/RankingPage";
import jwt_decode from "jwt-decode";
import store from "./store";

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ranking",
      name: "ranking",
      component: RankingPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      meta: {
        requiresAuth: true,
        isAdmin: true,
      },
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
    if (to.meta.isAdmin) {
      const { admin } = jwt_decode(window.localStorage.getItem("token"));
      if (admin) {
        next();
      } else {
        router.push("/home");
      }
    }
  } else {
    next();
  }
  next();
});

export default router;
