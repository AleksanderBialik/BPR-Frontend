import axios from "../../axios";
// import router from "../../router";
// import jwt_decode from "jwt-decode";

const news = {
  namespaced: true,

  state: () => ({
    news: {},
  }),

  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
  },

  actions: {
    async fetchNews({ commit, dispatch }) {
      try {
        const response = await axios.get("news", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        commit("SET_NEWS", response.data);
      } catch (error) {
        dispatch("snackbar/setErrorSnackbar", "Couldn't retrieve the news!", {
          root: true,
        });
      }
    },
  },

  getters: {
    getNews: (state) => state.news,
  },
};

export default news;
