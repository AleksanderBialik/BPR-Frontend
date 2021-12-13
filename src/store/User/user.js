import axios from "../../axios";
import router from "../../router";

const user = {
  namespaced: true,

  state: () => ({
    user: {},
    portfolio: {},
    statistics: {},
  }),

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_STATISTICS(state, statistics) {
      state.statistics = statistics;
    },
    SET_PORTFOLIO(state, portfolio) {
      state.portfolio = portfolio;
    },
  },

  actions: {
    async fetchUser({ commit, dispatch }) {
      try {
        const response = await axios.get(`user/settings`);
        console.log(response.data);
        commit("SET_USER", response.data);
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
    async fetchPortfolio({ commit, dispatch }) {
      try {
        const response = await axios.get(`user/portfolio`);
        console.log(response.data);
        commit("SET_PORTFOLIO", response.data);
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
    async fetchStatistics({ commit, dispatch }) {
      try {
        const response = await axios.get(`user/statistics`);
        console.log(response.data);
        commit("SET_STATISTICS", response.data);
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
    async changePassword({ dispatch }, object) {
      try {
        await axios.post("user/settings/password", {
          oldPassword: object.oldPassword,
          newPassword: object.newPassword,
        });
        dispatch("snackbar/setSuccessSnackbar", "Password has been changed!", {
          root: true,
        });
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
    async deleteAccount({ dispatch }) {
      try {
        await axios.delete("user/settings/delete");
        dispatch("snackbar/setSuccessSnackbar", "Account has been deleted!", {
          root: true,
        });
        router.push("/entry");
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
    getUser: (state) => state.user,
    getStatistics: (state) => state.statistics,
    getPortfolio: (state) => state.portfolio,
  },
};

export default user;
