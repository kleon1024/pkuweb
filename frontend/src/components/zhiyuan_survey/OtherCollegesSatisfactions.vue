<template>
  <div>
    <p>现在，我们来考虑已推荐学校的名单中那些未被放入你的志愿表的院校。对于下面的每个学校，请考虑：如果你最终在该院校就读，你的满意程度是多少?</p>
    <p>
      你将用 0 到 100 之间的数字来表示你对就读于某个大学的满意程度。数字越大，你的满意程度越高。因此，0 表示最不满意，100 表示最满意。
      <strong>为了使答题更方便，你只需通过移动滑块(见下图)来表达自己对学校的满意程度。</strong>
    </p>
    <div>请看下面的例子:</div>
    <CollegeSatisfactionSlider v-model="demoSatisfaction" />
    <p>在上面的例子中，你对能够入读北大的满意程度是 {{ demoSatisfaction }}</p>
    <el-divider />
    <section>
      <div>现在请考虑对以下学校你的满意程度</div>
      <div
        v-for="(college, i) in recommendedButNotIntendedColleges"
        :key="`other-colleges-satisfaction-quiz-other-college-${i}`"
      >
        <CollegeSatisfactionSlider
          v-model="satisfactions[i]"
          :college="college.full_name"
        />
      </div>
    </section>

    <div
      align="right"
      style="margin-top: 20px;"
    >
      <el-button
        type="primary"
        @click.stop="satisfactionsDone"
      >
        下一步
      </el-button>
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
      this.recommendedButNotIntendedColleges = this.recommendedColleges.filter(college => {
        return !this.intendedColleges.some(zhiyuanCollege => {
          return (
            zhiyuanCollege.college_code === college.college_code &&
            zhiyuanCollege.campus_code === college.campus_code
          );
        });
      });
      this.satisfactions = new Array(this.recommendedButNotIntendedColleges.length).fill(0);
    },
    satisfactionsDone() {
      this.$emit("satisfactionsDone", this.satisfactionsToSubmit);
    }
  }
};
</script>

