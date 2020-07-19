<template>
  <div>
    <center>
      <h4>{{ title }}</h4>
    </center>
    <el-table :data="collegeOrders" border style="margin-top: 25px;">
      <el-table-column align="center" label="志愿号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">一批次 {{ ["A", "B", "C", "D"][scope.row - 1] }} 院校</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="院校">
        <template slot-scope="scope">
          <el-select
            v-model="selectedCollegeIndices[scope.row - 1]"
            filterable
            clearable
            :disabled="disabled"
            style="width: 100%;"
            :placeholder="placeholder[scope.row-1]"
          >
            <el-alert slot="empty" type="error" title="输入有误，没有匹配的院校" :closable="false" center />
            <el-option-group v-if="!showAllColleges" label="推荐院校名单">
              <el-option
                v-for="(college, index) in selectableRecommendedColleges"
                :key="`fillable-zhiyuan-form-college-order-${index}`"
                :label="college.full_name + (showStrategy ? `(${college.strategy})`: '')"
                :value="index"
                :disabled="selectedCollegeIndices.includes(index)"
              />
            </el-option-group>
            <el-option-group v-if="showAllColleges" label="所有院校">
              <el-option
                v-for="(college, index) in allColleges"
                :key="`fillable-zhiyuan-form-college-order-${index}`"
                :label="college.full_name"
                :value="index"
                :disabled="selectedCollegeIndices.includes(index)"
              />
            </el-option-group>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/plugins/request";
import { mapState } from "vuex";
export default {
  name: "FillableZhiyuanForm",
  props: {
    value: {
      // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "一本志愿表（本科一批）"
    },
    showStrategy: {
      type: Boolean,
      required: false,
      default: false
    },
    intendeds: {
      type: Array,
      required: false,
      default: () => Array()
    },
    showAllColleges: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    colleges: {
      type: Array,
      required: false,
      default: () => Array()
    },
    choices: {
      type: Number,
      required: false,
      default: 4
    }
  },
  mounted() {
    if (this.showAllColleges) {
      this.retrieveCollegeList();
      this.intendeds.push(...this.allColleges);
      this.allColleges = this.intendeds;
    }
  },
  data() {
    return {
      allColleges: [],
      selectedCollegeIndices: new Array(this.choices).fill(null),
      collegeOrders: Array.from(new Array(this.choices).keys(), x => x + 1)
    };
  },
  methods: {
    retrieveCollegeList() {
      const busy = this.$loading({
        lock: true,
        text: "从服务器获取数据中，请耐心等待...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      request.post(`${this.API_URL}/college-admins`, {}, (err, res) => {
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
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"]),
    placeholder() {
      var results = this.colleges.map(item => item.full_name);
      if (results.length == 0) {
        return Array(this.choices).fill("选择或搜索院校");
      }
      else if (results.length < this.choices) {
        for (var i = 0; i < this.choices - results.length; i++) {
          results.push("未填写")
        }
        return results;
      } else {
        return results;
      }
    },
    collegeRecommendations() {
      if (this.loginUser != null) {
        return this.loginUser.college_recommendations;
      }
    },
    recommendedColleges() {
      if (this.collegeRecommendations != null) {
        return this.collegeRecommendations.recommended_colleges;
      }
    },
    otherColleges() {
      if (this.collegeRecommendations != null) {
        return this.collegeRecommendations.other_colleges;
      }
    },
    selectableRecommendedColleges() {
      return this.recommendedColleges;
    },
    selectedColleges() {
      if (this.showAllColleges) {
        const selectableCollegesLength = this.allColleges.length;
        return this.selectedCollegeIndices
          .filter(index => index != null)
          .map(index => this.allColleges[index]);
      } else {
        const selectableCollegesLength = this.selectableRecommendedColleges
          .length; // 共有多少可供选择的推荐名单中的学校
        return this.selectedCollegeIndices
          .filter(index => index != null)
          .map(index =>
            index < selectableCollegesLength
              ? this.selectableRecommendedColleges[index]
              : this.otherColleges[index - selectableCollegesLength]
          );
      }
    }
  },
  watch: {
    selectedColleges(colleges) {
      this.$emit("input", colleges);
    }
  }
};
</script>
