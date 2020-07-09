<template>
  <div>
    <center>
      <h2>模拟情景志愿填报</h2>
    </center>
    <section>
      <h3>情景4</h3>
      <p>你的朋友，小刚，也参与了本调查。系统给他推荐的学校和给你推荐学校相同，他的分数也你的分数相同。他对学校满意度和小明相同：</p>
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
        小刚现在需要你帮助他填报志愿。
        为了鼓励你认真作答，我们将会根据你的回答，以及今年学校的录取分数线来计算小刚获得的满意度，并以此为据为你发放报酬，报酬额度与满意度相同。
        比如说，如果小刚被{{ satisfactions[0].college.full_name }}录取，那么我们将给你 {{ satisfactions[0].value }}元报酬。
        如果小刚未被任何学校录取，那么你将不能获得任何报酬。
      </p>
      <h4>
        小刚觉得上不了一本并不是一件完全不能接受的事。即使未被任何一本院校录取，他也能获得10的满意度。
        也就是说，在他未被任何一本志愿录取的情况下，你仍然能获得10元。
      </h4>
      <h4>小刚需要你的帮助。请问在这种情况下你会如何填写志愿？请注意，不论录取如何，你至少都能获得10元。</h4>
      <FillableZhiyuanForm v-model="sim5selectedColleges" />
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
  name: "SimulationSceneFive",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      satisfactions: [],
      sim5selectedColleges: [],
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
      if (this.sim5selectedColleges.length != 4) {
        this.$message({
          message: "请填写四个志愿",
          type: "error"
        });
      } else {
        this.$store.commit("saveSim5SelectedColleges", this.sim5selectedColleges)
        this.$emit("confirmed")
      }
    }
  }
};
</script>

