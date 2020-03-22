<template>
  <div>
    <MultipleSelect
      v-model="answers"
      :title="questionTitle"
      :options="answerOptions"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import MultipleSelect from "@/components/MultipleSelect";
import { collegeCompare } from "@/assets/zhiyuan_survey/config";

export default {
  name: "ZhiyuanSurveyCollegeCompare",
  components: {
    MultipleSelect
  },
  props: {
    value: {
      // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    firstCollegeIndex: {
      type: Number,
      required: true
    },
    secondCollegeIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      answers: []
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    firstCollege() {
      return this.intendedColleges[this.firstCollegeIndex - 1];
    },
    secondCollege() {
      return this.intendedColleges[this.secondCollegeIndex - 1];
    },
    firstCollegeFullName() {
      return this.firstCollege.full_name;
    },
    secondCollegeFullName() {
      return this.secondCollege.full_name;
    },
    firstCollegeOrder() {
      return this.firstCollege.order;
    },
    secondCollegeOrder() {
      return this.secondCollege.order;
    },
    questionTitle() {
      return `为什么你将 ${this.firstCollegeFullName} 作为一批次 ${
        this.firstCollegeOrder
      } 院校，${this.secondCollegeFullName} 作为一批次 ${
        this.secondCollegeOrder
      } 院校？（可多选）`;
    },
    answerOptions() {
      return collegeCompare.answerOptions.map(option => {
        return {
          key: option.key,
          description: option.description
            .replace("FIRST-COLLEGE-ORDER", this.firstCollegeOrder)
            .replace("SECOND-COLLEGE-ORDER", this.secondCollegeOrder)
        };
      });
    }
  },
  watch: {
    answers(newAnswers) {
      this.$emit("input", newAnswers);
    }
  },
  methods: {
    collegeSatisfactionDone() {
      this.$emit("collegeSatisfactionDone");
    }
  }
};
</script>
