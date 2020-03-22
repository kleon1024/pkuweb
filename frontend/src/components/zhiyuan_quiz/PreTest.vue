<template>
  <div>
    <p>
      现在，请你回答一些关于平行志愿录取系统规则的问题。
      <span class="danger">你的认真作答将有助于自己对高校平行志愿录取系统的了解，从而在报考时采用更明智的策略，同时，认真作答也将有助于我们对您的志愿报考进行针对性的辅导。</span>
    </p>
    <p>
      为鼓励认真作答，魁伟系统基于大数据和人工智能技术所计算的录取可能性作为参考答案对你的回答进行批改。当该部分被抽中计入额外奖励时，我们将会根据该部分你回答的正确率给予你额外奖励：对于涉及录取可能性的题目，如果你对于可能性的猜测和我们计算的可能性的差距小于5%时，你的回答将会被认为时正确的。
      <strong>对于每道正确的空白，你将能够获得3元。</strong>
    </p>
    <el-divider />
    <section
      ref="quiz"
      class="quiz-part"
    >
      <div>
        <h4 style="color: red;">
          现在，我们将为您展示一道关于录取可能性的样题，请认真阅读。
        </h4>
        <ZhiyuanProbabiltyQuestion
          v-model="demoProbabilities"
          description="你在之前的环节中，填写的一批次志愿如下"
          :colleges="intendedColleges"
          :highlights="[1]"
          :questions="demoQuizQuestions"
          :step="5"
          style="margin-bottom: 20px;"
        />
        <h4>【题目说明】</h4>
        <p>
          填写该题的同学认为自己最终会去
          <span style="color: red;">{{ demoQuestionCollegeName }}</span>
          读书的可能性是{{ demoProbabilities[0] }}%，所以他/她在上图中点击并拖动滑块，使得滑块对应的可能性是{{ demoProbabilities[0] }}%.
        </p>
        <p>请再次注意，对于涉及录取可能性的题目，如果你对于可能性的猜测和我们计算的可能性的差距 <span class="em-text">小于5%</span> 时，你的回答将会被认为时正确的。对于每道正确的空白，你将能够获得 <span class="em-text">3元</span> 。</p>
        <h4>
          为确保你准确理解了题干及题目说明，请将滑块滑动到
          <span style="color:red">60%</span> ，并回答以下问题：
        </h4>
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
            >
              {{ option.description }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div
        align="right"
        style="margin-top: 20px;"
      >
        <el-button
          type="primary"
          @click.stop="preTestDone"
        >
          进入正式志愿测试
        </el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ZhiyuanProbabiltyQuestion from "./ZhiyuanProbabiltyQuestion";

export default {
  name: "ZhiyuanQuizPreTest",
  components: {
    ZhiyuanProbabiltyQuestion
  },
  data() {
    return {
      demoProbabilities: [60],
      demoTestingAnswers: [],
      demoTestingCorrectAnswers: ["B", "B", "A"]
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    demoTestingAnswersCorrect() {
      return (
        JSON.stringify(this.demoTestingCorrectAnswers) ===
        JSON.stringify(this.demoTestingAnswers)
      );
    },
    demoQuestionCollegeName() {
      return this.intendedColleges[0].full_name;
    },
    demoQuizQuestions() {
      return [
        {
          propositionDescription:
            "现在，<u><strong>假设你没有填写提前批次的志愿</strong></u>，请对下列情况发生的可能性(概率)做一个估计",
          proposition: `你进入 <span style='color: red;'>${
            this.demoQuestionCollegeName
          }</span> 读本科`
        }
      ];
    },
    demoTestingQuestions() {
      return [
        {
          description: `在该同学的志愿表中，${
            this.intendedColleges[1].full_name
          } 所在的位置是`,
          options: [
            {
              key: "A",
              description: "一批次 A 院校"
            },
            {
              key: "B",
              description: "一批次 B 院校"
            },
            {
              key: "C",
              description: "一批次 C 院校"
            },
            {
              key: "D",
              description: "一批次 D 院校"
            }
          ]
        },
        {
          description:
            "若正确答案是 63%，该同学的答案能使他/她在这道题中获得___元",
          options: [
            {
              key: "A",
              description: "0"
            },
            {
              key: "B",
              description: "3"
            },
            {
              key: "C",
              description: "5"
            }
          ]
        },
        {
          description:
            "若正确答案是 50%，该同学的答案能使他/她在这道题中获得___元",
          options: [
            {
              key: "A",
              description: "0"
            },
            {
              key: "B",
              description: "3"
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
      if (this.demoTestingAnswersCorrect && this.demoProbabilities[0] === 60) {
        this.$emit("preTestDone");
      } else {
        let message = "题目回答错误。请仔细阅读样例。"
        if (this.demoProbabilities[0] != 60) {
          message = "请将滑块调整到 60%, 再回答相应问题。"
        }
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
