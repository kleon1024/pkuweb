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
        <el-table-column prop="satisfaction" label="满意度">
          <template slot-scope="scope">
            <span class="danger">{{scope.row.satisfaction}}</span>
          </template>
        </el-table-column>
      </el-table>
      <p>
        经过资料查询，她认为如果被 {{ hanMeiMeiColleges[1].full_name }}录取，她的满意度为
        <span class="danger">25</span>
        ，自己的分数达到 {{ hanMeiMeiColleges[1].full_name }}分数线的可能性为
        <span class="danger">50%</span>。
      </p>
      <p>
        她估计自己的分数达到{{ hanMeiMeiColleges[0].full_name }}分数线的可能性为
        <span class="danger">25%</span>
        。不过，她还不确定自己对{{ hanMeiMeiColleges[0].full_name }}的满意程度，需要您帮她做一些计划。
      </p>
    </section>
    <section v-if="!correctAnswer">
      <p>请回答以下问题来确认您对情景的理解：</p>
      <h4>1. 如果韩梅梅未被一批次A志愿录取，那么您将获得________</h4>
      <el-radio-group v-model="q1_answer">
        <el-radio-button label="A">A. 5元</el-radio-button>
        <el-radio-button label="B">B. 20元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
      <h4>2. 如果韩梅梅被{{ hanMeiMeiColleges[1].full_name }}录取，那么您将获得_______</h4>
      <el-radio-group v-model="q2_answer">
        <el-radio-button label="A">A. 20元</el-radio-button>
        <el-radio-button label="B">B. 25元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
    </section>

    <section v-if="correctAnswer">
      <h4>请您告诉她，在下列七种情况下，她应该选择哪一所大学作为一批次A院校 ：</h4>
      <el-form ref="form" :model="form" label-position="left" label-width="0px" status-icon>
        <el-row v-for="(satisfaction, index) in satisfactionOptions" :key="index.toString()">
          <h4>
            {{ index + 1 }}.
            <span
              v-if="hanMeiMeiCollegeOptions[0][0].full_name == hanMeiMeiColleges[0].full_name"
            >
              对{{ hanMeiMeiColleges[0].full_name }}的满意度是
              <span class="danger">{{ satisfaction }}</span>，上线概率
              <span class="danger">25%</span>。
            </span>
            <span v-if="hanMeiMeiCollegeOptions[0][1].full_name == hanMeiMeiColleges[1].full_name">
              对{{ hanMeiMeiColleges[1].full_name }}的满意度是
              <span class="danger">25</span>，上线概率是
              <span class="danger">50%</span>。
            </span>
            <span v-if="hanMeiMeiCollegeOptions[0][0].full_name == hanMeiMeiColleges[1].full_name">
              对{{ hanMeiMeiColleges[1].full_name }}的满意度是
              <span class="danger">25</span>，上线概率是
              <span class="danger">50%</span>。
            </span>
            <span v-if="hanMeiMeiCollegeOptions[0][1].full_name == hanMeiMeiColleges[0].full_name">
              对{{ hanMeiMeiColleges[0].full_name }}的满意度是
              <span class="danger">{{ satisfaction }}</span>，上线概率
              <span class="danger">25%</span>。
            </span>
          </h4>
          <el-form-item
            :prop="'selectedColleges.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group v-model="form.selectedColleges[index].value" placeholder="请选择">
              <el-radio
                v-for="(college, i) in hanMeiMeiCollegeOptions[0]"
                :key="college.full_name"
                :label="college.full_name"
              >{{ String.fromCharCode('A'.charCodeAt(0) + i) + '. ' + college.full_name }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
    </section>

    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="testDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/plugins/utils";
import request from "@/plugins/request";

export default {
  name: "SimulationSceneFive",
  components: {},
  data() {
    var list = [];
    for (var i = 0; i < 7; i++) {
      list.push({
        value: ""
      });
    }
    return {
      tableData: [],
      q1_answer: "",
      q2_answer: "",
      satisfactions: [],
      form: {
        selectedColleges: list
      },
      colleges: [],
      allColleges: [],
      collegeOptions: [],
      satisfactionOptions: [],
      correctAnswer: false
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
    submitAnswer() {
      return {
        selectedColleges: this.form.selectedColleges
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.satisfactionOptions = [30, 35, 40, 45, 50, 55, 60];
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
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store.commit("storeSim5Answer", this.submitAnswer);
            this.$emit("confirmed");
          }
        });
      }
    }
  }
};
</script>

