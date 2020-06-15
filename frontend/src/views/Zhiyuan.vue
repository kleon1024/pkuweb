<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">志愿辅导</span>
      </el-row>
      <div class="personal-info">
        <div class="personal-tags" align="right">
          <span v-if="basicInfo">
            <el-tag>考生: {{ basicInfo.name || "尚未填写" }}</el-tag>
            <el-tag>排名: {{ basicInfo.ranking || "尚未填写" }}</el-tag>
            <el-tag>总分: {{ basicInfo.total_score || "尚未填写" }}</el-tag>
            <el-tag>选科: {{ !basicInfo.class_selection ? "尚未填写" : (basicInfo.class_selection === "1" ? "理科" : "文科") }}</el-tag>
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
          style="margin-top: 12px;"
          title="奖励会在高考志愿填报结束之后通过微信/支付宝统一发放。"
          type="success"
          :closable="false"
          show-icon
        />
        <el-alert
          v-if="majorStep > 1 && !zhiyuanColleges"
          style="margin-top: 20px;"
          type="error"
          title="请不要在志愿填写过程中离开，刷新或者关闭该页面。请完成每页的内容并点击下一步一直到确认提交志愿表，否则需要重新填表。"
          center
          :closable="false"
        />
      </div>
    </div>
    <el-progress :percentage="majorStep*10" :format="format"></el-progress>
    <section class="guide-content">
      <BasicInfo v-if="majorStep === 1" @confirmed="saveStep(majorStep + 1, 1)" />
      <CollegeRecommend v-if="majorStep === 2" @confirmed="saveStep(majorStep + 1, 1)" />
      <IntendedCollegesForm v-if="majorStep === 3" @confirmed="saveStep(majorStep + 1, 1)" />
      <CollegeSatisfaction
        v-if="majorStep === 4 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <OtherCollegesSatisfaction
        v-if="majorStep === 4 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <SimulationSceneOne
        v-if="majorStep === 5 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <SimulationSceneTwo
        v-if="majorStep === 5 && minorStep === 2"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />

      <SimulationSceneThree
        v-if="majorStep === 5 && minorStep === 3"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />

      <SimulationSceneFour
        v-if="majorStep === 5 && minorStep === 4"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />

      <SimulationSceneFive
        v-if="majorStep === 5 && minorStep === 5"
        @confirmed="saveStep(majorStep + 1, 1)"
      />

      <ProbabilityPreTest
        v-if="majorStep === 6 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />

      <Probabilities
        v-if="majorStep === 6 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"
      />

      <AdmissionScoresInfoTest
        v-if="majorStep === 7 && minorStep === 1"
        @confirmed="saveStep(majorStep + 1, 1)"
      />

      <ZhiyuanGuideCollegeOrder
        v-if="majorStep === 8 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
   
      <ZhiyuanGuideStrategy
        v-if="majorStep === 8 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"
      />   

      <ZhiyuanSubmissionForm
        v-if="majorStep === 9 && minorStep === 1"
        @confirmed="onZhiyuanSubmissionFormDone"
      />

    </section>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import BasicInfo from "@/components/BasicInfo";
import CollegeRecommend from "@/components/CollegeRecommend";
import IntendedCollegesForm from "@/components/IntendedCollegesForm";
import CollegeSatisfaction from "@/components/CollegeSatisfaction";
import OtherCollegesSatisfaction from "@/components/OtherCollegesSatisfaction";
import SimulationSceneOne from "@/components/SimulationSceneOne";
import SimulationSceneTwo from "@/components/SimulationSceneTwo";
import SimulationSceneThree from "@/components/SimulationSceneThree";
import SimulationSceneFour from "@/components/SimulationSceneFour";
import SimulationSceneFive from "@/components/SimulationSceneFive";
import ProbabilityPreTest from "@/components/ProbabilityPreTest";
import Probabilities from "@/components/Probabilities";
import AdmissionScoresInfoTest from "@/components/AdmissionScoresInfoTest";
import ZhiyuanGuideCollegeOrder from "@/components/ZhiyuanGuideCollegeOrder";
import ZhiyuanGuideStrategy from "@/components/ZhiyuanGuideStrategy";
import ZhiyuanSubmissionForm from "@/components/ZhiyuanSubmissionForm";

import request from "@/plugins/request";

export default {
  components: {
    BasicInfo,
    CollegeRecommend,
    IntendedCollegesForm,
    CollegeSatisfaction,
    OtherCollegesSatisfaction,
    SimulationSceneOne,
    SimulationSceneTwo,
    SimulationSceneThree,
    SimulationSceneFour,
    SimulationSceneFive,
    ProbabilityPreTest,
    Probabilities,
    AdmissionScoresInfoTest,
    ZhiyuanGuideCollegeOrder,
    ZhiyuanGuideStrategy,
    ZhiyuanSubmissionForm,
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
      )
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    }
  },
  computed: {
    ...mapState([
      "majorStep",
      "minorStep",
      "intendedColleges",
      "zhiyuanQuizAnswers",
      "zhiyuanSurveyAnswers",
      "otherCollegesInfo",
      "zhiyuanGuideAnswers",
      "zhiyuanColleges",
      "otherZhiyuanSatisfactionAssessAnswers",
      "zhiyuanSatisfactionAssessAnswers"
    ]),
    basicInfo() {
      return this.loginUser.basic_info;
    }
  },

  mounted() {},

  methods: {
    format(percentage) {
      if (this.majorStep == 10) {
        return "100%";
      }
      return this.majorStep + "-" + this.minorStep;
    },
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    saveStep(major, minor) {
      this.$store.commit("saveStep", [major, minor]);
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
                  this.saveStep(this.majorStep + 1, 1);
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
