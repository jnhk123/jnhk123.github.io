import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import api from "@/mixins/api";
import _static from "@/mixins/static";

Vue.config.productionTip = false;

Vue.mixin(api);
Vue.mixin(_static);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
