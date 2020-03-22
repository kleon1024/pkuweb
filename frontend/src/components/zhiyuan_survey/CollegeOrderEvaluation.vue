<template>
  <div>
    <div>现在，请告诉我们，在填写模拟志愿表时，你是如何对几所院校进行排序的。</div>
    <div
      v-for="(collegePair, i) in collegePairs"
      :key="`college-compare-question-${i}`"
    >
      <!-- <h4>问题 {{ i + 1 }}：</h4> -->
      <ZhiyuanSurveyCollegeCompare
        v-if="collegePair[0] <= intendedColleges.length && collegePair[1] <= intendedColleges.length"
        v-model="answers[i]"
        :first-college-index="collegePair[0]"
        :second-college-index="collegePair[1]"
      />
    </div>
    <div
      align="right"
      style="margin: 20px 0"
    >
      <el-button
        type="primary"
        :disabled="!allAnswered"
        @click.stop="collegeOrderEvaluationDone"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ZhiyuanSurveyCollegeCompare from "./CollegeCompare";
import { collegeCompare } from "@/assets/zhiyuan_survey/config";

export default {
  name: "ZhiyuanSurveyCollegeOrderEvaluation",
  components: {
    ZhiyuanSurveyCollegeCompare
  },
  data() {
    return {
      answers: new Array(4).fill([]),
      collegePairs: []
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    allAnswered() {
      return this.answers
        .every(answer => answer.length > 0);
    },
    combinedAnswers() {
      return this.answers.map((a, i) => {
        return {
          college_pair: this.collegePairs[i],
          answers: a
        }
      })
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.collegePairs = collegeCompare.collegePairs.filter(
        pair =>
          pair[0] <= this.intendedColleges.length &&
          pair[1] <= this.intendedColleges.length
      );
      this.answers = new Array(this.collegePairs.length).fill([]);
    },
    collegeOrderEvaluationDone() {
      this.$emit("collegeOrderEvaluationDone", this.combinedAnswers);
    }
  }
};
</script>

