// import Vue from "vue";
import App from "@/App.vue";
// import VueLazyload from 'vue-lazyload'
import router from "@/router";
import store from "@/store";
import "@/plugins/element.js";
import "@/plugins/mixin.js";
import "@/assets/main.css";

Vue.config.productionTip = false

Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
