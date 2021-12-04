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
        const response = await axios.post(
          "auth/login",
          {
            email: object.email,
            password: object.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const token = response.data.authorization;
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        dispatch("snackbar/setSuccessSnackbar", "Logged in!", { root: true });
        router.push({ name: "home" });
      } catch (error) {
        commit("SET_TOKEN", null);
        localStorage.removeItem("token");
        dispatch("snackbar/setErrorSnackbar", "Error while logging in!", {
          root: true,
        });
      }
    },
    async register({ dispatch, commit }, object) {
      try {
        await axios.post(
          "auth/register",
          {
            password: object.password,
            username: object.username,
            email: object.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        commit("SET_EMAIL", object.email);
        dispatch("snackbar/setSuccessSnackbar", "Account has been created!", {
          root: true,
        });
        router.push({ name: "accountCreated" });
      } catch (error) {
        dispatch(
          "snackbar/setErrorSnackbar",
          "Error while trying to register!",
          {
            root: true,
          }
        );
      }
    },
    async logout({ commit, dispatch }) {
      try {
        localStorage.removeItem("token");
        router.push("/home");
        dispatch("snackbar/setSuccessSnackbar", "Logged out succesfully!", {
          root: true,
        });

        commit("SET_TOKEN", null);
      } catch (error) {
        console.log(error.response);
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
