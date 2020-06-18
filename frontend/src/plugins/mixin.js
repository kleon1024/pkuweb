import Vue from "vue";

Vue.mixin({
  computed: {
    SERVICE_YEAR() {
      return 2019;
    },
    API_URL() {
      if (process.env.NODE_ENV !== "production") {
        return "/api"
      }
      return process.env.VUE_APP_API_SERVER_URL;
    },
    SHORT_LIST_URL() {
      return `${this.API_URL}/short-list`;
    },
    ZHIYUAN_QUIZ_URL() {
      return `${this.API_URL}/zhiyuan-quiz`;
    },
    loginUser() {
      return this.$store.state.loginUser;
    },
    currentState() {
      return this.$store.state;
    },
    PRODUCTION_MODE() {
      return process.env.NODE_ENV === "production";
    }
  }
});
