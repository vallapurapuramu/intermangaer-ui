import Vue from "vue";
import axios from "axios";
import moment from 'moment';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'leaflet/dist/leaflet.css';
// import leaflet from 'leaflet'
import App from "./App.vue";
import router from "./router";
import VueSimpleAccordion from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
import store from './store';
//global registration
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs);
Vue.use(VueFormWizard);
// configure do
require('dotenv').config()

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAccordion, {
    tags: {
        list: "dl",
        list__item: "div",
        item__heading: "dt",
        heading__content: "span",
        heading__icon: "span",
        item__content: "dd"
      },
      roles: {
        presentation: false,
        heading: false,
        region: true
      },
      transition: "vsa-collapse",
      initActive: false,
      forceActive: undefined,
      autoCollapse: true,
      onHeadingClick: () => {},
      navigation: true
  });

library.add(faSpinner);
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Integrating axios with vue
Vue.prototype.$axios = axios.create({
    //baseURL: process.env.VUE_APP_API_BASE_URL || "http://127.0.0.1:3333/imapi/api/",
    baseURL: "https://intermanager-backend.herokuapp.com/imapi/api/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});




// Adding data and time filter
Vue.filter('formatDate', function(value, formatType) {
    if (formatType == 'date' && value) {
        return moment(new Date(String(value))).format('MMMM DD YYYY');
        return ""
    }

    if (formatType == 'time' && value) {
        const time = value.split(":");
        if (time[0] <= 12) {
            return `${time[0].padStart(2, "0")}:${time[1].padStart(2, "0")} AM`;
        } else {
            return `${(time[0] - 12).toString().padStart(2, "0")}:${time[1].padStart(2, "0")} PM`;
        }
    }
});


new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');