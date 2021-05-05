import Vue from "vue";
import { initFacebookSdk } from "./helper/facebook-sdk-helper";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

initFacebookSdk().then(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
