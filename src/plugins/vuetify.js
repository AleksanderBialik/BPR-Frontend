import Vue from "vue";
import Vuetify from "vuetify/lib";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegram,
  faFacebook,
  faInstagram,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// to use brand icons  :icon="['fab', 'facebook']"
Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(
  fas,
  faTwitter,
  faInstagram,
  faFacebook,
  faStackOverflow,
  faGithub,
  faTelegram
);
Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: false },
  icons: {
    checked: "fas fa-check-square",
    unchecked: "far fa-square",
    iconfont: "faSvg",
    values: {
      house: {
        component: FontAwesomeIcon,
        props: {
          icon: "home",
        },
      },
      search: {
        component: FontAwesomeIcon,
        props: {
          icon: "search",
        },
      },
      user: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fa", "user"],
        },
      },
      cart: {
        component: FontAwesomeIcon,
        props: {
          icon: "shopping-cart",
        },
      },
    },
  },
});
