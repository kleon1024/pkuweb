<template>
  <div>
    <center><h3>计算能力检测</h3></center>
    <p>请回答下面4道计算题。当系统抽中“平行志愿知识测试”作为额外奖励的依据时，如果4 道题都答对了，你将能额外获得3元奖励。</p>
    <el-form
      ref="registerForm"
      label-position="left"
      label-width="150px"
    >
      <el-form-item
        v-for="(question, i) in questions"
        :key="`computing-test-question-${i}`"
        :label="question.description"
        required
      >
        <el-radio-group
          v-model="answers[i]"
        >
          <el-radio-button
            v-for="(answerOption, j) in question.answerOptions"
            :key="`computing-test-question-${i}-answer-${j}`"
            :label="answerOption"
          >
            {{ answerOption }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div align="right">
        <el-button
          type="primary"
          :disabled="notCompleted"
          @click.stop="doneComputingTest"
        >
          下一步
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { computingTest } from "@/assets/quiz/Zhiyuan";
export default {
  name: "ComputingTest",
  data() {
    return {
      questions: computingTest.questions,
      answers: new Array(computingTest.questions.length).fill(null)
    };
  },
  computed: {
    notCompleted() {
      return this.answers.some(answer => !answer);
    }
  },
  methods: {
    doneComputingTest() {
      this.$emit("computingTestDone", this.answers);
    }
  }
};
</script>
