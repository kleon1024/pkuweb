<template>
  <div>
    <center>
      <h2>填写一批次志愿</h2>
    </center>
    <section>
      <p>下面，请你填写你在志愿填报系统中提交的第一批次（非定向）的志愿院校。请完整地填写你填报的志愿院校，以免影响问卷报酬的发放。</p>

      <p>请至少填写三个学校。只准备填报三个院校的同学不须填写 D 院校；如果你实际只填报了一所或者两所院校，请在B,C院校两空中选择你知道的其它院校。</p>
      <FillableZhiyuanForm v-model="selectedColleges" show-all-colleges />
      <el-alert
        v-show="numberOfSelectedColleges <= 3"
        type="error"
        center
        :title="zhiyuanFormHint"
        :closable="false"
      />
    </section>
    <section style="margin-top: 20px;">
      <el-divider />
      <el-alert
        type="error"
        :closable="false"
        center
        title="接下来你只需要花30分钟左右的时间来回答一些与录取规则相关的问题，就能获得50~110元等的奖励。"
      />
      <div>
        <p>
          为了更加了解宁夏考生在填报志愿时的想法和困难，我们需要你回答一些与志愿填报有关的问题。 正确的回答越多，你将会获得越多的奖励。
        </p>
        <p>
          在基础报酬50元之上，系统将会从即将出现题目中随机选取一些题目作为额外奖励的依据。 你答对的题目数量越多，能获得的奖励也就越高。
        </p>
        <p>
          你的回答有助于我们发现考生对录取规则理解的偏差，为高考的改革提供更多线索。因此，我们希望你在这些题中认真阅读题目，尽力得到准确的答案。
        </p>
      </div>
      <div align="right" style="margin-top: 20px;">
        <el-button type="primary" @click.stop="submitIntendedCollegesForm">下一步</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";

export default {
  name: "IntendedCollegesForm",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      selectedColleges: []
    };
  },
  computed: {
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recomendedColleges() {
      return this.collegeRecommendations.recommended_colleges;
    },
    numberOfSelectedColleges() {
      return this.selectedColleges.length;
    },
    zhiyuanFormHint() {
      const dp1 =
        this.numberOfSelectedColleges < 3
          ? "请至少填写三个院校！"
          : "";
      return `${dp1}请严格按照你最终提交的志愿表中院校的顺序进行填写。志愿顺序的错位可能会影响问卷报酬的发放！`;
    }
  },
  methods: {
    submitIntendedCollegesForm() {
      if (this.numberOfSelectedColleges >= 3) {
        this.$store.commit("storeIntendedColleges", this.selectedColleges);
        this.$emit("confirmed");
      } else {
        this.$alert("请至少填写三个院校！", "请注意", {
          confirmButtonText: "知道了",
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.el-alert {
  margin: 10px 0;
}
.explain-text {
  font-size: smaller;
}
</style>
