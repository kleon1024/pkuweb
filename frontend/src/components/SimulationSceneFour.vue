<template>
  <div v-if="hanMeiMeiColleges && hanMeiMeiColleges.length > 0">
    <center>
      <h2>情景：帮助韩梅梅报志愿</h2>
    </center>
    <section>
      <p>
        <span class="danger">在本情景中，你所获得的额外报酬和韩梅梅对录取院校的满意度相同。比如说，如果她对录取院校的满意度为10，那么你将额外获得10元。</span>
      </p>
      <p>韩梅梅没有告诉您高考分数，不过您知道她的分数远远超出一本线。目前，她还没确定一批次A院校该填什么：</p>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="order"
          label="志愿号"
        ></el-table-column>
        <el-table-column
          prop="college"
          label="院校"
        ></el-table-column>
        <el-table-column
          prop="satisfaction"
          label="满意度"
        >
          <template slot-scope="scope">
            <span class="danger">{{scope.row.satisfaction}}</span>
          </template>
        </el-table-column>
      </el-table>
      <p>
        她已经从招生办了解到，自己的分数远远超过{{ hanMeiMeiColleges[4].college }}往年的分数线。
        如果没有被自己的第一选择（一批次A院校）录取，那么她一定会被{{ hanMeiMeiColleges[4].college }}或者{{ hanMeiMeiColleges[2].college }},{{ hanMeiMeiColleges[3].college }}录取。
        <span class="danger">在这种情况下，她的满意度是20。也就是说，在这种情况下您一定能获得20元。</span>
      </p>
      <p>
        经过资料查询，她认为如果被{{ hanMeiMeiColleges[1].college }}录取，她的满意度为
        <span class="danger">25</span>
        ，自己的分数达到{{ hanMeiMeiColleges[1].college }}分数线的可能性为
        <span class="danger">50%</span>。
      </p>
      <p>
        她估计自己的分数达到{{ hanMeiMeiColleges[0].college }}分数线的可能性为
        <span class="danger">25%</span>
        。不过，她还不确定自己对{{ hanMeiMeiColleges[0].college }}的满意程度，需要您帮她做一些计划。
      </p>
      <p>
        <span class="danger">韩梅梅认为她的风险偏好和你的相同，因此请根据你自己对风险的偏好为韩梅梅挑选院校。</span>
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
      <h4>请您告诉她，在下列七种情况下，她应该选择哪一所大学作为一批次A院校。在下面的每道小题中，每题都有两个选项。其中选项A的报酬是不变的，选项B的报酬随着题号的增加而上升。因此，随着题号的增加，你至多只能有一次机会从选项A切换到选项B。 </h4>
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="0px"
        status-icon
      >
        <el-row
          v-for="(satisfaction, index) in satisfactionOptions"
          :key="index.toString()"
        >
          <el-form-item
            :label="'1(' + (index + 1) + ')：'"
            :prop="'selectedColleges.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group
              v-model="form.selectedColleges[index].value"
              placeholder="请选择"
            >
              <el-radio
                key="A"
                label="A"
                style="margin-right: 5px; font-weight: bold; font-size: 120%;"
              >对{{ hanMeiMeiColleges[1].full_name }}的满意度是25，上线概率是50%。 </el-radio>
              <el-radio
                key="B"
                label="B"
                style="margin-right: 5px; font-weight: bold; font-size: 120%;"
              > 对{{ hanMeiMeiColleges[0].full_name }}的满意度是<span class="danger">{{ satisfaction }}</span>，上线概率25%。</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
    </section>
    <div
      align="center"
      style="margin-top: 50px;"
    >
      <el-button
        type="primary"
        @click.stop="testDone"
      >下一步</el-button>
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
    FillableZhiyuanForm,
  },
  data() {
    var list = [];
    for (var i = 0; i < 7; i++) {
      list.push({
        value: "",
      });
    }
    return {
      tableData: [],
      q1_answer: "",
      q2_answer: "",
      satisfactions: [],
      form: {
        selectedColleges: list,
      },
      colleges: [],
      allColleges: [],
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
      "hanMeiMeiCollegeOptions",
      "loginUser",
      "randomOrder",
    ]),
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    submitAnswer() {
      return {
        selectedColleges: this.form.selectedColleges,
      };
    },
    checkAnswer() {
      let changed = false;
      let lastVal = "";
      console.log(this.form.selectedColleges);
      for (var index in this.form.selectedColleges) {
        var a = this.form.selectedColleges[index];
        if (lastVal === "") {
          lastVal = a.value;
          continue;
        } else {
          if (a.value !== lastVal) {
            if (changed) {
              return false;
            } else {
              lastVal = a.value;
              changed = true;
            }
          }
        }
      }
      return true;
    },
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

        var type = 1;
        var chongs = [];
        var wens = [];

        console.log("-------------------------");
        console.log(this.recommendedColleges);
        for (var key in this.recommendedColleges) {
          var college = this.recommendedColleges[key];

          console.log("college");
          console.log(college);
          console.log(college.strategy);
          if (college.strategy == "冲") {
            chongs.push(college);
          }
          if (college.strategy == "稳") {
            wens.push(college);
          }
        }

        var useChong = false;
        var useWen = false;
        for (var college in this.chongs) {
          if (
            !(
              college.full_name == "宁夏大学" ||
              college.full_name == "宁夏医科大学" ||
              college.full_name == "兰州大学"
            )
          ) {
            useChong = true;
            break;
          }
        }
        for (var college in this.wens) {
          if (
            !(
              college.full_name == "宁夏大学" ||
              college.full_name == "宁夏医科大学" ||
              college.full_name == "兰州大学"
            )
          ) {
            useWen = true;
            break;
          }
        }
        if (useChong && useWen) {
          type = 0;
        } else {
          type = 1;
        }

        console.log(type);
        console.log(chongs);
        console.log(wens);

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
            college.full_name == "厦门大学" ||
            college.full_name == "中山大学" ||
            college.full_name == "南京大学" ||
            college.full_name == "中央财经大学" ||
            college.full_name == "上海财经大学"
          ) {
            group1.push(college);
          }

          if (
            college.full_name == "西北政法大学" ||
            college.full_name == "西安交通大学" ||
            college.full_name == "山东大学" ||
            college.full_name == "四川大学"
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
          hanMeiMeiColleges.push(wens[utils.getRandomInt(0, wens.length)]);
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
      var number0 = 1;
      var number1 = 1 - number0;
      collegeOptions.push([
        this.hanMeiMeiColleges[number0],
        this.hanMeiMeiColleges[number1],
      ]);

      this.satisfactionOptions = [30, 35, 40, 45, 50, 55, 60];

      this.$store.commit("storeHanMeiMeiCollegeOptions", collegeOptions);

      this.tableData = [
        { order: "一批次A院校", college: "?", satisfaction: "?" },
        {
          order: "一批次B院校",
          college: this.hanMeiMeiColleges[2].full_name,
          satisfaction: "20",
        },
        {
          order: "一批次C院校",
          college: this.hanMeiMeiColleges[3].full_name,
          satisfaction: "20",
        },
        {
          order: "一批次D院校",
          college: this.hanMeiMeiColleges[4].full_name,
          satisfaction: "20",
        },
      ];
    },
    testDone() {
      if (!this.correctAnswer) {
        if (this.q1_answer != "B") {
          let message = "题目1回答错误。请仔细阅读样例。";
          this.$alert(message, "请注意！", {
            confirmButtonText: "知道了",
            type: "error",
          });
        } else if (this.q2_answer != "B") {
          let message = "题目2回答错误。请仔细阅读样例。";
          this.$alert(message, "请注意！", {
            confirmButtonText: "知道了",
            type: "error",
          });
        } else {
          this.correctAnswer = true;
        }
      } else {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.$store.commit("storeSim4Answer", this.submitAnswer);
            this.$emit("confirmed");
          }
        });
      }
    },
    retrieveCollegeList(callback) {
      const busy = this.$loading({
        lock: true,
        text: "从服务器获取数据中，请耐心等待...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      request.post(`${this.API_URL}/college-admins`, {}, (err, res) => {
        if (res) {
          if (res.data.failed) {
            this.$alert(res.data.message, "获取数据失败", {
              type: "error",
              confirmButtonText: "去检查",
              callback: () => {
                busy.close();
              },
            });
          } else {
            const returnedColleges = Array.from(res.data);
            returnedColleges.sort((c1, c2) =>
              c1.full_name.localeCompare(c2.full_name, "zh-CN")
            ); // 按照大学名称字母排序;
            this.allColleges = returnedColleges;
            callback();
            busy.close();
          }
        } else {
          this.$message({
            message: "无法连接服务器，请稍后再试",
            type: "error",
          });
          busy.close();
        }
      });
    },
  },
};
</script>

