<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">志愿调查</span>
      </el-row>
      <div class="personal-info">
        <div class="personal-tags" align="right">
          <span v-if="basicInfo">
            <el-tag>考生: {{ basicInfo.name || "尚未填写" }}</el-tag>
            <el-tag>排名: {{ basicInfo.ranking || "尚未填写" }}</el-tag>
            <el-tag>总分: {{ basicInfo.total_score || "尚未填写" }}</el-tag>
            <el-tag>选科: {{ !basicInfo.class_selection ? "尚未填写" : (basicInfo.class_selection == 1 ? "理科" : "文科") }}</el-tag>
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
          v-if="majorStep >= 1 && !zhiyuanColleges"
          style="margin-top: 20px;"
          type="error"
          title="请不要在志愿填写过程中离开，刷新或者关闭该页面。请完成每页的内容并点击下一步一直到确认提交志愿表，否则需要重新填表。"
          center
          :closable="false"
        />
      </div>
    </div>
    <el-progress :percentage="(majorStep % 10 + 1)*10" :format="format"></el-progress>
    <section class="guide-content">
      <BasicInfo v-if="majorStep === 1" @confirmed="saveStep(majorStep + 1, 1)" />
      <IntendedCollegesForm v-if="majorStep === 2" @confirmed="saveStep(majorStep + 1, 1)" />
      <CollegeSatisfaction
        v-if="majorStep === 3 && minorStep === 1"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <SimulationSceneOne
        v-if="majorStep === 4 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <SimulationSceneIntro
        v-if="majorStep === 4 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"      
      />
      <SimulationSceneFour
        v-if="majorStep === 5 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <SimulationSceneFive
        v-if="majorStep === 5 && minorStep === 2"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <SimulationSceneSix
        v-if="majorStep === 5 && minorStep === 3"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <CollegeRecommend v-if="majorStep === 6" @confirmed="saveStep(majorStep + 1, 1)" />
      <SimulationSceneTwo
        v-if="majorStep === 7 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <SimulationSceneThree
        v-if="majorStep === 7 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <OtherCollegesSatisfaction
        v-if="majorStep === 8 && minorStep === 1"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <ProbabilityPreTest
        v-if="majorStep === 9 && minorStep === 1"
        @confirmed="saveStep(majorStep, minorStep + 1)"
      />
      <Probabilities
        v-if="majorStep === 9 && minorStep === 2"
        @confirmed="saveStep(majorStep + 1, 1)"
      />
      <ZhiyuanSubmissionForm
        v-if="majorStep === 10 && minorStep === 1"
        @confirmed="onZhiyuanSubmissionFormDone"
      />
      <IntendedCollegesForm2 v-if="majorStep === 11" @confirmed="saveStep(majorStep + 1, 1)" />
      <CollegeSatisfaction2 v-if="majorStep === 12" @confirmed="saveStep(majorStep + 1 , 1)" />
      <Probabilities2 v-if="majorStep === 13" @confirmed="saveStep(majorStep + 1 , 1)" />
      <SimulationSceneOne2 v-if="majorStep === 14" @confirmed="saveStep(10, 1)" />
    </section>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import BasicInfo from "@/components/BasicInfo";
import CollegeRecommend from "@/components/CollegeRecommend";
import IntendedCollegesForm from "@/components/IntendedCollegesForm";
import IntendedCollegesForm2 from "@/components/IntendedCollegesForm2";
import CollegeSatisfaction from "@/components/CollegeSatisfaction";
import CollegeSatisfaction2 from "@/components/CollegeSatisfaction2";
import OtherCollegesSatisfaction from "@/components/OtherCollegesSatisfaction";
import SimulationSceneOne from "@/components/SimulationSceneOne";
import SimulationSceneOne2 from "@/components/SimulationSceneOne2";
import SimulationSceneTwo from "@/components/SimulationSceneTwo";
import SimulationSceneThree from "@/components/SimulationSceneThree";
import SimulationSceneFour from "@/components/SimulationSceneFour";
import SimulationSceneFive from "@/components/SimulationSceneFive";
import SimulationSceneSix from "@/components/SimulationSceneSix";
import SimulationSceneIntro from "@/components/SimulationSceneIntro";
import ProbabilityPreTest from "@/components/ProbabilityPreTest";
import Probabilities from "@/components/Probabilities";
import Probabilities2 from "@/components/Probabilities2";
import AdmissionScoresInfoTest from "@/components/AdmissionScoresInfoTest";
import ZhiyuanGuideCollegeOrder from "@/components/ZhiyuanGuideCollegeOrder";
import ZhiyuanGuideStrategy from "@/components/ZhiyuanGuideStrategy";
import ZhiyuanSubmissionForm from "@/components/ZhiyuanSubmissionForm";

import request from "@/plugins/request";
import highschools from "@/assets/highschools";

export default {
  components: {
    BasicInfo,
    CollegeRecommend,
    IntendedCollegesForm,
    IntendedCollegesForm2,
    CollegeSatisfaction,
    CollegeSatisfaction2,
    OtherCollegesSatisfaction,
    SimulationSceneOne,
    SimulationSceneOne2,
    SimulationSceneTwo,
    SimulationSceneThree,
    SimulationSceneFour,
    SimulationSceneFive,
    SimulationSceneSix,
    SimulationSceneIntro,
    ProbabilityPreTest,
    Probabilities,
    Probabilities2,
    AdmissionScoresInfoTest,
    ZhiyuanGuideCollegeOrder,
    ZhiyuanGuideStrategy,
    ZhiyuanSubmissionForm
  },

  beforeRouteLeave(to, from, next) {
    // 若用户已登出或者志愿已经填写完成(如果志愿未提交给服务器，则不可能出现在store里），直接退出
    if (!this.loginUser.name || this.zhiyuanColleges) {
      next();
    } else {
      this.$confirm(
        "如果您有尚未提交的志愿信息，这些信息将无法被记录。",
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
      "loginUser",
      "intendedColleges",
      "zhiyuanQuizAnswers",
      "zhiyuanSurveyAnswers",
      "otherCollegesInfo",
      "zhiyuanGuideAnswers",
      "zhiyuanColleges",
      "otherZhiyuanSatisfactionAssessAnswers",
      "zhiyuanSatisfactionAssessAnswers",
      "branch",
    ]),
    basicInfo() {
      return this.loginUser.basic_info;
    }
  },

  mounted() {},

  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    format(percentage) {
      if (this.majorStep == 10) {
        return "100%";
      }
      if (this.majorStep >= 11) {
        return "";
      }
      return this.majorStep + "-" + this.minorStep;
    },
    scrollToTop() {
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    },
    saveStep(major, minor) {
      this.saveCheckpoint(() => {
        if (
          (parseInt(this.loginUser.class_selection) == 1 &&
            this.loginUser.ranking > 12000) ||
          (parseInt(this.loginUser.class_selection) == 2 &&
            this.loginUser.ranking > 3500)
        ) {
          if (major == 2) {
            this.$store.commit("saveStep", [11, 1]);
          } else {
            this.$store.commit("saveStep", [major, minor]);
          }
        } else if (
          this.loginUser &&
          this.loginUser.college_recommendations &&
          this.loginUser.college_recommendations.recommended_colleges.length <=
            3
        ) {
          if (major == 4 && minor == 2) {
            this.$store.commit("saveStep", [8, 1]);
          } else {
            this.$store.commit("saveStep", [major, minor]);
          }
        } else if (this.branch == 1) {
          if (major == 5 && minor ==1) {
            this.$store.commit("saveStep", [5, 3]);
          } else if (major == 6 && minor == 1) {
            this.$store.commit("saveStep", [5, 1]);
          } else if (major == 5 && minor == 2) {
            this.$store.commit("saveStep", [6, 1]);
          } else {
            this.$store.commit("saveStep", [major, minor]);
          }
        } else {
          this.$store.commit("saveStep", [major, minor]);
        }
        this.scrollToTop();
      });
    },
    saveCheckpoint(callback) {
      request.post(
        `${this.API_URL}/checkpoint`,
        this.currentState,
        (err, res) => {
          if (res) {
            if (!res.data.failded) {
              this.$message({
                type: "success",
                message: "检查点保存成功"
              });
              callback();
            } else {
              this.$message({
                type: "error",
                message: "检查点保存失败，请重试"
              });
            }
          } else {
            this.$message({
              type: "error",
              message: "网络问题，检查点保存失败，请重试"
            });
          }
        }
      );
    },
    zhiyuanFinished() {
      this.$message({
        type: "success",
        message: "您已成功提交志愿，如有问题请与我们联系"
      });
    },
    onZhiyuanSubmissionFormDone(zhiyuanForm) {
      this.$store.commit("savePaymentMethod", zhiyuanForm.paymentMethod);
      this.saveCheckpoint(() => {});
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
