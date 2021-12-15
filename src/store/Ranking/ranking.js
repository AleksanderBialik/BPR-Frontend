import axios from "../../axios";

const ranking = {
  namespaced: true,

  state: () => ({
    ranking: [],
  }),

  mutations: {
    SET_RANKING(state, ranking) {
      state.ranking = ranking;
    },
  },

  actions: {
    async fetchRanking({ commit, dispatch }) {
      try {
        const response = await axios.get("ranking");
        commit("SET_RANKING", response.data);
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
    getRanking: (state) => state.ranking,
  },
};

export default ranking;
