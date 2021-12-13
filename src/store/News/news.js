import axios from "../../axios";
// import router from "../../router";
// import jwt_decode from "jwt-decode";

const news = {
  namespaced: true,

  state: () => ({
    news: [],
  }),

  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
  },

  actions: {
    async fetchNews({ commit, dispatch }) {
      try {
        const response = await axios.get("news");
        commit("SET_NEWS", response.data);
      } catch (error) {
        if (error.response.data.error === "info") {
          dispatch(
            "snackbar/setWarningSnackbar",
            `${error.response.data.message}`,
            {
              root: true,
            }
          );
        } else {
          dispatch(
            "snackbar/setErrorSnackbar",
            `${error.response.data.message}`,
            {
              root: true,
            }
          );
        }
      }
    },
  },

  getters: {
    getNews: (state) => state.news,
  },
};

export default news;
