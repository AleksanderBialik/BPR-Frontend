const snackbar = {
  namespaced: true,

  state: () => ({
    icon: "times",
    color: "",
    message: "",
    show: false,
  }),

  mutations: {
    setSnackbar(state, payload) {
      state.icon = payload.icon;
      state.color = payload.color;
      state.message = payload.message;
    },
    toggleSnackbar(state, payload) {
      state.show = payload;
    },
  },

  actions: {
    setSnackbar({ commit }, snackbar) {
      commit("setSnackbar", snackbar);
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
