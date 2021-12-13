import axios from "../../axios";
import router from "../../router";
import jwt_decode from "jwt-decode";

const authentication = {
  namespaced: true,

  state: () => ({
    token: window.localStorage.getItem("token"),
    email: "",
  }),

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
  },

  actions: {
    async login({ commit, dispatch }, object) {
      try {
        const response = await axios.post("auth/login", {
          email: object.email,
          password: object.password,
        });
        const token = response.data.authorization;
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        dispatch("snackbar/setSuccessSnackbar", "Logged in!", { root: true });
        router.push({ name: "home" });
      } catch (error) {
        commit("SET_TOKEN", null);
        localStorage.removeItem("token");
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
    async register({ dispatch, commit }, object) {
      try {
        await axios.post("auth/register", {
          password: object.password,
          username: object.username,
          email: object.email,
        });
        commit("SET_EMAIL", object.email);
        dispatch("snackbar/setSuccessSnackbar", "Account has been created!", {
          root: true,
        });
        router.push({ name: "accountCreated" });
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
    async logout({ commit, dispatch }) {
      try {
        localStorage.removeItem("token");
        router.push("/entry");
        dispatch("snackbar/setSuccessSnackbar", "You've been logged out!", {
          root: true,
        });

        commit("SET_TOKEN", null);
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
    getToken: (state) => {
      if (state.token) {
        return jwt_decode(state.token);
      } else {
        return null;
      }
    },
    isLoggedIn: (state) => !!state.token,
    getEmail: (state) => state.email,
  },
};

export default authentication;
