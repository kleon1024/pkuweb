// import Vue from "vue";
// import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import cookies from "js-cookie";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

import request from "@/plugins/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    majorStep: 0,
    minorStep: 0,
    loginUser: {
      gaokao_id: null,
      birthdate: null,
      assigned_group: null,
      basic_info: null,
      college_recommendations: null
    },
    intendedColleges: null,
    intendedAndRecommendedColleges: null,
    zhiyuanQuizAnswers: null,
    zhiyuanSatisfactionAssessAnswers: null,
    otherZhiyuanSatisfactionAssessAnswers: null,
    recommendedZhiyuanSatisfactions: null,
    simulationOneZhiyuans: null,
    whatthefuckAnswers: 1,
    zhiyuanSurveyAnswers: null,
    otherCollegesInfo: null,
    zhiyuanGuideAnswers: null,
    zhiyuanColleges: null,
    xiaoMingSatisfactions: null,
    sim4selectedColleges: null,
    sim5SelectedColleges: null,
    probabilities: null,
    paymentMethod: null,
  },
  mutations: {
    setUser(state, data) {
      state.loginUser.gaokao_id = data.gaokao_id;
      state.loginUser.birthdate = data.birthdate;
      state.loginUser.assigned_group = data.assigned_group;
      state.loginUser.basic_info = data.basic_info;
      state.loginUser.college_recommendations = data.college_recommendations;
    },

    clearUser(state) {
      state.majorStep = 1;
      state.minorStep = 1;
      state.loginUser.gaokao_id = null;
      state.loginUser.birthdate = null;
      state.loginUser.assigned_group = null;
      state.loginUser.basic_info = null;
      state.loginUser.college_recommendations = null;
      state.intendedColleges = null;
      state.intendedAndRecommendedColleges = null;
      state.zhiyuanQuizAnswers = null;
      state.zhiyuanSatisfactionAssessAnswers = null;
      state.otherZhiyuanSatisfactionAssessAnswers = null;
      state.recommendedZhiyuanSatisfactions = null;
      state.simulationOneZhiyuans = null;
      state.zhiyuanSurveyAnswers = null;
      state.otherCollegesInfo = null;
      state.zhiyuanGuideAnswers = null;
      state.zhiyuanColleges = null;
      state.xiaoMingSatisfactions = null;
      state.sim4selectedColleges = null;
      state.sim5SelectedColleges = null;
      state.probabilities = null;
      state.paymentMethod = null;
      if (process.env.NODE_ENV === "production") {
        cookies.remove("SIMIN-NX-SESSION", { // when removing session, needes exact options
          domain: ".pkuzhiyuan.com",
          path: "/"
        });
      } else {
        cookies.remove("SIMIN-NX-SESSION");
      }
    },
    savePaymentMethod(state, paymentMethod){
      state.paymentMethod  = paymentMethod;
    },
    restoreCheckpoint(state, zhiyuan) {
      state.majorStep = zhiyuan.majorStep;
      state.minorStep = zhiyuan.minorStep;
      state.intendedColleges = zhiyuan.intendedColleges;
      state.intendedAndRecommendedColleges = zhiyuan.intendedAndRecommendedColleges;
      state.zhiyuanQuizAnswers = zhiyuan.zhiyuanQuizAnswers;
      state.zhiyuanSatisfactionAssessAnswers = zhiyuan.zhiyuanSatisfactionAssessAnswers;
      state.otherZhiyuanSatisfactionAssessAnswers = zhiyuan.otherZhiyuanSatisfactionAssessAnswers;
      state.recommendedZhiyuanSatisfactions = zhiyuan.recommendedZhiyuanSatisfactions;
      state.simulationOneZhiyuans = zhiyuan.simulationOneZhiyuans;
      state.whatthefuckAnsw = zhiyuan.whatthefuckAnsw;
      state.zhiyuanSurveyAnswers = zhiyuan.zhiyuanSurveyAnswers;
      state.otherCollegesInfo = zhiyuan.otherCollegesInfo;
      state.zhiyuanGuideAnswers = zhiyuan.zhiyuanGuideAnswers;
      state.zhiyuanColleges = zhiyuan.zhiyuanColleges;
      state.xiaoMingSatisfactions = zhiyuan.xiaoMingSatisfactions;
      state.paymentMethod = zhiyuan.paymentMethod;
      state.sim4selectedColleges = zhiyuan.sim4selectedColleges;
      state.sim5SelectedColleges = zhiyuan.sim5SelectedColleges;
      state.probabilities = zhiyuan.probabilities;
    },
    saveStep(state, step) {
      state.majorStep = step[0];
      state.minorStep = step[1];
    },
    updateBasicInfo(state, basicInfo) {
      state.loginUser.basic_info = basicInfo;
    },
    saveProbabilities(state, probabilities) {
      state.probabilities = probabilities;
    },
    saveSim5SelectedColleges(state, sim5SelectedColleges) {
      state.sim5SelectedColleges = sim5SelectedColleges;
    },
    saveSim4selectedColleges(state, sim4selectedColleges) {
      state.sim4selectedColleges = sim4selectedColleges;
    },
    storeCollegeRecommendations(state, collegeRecommendations) {
      collegeRecommendations.other_colleges.sort((c1, c2) => c1.college.localeCompare(c2.college, "zh-CN")); // 按照大学名称字母排序
      state.loginUser.college_recommendations = collegeRecommendations;
    },
    storeIntendedColleges(state, colleges) {
      const collegesWithZhiyuanOrder = colleges.map((college, i) => {
        return Object.assign({
          order: String.fromCharCode("A".charCodeAt(0) + i),
        }, college);
      });
      state.intendedColleges = collegesWithZhiyuanOrder;
      const recommendedColleges = state.loginUser.college_recommendations.recommended_colleges;
      const otherRecommendedColleges = recommendedColleges.filter(college => {
        return !collegesWithZhiyuanOrder.some(ic => {
          return (
            ic.college_code === college.college_code &&
            ic.campus_code === college.campus_code
          );
        });
      });
      state.intendedAndRecommendedColleges = collegesWithZhiyuanOrder.concat(otherRecommendedColleges);
    },
    storeZhiyuanQuizAnswers(state, answers) {
      state.zhiyuanQuizAnswers = answers;
    },
    storeZhiyuanSatisfactionAssessAnswers(state, answers) {
      state.zhiyuanSatisfactionAssessAnswers = answers;
    },
    storeOtherZhiyuanSatisfactionAssessAnswers(state, answers) {
      state.otherZhiyuanSatisfactionAssessAnswers = answers;
    },
    storeZhiyuanSurveyAnswers(state, answers) {
      state.zhiyuanSurveyAnswers = answers;
    },
    storeOtherCollegesInfo(state, otherCollegesInfo) {
      state.otherCollegesInfo = otherCollegesInfo;
    },
    storeZhiyuanGuideAnswers(state, answers) {
      state.zhiyuanGuideAnswers = answers;
    },
    storeZhiyuanColleges(state, colleges) {
      state.zhiyuanColleges = colleges;
    },
    storeRecommendedZhiyuanSatisfactions(state, statisfactions) {
      state.recommendedZhiyuanSatisfactions = statisfactions;
    },
    storeSimulationOneZhiyuans(state, zhiyuans) {
      state.simulationOneZhiyuans = zhiyuans;
    },
    storeXiaoMingSatisfactions(state, satisfactions) {
      state.xiaoMingSatisfactions = satisfactions;
    }
  },
  actions: {
    login( {commit}, data ) {
      commit('setUser', data);

      const zhiyuan = data.zhiyuan;
      if (zhiyuan) {
        commit('restoreCheckpoint', zhiyuan);
      } else {
        commit('saveStep', [1, 1])
      }
    },
    renewSession() {
      const existingSession = cookies.get("SIMIN-NX-SESSION");
      // renew only when there is an existing session
      if (existingSession) {
        cookies.set("SIMIN-NX-SESSION", existingSession, {
          expires: 1, // valid for 24 hours
          domain: ".pkuzhiyuan.com",
          path: "/"
        });
      }
    },
  },
  plugins: [
    createPersistedState({
      paths: [
        "majorStep",
        "minorStep",
        "loginUser",
        "whatthefuckAnswers",
        "intendedColleges",
        "intendedAndRecommendedColleges",
        "zhiyuanQuizAnswers",
        "zhiyuanSatisfactionAssessAnswers",
        "otherZhiyuanSatisfactionAssessAnswers",
        "recommendedZhiyuanSatisfactions",
        "simulationOneZhiyuans",
        "zhiyuanSurveyAnswers",
        "otherCollegesInfo",
        "zhiyuanGuideAnswers",
        "zhiyuanColleges",
        "xiaoMingSatisfactions",
        "sim4selectedColleges",
        "sim5SelectedColleges",
        "probabilities",
        "paymentMethod",
      ],
      // // Enable encription
      // storage: {
      //   getItem: (key) => ls.get(key),
      //   setItem: (key, value) => ls.set(key, value),
      //   removeItem: (key) => ls.remove(key),
      // },
    })
  ]
});
