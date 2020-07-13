<template>
  <div>
    <center>
      <h2>模拟情景志愿填报</h2>
    </center>
    <section>
      <h3>情景3</h3>
      <p>您的朋友，小红，也参与了本调查。系统给她推荐的学校和给您推荐学校相同，她的分数也您的分数相同。她对学校满意度和小明相同：</p>
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
            <el-input-number v-model="answer.value" :min="1" :max="100" disabled></el-input-number>
          </el-col>
        </el-col>
      </el-row>
    </section>

    <section style="margin-top: 50px;" v-if="satisfactions[0]">
      <p>
        小红现在需要您帮助她填报志愿。
        为了鼓励您认真作答，我们将会根据您的回答，以及今年学校的录取分数线来计算小红获得的满意度，并以此为据为您发放报酬，报酬额度与满意度相同。
        比如说，如果小红被{{ satisfactions[0].college.full_name }}录取，那么我们将给您 {{ satisfactions[0].value }}元报酬。
        如果小红未被任何学校录取，那么您将不能获得任何报酬。
      </p>
      <h4>小红只愿意填写两所学校，她需要您的帮助。请问在这种情况下您会如何填写志愿？</h4>
      <FillableZhiyuanForm v-model="sim4selectedColleges" :choices="2" />
    </section>
    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="testDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";
import utils from "@/plugins/utils";

export default {
  name: "SimulationSceneFour",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      satisfactions: [],
      sim4selectedColleges: [],
      colleges: []
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers",
      "xiaoMingSatisfactions"
    ]),
    numberOfSelectedColleges() {
      return this.sim3selectedColleges.length;
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.satisfactions = this.xiaoMingSatisfactions;
    },

    testDone() {
      if (this.sim4selectedColleges.length != 2) {
        this.$message({
          message: "请填写两个志愿",
          type: "error"
        });
      } else {
        this.$store.commit('saveSim4selectedColleges', this.sim4selectedColleges)
        this.$emit("confirmed")
      }
    }
  }
};
</script>

