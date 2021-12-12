const snackbar = {
  namespaced: true,

  state: () => ({
    icon: "times",
    color: "",
    message: "",
    show: false,
  }),

  mutations: {
    setSuccessSnackbar(state, message) {
      state.color = "success";
      state.icon = "$check";
      state.message = message;
    },
    setErrorSnackbar(state, message) {
      state.color = "error";
      state.icon = "$exclamationTriangle";
      state.message = message;
    },
    setWarningSnackbar(state, message) {
      state.icon = "$exclamationCircle";
      state.color = "primary";
      state.message = message;
    },
    toggleSnackbar(state, payload) {
      state.show = payload;
    },
  },

  actions: {
    setSuccessSnackbar({ commit }, message) {
      commit("setSuccessSnackbar", message);
      commit("toggleSnackbar", true);
    },
    setErrorSnackbar({ commit }, message) {
      commit("setErrorSnackbar", message);
      commit("toggleSnackbar", true);
    },
    setWarningSnackbar({ commit }, message) {
      commit("setWarningSnackbar", message);
      commit("toggleSnackbar", true);
    },
    toggleSnackbar({ commit }, value) {
      commit("toggleSnackbar", value);
    },
  },

  getters: {
    getSnackbar(state) {
      return {
        icon: state.icon,
        color: state.color,
        message: state.message,
        show: state.show,
      };
    },
  },
};

export default snackbar;
