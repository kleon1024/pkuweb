<template>
  <div>
    <el-row :gutter="10">
      <el-col
        v-for="(college, index) in allColleges"
        :key="`zhiyuan-guide-strategy-other-college-${index}`"
        :xs="xsSpan"
        :sm="smSpan"
        :md="mdSpan"
      >
        <el-button
          style="width: 100%; margin: 5px;"
        >
          <el-link
            :type="!showStrategy ? 'primary' : (college.strategy === '冲' ? 'danger' : college.strategy === '稳' ? 'primary' : 'success')"
            :href="`http://baidu.com/s?wd=${college.full_name}%20site%3Agaokao.chsi.com.cn`"
            target="_blank"
            :underline="false"
          >
            {{ college.full_name }}<span v-if="showStrategy">({{ college.strategy }})</span>
          </el-link>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CollegeButtonTags",
  props: {
    colleges: {
      type: Array,
      required: false,
      default: null
    },
    showStrategy: {
      type: Boolean,
      required: false,
      default: false
    },
    fullSpan: {
      type: Number,
      required: false,
      default: 24
    }
  },
  computed: {
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    allColleges() {
      return !this.colleges
        ? this.collegeRecommendations.recommended_colleges
        : this.colleges;
    },
    xsSpan() {
      return 24;
    },
    smSpan() {
      return this.fullSpan >= 24 ? 12 : 24;
    },
    mdSpan() {
      return this.fullSpan >= 24 ? 8 : 12;
    }
  }
};
</script>

