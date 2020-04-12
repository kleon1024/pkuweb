<template>
  <!-- <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">致宁夏2019届考生的一封信</span>
        <span style="float: right;">
          <el-button
            type="primary"
            plain
            @click="gotoZhiyuan('loginForm')"
          >进入志愿辅导</el-button>
        </span>
      </el-row>
    </div>
    <img
      class="letter-fall-back"
      :src="require('@/assets/nx_letter.png')"
      width="100%"
    >
  </el-card> -->
  <BasicInfo />
</template>

<script>
import { mapState } from "vuex";
import BasicInfo from "@/components/BasicInfo";
import CollegeRecommend from "@/components/CollegeRecommend";
import IntendedCollegesForm from "@/components/IntendedCollegesForm";
import ZhiyuanQuizNavigation from "@/components/zhiyuan_quiz/Navigation";
import ZhiyuanSurveyNavigation from "@/components/zhiyuan_survey/Navigation";
import OtherCollegesNavigation from "@/components/other_colleges/Navigation";
import AdmissionScoresInfoNavigation from "@/components/admission_scores_info/Navigation";
import ZhiyuanGuideNavigation from "@/components/zhiyuan_guide/Navigation";
import ZhiyuanSubmissionNavigation from "@/components/zhiyuan_submission/Navigation";

export default {
  components: {
    BasicInfo,
    CollegeRecommend,
    IntendedCollegesForm,
    ZhiyuanQuizNavigation,
    ZhiyuanSurveyNavigation,
    OtherCollegesNavigation,
    AdmissionScoresInfoNavigation,
    ZhiyuanGuideNavigation,
    ZhiyuanSubmissionNavigation
  },
  
  methods: {
    gotoZhiyuan() {
      this.$router.push("/zhiyuan");
    }
  }
};
</script>

