<template>
  <div>
    <center>
      <h2>情景：帮助李华报志愿</h2>
    </center>
    <section>
      <p>
        <span class="danger">李华的分数和你的分数相同。</span> 下表列出了他正在考虑的学校以及满意度：
      </p>
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
      <h4>如果你可以帮助李华选择上述学校的中的四所作为一批次志愿，你会如何选择？</h4>
      <FillableZhiyuanForm v-model="selected4Colleges" :choices="4" />
      <h4>如果李华只愿意选择两所学校作为一批次志愿，C,D院校的位置空着，你会如何选择？</h4>
      <FillableZhiyuanForm v-model="selected2Colleges" :choices="2" />
      <h4>如果李华只愿意选择一所学校，B,C,D院校的位置都空着，你会如何选择？</h4>
      <FillableZhiyuanForm v-model="selected1Colleges" :choices="1" />
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
  name: "SimulationSceneThree",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      satisfactions: [],
      selected4Colleges: [],
      selected2Colleges: [],
      selected1Colleges: [],
      colleges: [],
      sim3Answer: ""
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers",
      "xiaoMingSatisfactions"
    ]),
    checkNumber() {
      return (
        this.selected4Colleges.length == 4 &&
        this.selected2Colleges == 2 &&
        this.selected1Colleges == 1
      );
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    submitAnswer() {
      return {
        selected4Colleges: this.selected4Colleges.map(c => c.full_name),
        selected2Colleges: this.selected2Colleges.map(c => c.full_name),
        selected1Colleges: this.selected1Colleges.map(c => c.full_name),
      };
    },
    checkNumber() {
      return (
        this.selected4Colleges.length == 4 &&
        this.selected2Colleges.length == 2 &&
        this.selected1Colleges.length == 1
      );
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
      if (!this.checkNumber) {
        this.$message({
          message: "请填写所有志愿",
          type: "error"
        });
      } else {
        this.$emit("confirmed");
        this.$store.commit("storeSim3Answer", this.submitAnswer);
      }
    }
  }
};
</script>

