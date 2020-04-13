<template>
  <div>
    <center>
      <h2>模拟填报</h2>
    </center>
    <p>在该部分中，你需要在虚拟情景中考虑如何填报志愿。这些场景能够帮助你在真实的志愿填报中作出更好的选择。我们还会从情景2，3，4中等可能地抽取一个，根据你在该情景中的回答给予奖励。</p>
    <section>
      <h3>情景1</h3>
      <p>在调查的开始，我们推荐了{{ numberOfColleges }} 所学校。学校的名字以及你对这些学校的满意度如下（如果你发现自己填写的满意度有误，可以通过“+”和“-”进行调整）</p>
      <div v-for="(answer, i) in satisfactions" :key="`simulation-1-colleges-recommendation-${i}`">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">{{ answer.college.full_name }}</el-col>
          <el-col :span="5">
            <el-input-number v-model="answer.value" :min="1" :max="100"></el-input-number>
          </el-col>
        </el-row>
      </div>
    </section>

    <section style="margin-top: 50px;">
      <p>在该情景中，你只能从我们推荐的12所学校中选择4所学校作为一本志愿院校。请在下面填写你的志愿。（如果你之前填写的所有志愿都来自于我们的推荐名单，把它们再填写一遍即可）</p>
      <FillableZhiyuanForm v-model="selectedColleges" />
      <el-alert
        v-show="numberOfSelectedColleges <= 3"
        type="error"
        center
        :title="zhiyuanFormHint"
        :closable="false"
      />
    </section>
    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="satisfactionsDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";

export default {
  name: "SimulationSceneOne",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      demoSatisfaction: 100,
      recommendedButNotIntendedColleges: [],
      satisfactions: [],
      selectedColleges: []
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers"
    ]),
    numberOfSelectedColleges() {
      return this.selectedColleges.length;
    },
    zhiyuanFormHint() {
      const dp1 =
        this.numberOfSelectedColleges < 3
          ? "请至少填写三个院校！"
          : "你只准备填报三个院校么？";
      return `${dp1}请注意，一本录取规则是“分数优先，遵循志愿”。因为院校在录取的时候只会考虑你的分数，不会因为 B, C, D 院校在你的志愿表上位置较低而不去录取你。也就是说，B, C, D 院校享受和 A 院校同样的优先录取权！`;
    },
    numberOfColleges() {
      return this.recommendedColleges.length;
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    satisfactionsToSubmit() {
      return this.recommendedButNotIntendedColleges.map((college, i) => {
        return {
          student_filled_satisfaction_score: this.satisfactions[i],
          college: college
        };
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.recommendedButNotIntendedColleges = this.recommendedColleges.filter(
        college => {
          return !this.intendedColleges.some(zhiyuanCollege => {
            return (
              zhiyuanCollege.college_code === college.college_code &&
              zhiyuanCollege.campus_code === college.campus_code
            );
          });
        }
      );

      for (var i = 0; i < this.recommendedColleges.length; i++) {
        var college = this.recommendedColleges[i];
        for (var j = 0; j < this.zhiyuanSatisfactionAssessAnswers.length; j++) {
          var answer = this.zhiyuanSatisfactionAssessAnswers[j];
          if (
            answer.college.college_code === college.college_code &&
            answer.college.campus_code === college.campus_code
          ) {
            this.satisfactions.push({
              college: college,
              value: answer.student_filled_satisfaction_score
            });
          }
        }

        for (
          var j = 0;
          j < this.otherZhiyuanSatisfactionAssessAnswers.length;
          j++
        ) {
          var answer = this.otherZhiyuanSatisfactionAssessAnswers[j];
          if (
            answer.college.college_code === college.college_code &&
            answer.college.campus_code === college.campus_code
          ) {
            this.satisfactions.push({
              college: college,
              value: answer.student_filled_satisfaction_score
            });
          }
        }
      }

      this.answerChanged = new Array(this.satisfactions.length).fill(false);
    },

    onChange(index) {
      this.answerChanged[index] = true;
    },
    satisfactionsDone() {
        this.$store.commit(
          "storeRecommendedZhiyuanSatisfactions",
          this.satisfactions
        );
        this.$store.commit(
          "storeSimulationOneZhiyuans",
          this.selectedColleges,
        );
        this.$emit("confirmed");
    }
  }
};
</script>

