<template>
  <div>
    <center>
      <h2>录取分数线信息</h2>
    </center>
    <p>报考学校时，你需要对学校录取难度有充分的了解。以下，我们列出了相关院校往年的分数线和平均分。</p>
    <div ref="college-admissions-table">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="往年录取分数线" :name="1">
      <CollegeAdmissionScoresTable />
        </el-collapse-item>
      </el-collapse>
      <el-alert
        type="error"
        title="请注意，你不需要记忆该表中的信息，在回答后面的问题时，你可以随时参考此表中的信息!"
        center
        :closable="false"
      />
    </div>
    <el-divider />
    <div>
      <h4>请依据表格中的信息，回答下面的问题：</h4>
      <div
        v-for="(question, i) in questions"
        :key="`zhiyuan-guide-pre-test-question-${i}`"
        align="left"
      >
        【问题 {{ i + 1 }}】{{ question.description }}
        <el-radio-group v-model="answers[i]" style="margin: 10px;">
          <el-radio-button
            v-for="(option, j) in question.answerOptions"
            :key="`zhiyuan-guide-pre-test-question-answer-${i}-answer-${j}`"
            :label="option.key"
          >{{ option.description }}</el-radio-button>
        </el-radio-group>
        <el-alert
          v-if="answers[i]"
          :type="answers[i] === 'B' ? 'success' : 'error'"
          :title="answers[i] === 'B' ? '回答正确' : '回答错误。正确答案是 B，请仔细阅读材料!'"
          :closable="false"
        />
      </div>
    </div>
    <div align="center" style="margin-top: 20px;">
      <el-button :disabled="!isCorrectAnswers" type="primary" @click.stop="testDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CollegeAdmissionScoresTable from "@/components/CollegeAdmissionScoresTable";

export default {
  name: "AdmissionScoresInfoTest",
  components: {
    CollegeAdmissionScoresTable
  },
  data() {
    return {
      answers: new Array(2),
      activeNames: 1,
    };
  },
  computed: {
    ...mapState(["intendedColleges", "intendedAndRecommendedColleges"]),
    questions() {
      const questions = [];
      if (!this.intendedAndRecommendedColleges) {
        return questions;
      }
      const collegeScoreDiffs = [-5, 0, 5, 10];
      const college1 = this.intendedAndRecommendedColleges[0];

      if (college1) {
        const college1MinScore = college1.admission_min_score;
        const answerOptions = collegeScoreDiffs.map((diff, i) => {
          return {
            key: String.fromCharCode("A".charCodeAt(0) + i),
            description: diff + (college1MinScore ? college1MinScore : 500)
          };
        });
        if (!college1MinScore) {
          answerOptions[1].description = "无数据";
        }
        questions.push({
          description: `${college1.full_name} 在 ${this.SERVICE_YEAR -
            1} 年的录取分数线是`,
          answerOptions: answerOptions
        });
      }
      const college4 = this.intendedAndRecommendedColleges[3];

      if (college4) {
        const college4MeanScoreL1 = college4.admission_mean_score_l1;
        const answerOptions = collegeScoreDiffs.map((diff, i) => {
          return {
            key: String.fromCharCode("A".charCodeAt(0) + i),
            description:
              diff + (college4MeanScoreL1 ? college4MeanScoreL1 : 500)
          };
        });
        if (!college4MeanScoreL1) {
          answerOptions[1].description = "无数据";
        }
        questions.push({
          description: `${college4.full_name} 在 ${this.SERVICE_YEAR -
            2} 年的平均分是`,
          answerOptions: answerOptions
        });
      }

      return questions;
    },
    isCorrectAnswers() {
      if (this.questions.length === 0) return true;
      if (this.questions.length === 2) {
        return this.answers[0] && this.answers[1];
      }
      return this.answers[0];
    }
  },
  methods: {
    testDone() {
      this.$emit("confirmed"); // 因为button在没有回答正确的情况下是不会触发这个事件的
    }
  }
};
</script>

<style scoped>
.el-alert {
  margin-top: 10px;
}
</style>
