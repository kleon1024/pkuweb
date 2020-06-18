<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">致宁夏2020届考生的一封信</span>
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
      v-lazy="nx_letter"
      width="100%"
    >
  </el-card>
</template>

<script>
import { mapState } from "vuex";
// import BasicInfo from "@/components/BasicInfo";
// import CollegeRecommend from "@/components/CollegeRecommend";
// import IntendedCollegesForm from "@/components/IntendedCollegesForm";
// import ZhiyuanQuizNavigation from "@/components/zhiyuan_quiz/Navigation";
// import ZhiyuanSurveyNavigation from "@/components/zhiyuan_survey/Navigation";
// import OtherCollegesNavigation from "@/components/other_colleges/Navigation";
// import AdmissionScoresInfoNavigation from "@/components/admission_scores_info/Navigation";
// import ZhiyuanGuideNavigation from "@/components/zhiyuan_guide/Navigation";
// import ZhiyuanSubmissionNavigation from "@/components/zhiyuan_submission/Navigation";

export default {
  // components: {
  //   BasicInfo,
  //   CollegeRecommend,
  //   IntendedCollegesForm,
  //   ZhiyuanQuizNavigation,
  //   ZhiyuanSurveyNavigation,
  //   OtherCollegesNavigation,
  //   AdmissionScoresInfoNavigation,
  //   ZhiyuanGuideNavigation,
  //   ZhiyuanSubmissionNavigation
  // },
  data() {
    return {
      nx_letter : "https://cm-1301052396.cos.ap-shanghai.myqcloud.com/nx_letter.png"
    };
  },
  methods: {
    gotoZhiyuan() {
      this.$router.push("/zhiyuan");
    }
  }
};
</script>

