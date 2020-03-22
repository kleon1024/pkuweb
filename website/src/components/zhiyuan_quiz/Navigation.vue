<template>
  <div ref="pageTop">
    <center>
      <h2>平行志愿知识测试</h2>
    </center>
    <div v-if="curStep === 1">
      <ZhiyuanQuizPreTest @preTestDone="startZhiyuanQuiz" />
    </div>
    <div v-if="curStep === 2">
      <ZhiyuanQuizProbabilityQuestions
        :quiz-questions="formalZhiyuanQuizQuestions"
        @probabilityQuestionsDone="probabilityQuestionsDone"
      />
    </div>
    <div v-if="curStep === 3">
      <ComputingTest @computingTestDone="computingTestDone" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import request from "@/plugins/request";

import ZhiyuanQuizPreTest from "./PreTest";
import ZhiyuanQuizProbabilityQuestions from "./ProbabilityQuestions";
import ComputingTest from "./ComputingTest";

export default {
  name: "ZhiyuanQuizNavigation",
  components: {
    ZhiyuanQuizPreTest,
    ZhiyuanQuizProbabilityQuestions,
    ComputingTest
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
    ...mapState(["intendedColleges", "zhiyuanQuizAnswers"])
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
    startZhiyuanQuiz() {
      const loading = this.$loading({
        lock: true,
        text: "加载测试题目中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      request.post(
        this.ZHIYUAN_QUIZ_URL,
        {
          score: this.loginUser.score,
          zhiyuan_colleges: this.intendedColleges
        },
        (err, res) => {
          if (res) {
            this.formalZhiyuanQuizQuestions = res.data;
            this.curStep += 1;
          }
          this.$nextTick(() => {
            loading.close();
          });
        }
      );
    },
    probabilityQuestionsDone(allAnswers) {
      this.probabilityQuestionAnswers = allAnswers;
      this.curStep = 3;
    },
    computingTestDone(answers) {
      this.computingTestAnswers = answers;
      this.$emit('zhiyuanQuizDone', {
        probability_question_answers: this.probabilityQuestionAnswers,
        computing_test_answers: answers
      });
    }
  }
};
</script>
