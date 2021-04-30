import Vue from "vue";
import { initFacebookSdk } from "./helper/facebook-sdk-helper";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;

initFacebookSdk().then(() => {
  new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
