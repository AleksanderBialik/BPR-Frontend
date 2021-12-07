import axios from "../../axios";
// import router from "../../router";
// import jwt_decode from "jwt-decode";

const stocks = {
  namespaced: true,

  state: () => ({
    stocks: [],
    stockCandles: [],
    stock: {},
  }),

  mutations: {
    SET_STOCKS(state, stocks) {
      state.stocks = stocks;
    },
    SET_STOCK(state, stock) {
      state.stock = stock;
    },
    SET_STOCK_CANDLES(state, stockCandles) {
      state.stockCandles = stockCandles;
    },
  },

  actions: {
    async fetchStocks({ commit, dispatch }) {
      try {
        const response = await axios.get("stock/symbols", {});
        commit("SET_STOCKS", response.data);
      } catch (error) {
        dispatch("snackbar/setErrorSnackbar", "Couldn't retrieve the stocks!", {
          root: true,
        });
      }
    },
    async fetchStock({ commit, dispatch }, object) {
      try {
        const response = await axios.get(
          `stock/company/info?symbol=${object}`,
          {}
        );
        commit("SET_STOCK", response.data);
      } catch (error) {
        dispatch(
          "snackbar/setErrorSnackbar",
          "Couldn't retrieve the stock data!",
          {
            root: true,
          }
        );
      }
    },
    async fetchStockCandles({ commit, dispatch }, object) {
      try {
        const response = await axios.get(`stock/candles?symbol=${object}`);
        commit("SET_STOCK_CANDLES", response.data);
      } catch (error) {
        dispatch(
          "snackbar/setErrorSnackbar",
          "Couldn't retrieve the candles!",
          {
            root: true,
          }
        );
      }
    },
  },

  getters: {
    getStocks: (state) => state.stocks,
    getStock: (state) => state.stock,
    getStockCandles: (state) => state.stockCandles,
  },
};

export default stocks;
