<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">志愿辅导</span>
      </el-row>
      <div class="personal-info">
        <div
          class="personal-tags"
          align="right"
        >
          <span v-if="basicInfo">
            <el-tag>考生: {{ basicInfo.name || "尚未填写" }}</el-tag>
            <el-tag type="danger">排名: {{ basicInfo.ranking || "尚未填写" }}</el-tag>
            <el-tag type="success">总分: {{ basicInfo.total_score || "尚未填写" }}</el-tag>
            <el-tag
              type="info"
            >选科: {{ !basicInfo.class_selection ? "尚未填写" : (basicInfo.class_selection === "1" ? "理科" : "文科") }}</el-tag>
          </span>
        </div>
        <el-alert
          style="margin-top: 12px;"
          title="如果您的个人信息显示有误，请您尽快联系我们进行修改。"
          type="warning"
          close-text="知道了"
          show-icon
        />
        <el-alert
          v-if="curStep > 1 && !zhiyuanColleges"
          style="margin-top: 20px;"
          type="error"
          title="请不要在志愿填写过程中离开，刷新或者关闭该页面。请完成每页的内容并点击下一步一直到确认提交志愿表，否则需要重新填表。"
          center
          :closable="false"
        />
      </div>
    </div>
    <section class="guide-content">
      <BasicInfo
        v-if="curStep === 1"
        @basicInfoDone="onBasicInfoDone"
      />
      <CollegeRecommend
        v-if="curStep === 2"
        @collegeRecommendDone="onCollegeRecommendDone"
      />
      <IntendedCollegesForm
        v-if="curStep === 3"
        @intendedCollegesFormDone="onIntendedCollegesFormDone"
      />
      <ZhiyuanQuizNavigation
        v-if="curStep === 4"
        @zhiyuanQuizDone="onZhiyuanQuizDone"
      />
      <ZhiyuanSurveyNavigation
        v-if="curStep === 5"
        @zhiyuanSurveyDone="onZhiyuanSurveyDone"
      />
      <OtherCollegesNavigation
        v-if="curStep === 6"
        @otherCollegesDone="onOtherCollegesDone"
      />
      <AdmissionScoresInfoNavigation
        v-if="curStep === 7"
        @admissionScoresInfoDone="onAdmissionScoresInfoDone"
      />
      <ZhiyuanGuideNavigation
        v-if="curStep === 8"
        @zhiyuanGuideDone="onZhiyuanGuideDone"
      />
      <ZhiyuanSubmissionNavigation
        v-if="curStep === 9"
        @zhiyuanSubmissionFormDone="onZhiyuanSubmissionFormDone"
      />
    </section>
  </el-card>
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

import request from "@/plugins/request";

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

  beforeRouteLeave(to, from, next) {
    // 若用户已登出或者志愿已经填写完成(如果志愿未提交给服务器，则不可能出现在store里），直接退出
    if (!this.loginUser.gaokao_id || this.zhiyuanColleges) {
      next();
    } else {
      this.$confirm(
        "如果你有尚未提交的志愿信息，这些信息将无法被记录。",
        "确认要离开该页面么？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        next();
      }).catch(() => {
        next(false);
      });
    }
  },

  data() {
    return {
      curStep: 0
    };
  },

  computed: {
    ...mapState([
      "intendedColleges",
      "zhiyuanQuizAnswers",
      "zhiyuanSurveyAnswers",
      "otherCollegesInfo",
      "zhiyuanGuideAnswers",
      "zhiyuanColleges"
    ]),
    basicInfo() {
      return this.loginUser.basic_info;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.zhiyuanColleges) {
        // 已完成所有填写
        this.zhiyuanFinished();
        this.curStep = 9;
      } else if (this.zhiyuanGuideAnswers) {
        // 已填过其他学校满意程度和概率调查
        this.curStep = 9;
      } else if (this.otherCollegesInfo) {
        // 已填过其他学校满意程度和概率调查
        this.curStep = 8;
      } else if (this.zhiyuanSurveyAnswers) {
        // 已填过满意程度
        this.curStep = 6;
      } else if (this.zhiyuanQuizAnswers) {
        // 已填过模拟志愿
        this.curStep = 5;
      } else if (this.intendedColleges) {
        // 已填过模拟志愿
        this.curStep = 4;
      } else if (this.loginUser.college_recommendations && this.loginUser.college_recommendations.recommended_colleges.length > 0) {
        // 已有推荐学校
        this.curStep = 3;
      } else if (this.loginUser.basic_info) {
        // 用户已填写基本信息
        this.curStep = 2;
      } else {
        this.curStep = 1;
      }
    },
    onBasicInfoDone(basicInfoForm) {
      this.curStep += 1; // go to next step
    },
    onCollegeRecommendDone() {
      this.curStep += 1;
    },
    onIntendedCollegesFormDone(colleges) {
      this.curStep += 1;
      this.$store.commit("storeIntendedColleges", colleges);
    },
    onZhiyuanQuizDone(zhiyuanQuizAnswers) {
      this.$store.commit("storeZhiyuanQuizAnswers", zhiyuanQuizAnswers);
      this.curStep += 1;
    },
    onZhiyuanSurveyDone(zhiyuanSurveyAnswers) {
      this.$store.commit("storeZhiyuanSurveyAnswers", zhiyuanSurveyAnswers);
      this.curStep += 1;
    },
    onOtherCollegesDone(otherCollegesInfo) {
      this.$store.commit("storeOtherCollegesInfo", otherCollegesInfo);
      this.curStep += 1;
    },
    onAdmissionScoresInfoDone() {
      this.curStep += 1;
    },
    onZhiyuanGuideDone(zhiyuanGuideAnswers) {
      this.$store.commit("storeZhiyuanGuideAnswers", zhiyuanGuideAnswers);
      this.curStep += 1;
    },
    zhiyuanFinished() {
      this.$message({
        type: "success",
        message: "你已成功提交志愿，如有问题请与我们联系"
      });
    },
    onZhiyuanSubmissionFormDone(zhiyuanForm) {
      this.$confirm(
        "恭喜你完成了我们的模拟志愿填报，我们后续将根据你的答案来计算你可以获得的奖励。如果有其他问题，请与我们联系。",
        "志愿填报完成",
        {
          type: "success",
          confirmButtonText: "确认提交",
          cancelButtonText: "再考虑一会",
          showClose: false
        }
      )
        .then(() => {
          const busy = this.$loading({
            lock: true,
            text: "提交数据中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          const zhiyuan = {
            intended_colleges: this.intendedColleges,
            zhiyuan_quiz_answers: this.zhiyuanQuizAnswers,
            zhiyuan_survey_answers: this.zhiyuanSurveyAnswers,
            other_colleges_info: this.otherCollegesInfo,
            zhiyuan_guide_answers: this.zhiyuanGuideAnswers,
            zhiyuan_colleges: zhiyuanForm.zhiyuanColleges
          };
          request.post(
            `${this.API_URL}/submit-zhiyuan`,
            { zhiyuan: zhiyuan, payment_method: zhiyuanForm.paymentMethod },
            (err, res) => {
              if (res) {
                if (!res.data.failded) {
                  this.$store.commit(
                    "storeZhiyuanColleges",
                    zhiyuanForm.zhiyuanColleges
                  );
                  busy.close();
                  this.zhiyuanFinished();
                } else {
                  this.$alert(res.data.message, "提交出错", {
                    type: "error",
                    confirmButtonText: "稍后再试",
                    callback: () => busy.close()
                  });
                }
              } else {
                this.$message({
                  type: "error",
                  message: "服务器出错，请稍后再试"
                });
                busy.close();
              }
            }
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin-left: 10px;
}

.guide-content {
  margin-top: 20px;
}
</style>
