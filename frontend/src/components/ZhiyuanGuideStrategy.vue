<template>
  <div>
    <center>
      <h2>报考辅导</h2>
    </center>
    <h4>一本院校志愿报考</h4>
    <div ref="college-admissions-table">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="往年录取分数线" :name="1">
          <CollegeAdmissionScoresTable />
        </el-collapse-item>
      </el-collapse>
    </div>
    <p>现在，在之前推荐的名单基础之上，我们已经为这些院校标注了“冲”“稳”“保”</p>
    <CollegeStrategySuggestions />
    <div>您不需要手动记录该名单，我们会把信息的链接放在界面上，随时供您点击查看！</div>
    <p>根据我们的算法和您的信息，下面是推荐一本学校名单。您可以点击下方的学校名（文字部分）在百度搜索该院校相关的信息。</p>
    <CollegeButtonTags :colleges="intendedAndRecommendedColleges" show-strategy />
    <div align="right">
      <el-button class="action-button" type="primary" @click.stop="zhiyuanStrategyDone">进入志愿填报</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollegeStrategySuggestions from "@/components/CollegeStrategySuggestions";
import CollegeButtonTags from "@/components/CollegeButtonTags";
import CollegeAdmissionScoresTable from "@/components/CollegeAdmissionScoresTable";


export default {
  name: "ZhiyuanGuideStrategy",
  data() {
    return { activeNames: 0 };
  },
  components: {
    CollegeStrategySuggestions,
    CollegeButtonTags,
    CollegeAdmissionScoresTable
  },
  computed: {
    ...mapState(["intendedAndRecommendedColleges"])
  },
  methods: {
    zhiyuanStrategyDone() {
      this.$emit("confirmed");
    }
  }
};
</script>
