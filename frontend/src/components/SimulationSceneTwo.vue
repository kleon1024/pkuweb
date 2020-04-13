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
      <p>
        小明现在需要你帮助他填报志愿。为了鼓励你认真作答，我们将会根据你在第3题的回答，以及今年学校的录取分数线来计算小明获得的满意度，并以此为据为你发放奖励，奖励额度与满意度相同。
        比如说，如果小明被
        <span
          style="color:red; font-weight: bold;"
        >{{ satisfactions[0].college.full_name }}</span> 录取，
        那么我们将给你
        <span style="color:red; font-weight: bold;">{{ satisfactions[0].value }}</span> 元奖励。
        如果小明未被任何学校录取，那么你将不能从第3题获得任何奖励。
      </p>
      <p>在仔细阅读该情景后，请问答下面的问题：</p>
      <h4>
        【问题1】如果小明被
        <span
          style="color:red; font-weight: bold;"
        >{{ satisfactions[2].college.full_name }}</span>录取，那么你将获得______元奖励
      </h4>
      <el-radio-group v-model="q1_answer">
        <el-radio-button label="A">A. {{ satisfactions[0].value }}</el-radio-button>
        <el-radio-button label="B">B. {{ satisfactions[1].value }}</el-radio-button>
        <el-radio-button label="C">C. {{ satisfactions[2].value }}</el-radio-button>
      </el-radio-group>
      <h4>【问题2】如果小明没有被任何一本志愿录取，那么你将获得______元奖励</h4>
      <el-radio-group v-model="q2_answer">
        <el-radio-button label="A">A. 0</el-radio-button>
        <el-radio-button label="B">B. 5</el-radio-button>
        <el-radio-button label="C">C. 10</el-radio-button>
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
  name: "SimulationSceneTwo",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      satisfactions: [],
      q1_answer: "",
      q2_answer: ""
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers"
    ]),
    answersCorrect() {
      return this.q1_answer === "C" && this.q2_answer === "A";
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
      for (var i = 0; i < this.recommendedColleges.length; i++) {
        var college = this.recommendedColleges[i];
        var value;
        if (college.strategy === "冲") {
          value = utils.getRandomInt(50, 60);
        } else if (college.strategy === "稳") {
          value = utils.getRandomInt(30, 35);
        } else if (college.strategy === "保") {
          value = 10;
        }
        this.satisfactions.push({
          college: college,
          value: value
        });
      }
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

