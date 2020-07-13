<template>
  <div>
    <center>
      <h2>院校录取可能性估计</h2>
    </center>
    <p>
      在本部分中，您将对自己分数高于或等于某些大学录取分数线的可能性作出估计和回答。
      <span
        class="danger"
      >当您的回答和系统计算出的结果相差小于5%时，您的回答将会被认为是正确的。对于每道正确的题，您将能获得2元。</span>
    </p>
    <el-divider />
    <section ref="quiz" class="quiz-part">
      <div>
        <div
          v-for="(demoTestingQuestion, index) in demoTestingQuestions"
          :key="`demo-question-${index}`"
        >
          <h4>【问题 {{ index + 1 }}】{{ demoTestingQuestion.description }}</h4>
          <el-radio-group v-model="demoTestingAnswers[index]">
            <el-radio-button
              v-for="option in demoTestingQuestion.options"
              :key="`demo-question-${index}-option-${option.key}`"
              :label="option.key"
            >{{ option.description }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div align="right" style="margin-top: 20px;">
        <el-button type="primary" @click.stop="preTestDone">下一步</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ZhiyuanProbabiltyQuestion from "./ZhiyuanProbabiltyQuestion";

export default {
  name: "ProbabilityPreTest",
  components: {
    ZhiyuanProbabiltyQuestion
  },
  data() {
    return {
      demoProbabilities: [60],
      demoTestingAnswers: [],
      demoTestingCorrectAnswers: ["B", "A"]
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    demoTestingAnswersCorrect() {
      for (var i = 0; i < this.demoTestingCorrectAnswers.length; i++) {
        if (this.demoTestingAnswers[i] !== this.demoTestingCorrectAnswers[i]) {
          return i;
        }
      }
      return -1;
    },
    demoQuestionCollegeName() {
      return this.intendedColleges[0].full_name;
    },
    demoQuizQuestions() {
      return [
        {
          propositionDescription:
            "现在，<u><strong>假设您没有填写提前批次的志愿</strong></u>，请对下列情况发生的可能性(概率)做一个估计",
          proposition: `您进入 <span style='color: red;'>${this.demoQuestionCollegeName}</span> 读本科`
        }
      ];
    },
    demoTestingQuestions() {
      return [
        {
          description:
            "如果在我们的系统中，您被北京大学录取的概率是60%，而您的回答是63%，那么您将获得___________元",
          options: [
            {
              key: "A",
              description: "0"
            },
            {
              key: "B",
              description: "2"
            },
            {
              key: "C",
              description: "5"
            }
          ]
        },
        {
          description:
            "如果在我们的系统中，您被北京大学录取的概率是60%，而您的回答是50%，那么您将获得___________元",
          options: [
            {
              key: "A",
              description: "0"
            },
            {
              key: "B",
              description: "2"
            },
            {
              key: "C",
              description: "5"
            }
          ]
        }
      ];
    }
  },
  methods: {
    preTestDone() {
      if (
        this.demoTestingAnswers.length !== this.demoTestingCorrectAnswers.length
      ) {
        let message = "请回答所有问题";
        this.$alert(message, "请注意！", {
          confirmButtonText: "知道了",
          type: "error"
        });
      } else if (this.demoTestingAnswersCorrect === -1) {
        this.$emit("confirmed");
      } else {
        let message =
          "问题" +
          (this.demoTestingAnswersCorrect + 1) +
          "回答错误。请仔细阅读题目要求！";
        this.$alert(message, "请注意！", {
          confirmButtonText: "知道了",
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.quiz-part {
  margin-top: 12px;
}
.el-alert {
  margin-top: 12px;
}
</style>
