<template>
  <div ref="pageTop">
    <center>
      <h2>一本院校志愿填报</h2>
    </center>
    <div v-if="curStep === 1">
      <ZhiyuanSubmissionForm @formDone="zhiyuanSubmissionFormDone" />
    </div>
  </div>
</template>

<script>
import ZhiyuanSubmissionForm from "./Form";

export default {
  name: "ZhiyuanSubmissionNavigation",
  components: {
    ZhiyuanSubmissionForm
  },
  data() {
    return {
      curStep: 1
    };
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    zhiyuanSubmissionFormDone(zhiyuanForm) {
      this.$emit("zhiyuanSubmissionFormDone", zhiyuanForm);
    }
  }
};
</script>
