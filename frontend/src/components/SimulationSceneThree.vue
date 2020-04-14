<template>
  <div>
    <center>
      <h2>模拟填报</h2>
    </center>
    <section>
      <h3>情景2</h3>
      <p>你的朋友，小明，也参与了本调查。系统给他推荐的学校和给你推荐的相同，他的分数也你的分数相同。不过，他对学校满意度是不同的：</p>
      <div v-for="(answer, i) in satisfactions" :key="`simulation-1-colleges-recommendation-${i}`">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">{{ answer.college.full_name }}</el-col>
          <el-col :span="5">
            <el-input-number v-model="answer.value" :min="1" :max="100" disabled></el-input-number>
          </el-col>
        </el-row>
      </div>
    </section>

    <section style="margin-top: 50px;" v-if="satisfactions[0]">
      <h4>【问题3】（该题将计入情景2的奖励）小明需要你为他出主意。请在下面为他填写你的建议：</h4>
      <FillableZhiyuanForm v-model="sim3selectedColleges"/>
      <el-alert
        v-show="numberOfSelectedColleges <= 3"
        type="error"
        center
        :title="zhiyuanFormHint"
        :closable="false"
      />
      <h4>【问题4】（答对该题将会额外获得2元）假设小明填报的志愿是：</h4>
      <FillableZhiyuanForm v-model="colleges" :colleges="xiaoMingselectedColleges" disabled/>
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
      sim3selectedColleges: [],
      xiaoMingselectedColleges: [],
      colleges: [],
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
    answersCorrect() {
      return this.q1_answer === "C" && this.q2_answer === "A";
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    zhiyuanFormHint() {
      return `请填写四个院校！一本录取规则是“分数优先，遵循志愿”。因为院校在录取的时候只会考虑你的分数，不会因为 B, C, D 院校在你的志愿表上位置较低而不去录取你。也就是说，B, C, D 院校享受和 A 院校同样的优先录取权！`;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.satisfactions = this.xiaoMingSatisfactions;
      this.xiaoMingselectedColleges = [
        this.recommendedColleges[0],
        this.recommendedColleges[3],
        this.recommendedColleges[2],
        this.recommendedColleges[1],
      ];
    },

    testDone() {
      if (this.answersCorrect) {
        this.$emit("confirmed");
      } else {
        let message = "题目回答错误。请仔细阅读样例。";
        this.$alert(message, "请注意！", {
          confirmButtonText: "知道了",
          type: "error"
        });
      }
    }
  }
};
</script>

