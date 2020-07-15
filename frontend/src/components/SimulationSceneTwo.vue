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
      <el-row style="margin-top: 30px;" :gutter="24">
        <el-col
          :xs="24"
          :sm="12"
          style="margin-top: 30px"
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
        李华现在需要你帮助他填报志愿。
        <span class="danger"> 在此题中，奖励额度与满意度相同。</span>
      </p>
      <p>
        比如说，如果李华被
        <span
          style="color:red; font-weight: bold;"
        >{{ satisfactions[0].college.full_name }}</span> 录取，
        那么我们将给您
        <span style="color:red; font-weight: bold;">{{ satisfactions[0].value }}</span> 元报酬。
        如果李华未被任何学校录取，那么您将不能从本题中获得任何报酬。
      </p>
      <p>在仔细阅读该情景后，请问答下面的问题：</p>
      <h4>
        1. 如果李华被
        <span
          style="color:red; font-weight: bold;"
        >{{ satisfactions[1].college.full_name }}</span>录取，那么你将获得______元奖励
      </h4>
      <el-radio-group v-model="q1_answer">
        <el-radio-button label="A">A. {{ satisfactions[1].value - 10 }}</el-radio-button>
        <el-radio-button label="B">B. {{ satisfactions[1].value }}</el-radio-button>
        <el-radio-button label="C">C. {{ satisfactions[1].value + 10 }}</el-radio-button>
      </el-radio-group>
      <h4>2. 如果李华没有被任何一本志愿录取，那么你将获得______元奖励</h4>
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
      q2_answer: "",
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers",
      "xiaoMingSatisfactions"
    ]),
    answersCorrect() {
      return this.q1_answer == "B" && this.q2_answer === "A";
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
      if (this.xiaoMingSatisfactions == null) {
        for (var i = 0; i < this.recommendedColleges.length; i++) {
          var college = this.recommendedColleges[i];
          var value;
          if (college.strategy === "冲") {
            value = utils.getRandomInt(0, 2) * 10 + 50;
          } else if (college.strategy === "稳") {
            value = utils.getRandomInt(0, 2) * 5 + 30;
          } else if (college.strategy === "保") {
            value = 10;
          }
          this.satisfactions.push({
            college: college,
            value: value
          });
        }
        this.$store.commit("storeXiaoMingSatisfactions", this.satisfactions);
      } else {
        this.satisfactions = this.xiaoMingSatisfactions;
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

