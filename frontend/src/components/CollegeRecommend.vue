<template>
  <div>
    <center>
      <h2>您可能感兴趣或者考虑过的院校</h2>
    </center>
    <el-alert
      type="warning"
      style="margin: 10px 0;"
      title="本调查只适用于宁夏报考一批次志愿院校的同学。未填报一批次志愿的同学可能无法完成问卷并取得报酬！"
    />
    <el-form
      ref="collegeRecommendForm"
      :model="collegeRecommendForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      status-icon
    >
      <div>
        <el-alert
          v-show="recommendedColleges.length === 0"
          type="error"
          center
          title="我们无法为您推荐学校，可能您的分数没有达到一本分数线。请查看其他选项。"
          :closable="false"
        />
        <section v-if="collegeRecommendations && recommendedColleges.length > 0">
          <h4>
            根据我们的算法和您的信息，您在填报志愿的时候可能还听说/考虑过下面这些院校。
            <strong>请注意，我们会在部分问题中提及这些学校。
              <span style="color: red" > 如果您对这些学校的名字感到陌生，请您点击下方的学校名（文字部分）在百度搜索该院校相关的信息。</span> </strong>
          </h4>
          <CollegeButtonTags :colleges="recommendedColleges" />
          <el-alert
            v-if="collegeRecommendations.risk_number < 5 && collegeRecommendations.risk_number > 0"
            class="strategy-alert"
            type="success"
            title="您的分数很可能超过绝大多数一本院校的分数线。恭喜您在高考中获得如此优异的成绩！"
            :closable="false"
          />
          <el-alert
            v-if="collegeRecommendations.safe_number < 3 && collegeRecommendations.safe_number > 0"
            class="strategy-alert"
            type="warning"
            :title="`根据您的分数，能够保证您录取的一本院校只有${collegeRecommendations.safe_number}所，建议同时考虑二本及其它批次的院校，以增大录取可能性！`"
            :closable="false"
          />
          <div align="right">
            <el-button
              :disabled="!clickable"
              class="action-button"
              type="primary"
              @click.stop="submitCollegeRecommend"
            >{{ content }}</el-button>
          </div>
        </section>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/plugins/request";

import CollegeButtonTags from "@/components/CollegeButtonTags";

export default {
  name: "CollegeRecommend",
  components: {
    CollegeButtonTags
  },
  data() {
    return {
      rules: {},
      clickable: false,
      timeout: 30,
      content: ""
    };
  },
  mounted() {
    this.initRecommends();
    this.countDown();
  },
  computed: {
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations
        ? this.collegeRecommendations.recommended_colleges
        : [];
    }
  },
  watch: {},
  methods: {
    countDown() {
      this.content = this.timeout + "s后可以进行下一步";
      let clock = window.setInterval(() => {
        this.timeout--;
        this.content = this.timeout + "s后可以进行下一步";
        if (this.timeout < 0) {
          window.clearInterval(clock);
          this.content = "下一步";
          this.clickable = true;
        }
      }, 1000);
    },
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
    submitCollegeRecommend() {
      this.$emit("confirmed");
    },
  }
};
</script>

<style scoped>
.strategy-alert {
  margin: 10px 0;
}
.redirect-button {
  padding: 10px;
}
</style>
