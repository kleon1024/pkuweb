<template>
  <div>
    <center>
      <h2>模拟情景志愿填报</h2>
    </center>
    <p>在该部分中，您需要在虚拟情景中考虑如何填报志愿。我们会从情景2，3，4中等可能地抽取一个，根据您在该情景中的回答给予0~60元不等的报酬。</p>
    <section>
      <h3>情景1</h3>
      <p>在调查的开始，我们列出了{{ numberOfColleges }}所您可能考虑过的院校。院校的名字以及您对这些院校的满意度如下（如果您发现自己填写的满意度有误，可以通过“+”和“-”进行调整）</p>
      <el-row style="margin-top: 20px;" :gutter="24">
        <el-col
          :xs="24"
          :sm="12"
          style="margin-top: 20px"
          v-for="(answer, i) in satisfactions"
          :key="`simulation-1-colleges-recommendation-${i}`"
        >
          <el-col :span="10">{{ answer.college.full_name }}</el-col>
          <el-col :span="5">
          <el-input-number v-model="answer.value" :min="1" :max="100"></el-input-number>
          </el-col>
        </el-col>
      </el-row>
    </section>

    <section style="margin-top: 50px;">
      <p>在该情景中，您只能从我们推荐的 {{ numberOfColleges }} 所学校中选择4所学校作为一本志愿院校。请在下面填写您的志愿。</p>
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
          ? ""
          : "";
      return `${dp1}请严格按照您最终提交的志愿表中院校的顺序进行填写。志愿顺序的错位可能会影响问卷报酬的发放！`;
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
      this.$store.commit("storeSimulationOneZhiyuans", this.selectedColleges);
      this.$emit("confirmed");
    }
  }
};
</script>

