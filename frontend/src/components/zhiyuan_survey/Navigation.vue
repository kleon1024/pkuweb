<template>
  <div ref="pageTop">
    <center>
      <h2>录取满意程度</h2>
    </center>
    <div v-if="curStep === 1">
      <ZhiyuanSurveyCollegeSatisfaction @collegeSatisfactionDone="collegeSatisfactionDone" />
    </div>
    <div v-if="curStep === 2">
      <ZhiyuanSurveyOtherCollegeSatisfaction @satisfactionsDone="satisfactionsDone" />
    </div>
  </div>
</template>

<script>
import ZhiyuanSurveyPreTest from "./PreTest";
import ZhiyuanSurveyCollegeSatisfaction from "./CollegeSatisfaction";
import ZhiyuanSurveyOtherCollegeSatisfaction from "./OtherCollegeSatisfaction";

export default {
  name: "ZhiyuanSurveyNavigation",
  components: {
    ZhiyuanSurveyPreTest,
    ZhiyuanSurveyCollegeSatisfaction,
    ZhiyuanSurveyOtherCollegeSatisfaction
  },
  computed: {
    ...mapState(["intendedColleges"])
  },
  data() {
    return {
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
      this.curStep = 2;
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
      this.$emit('saveSatisfactions', {
        satisfactions: satisfactions,
      });
      this.curStep += 1;
    },
    satisfactionsDone(satisfactions) {
      this.$emit('zhiyuanSurveyDone', {
        satisfactions: this.satisfactions,
        college_order_answers: satisfactions
      });
    }
  }
};
</script>

