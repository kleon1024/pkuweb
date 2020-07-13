<template>
  <div>
    <section>
      <p>根据你填写的信息和我们的算法，你很可能填写了二批次志愿。下面，请你填写你在志愿填报系统中提交的第二批次（非定向）的志愿院校。请完整地填写你填报的志愿院校，以免影响问卷报酬的发放。</p>
      <FillableZhiyuanForm2 v-model="selectedColleges" />
    </section>
    <section style="margin-top: 20px;">
      <el-divider />
      <div>
        <p>为了更加了解宁夏考生在填报志愿时的想法和困难，我们需要你回答一些与志愿填报有关的问题。 正确的回答越多，你将会获得越多的报酬。</p>
        <p>你的回答有助于我们发现考生对录取规则理解的偏差，为高考的改革提供更多线索。因此，我们希望你在这些题中认真阅读题目，尽力得到准确的答案。</p>
      </div>
      <div align="right" style="margin-top: 20px;">
        <el-button type="primary" @click.stop="submitIntendedCollegesForm">下一步</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import FillableZhiyuanForm2 from "@/components/FillableZhiyuanForm2";

export default {
  name: "IntendedCollegesForm2",
  components: {
    FillableZhiyuanForm2
  },
  data() {
    return {
      selectedColleges: []
    };
  },
  computed: {
    numberOfSelectedColleges() {
      return this.selectedColleges.length;
    }
  },
  methods: {
    submitIntendedCollegesForm() {
      if (this.numberOfSelectedColleges >= 1) {
        this.$store.commit("storeIntendedColleges2", this.selectedColleges);
        this.$emit("confirmed");
      } else {
        this.$alert("请至少填写一个院校！", "请注意", {
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
