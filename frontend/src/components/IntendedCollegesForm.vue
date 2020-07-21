<template>
  <div>
    <center>
      <h2>填写一批次志愿</h2>
    </center>
    <section>
      <p>下面，请您填写您在志愿填报系统中提交的第一批次（非定向）的志愿院校。请完整地填写您填报的志愿院校，以免影响问卷报酬的发放。</p>

      <p  style="color: red; font-weight: bold;">请至少填写三个学校。只准备填报三个院校的同学不需填写 D 院校；如果您实际只填报的普通一批次院校不足三所，请在B,C院校两空中选择您知道的其它院校。</p>
      <FillableZhiyuanForm v-model="selectedColleges" show-all-colleges />
    </section>
    <section style="margin-top: 20px;">
      <el-divider />
      <div>
        <p>
          为了更加了解宁夏考生在填报志愿时的想法和困难，我们需要您回答一些与志愿填报有关的问题。 正确的回答越多，您将会获得越多的报酬。
        </p>
        <p>
          您的回答有助于我们发现考生对录取规则理解的偏差，为高考的改革提供更多线索。因此，我们希望您认真阅读题目，尽力得到准确的答案。
        </p>
      </div>
      <div align="right" style="margin-top: 20px;">
        <el-button type="primary" @click.stop="submitIntendedCollegesForm">下一步</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";
import request from "@/plugins/request";

export default {
  name: "IntendedCollegesForm",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      selectedColleges: [],
    };
  },
  mounted() {
    this.initRecommends();
  },
  computed: {
    ...mapState(["collegeRecommendations"]),
    numberOfSelectedColleges() {
      return this.selectedColleges.length;
    },
  },
  methods: {
    initRecommends() {
      if (!this.collegeRecommendations) {
        const loading = this.$loading({
          lock: true,
          text: "为您推荐学校中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        request.post(this.SHORT_LIST_URL, {}, (err, res) => {
          if (res) {
            if (res.data.failed) {
              loading.close();
              this.$alert(res.data.message, "推荐失败", {
                type: "error",
                confirmButtonText: "返回"
              });
            } else {
              this.$store.commit("storeCollegeRecommendations", res.data);
              loading.close();
            }
          }
        });
      }
    },
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
