<template>
  <div ref="pageTop">
    <center>
      <h2>报考辅导</h2>
    </center>
    <div v-if="curStep === 1">
      <ZhiyuanGuideCollegeOrder @collegeOrderDone="collegeOrderDone" />
    </div>
    <div v-if="curStep === 2">
      <ZhiyuanGuideStrategy @zhiyuanStrategyDone="zhiyuanStrategyDone" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ZhiyuanGuideCollegeOrder from "./CollegeOrder";
import ZhiyuanGuideStrategy from "./Strategy";

export default {
  name: "ZhiyuanGuideNavigation",
  components: {
    ZhiyuanGuideCollegeOrder,
    ZhiyuanGuideStrategy
  },
  data() {
    return {
      collegeOrderAnswers: null,
      curStep: 1
    };
  },
  computed: {
    ...mapState(["zhiyuanGuideAnswers"]),
    userGroup() {
      return this.loginUser.assigned_group;
    }
  },
  watch: {
    curStep(val) {
      this.scrollToTop();
    }
  },
  mounted() {
    if (["T1", "T2"].includes(this.userGroup)) {
      this.$emit("zhiyuanGuideDone"); // skip this step
    } else {
      if (this.zhiyuanGuideAnswers) {
        if (this.zhiyuanGuideAnswers.college_order_answers) {
          this.curStep = 2;
        }
      }
      this.scrollToTop();
    }
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    collegeOrderDone(collegeOrderAnswers) {
      this.collegeOrderAnswers = collegeOrderAnswers;
      this.curStep += 1;
    },
    zhiyuanStrategyDone() {
      this.$emit("zhiyuanGuideDone", {
        college_order_answers: this.collegeOrderAnswers
      });
    }
  }
};
</script>
