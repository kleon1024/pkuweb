<template>
  <div>
    <center>
      <h2>录取满意程度</h2>
    </center>
    <div>
      根据您的填写，您提交的一批次志愿院校为
      <span>{{ college_names }}</span>
      。
      <p
        style="color:red; font-weight: bold;"
      >您需要用 0 到 100 之间的数字来表示您对就读于某个大学的满意程度。数字越大，您的满意程度越高。因此，0 表示最不满意，100 表示最满意。</p>
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
          :index="i + 1"
        />
      </div>
      <CollegeSatisfactionSlider v-model="satisfactionAnswers[4]" @change="onChange(4)" no-college />
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
      satisfactionAnswers: new Array(5).fill(0),
      answerChanged: new Array(5).fill(false),
      ifNotAnswer: 0
    };
  },
  computed: {
    ...mapState(["intendedColleges"]),
    college_names() {
      var result = "";
      this.intendedColleges.map((college, i) => {
        result +=
          college.full_name +
          "(" +
          String.fromCharCode("A".charCodeAt() + i) +
          "志愿)";
      });
      return result;
    }
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
        if (!this.answerChanged[4]) {
          this.$message({
            message: `必须滑动所有滑块`,
            type: "error"
          });
        } else {
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
        }
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
