<template>
  <div>
    <h4>一本院校志愿报考</h4>
    <p>现在，在之前推荐的名单基础之上，我们已经为这些院校标注了“冲”“稳”“保”</p>
    <CollegeStrategySuggestions />
    <div>你不需要手动记录该名单，我们会把信息的链接放在界面上，随时供你点击查看！</div>
    <p>根据我们的算法和您的信息，下面是推荐一本学校名单。您可以点击下方的学校名（文字部分）在百度搜索该院校相关的信息。</p>
    <CollegeButtonTags
      :colleges="intendedAndRecommendedColleges"
      show-strategy
    />
    <div align="right">
      <el-button
        class="action-button"
        type="primary"
        @click.stop="zhiyuanStrategyDone"
      >
        进入志愿填报
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollegeStrategySuggestions from "@/components/CollegeStrategySuggestions";
import CollegeButtonTags from "@/components/CollegeButtonTags";

export default {
  name: "ZhiyuanGuideStrategy",
  components: {
    CollegeStrategySuggestions,
    CollegeButtonTags
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"]),
  },
  methods: {
    zhiyuanStrategyDone() {
      this.$emit("zhiyuanStrategyDone");
    }
  }
};
</script>
