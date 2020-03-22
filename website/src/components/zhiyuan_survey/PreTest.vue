<template>
  <div>
    <div>现在，请你告诉我们你对自己正在考虑的大学的满意程度。</div>
    <p>
      在下面的题目中，你将用 0 到 100 之间的数字来表示你对就读于某个大学的满意程度。数字越大，你的满意程度越高。因此，0 表示最不满意，100 表示最满意。<strong>为了使答题更方便，你只需通过移动滑块(见下图)来表达自己对学校的满意程度。</strong>
    </p>
    <div>
      <span>你的满意程度：</span>
      <el-slider
        v-model="demoSatisfactoryNumber"
        show-input
      />
      <span style="color: red;">(请移动滑块来改变数字)</span>
      <p>
        滑块左侧的数字(红色数字)表示你的满意程度。当滑块位于最左侧时，你的满意程度(滑块左侧的红色数字)将会变为 0; 当滑块位于最 右侧时，你的满意程度将会变为 100。总之，当你把滑块向右移动时，数字会变大，当你把滑块向左移动时，数字会变小。因 此，你对一个大学越满意时，你就应该把滑块往右边移动的更多。
      </p>
    </div>

    <div>
      请阅读下面的例子:
      <p
        v-for="(example, index) in demoQuestion.examples"
        :key="`satisfaction-survey-demo-example-${index}`"
      >
        【例 {{ index + 1 }}】{{ example.description }}
      </p>
      <h4>请问答下面的问题：</h4>
      <div
        v-for="(question, i) in demoQuestion.questions"
        :key="`satisfaction-survey-demo-answer-${i}`"
      >
        <span>{{ question.description }}：</span>
        <el-radio-group
          v-model="demoQuestionAnswers[i]"
          style="margin: 10px 0;"
        >
          <el-radio-button
            v-for="(option, j) in question.options"
            :key="`satisfaction-survey-demo-answer-${i}-answer-${j}`"
            :label="option.key"
          >
            {{ option.description }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div align="right">
      <el-button
        type="primary"
        @click.stop="preTestDone"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { demoQuestion } from "@/assets/zhiyuan_survey/config";

export default {
  name: "ZhiyuanSurveyPreTest",
  data() {
    return {
      demoQuestion: demoQuestion,
      demoSatisfactoryNumber: 35,
      demoQuestionAnswers: new Array(2),
      
    };
  },
  computed: {
    isCorrectAnswers() {
      return (
        JSON.stringify(this.demoQuestion.demoQuestionCorrectAnswers) ===
        JSON.stringify(this.demoQuestionAnswers)
      );
    }
  },
  methods: {
    preTestDone() {
      if (this.isCorrectAnswers) {
        this.$emit("preTestDone");
      } else {
        this.$alert(
          "请仔细阅读上面的例子来确认你对问题的理解是否准确!",
          "请注意！",
          {
            confirmButtonText: "知道了",
            type: "error"
          }
        );
      }
    }
  }
};
</script>

