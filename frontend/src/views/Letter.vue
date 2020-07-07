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
          >进入志愿调查</el-button>
        </span>
      </el-row>
    </div>
    <div>
      <strong> <p> 您好！</p>
        <p> 我们是来自北京大学教育学院的课题团队， 目前正在对宁夏应届考生进行一次有关高考志愿填报和学校选择的调查。</p>
      <p> 我们诚挚邀请您有偿填写一份简短的网络问卷。
      完成问卷大约需要25-30分钟。
      问卷提交成功后，我们会立即通过微信向您转账50元，作为参与此次调查的报酬。
      根据您对问卷问题的回答情况，您还将获得一定数额的额外奖励（多至60元）。 </p>

      <p> 问卷内容将不会涉及任何敏感身份信息，所有数据将会被严格保密、并仅被用于学术研究。</p>
      <p> 关于此次问卷调查的更多信息，您可以登陆<a href="http://www.gse.pku.edu.cn/syxw/tzgg/99309.htm"> 北京大学教育学院官网</a> 进行浏览。  </p>
      如果您在填写过程中有任何疑问，请通过邮件（地址：yqding@gse.pku.edu.cn）或微信pku_zhiyuan1联系我们。感谢您的支持与配合！</strong>
    </div>
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

