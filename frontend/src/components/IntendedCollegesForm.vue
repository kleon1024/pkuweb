<template>
  <div>
    <el-progress :percentage="30" :format="format"></el-progress>
    <center>
      <h2>填写模拟志愿</h2>
    </center>
    <section>
      <p>下面，请你根据自己的信息和推荐的名单选择第一批次（非定向）的志愿院校（注意：在此阶段，为简化填报志愿的难度，现在你只需要填写院校名称，专业名称暂时不需要在系统里填写）。</p>
      <p class="em-text">模拟志愿的填写有助于我们对你的志愿报考进行更有针对性的辅导，请认真填写。</p>
      <p>只准备填报三个院校的同学不须填写 D 院校；为了能使我们对志愿报考进行更有针对性的辅导，请至少填写三个学校。</p>
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
        title="请注意：我们的志愿辅导才刚开始，关键的辅导教程在后面！请你花半个小时左右的时间来回答下一页的问题，完成这些题目后你将至少获得20元的奖励。"
      />
      <div>
        <p>
          为帮助你更加合理地填报志愿，我们需要你在填报志愿时回答一些问题。
          <strong>回答这些问题有助于你了解录取规则，为鼓励认真作答，正确的回答越多，你将会获得越多的奖励。</strong>
        </p>
        <p>
          在基础报酬20元之上，系统将会从即将出现题目中随机选取一些题目作为额外奖励的依据。
          <strong>你答对的题目数量越多，能获得的奖励也就越高。</strong>
        </p>
        <p>
          <strong>你的回答还能有助于我们发现人们对录取规则理解的偏差，从而可以使得我们能够进行更有针对性的辅导。因此，我们希望你在这些题中认真阅读题目，尽力得到准确的答案。</strong>
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
          : "你只准备填报三个院校么？";
      return `${dp1}请注意，一本录取规则是“分数优先，遵循志愿”。因为院校在录取的时候只会考虑你的分数，不会因为 B, C, D 院校在你的志愿表上位置较低而不去录取你。也就是说，B, C, D 院校享受和 A 院校同样的优先录取权！`;
    }
  },
  methods: {
    format(percentage) {
      return "3-1";
    },
    submitIntendedCollegesForm() {
      if (this.numberOfSelectedColleges >= 3) {
        this.$emit("intendedCollegesFormDone", this.selectedColleges);
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
