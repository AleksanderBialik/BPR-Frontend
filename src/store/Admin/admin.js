import axios from "../../axios";

const admin = {
  namespaced: true,

  state: () => ({
    users: [],
  }),

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },

  actions: {
    async fetchUsers({ commit, dispatch }) {
      try {
        const response = await axios.get(`admin/users`);
        commit("SET_USERS", response.data);
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
    async deleteUser({ dispatch }, object) {
      try {
        await axios.delete(`admin/users?email=${object}`);
        dispatch("snackbar/setSuccessSnackbar", "User has been deleted!", {
          root: true,
        });
        dispatch("fetchUsers");
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
    async downloadLogs({ dispatch }) {
      try {
        const response = await axios.get(`admin/logs`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "logs.txt");
        document.body.appendChild(link);
        link.click();
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
    getUsers: (state) => state.users,
  },
};

export default admin;
