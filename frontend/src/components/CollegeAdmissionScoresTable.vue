<template>
  <div>
    <el-table
      :data="collegeAdmissionScores"
      border
      style="margin-top: 10px;"
      stripe
    >
      <el-table-column
        align="center"
        label="院校名称"
        width="240"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.full_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="`${SERVICE_YEAR - 1} 年分数线`"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.admission_min_score || "无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="`${SERVICE_YEAR - 2} 年分数线`"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.admission_min_score_l1 || "无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="`${SERVICE_YEAR - 1} 年平均分`"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.admission_mean_score || "无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="`${SERVICE_YEAR - 2} 年平均分`"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.admission_mean_score_l1 || "无数据" }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CollegeAdmissionScoresTable",
  props: {
    value: {
      type: Array,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState(["intendedColleges"]),
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    otherColleges() {
      return this.recommendedColleges.filter(college => {
        return !this.intendedColleges.some(zhiyuanCollege => {
          return (
            zhiyuanCollege.college_code === college.college_code &&
            zhiyuanCollege.campus_code === college.campus_code
          );
        });
      });
    },
    collegeAdmissionScores() {
      return this.intendedColleges.concat(this.otherColleges);
    }
  },
  watch: {
    collegeAdmissionScores(collegeAdmins) {
      this.$emit('input', collegeAdmins);
    }
  }
}
</script>
