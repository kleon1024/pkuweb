<template>
  <div>
    <p>对于下面的每个学校，请考虑你的分数高于或等于该学校录取分数线的可能性。</p>
    <div>请看下面的例子:</div>
    <CollegeProbabilitySlider v-model="demoProbability" />
    <p>在上面的例子中，你的分数高于或等于北大录取分数线的可能性是 {{ demoProbability }}%</p>
    <p>
      如果该部分被系统抽中，我们将会把系统计算出的录取可能性和你的回答进行比较。 当你的回答和系统计算出的结果相差小于 5%时，你的回答将会被认为是正确的。
      <span
        class="danger"
      >对于每道正确的题，你将能获得 2 元。</span>
    </p>
    <el-divider />
    <section>
      <div>现在请考虑以下学校录取你的可能性</div>
      <div
        v-for="(college, i) in intendedAndRecommendedColleges"
        :key="`other-colleges-probability-quiz-zhiyuan-college-${i}`"
      >
        <CollegeProbabilitySlider
          v-model="probabilities[i]"
          :college="college.full_name"
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

export default {
  name: "OtherCollegesProbabilities",
  components: {
    CollegeProbabilitySlider
  },
  data() {
    return {
      demoProbability: 10,
      probabilities: [],
      answerChanged: []
    };
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"]),
    probsToSubmit() {
      return this.intendedAndRecommendedColleges.map((college, i) => {
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
        this.intendedAndRecommendedColleges.length
      ).fill(0);
      this.answerChanged = Array(
        this.intendedAndRecommendedColleges.length
      ).fill(false);
    },
    onChange(index) {
      this.answerChanged[index] = true;
    },
    probabilitiesDone() {
      var finished = true;
      var info = "";
      for (var i = 0; i < this.intendedAndRecommendedColleges.length; i++) {
        if (!this.answerChanged[i]) {
          finished = false;
          info = this.intendedAndRecommendedColleges[i].full_name;
          break;
        }
      }

      if (finished) {
        this.$store.commit("saveProbabilities", this.probsToSubmit);
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

