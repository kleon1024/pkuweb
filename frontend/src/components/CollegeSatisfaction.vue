<template>
  <div>
    <center>
      <h2>录取满意程度</h2>
    </center>
    <div>
      根据你在模拟志愿中的填写，你选择了
      <span
        style="color: red;"
      >{{ intendedColleges.map(college => college.full_name).join("，") }}</span> 作为一批次志愿院校。现在，请你移动下面的滑块来评估你对这些院校的满意程度。
      <p>
        你将用 0 到 100 之间的数字来表示你对就读于某个大学的满意程度。数字越大，你的满意程度越高。因此，0 表示最不满意，100 表示最满意。
        <strong>为了使答题更方便，你只需通过移动滑块(见下图)来表达自己对学校的满意程度。</strong>
      </p>
    </div>
    <div>
      <div
        v-for="(college, i) in intendedColleges"
        :key="`zhiyuan-satisfaction-college-slider-${i}`"
      >
        <CollegeSatisfactionSlider
          v-model="satisfactionAnswers[i]"
          @change="onChange(i)"
          :college="college.full_name"
        />
      </div>
    </div>
    <div align="right">
      <el-button type="primary" @click.stop="collegeSatisfactionDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollegeSatisfactionSlider from "@/components/CollegeSatisfactionSlider";

export default {
  name: "ZhiyuanSurveyCollegeSatisfaction",
  components: {
    CollegeSatisfactionSlider
  },
  data() {
    return {
      satisfactionAnswers: new Array(4).fill(0),
      answerChanged: new Array(4).fill(false)
    };
  },
  computed: {
    ...mapState(["intendedColleges"])
  },
  methods: {
    onChange(index) {
      this.answerChanged[index] = true;
    },
    collegeSatisfactionDone() {
      var finished = true;
      var info = "";
      for (var i = 0; i < this.intendedColleges.length; i++) {
        if (!this.answerChanged[i]) {
          finished = false;
          info = this.intendedColleges[i].full_name;
          break;
        }
      }
      if (finished) {
        this.$store.commit(
          "storeZhiyuanSatisfactionAssessAnswers",
          this.intendedColleges.map((c, i) => {
            return {
              student_filled_satisfaction_score: this.satisfactionAnswers[i],
              college: c
            };
          })
        );
        this.$emit("confirmed");
      } else {
        this.$message({
          message: `${info}的滑块还没滑动过`,
          type: "error"
        });
      }
    }
  }
};
</script>
