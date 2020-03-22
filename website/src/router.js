import Vue from "vue";
import Router from "vue-router";

import cookies from "js-cookie";
import store from "./store";

import NotFoundComponent from "./components/NotFoundComponent"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: '*', component: NotFoundComponent },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/letter",
      name: "letter",
      component: () =>
        import(/* webpackChunkName: "letter" */ "./views/Letter.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () =>
        import(/* webpackChunkName: "contact" */ "./views/Contact.vue")
    },
    {
      path: "/zhiyuan",
      name: "zhiyuan",
      component: () =>
        import(/* webpackChunkName: "zhiyuan" */ "./views/Zhiyuan.vue")
    }
  ]
});

router.beforeEach((to, _from, next) => {
  const sessionId = cookies.get("SIMIN-NX-SESSION");
  if (!sessionId) {
    // session cookie lost or expired
    store.commit("clearUser"); // remove the store user information
  }
  if (to.path === "/") {
    next("/letter");
    return;
  }
  if (to.path !== "/zhiyuan") {
    next(); // always allow accessing help page
  } else {
    const user = store.state.loginUser;

    if (sessionId && user) {
      if (to.path === "/login") {
        // no longer need authentication
        next("/");
      } else {
        next();
      }
    } else {
      if (to.path === "/login") {
        // AVOID INFINITE NAVIGATION to /login
        next();
      } else {
        next("/login");
      }
    }
  }
});

export default router;
