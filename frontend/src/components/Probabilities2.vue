<template>
  <div>
    <div>
      你填写的二批次志愿表是：
      <FillableZhiyuanForm2 :colleges="filledColleges" disabled />
    </div>
    <section>
      <div>现在请考虑以下学校录取你的可能性</div>
      <div
        v-for="(college, i) in filledColleges"
        :key="`other-colleges-probability-quiz-zhiyuan-college-${i}`"
      >
        <CollegeProbabilitySlider
          v-model="probabilities[i]"
          :college="college"
          @change="onChange(i)"
          :index="i + 1"
        />
      </div>
    </section>

    <div align="right" style="margin-top: 20px;">
      <el-button type="primary" @click.stop="probabilitiesDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollegeProbabilitySlider from "@/components/CollegeProbabilitySlider";
import FillableZhiyuanForm2 from "@/components/FillableZhiyuanForm2";

export default {
  name: "OtherCollegesProbabilities",
  components: {
    CollegeProbabilitySlider,
    FillableZhiyuanForm2
  },
  data() {
    return {
      demoProbability: 10,
      probabilities: [],
      answerChanged: []
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
      });
      return colleges;
    },
    probsToSubmit() {
      return this.filledColleges.map((college, i) => {
        return {
          student_filled_probability: this.probabilities[i] / 100,
          college: college
        };
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.probabilities = Array(
        this.intendedColleges2.length
      ).fill(0);
      this.answerChanged = Array(
        this.intendedColleges2.length
      ).fill(false);
    },
    onChange(index) {
      this.answerChanged[index] = true;
    },
    probabilitiesDone() {
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
        this.$store.commit("saveProbabilities2", this.probsToSubmit);
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

