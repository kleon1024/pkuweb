<template>
  <div>
    <div align="center">
      <h3>一本志愿表（本科一批）</h3>
    </div>
    <el-table
      :data="zhiyuanFormData"
      border
      style="margin-top: 10px;"
      stripe
    >
      <el-table-column
        align="center"
        label="志愿号"
        width="120"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">一批次 {{ ["A", "B", "C", "D"][scope.row.index - 1] }} 院校</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="院校"
      >
        <template slot-scope="scope">
          <span :class="collegeIndices2Highlight.includes(scope.row.index) ? 'with-highlight' : ''">
            {{ scope.row.full_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="collegeAdminScores"
        align="center"
        label="录取分数线"
      >
        <template slot-scope="scope">
          <span v-if="collegeAdminScores[scope.row.index - 1]">
            {{ loginUser.basic_info.total_score + collegeAdminScores[scope.row.index - 1] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ReadOnlyZhiyuanForm",
  props: {
    highlights: {
      type: Array,
      required: false,
      default: null
    },
    colleges: {
      type: Array,
      required: false,
      default: null
    },
    collegeAdminScores: {
      type: Array,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState(["intendedColleges"]),
    collegeIndices2Highlight() {
      return this.highlights ? this.highlights : [];
    },
    zhiyuanFormData() {
      const copiedColleges = Array.from(this.colleges ? this.colleges : this.intendedColleges)
      if (copiedColleges.length === 3) {
        copiedColleges.push(
          {
            full_name: "空白（未填写）",
            order: "D"
          }
        );
      }
      return copiedColleges.map((college, index) => {
        college.index = index + 1;
        return college;
      });
    }
  }
}
</script>

<style scoped>
.with-highlight {
  color: red;
}
</style>
