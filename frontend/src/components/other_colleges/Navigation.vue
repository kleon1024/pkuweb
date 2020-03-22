<template>
  <div ref="pageTop">
    <div v-if="curStep === 1">
      <center>
        <h2>院校录取可能性估计</h2>
      </center>
      <OtherCollegesProbabilities @probabilitiesDone="probabilitiesDone" />
    </div>
    <div v-if="curStep === 2">
      <center>
        <h2>其它院校满意程度评估</h2>
      </center>
      <OtherCollegesSatisfactions @satisfactionsDone="satisfactionsDone" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import OtherCollegesProbabilities from "./Probabilities";
import OtherCollegesSatisfactions from "./Satisfactions";

export default {
  name: "OtherCollegesNavigation",
  components: {
    OtherCollegesProbabilities,
    OtherCollegesSatisfactions
  },
  data() {
    return {
      curStep: 1,
      probabilities: null
    };
  },
  computed: {
    ...mapState(["otherCollegesInfo"])
  },
  watch: {
    curStep(val) {
      this.scrollToTop();
    }
  },
  mounted() {
    if (this.otherCollegesInfo) {
      if (this.otherCollegesInfo.probabilities) {
        this.probabilities = this.otherCollegesInfo.probabilities;
        this.curStep = 2;
      }
    }
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.pageTop.scrollIntoView();
      });
    },
    probabilitiesDone(probabilities) {
      this.probabilities = probabilities;
      this.curStep += 1;
    },
    satisfactionsDone(satisfactions) {
      this.$emit("otherCollegesDone", {
        probabilities: this.probabilities,
        satisfactions: satisfactions
      });
    }
  }
};
</script>
