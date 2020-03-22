<template>
  <div ref="formalQuiz">
    <div v-if="questionsForCurUser">
      <el-alert
        type="success"
        center
        :closable="false"
        title="恭喜！你已经理解了题干的含义，现在请认真回答下面的问题，争取获得更多的奖励！"
      />
      <div>
        <div align="center">
          <h3>问题 {{ curPage }}</h3>
        </div>
        <ZhiyuanProbabiltyQuestion
          v-model="curQuizQuesionAnswers"
          :description="currentQuizQuestion.description"
          :description-highlight="currentQuizQuestion.descriptionHighlight"
          :sub-description="currentQuizQuestion.subDescription"
          :college-admin-scores="currentQuizQuestion.collegeAdminScores"
          :colleges="currentQuizQuestionColleges"
          :highlights="currentQuizQuestion.collegeHighlight"
          :questions="currentQuizQuestion.questions"
          style="margin-bottom: 20px;"
        />
        <el-divider />
      </div>
      <div align="center">
        <el-button
          v-show="curPage > 1"
          type="danger"
          @click.stop="previousQuestion"
        >
          上一题
        </el-button>
        <el-button
          v-show="curPage <= questionsForCurUser.length"
          :type="curPage < questionsForCurUser.length ? 'success' : 'primary'"
          @click.stop="nextQuestion"
        >
          {{ curPage === questionsForCurUser.length ? "下一步" : "下一题" }}
        </el-button>
      </div>
      <span>进度：{{ curPage }}/{{ questionsForCurUser.length }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ZhiyuanProbabiltyQuestion from "./ZhiyuanProbabiltyQuestion";

export default {
  name: "ZhiyuanQuizProbabilityQuestions",
  components: {
    ZhiyuanProbabiltyQuestion
  },
  props: {
    quizQuestions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      curPage: 1, // starts with 1
      curQuizQuesionAnswers: new Array(2).fill(50),
      allAnswers: {}
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    questionsForCurUser() {
      return this.quizQuestions
        .map((question, i) => Object.assign({ question_index: i + 1 }, question)) // added the original question index
        .filter(question => !question.disabled);
    },
    currentQuizQuestion() {
      return this.questionsForCurUser[this.curPage - 1];
    },
    curQuestionOriginalIndex() { // 在原始问题中的顺序（方便后期处理)
      return this.currentQuizQuestion.question_index;
    },
    currentQuizQuestionColleges() {
      const intendedCollegesNumber = this.intendedColleges.length;
      return this.currentQuizQuestion.collegeOrder
        .slice(0, intendedCollegesNumber)
        .map(collegeOrder => this.intendedColleges[collegeOrder - 1]);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.curQuizQuesionAnswers = new Array(this.currentQuizQuestion.questions.length).fill(50);
    },
    previousQuestion() {
      this.quizPageChanged(this.curPage - 1);
    },
    nextQuestion() {
      this.quizPageChanged(this.curPage + 1);
    },
    quizPageChanged(toPage) {
      const curPage = this.curPage;
      const curQuizItemQuestionNumber = this.currentQuizQuestion.questions.length;
      if (!this.allAnswers[this.curQuestionOriginalIndex]) {
        // never initialized so initialize it
        this.allAnswers[this.curQuestionOriginalIndex] = new Array(
          curQuizItemQuestionNumber
        ).fill(0);
      }
      this.allAnswers[this.curQuestionOriginalIndex].splice(
        0,
        Infinity,
        ...this.curQuizQuesionAnswers.slice(0, curQuizItemQuestionNumber)
      ); // 记录答案

      if (toPage > this.questionsForCurUser.length) { // added so it works for finishing all the questions
        this.finishProbabilityQuestions(this.allAnswers);
        return;
      }
      const nextQuizItem = this.questionsForCurUser[toPage - 1];
      const nextQuestionOriginalIndex = nextQuizItem.question_index;

      if (this.allAnswers[nextQuestionOriginalIndex]) {
        // 如果要跳转的问题已经回答过
        this.curQuizQuesionAnswers.splice(
          0,
          Infinity,
          ...this.allAnswers[nextQuestionOriginalIndex]
        );
      } else { // 初始化下个问题的答案
        this.curQuizQuesionAnswers.splice(
          0,
          Infinity,
          ...new Array(nextQuizItem.questions.length).fill(50)
        );
      }
      this.curPage = toPage;
      this.$nextTick(() => {
        this.$refs.formalQuiz.scrollIntoView();
      });
    },
    finishProbabilityQuestions() {
      this.$emit('probabilityQuestionsDone', this.allAnswers);
    }
  }
};
</script>

<style scoped>
.el-alert {
  margin-top: 12px;
}
</style>
