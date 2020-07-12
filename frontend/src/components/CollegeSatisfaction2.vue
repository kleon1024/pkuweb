<template>
  <div>
    <div>
      你填写的二批次志愿表是：
      <FillableZhiyuanForm2 :colleges="filledColleges" disabled />
    </div>

    <div>
      <p style="color:red; font-weight: bold;">
        你需要用 0 到 100 之间的数字来表示你对就读于某个大学的满意程度。数字越大，你的满意程度越高。因此，0 表示最不满意，100 表示最满意。
      </p>
    </div>
    <div>
      <div
        v-for="(college, i) in filledColleges"
        :key="`zhiyuan-satisfaction-college-slider-${i}`"
      >
        <CollegeSatisfactionSlider
          v-model="satisfactionAnswers[i]"
          @change="onChange(i)"
          :college="college"
          :index="i + 1"
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
import FillableZhiyuanForm2 from "@/components/FillableZhiyuanForm2";

export default {
  name: "ZhiyuanSurveyCollegeSatisfaction",
  components: {
    CollegeSatisfactionSlider,
    FillableZhiyuanForm2,
  },
  data() {
    return {
      satisfactionAnswers: new Array(12).fill(0),
      answerChanged: new Array(12).fill(false)
    };
  },
  computed: {
    ...mapState(["intendedColleges2"]),
    filledColleges() {
      var colleges = [];
      this.intendedColleges2.forEach(function(e) {
        if (e != "") {
          colleges.push(e);
        }
      })
      return colleges;
    }
  },
  methods: {
    onChange(index) {
      this.answerChanged[index] = true;
    },
    collegeSatisfactionDone() {
      var finished = true;
      var info = "";
      for (var i = 0; i < this.filledColleges.length; i++) {
        if (!this.answerChanged[i]) {
          finished = false;
          info = this.filledColleges[i];
          break;
        }
      }
      if (finished) {
        this.$store.commit(
          "storeZhiyuanSatisfactionAssessAnswers2",
          this.filledColleges.map((c, i) => {
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
