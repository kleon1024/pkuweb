<template>
  <div>
    <div>
      根据你在模拟志愿中的填写，你选择了
      <span
        style="color: red;"
      >{{ intendedColleges.map(college => college.full_name).join("，") }}</span> 作为一批次志愿院校。现在，请你移动下面的滑块来评估你对这些院校的满意程度。
    </div>
    <div>
      <div
        v-for="(college, i) in intendedColleges"
        :key="`zhiyuan-satisfaction-college-slider-${i}`"
      >
        <h4>{{ college.full_name }}</h4>
        <span>你的满意程度：</span>
        <el-slider
          v-model="satisfactionAnswers[i]"
          show-input
        />
        <span style="color: red;">(请移动滑块来改变数字)</span>
      </div>
    </div>
    <div align="right">
      <el-button
        type="primary"
        @click.stop="collegeSatisfactionDone"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ZhiyuanSurveyCollegeSatisfaction",
  data() {
    return {
      satisfactionAnswers: new Array(4).fill(35)
    };
  },
  computed: {
    ...mapState(["intendedColleges"])
  },
  methods: {
    collegeSatisfactionDone() {
      this.$emit(
        "collegeSatisfactionDone",
        this.intendedColleges.map((c, i) => {
          return {
            student_filled_satisfaction_score: this.satisfactionAnswers[i],
            college: c
          };
        })
      );
    }
  }
};
</script>
