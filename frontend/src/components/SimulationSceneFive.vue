<template>
  <div>
    <center>
      <h2>模拟情景</h2>
    </center>
    <section>
      <p>
        在了解了更多情况后，
        <span class="danger">韩梅梅对B,C,D中院校的满意度降低了</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="order" label="志愿号"></el-table-column>
        <el-table-column prop="college" label="院校"></el-table-column>
        <el-table-column prop="satisfaction" label="满意度"></el-table-column>
      </el-table>
      <p>经过资料查询，她认为如果被 {{ hanMeiMeiColleges[1].full_name }}录取，她的满意度为25，自己的分数超过 {{ hanMeiMeiColleges[1].full_name }}分数线的可能性为50%。</p>
      <p>她估计自己的分数超过{{ hanMeiMeiColleges[0].full_name }}分数线的可能性为25%。不过，她还不确定自己对{{ hanMeiMeiColleges[0].full_name }}的满意程度，需要你帮她做一些计划。</p>
    </section>
    <section v-if="!correctAnswer">
      <p>请回答以下问题来确认你对情景的理解：</p>
      <h4>1. 如果韩梅梅未被一批次A志愿录取，那么你将获得________</h4>
      <el-radio-group v-model="q1_answer">
        <el-radio-button label="A">A. 5元</el-radio-button>
        <el-radio-button label="B">B. 20元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
      <h4>2. 如果韩梅梅被{{ hanMeiMeiColleges[1].full_name }}录取，那么你将获得_______</h4>
      <el-radio-group v-model="q2_answer">
        <el-radio-button label="A">A. 20元</el-radio-button>
        <el-radio-button label="B">B. 25元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
    </section>

    <section v-if="correctAnswer">
      <h4>请你告诉她，在下列六种情况下，她应该选择哪一所大学作为一批次A院校 ：</h4>
      <el-row v-for="(satisfaction, index) in satisfactionOptions" :key="index.toString()">
        <h4>
          {{ index + 1 }}.
          对{{ hanMeiMeiColleges[0].full_name }}的满意度是{{ satisfaction }}，上线概率25%。
          对{{ hanMeiMeiColleges[1].full_name }}的满意度是25，上线概率是50%。
        </h4>
        <el-select v-model="selectedColleges[index]" placeholder="请选择">
          <el-option
            v-for="(college, i) in hanMeiMeiCollegeOptions"
            :key="college.full_name"
            :label="String.fromCharCode('A'.charCodeAt(0) + i) + '. ' +  college.full_name"
            :value="college.full_name"
          ></el-option>
        </el-select>
      </el-row>
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
import request from "@/plugins/request";

export default {
  name: "SimulationSceneFive",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      tableData: [],
      q1_answer: "",
      q2_answer: "",
      satisfactions: [],
      selectedColleges: Array(6).fill(null),
      selectedColleges: [],
      colleges: [],
      allColleges: [],
      collegeOptions: [],
      satisfactionOptions: [],
      correctAnswer: false,
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanSatisfactionAssessAnswers",
      "otherZhiyuanSatisfactionAssessAnswers",
      "xiaoMingSatisfactions",
      "hanMeiMeiColleges",
      "hanMeiMeiCollegeOptions"
    ]),
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    checkCollege() {
      for (var college in this.selectedColleges) {
        if (college == null) {
          return false;
        }
      }
      return true;
    },
    submitAnswer() {
      return {
        selectedColleges: this.selectedColleges.map(c => c.full_name),
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.satisfactionOptions = [22, 25, 27, 30, 40, 60];
      this.tableData = [
        { order: "一批次A院校", college: "?", satisfaction: "?" },
        {
          order: "一批次B院校",
          college: this.hanMeiMeiColleges[2].full_name,
          satisfaction: "5"
        },
        {
          order: "一批次C院校",
          college: this.hanMeiMeiColleges[3].full_name,
          satisfaction: "5"
        },
        {
          order: "一批次D院校",
          college: this.hanMeiMeiColleges[4].full_name,
          satisfaction: "5"
        }
      ];
    },
    testDone() {
      if (!this.correctAnswer) {
        if (this.q1_answer != "A") {
          let message = "题目1回答错误。请仔细阅读样例。";
          this.$alert(message, "请注意！", {
            confirmButtonText: "知道了",
            type: "error"
          });
        } else if (this.q2_answer != "B") {
          let message = "题目2回答错误。请仔细阅读样例。";
          this.$alert(message, "请注意！", {
            confirmButtonText: "知道了",
            type: "error"
          });
        } else {
          this.correctAnswer = true;
        }
      } else if (!this.checkCollege) {
        this.$message({
          message: "请填写所有题目",
          type: "error"
        });
      } else {
        this.$store.commit("storeSim5Answer", this.submitAnswer);
        this.$emit("confirmed");
      }
    }
  }
};
</script>

