import Vue from "vue";
import { initFacebookSdk } from "./helper/facebook-sdk-helper";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

initFacebookSdk().then(() => {
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
