<template>
  <div ref="pageTop">
    <div v-if="curStep === 1">
      <ZhiyuanSatisfaction @confirmed="zhiyuanSatisfactionConfirmed" />
    </div>
    <!-- <div v-if="curStep === 2">
      <ZhiyuanSatisfactionOther
        @confirmed="otherZhiyuanSatisfactionConfirmed"
      />
    </div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import request from "@/plugins/request";

import ZhiyuanSatisfaction from "./SatisfactionAssess";

export default {
  name: "ZhiyuanSatisfactionAssessNavigation",
  components: {
    ZhiyuanSatisfaction
  },
  data() {
    return {
      curStep: 1,
      formalZhiyuanQuizQuestions: null,
      probabilityQuestionAnswers: null,
      computingTestAnswers: null
    };
  },
  computed: {
    ...mapState([
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers"
    ])
  },
  watch: {
    curStep(val) {
      this.scrollToTop();
    }
  },
  mounted() {
    if (this.zhiyuanQuizAnswers) {
      if (this.zhiyuanQuizAnswers.probabilityQuestionAnswers) {
        this.probabilityQuestionAnswers = this.zhiyuanQuizAnswers.probabilityQuestionAnswers;
        this.curStep = 2;
      }
    }
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    probabilityQuestionsDone(allAnswers) {
      this.probabilityQuestionAnswers = allAnswers;
      this.curStep = 3;
    },
    computingTestDone(answers) {
      this.computingTestAnswers = answers;
      this.$emit("zhiyuanQuizDone", {
        probability_question_answers: this.probabilityQuestionAnswers,
        computing_test_answers: answers
      });
    }
  }
};
</script>
