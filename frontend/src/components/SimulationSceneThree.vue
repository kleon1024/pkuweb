<template>
  <div>
    <center>
      <h2>模拟情景志愿填报</h2>
    </center>
    <section>
      <h3>情景2</h3>
      <p>你的朋友，小明，也参与了本调查。系统给他推荐的学校和给你推荐的相同，他的分数也你的分数相同。不过，他对学校满意度是不同的：</p>
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
      <h4>【问题3】（该题将计入情景2的奖励）小明需要你为他出主意。请在下面为他填写你的建议：</h4>
      <FillableZhiyuanForm v-model="sim3selectedColleges" />
      <el-alert
        v-show="numberOfSelectedColleges <= 3"
        type="error"
        center
        :title="zhiyuanFormHint"
        :closable="false"
      />
      <h4>【问题4】（答对该题将会额外获得2元）假设小明填报的志愿是：</h4>
      <FillableZhiyuanForm v-model="colleges" :colleges="xiaoMingselectedColleges" disabled />
      <h4>
        录取分数线出来后，你发现小明的分数
        比{{ satisfactions[0].college.full_name }}和 {{ satisfactions[1].college.full_name }} 高，
        比{{ satisfactions[2].college.full_name }}和 {{satisfactions[3].college.full_name}} 低，
        那么______:
      </h4>
      <el-radio-group v-model="sim3Answer" required>
        <el-row style="margin-top: 20px;">
          <el-radio label="A">A. 小明一定会被{{satisfactions[0].college.full_name}}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio label="B">B. 小明一定会被{{satisfactions[1].college.full_name}}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio
            label="C"
          >C. 小明可能会被{{satisfactions[0].college.full_name}}录取，也可能会被{{satisfactions[1].college.full_name}}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio label="D">D. 小明有可能落榜</el-radio>
        </el-row>
      </el-radio-group>
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
        this.recommendedColleges[1]
      ];
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

