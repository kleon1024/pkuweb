<template>
  <div>
    <center>
      <h2>录取满意程度</h2>
    </center>
    <p>对于下面的每个学校，请考虑：如果您最终在该院校就读，您的满意程度是多少?</p>
    <section>
      <div>请通过移动滑块来表明以下学校的满意程度。</div>
      <div
        v-for="(college, i) in recommendedButNotIntendedColleges"
        :key="`other-colleges-satisfaction-quiz-other-college-${i}`"
      >
        <CollegeSatisfactionSlider
          v-model="satisfactions[i]"
          :college="college.full_name"
          :index="i + 1"
          @change="onChange(i)"
        />
      </div>
    </section>

    <div align="right" style="margin-top: 20px;">
      <el-button type="primary" @click.stop="satisfactionsDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollegeSatisfactionSlider from "@/components/CollegeSatisfactionSlider";

export default {
  name: "OtherCollegesSatisfactions",
  components: {
    CollegeSatisfactionSlider
  },
  data() {
    return {
      demoSatisfaction: 100,
      recommendedButNotIntendedColleges: [],
      satisfactions: []
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
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
          college: college.full_name
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
      this.satisfactions = new Array(
        this.recommendedButNotIntendedColleges.length
      ).fill(0);
      this.answerChanged = new Array(this.satisfactions.length).fill(false);
      if (this.recommendedButNotIntendedColleges.length == 0) {
        this.$store.commit(
          "storeOtherZhiyuanSatisfactionAssessAnswers",
          this.satisfactionsToSubmit
        );
        this.$emit("confirmed");
      }
    },
    onChange(index) {
      this.answerChanged[index] = true;
    },
    satisfactionsDone() {
      var finished = true;
      var info = "";
      for (var i = 0; i < this.satisfactions.length; i++) {
        if (!this.answerChanged[i]) {
          finished = false;
          info = this.recommendedButNotIntendedColleges[i].full_name;
          break;
        }
      }
      if (finished) {
        this.$store.commit(
          "storeOtherZhiyuanSatisfactionAssessAnswers",
          this.satisfactionsToSubmit
        );
        this.$emit("confirmed");
      } else {
        this.$message({
          message: `${info}的滑块还没滑动过`,
          type: "error"
        });
      }
    }
  }
};
</script>

