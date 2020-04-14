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
            <el-option-group label="推荐院校名单">
              <el-option
                v-for="(college, index) in selectableRecommendedColleges"
                :key="`fillable-zhiyuan-form-college-order-${index}`"
                :label="college.full_name + (showStrategy ? `(${college.strategy})`: '')"
                :value="index"
                :disabled="selectedCollegeIndices.includes(index)"
              />
            </el-option-group>
            <el-option-group v-if="showAllColleges" label="其他院校">
              <el-option
                v-for="(college, index) in otherColleges"
                :key="`fillable-zhiyuan-form-college-order-${index + selectableRecommendedColleges.length}`"
                :label="college.full_name"
                :value="index + selectableRecommendedColleges.length"
                :disabled="selectedCollegeIndices.includes(index + selectableRecommendedColleges.length)"
              />
            </el-option-group>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    }
  },
  mounted() {},
  data() {
    return {
      selectedCollegeIndices: new Array(4).fill(null), // 总共需要填的slots将一直是4，无论任何情况
      collegeOrders: [1, 2, 3, 4]
    };
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"]),
    placeholder() {
      if (this.colleges.length == 4) {
        return this.colleges.map(item => item.full_name);
      } else {
        console.log("AAA")
        return [
          "选择或搜索院校",
          "选择或搜索院校",
          "选择或搜索院校",
          "选择或搜索院校"
        ];
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
  },
  watch: {
    selectedColleges(colleges) {
      this.$emit("input", colleges);
    }
  }
};
</script>
