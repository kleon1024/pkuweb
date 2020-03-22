<template>
  <div ref="pageTop">
    <center>
      <h2>录取满意程度</h2>
    </center>
    <div v-if="curStep === 1">
      <ZhiyuanSurveyPreTest @preTestDone="curStep = 2" />
    </div>
    <div v-if="curStep === 2">
      <ZhiyuanSurveyCollegeSatisfaction @collegeSatisfactionDone="collegeSatisfactionDone" />
    </div>
    <div v-if="curStep === 3">
      <ZhiyuanSurveyCollegeOrderEvaluation @collegeOrderEvaluationDone="collegeOrderEvaluationDone" />
    </div>
  </div>
</template>

<script>
import ZhiyuanSurveyPreTest from "./PreTest";
import ZhiyuanSurveyCollegeSatisfaction from "./CollegeSatisfaction";
import ZhiyuanSurveyCollegeOrderEvaluation from "./CollegeOrderEvaluation";

export default {
  name: "ZhiyuanSurveyNavigation",
  components: {
    ZhiyuanSurveyPreTest,
    ZhiyuanSurveyCollegeSatisfaction,
    ZhiyuanSurveyCollegeOrderEvaluation
  },
  data() {
    return {
      satisfactions: null,
      curStep: 1
    };
  },
  watch: {
    curStep(val) {
      this.scrollToTop();
    }
  },
  mounted() {
    if (this.satisfactions) {
      this.curStep = 3;
    }
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    collegeSatisfactionDone(satisfactions) {
      this.satisfactions = satisfactions;
      this.curStep += 1;
    },
    collegeOrderEvaluationDone(collegeCompareAnswers) {
      this.$emit('zhiyuanSurveyDone', {
        satisfactions: this.satisfactions,
        college_order_answers: collegeCompareAnswers
      });
    }
  }
};
</script>

