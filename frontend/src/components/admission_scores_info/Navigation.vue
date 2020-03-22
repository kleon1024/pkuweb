<template>
  <div ref="pageTop">
    <center>
      <h2>录取分数线信息</h2>
    </center>
    <AdmissionScoresInfoTest @testDone="testDone" />
  </div>
</template>

<script>
import AdmissionScoresInfoTest from "./Test";
export default {
  name: "AdmissionScoresInfoNavigation",
  components: {
    AdmissionScoresInfoTest
  },
  computed: {
    userGroup() {
      return this.loginUser.assigned_group;
    }
  },
  mounted() {
    if (["T1"].includes(this.userGroup)) {
      this.$emit("admissionScoresInfoDone"); // skip this step
    } else {
      this.scrollToTop();
    }
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    testDone() {
      this.$emit("admissionScoresInfoDone");
    }
  }
};
</script>
