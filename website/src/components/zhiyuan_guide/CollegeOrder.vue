<template>
  <div>
    <p>
      报考学校时，志愿表上排列学校的顺序也是有讲究的。
      <span class="danger">按照错误的顺序排列，可能会导致你不能被理想的院校录取!</span>
    </p>
    <p>
      报考一批次志愿的时候，需要牢记以下
      <span class="em-text">两点：</span>
    </p>
    <section ref="point1">
      <p>
        1. 平行志愿录取规则是“分数优先，遵循志愿”。在你的分数较高，多所学校可以录取你的情况下，
        <span class="danger">你一定会被自己志愿表中排位最前的志愿录取！</span>根据之前的填写，你的一批次志愿是：
      </p>
      <ReadOnlyZhiyuanForm />
      <p
        v-for="(scenaria, i) in point1Scenarios"
        :key="`zhiyuan-guide-zhiyuan-order-scenaria-${i}`"
      >
        【情景 {{ i + 1 }}】{{ scenaria.description }}
      </p>
      <p>因此，在考虑院校排列的时候，你需要考虑以下问题：如果在两所学校甲和乙都想录取你的时候，你会选择去甲上学，那么请一定将甲排在更靠前的位置上(比如，如果你在考虑 A 院校和 B 院校位置的填报，那么甲应该放在 A 院校的位置上，乙应该放在 B 院校的位置上)</p>
      <el-divider />
      <strong>现在，请回答下列问题，来确认你对上述内容的理解</strong>
      <div
        v-for="(question, i) in point1Questions"
        :key="`zhiyuan-guide-zhiyuan-order-question-${i}`"
      >
        <p>【问题 {{ i + 1 }}】{{ question.description }}</p>
        <p>
          <el-radio-group v-model="point1Answers[i]">
            <div
              v-for="(option, j) in question.answerOptions"
              :key="`zhiyuan-guide-zhiyuan-order-question-${i}-answer-${j}`"
            >
              <el-radio
                :label="option.key"
                border
                style="width: 100%;"
              >
                {{ option.description }}
              </el-radio>
            </div>
          </el-radio-group>
          <el-alert
            v-if="point1Answers[i]"
            :type="point1Answers[i] === question.answer ? 'success' : 'error'"
            :title="point1Answers[i] === question.answer ? question.correctPrompt : question.wrongPrompt"
            :closable="false"
          />
        </p>
      </div>
    </section>
    <el-divider />
    <section
      v-if="point1Answered"
      ref="point2"
    >
      <p>2. 志愿表里排位较前的位置要敢于“冲”，排位较后的位置一定要“保”。</p>
      <p>在本科一批次可以填报 4 个高校平行志愿的情况下，如果你想争取上一所好院校的话:</p>
      <p>第 1 个高校志愿，即 A 院校，应当选择自己非常想去，有一定录取可能性但风险相对较大 的学校。</p>
      <p>第 2，3 高校志愿，即 B 院校和 C 院校，应当求“稳”。即录取可能性比较大，且比较符 合自己需要的学校。</p>
      <p>第 4 高校志愿，即 D 院校，一定要用于“保底”。即录取可能性几乎是 100%，且对自己来 说可以接受的学校。</p>
      <strong>现在，请回答下列问题，来确认你对上述内容的理解</strong>
      <div
        v-for="(question, i) in point2Questions"
        :key="`zhiyuan-guide-zhiyuan-order-question-${i}`"
      >
        <p>【问题 {{ i + 1 }}】{{ question.description }}</p>
        <p>
          <el-radio-group v-model="point2Answers[i]">
            <div
              v-for="(option, j) in question.answerOptions"
              :key="`zhiyuan-guide-zhiyuan-order-question-${i}-answer-${j}`"
            >
              <el-radio
                :label="option.key"
                border
                style="width: 100%;"
              >
                {{ option.description }}
              </el-radio>
            </div>
          </el-radio-group>
          <el-alert
            v-if="point2Answers[i]"
            :type="point2Answers[i] === question.answer ? 'success' : 'error'"
            :title="point2Answers[i] === question.answer ? question.correctPrompt : question.wrongPrompt"
            :closable="false"
          />
        </p>
      </div>
    </section>
    <div align="right">
      <el-button
        :disabled="!allQuestionsAnswered"
        type="primary"
        @click.stop="collegeOrderDone"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ReadOnlyZhiyuanForm from "@/components/ReadOnlyZhiyuanForm";
export default {
  name: "ZhiyuanGuideCollegeOrder",
  components: {
    ReadOnlyZhiyuanForm
  },
  data() {
    return {
      point1Answers: new Array(2).fill(null),
      point2Answers: new Array(1).fill(null)
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    point1Scenarios() {
      return [
        {
          description: `如果你的分数比${this.getCollegeName(
            1
          )}的分数线高，那么不论你在一批次 B 志愿，一批次 C 志愿，一批次 D 志愿的位置填写了什么学校，不论这些学校的分数线有多高/低，你都会被 ${this.getCollegeName(
            1
          )} 录取。`
        },
        {
          description: `如果你的分数比 ${this.getCollegeName(
            2
          )} 的分数线高，但是比 
          ${this.getCollegeName(
            1
          )} 的分数线低，那么不论你在一批次 C 志愿，一批次 D 志愿的位置填写了什么学校，不论这些学校的分数线有多高/低，你都会被 ${this.getCollegeName(
            2
          )} 录取`
        }
      ];
    },
    point1Questions() {
      const questions = [
        {
          answer: "A",
          correctPrompt: "回答正确！",
          wrongPrompt:
            "回答错误，正确答案是第一项。因为你更愿意去甲学校，所以甲应该放在位置靠前的 C 志愿院校上。",
          description:
            "现在你准备把两所学校，甲和乙，放在一批次志愿表中 C 院校，D 院校的位置 上。如果当两所学校都想录取你时，你更愿意去甲，那么下列做法中正确的一项是",
          answerOptions: [
            {
              key: "A",
              description: "把甲放在 C 院校的位置上，把乙放在 D 院校的位置上"
            },
            {
              key: "B",
              description: "把甲放在 D 院校的位置上，把乙放在 C 院校的位置上"
            },
            {
              key: "C",
              description: "上述两种做法都是正确的，没有对错之分"
            }
          ]
        }
      ];
      if (this.intendedColleges.length > 3) {
        questions.push({
          answer: "A",
          correctPrompt: "回答正确！",
          wrongPrompt: `回答错误，正确答案是第一项。根据平行志愿的录取规则，你将不能被 A 志愿院校和 B 志愿院校录取，但可以被 C 志愿院校或 D 志愿院校录取，因为 C 志 愿院校比 D 志愿院校排位靠前，所以你一定会被 ${this.getCollegeName(
            3
          )} 录取。`,
          description: `假设你在分数线公布后发现自己的分数比 ${this.getCollegeName(
            3
          )}，${this.getCollegeName(4)} 的分数线高，比 ${this.getCollegeName(
            1
          )}，${this.getCollegeName(2)} 的分数线低，那么____`,
          answerOptions: [
            {
              key: "A",
              description: `${this.getCollegeName(3)} 一定会录取我`
            },
            {
              key: "B",
              description: `${this.getCollegeName(4)} 一定会录取我`
            },
            {
              key: "C",
              description: "两所学校中的某一所会录取我，但不能确定是哪一所"
            },
            {
              key: "D",
              description: "有可能两所学校中的某一所录取我，也有可能落榜"
            }
          ]
        });
      }
      return questions;
    },
    point2Questions() {
      return [
        {
          answer: "C",
          correctPrompt: "回答正确！",
          wrongPrompt:
            "回答错误，正确答案是第三项。第一项中的策略会导致你失去冲刺好学校的机会。第二项中的策略可能会导致落榜的发生。第四项中的策略会导致 B,C 两个志愿院校被浪费，因为在平行志愿的录取规则中，你会直接被 A 志愿院校录取，B,C 两个志愿院校在 A 志愿院校录取你的情况下会被系统忽略，从而失去冲刺好学校的机会。只有第三选项的策略做到了冲，保结合，即没有放弃冲刺好学校的机会，也做到了风险最小化。",
          description:
            "如果你认为上一个好的院校比较重要，那么下列策略中较为合理的一项是 ___",
          answerOptions: [
            {
              key: "A",
              description: "A,B,C,D 四个志愿都选择保底的学校"
            },
            {
              key: "B",
              description: "A,B,C,D 四个志愿都选择有一定风险的学校"
            },
            {
              key: "C",
              description: "A 志愿选择风险较大的学校，D 志愿一定要选择录取可能性几乎为 100%的学校"
            },
            {
              key: "D",
              description: "A 志愿应当保守一些，B,C 两个志愿可以适当考虑报考分数线高一点的学校"
            }
          ]
        }
      ];
    },
    point1Answered() {
      if (this.point1Questions.length > 1) {
        return this.point1Answers[0] !== null && this.point1Answers[1] !== null;
      } else {
        return this.point1Questions[0] !== null;
      }  
    },
    allQuestionsAnswered() {
      return this.point1Answered && this.point2Answers[0] !== null;
    }
  },
  methods: {
    getCollegeName(collegeOrder) {
      const index = collegeOrder - 1;
      if (index < 0 || index >= this.intendedColleges.length) return null;
      return this.intendedColleges[index].full_name;
    },
    collegeOrderDone() {
      this.$emit("collegeOrderDone", {
        point_1_answers: this.point1Answers,
        point_2_answers: this.point2Answers
      });
    }
  }
};
</script>

<style>
.el-radio {
  margin: 5px 0;
}
.el-alert {
  margin: 5px 0;
}
</style>
