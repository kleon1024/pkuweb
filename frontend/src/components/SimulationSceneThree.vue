<template>
  <div>
    <center>
      <h2>模拟情景</h2>
    </center>
    <section>
      <p>
        在本页中，你需要在虚拟场景中在帮助自己的朋友李华，韩梅梅填报志愿。
        <strong>为鼓励认真作答，我们会从李华和韩梅梅的志愿填报问题中随机抽取一道题，根据该题中你的回答给予额外报酬。具体来说，你获得报酬的额度和朋友的满意度相同。</strong>
      </p>
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
      <FillableZhiyuanForm v-model="sim3selected4Colleges" :choices="4" />
      <h4>如果李华只愿意选择两所学校作为一批次志愿，C,D院校的位置空着，你会如何选择？</h4>
      <FillableZhiyuanForm v-model="sim3selected2Colleges" :choices="2" />
      <h4>如果李华只愿意选择一所学校，B,C,D院校的位置都空着，你会如何选择？</h4>
      <FillableZhiyuanForm v-model="sim3selected1Colleges" :choices="2" />
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
      sim3selected4Colleges: [],
      sim3selected2Colleges: [],
      sim3selected1Colleges: [],
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
    numberOfSelectedColleges() {
      return this.sim3selectedColleges.length;
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    zhiyuanFormHint() {
      return `请填写四个院校！一本录取规则是“分数优先，遵循志愿”。因为院校在录取的时候只会考虑您的分数，不会因为 B, C, D 院校在您的志愿表上位置较低而不去录取您。也就是说，B, C, D 院校享受和 A 院校同样的优先录取权！`;
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
      if (this.sim3selectedColleges.length != 4) {
        this.$message({
          message: "请填写四个志愿",
          type: "error"
        });
      } else if (this.sim3Answer === "") {
        this.$message({
          message: "请回答问题【4】",
          type: "error"
        });
      } else {
        this.$emit("confirmed");
      }
    }
  }
};
</script>

