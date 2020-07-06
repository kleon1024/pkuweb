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
            :clearable="scope.row > 3"
            :disabled="disabled || scope.row >= 2 && selectedCollegeIndices[scope.row - 2] == null"
            style="width: 100%;"
            :placeholder="placeholder[scope.row-1]"
          >
            <el-alert slot="empty" type="error" title="输入有误，没有匹配的院校" :closable="false" center />
            <el-option-group label="院校名单">
              <el-option
                v-for="(college, index) in allColleges"
                :key="`fillable-zhiyuan-form-college-order-${index}`"
                :label="college.full_name + (showStrategy ? `(${college.strategy})`: '')"
                :value="index"
                :disabled="selectedCollegeIndices.includes(index)"
              />
            </el-option-group>
            <!-- <el-option-group v-if="showAllColleges" label="其他院校">
              <el-option
                v-for="(college, index) in otherColleges"
                :key="`fillable-zhiyuan-form-college-order-${index + selectableRecommendedColleges.length}`"
                :label="college.full_name"
                :value="index + selectableRecommendedColleges.length"
                :disabled="selectedCollegeIndices.includes(index + selectableRecommendedColleges.length)"
              />
            </el-option-group> -->
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
    this.retrieveCollegeList();
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
    },
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"]),
    placeholder() {
      if (this.colleges.length == this.choices) {
        return this.colleges.map(item => item.full_name);
      } else {
        return Array(this.choices).fill("选择或搜索院校");
      }
    },
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    otherColleges() {
      return this.collegeRecommendations.other_colleges;
    },
    selectableRecommendedColleges() {
      if (this.intendedAndRecommendedColleges) {
        // 如果是最后填报的志愿表，则直接显示所有用户已选择和推荐的
        return this.intendedAndRecommendedColleges;
      }
      return this.recommendedColleges;
    },
    selectedColleges() {
      const selectableCollegesLength = this.allColleges.length
      return this.selectedCollegeIndices
        .filter(index => index != null)
        .map(index =>
          index < selectableCollegesLength
            ? this.selectableRecommendedColleges[index]
            : this.otherColleges[index - selectableCollegesLength]
        );
    }
  },
  watch: {
    selectedColleges(colleges) {
      this.$emit("input", colleges);
    }
  }
};
</script>
