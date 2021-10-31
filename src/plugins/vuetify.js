import Vue from "vue";
import Vuetify from "vuetify/lib";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faTelegram,
  faFacebook,
  faInstagram,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// to use brand icons  :icon="['fab', 'facebook']"
import { fas } from "@fortawesome/free-solid-svg-icons";
import pl from "vuetify/lib/locale/pl";

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
Vue.use(Vuetify, { iconfont: "faSvg" });

export default new Vuetify({
  theme: { dark: true },
  icons: {
    // iconfont: 'faSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    checked: "fas fa-check-square",
    unchecked: "far fa-square",
  },
  lang: {
    locales: { pl },
    current: "pl",
  },
});
