<template>
  <div v-if="hanMeiMeiColleges && hanMeiMeiColleges.length > 0">
    <center>
      <h2>模拟情景</h2>
    </center>
    <section>
      <p>现在，你需要帮助自己的另一个朋友，韩梅梅。她没有告诉你高考分数，不过你知道她的分数远远超出一本线。目前，她还没确定一批次A院校该填什么：</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="order" label="志愿号"></el-table-column>
        <el-table-column prop="college" label="院校"></el-table-column>
        <el-table-column prop="satisfaction" label="满意度"></el-table-column>
      </el-table>
      <p>
        她已经从招生办了解到，自己的分数远远超过{{ hanMeiMeiColleges[4].college }}往年的分数线。
        如果没有被自己的第一选择（一批次A院校）录取，那么她一定会被{{ hanMeiMeiColleges[4].college }}或者{{ hanMeiMeiColleges[2].college }},{{ hanMeiMeiColleges[3].college }}录取。
        <span
          class="danger"
        >在这种情况下，她的满意度是15。也就是说，在这种情况下你一定能获得15元。</span>
      </p>
      <p>经过资料查询，她认为如果被{{ hanMeiMeiColleges[1].college }}录取，她的满意度为20，自己的分数超过{{ hanMeiMeiColleges[1].college }}分数线的可能性为80%。</p>
      <p>她估计自己的分数超过{{ hanMeiMeiColleges[0].college }}分数线的可能性为40%。不过，她还不确定自己对{{ hanMeiMeiColleges[0].college }}的满意程度，需要你帮她做一些计划。</p>
    </section>
    <section>
      <p>请回答以下问题来确认你对情景的理解：</p>
      <h4>1. 如果韩梅梅未被一批次A志愿录取，那么你将获得________</h4>
      <el-radio-group v-model="q1_answer">
        <el-radio-button label="A">A. 15元</el-radio-button>
        <el-radio-button label="B">B. 20元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
      <h4>2. 如果韩梅梅被{{ hanMeiMeiColleges[1].full_name }}录取，那么你将获得_______</h4>
      <el-radio-group v-model="q2_answer">
        <el-radio-button label="A">A. 15元</el-radio-button>
        <el-radio-button label="B">B. 20元</el-radio-button>
        <el-radio-button label="C">C. 无法确定</el-radio-button>
      </el-radio-group>
    </section>
    <section>
      <h4>请你告诉她，在下列六种情况下，她应该选择哪一所大学作为一批次A院校 ：</h4>
      <el-row v-for="(satisfaction, index) in satisfactionOptions" :key="index.toString()">
        <h4>
          {{ index + 1 }}.
          对{{ hanMeiMeiColleges[0].full_name }}的满意度是{{ satisfaction }}，上线概率25%。
          对{{ hanMeiMeiColleges[1].full_name }}的满意度是20，上线概率是50%。
          那么你建议她应该选择____作为一批次A院校。
        </h4>
        <el-select v-model="selectedColleges[index]" placeholder="请选择">
          <el-option
            v-for="(college, i) in hanMeiMeiCollegeOptions[index]"
            :key="college.full_name"
            :label="String.fromCharCode('A'.charCodeAt(0) + i) + '. ' +  college.full_name"
            :value="college"
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
  name: "SimulationSceneFour",
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
      colleges: [],
      allColleges: [],
      satisfactionOptions: []
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
        selectedColleges: this.selectedColleges
      };
    }
  },
  mounted() {
    this.retrieveCollegeList(this.init);
  },
  methods: {
    init() {
      console.log(this.hanMeiMeiColleges);
      if (this.hanMeiMeiColleges == null) {
        var hanMeiMeiColleges = [];
        console.log(hanMeiMeiColleges);

        var type = 0;
        var chongs = [];
        var baos = [];

        console.log("-------------------------")
        console.log(this.recommendedColleges)
        for (var key in this.recommendedColleges) {
          var college = this.recommendedColleges[key];

          console.log("college")
          console.log(college);
          console.log(college.strategy)
          if (college.strategy == "冲") {
            chongs.push(college);
          }
          if (college.strategy == "保") {
            baos.push(college);
          }
          if (college.strategy in ["冲", "稳"]) {
            if (college.full_name in ["宁夏大学", "宁夏医科大学", "兰州大学"]) {
              type = 1;
              break;
            }
          }
        }

        console.log(type);
        console.log(chongs);
        console.log(baos);

        var ningda;
        var ningyi;
        var landa;
        var group1 = [];
        var group2 = [];

        for (var key in this.allColleges) {
          var college = this.allColleges[key];

          if (college.full_name == "宁夏大学") {
            ningda = college;
          } else if (college.full_name == "宁夏医科大学") {
            ningyi = college;
          } else if (college.full_name == "兰州大学") {
            landa = college;
          }

          if (
            college.full_name in
            ["厦门大学", "中山大学", "南京大学", "中央财经大学", "上海财经大学"]
          ) {
            group1.push(college);
          }

          if (
            college.full_name in
            ["西北政法大学", "西安交通大学", "山东大学", "四川大学"]
          ) {
            group2.push(college);
          }
        }

        console.log(ningda);
        console.log(ningyi);
        console.log(landa);
        console.log(group1);
        console.log(group2);

        if (type == 0) {
          hanMeiMeiColleges.push(chongs[utils.getRandomInt(0, chongs.length)]);
          hanMeiMeiColleges.push(baos[utils.getRandomInt(0, baos.length)]);
          hanMeiMeiColleges.push(landa);
          hanMeiMeiColleges.push(ningyi);
          hanMeiMeiColleges.push(ningda);
        } else if (type == 1) {
          hanMeiMeiColleges.push(group1[utils.getRandomInt(0, group1.length)]);
          hanMeiMeiColleges.push(group2[utils.getRandomInt(0, group2.length)]);
          hanMeiMeiColleges.push(landa);
          hanMeiMeiColleges.push(ningyi);
          hanMeiMeiColleges.push(ningda);
        }

        // Mock
        // HanMeiMeiColleges
        // hanMeiMeiColleges = [];
        // hanMeiMeiColleges.push(...this.recommendedColleges);

        this.$store.commit("storeHanMeiMeiColleges", hanMeiMeiColleges);
      }

      var collegeOptions = [];

      for (var i = 0; i < 6; i++) {
        var number0 = utils.getRandomInt(0, 2);
        var number1 = 1 - number0;
        collegeOptions.push([
          this.hanMeiMeiColleges[number0],
          this.hanMeiMeiColleges[number1]
        ]);
      }

      this.satisfactionOptions = [22, 25, 27, 30, 40, 60];

      this.$store.commit("storeHanMeiMeiCollegeOptions", collegeOptions);

      this.tableData = [
        { order: "一批次A院校", college: "?", satisfaction: "?" },
        {
          order: "一批次B院校",
          college: this.hanMeiMeiColleges[2].full_name,
          satisfaction: "15"
        },
        {
          order: "一批次C院校",
          college: this.hanMeiMeiColleges[3].full_name,
          satisfaction: "15"
        },
        {
          order: "一批次D院校",
          college: this.hanMeiMeiColleges[4].full_name,
          satisfaction: "15"
        }
      ];
    },
    testDone() {
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
      } else if (!this.checkCollege) {
        this.$message({
          message: "请填写所有题目",
          type: "error"
        });
      } else {
        this.$store.commit("storeSim4Answer", this.submitAnswer);
        this.$emit("confirmed");
      }
    },
    retrieveCollegeList(callback) {
      const busy = this.$loading({
        lock: true,
        text: "从服务器获取数据中，请耐心等待...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      request.post(`${this.API_URL}/college-admins`, {}, (err, res) => {
        console.log(res);
        if (res) {
          if (res.data.failed) {
            this.$alert(res.data.message, "获取数据失败", {
              type: "error",
              confirmButtonText: "去检查",
              callback: () => {
                busy.close();
              }
            });
          } else {
            const returnedColleges = Array.from(res.data);
            returnedColleges.sort((c1, c2) =>
              c1.full_name.localeCompare(c2.full_name, "zh-CN")
            ); // 按照大学名称字母排序;
            this.allColleges = returnedColleges;
            console.log(this.allColleges);
            callback();
            busy.close();
          }
        } else {
          this.$message({
            message: "无法连接服务器，请稍后再试",
            type: "error"
          });
          busy.close();
        }
      });
    }
  }
};
</script>

