<template>
  <div>
    <center>
      <h2>一本院校志愿填报</h2>
    </center>
    <p v-if="hasCompletedZhiyuan" class="success">你已经在本网站完成了志愿填写，下边是你的填报情况。</p>
    <p v-else class="info">下面，请你根据你所拥有的最新信息和推荐的名单选择第一批次(非定向)的志愿院校。</p>
    <CollegeStrategySuggestions v-show="showCollegeStrategySuggestions" />
    <div v-show="showAdmissionScores">
      <span>
        你可以
        <el-button type="text" @click="admissionScoresDialog = true">点击这里</el-button>查看往年相关一本院校录取分数线的数据
      </span>
      <el-dialog title="相关一本院校录取分数线" :visible.sync="admissionScoresDialog" width="800px" center>
        <CollegeAdmissionScoresTable />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="admissionScoresDialog = false">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="em-text">请一定注意：该网站主要目的在于帮助您了解志愿填报的更多信息，并不是真正的志愿填报。请务必通过宁夏教育考试院公布的高考志愿填报入口来填报志愿。</div>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="10">
        <center class="info">
          <h4>推荐院校的名单</h4>
        </center>
        <CollegeButtonTags
          :colleges="intendedAndRecommendedColleges"
          :show-strategy="showStrategy"
          :full-span="12"
        />
      </el-col>
      <el-col :xs="24" :sm="14">
        <center v-if="hasCompletedZhiyuan" class="success">
          <h4>你已经填写的志愿表</h4>
        </center>
        <ReadOnlyZhiyuanForm v-if="hasCompletedZhiyuan" :colleges="zhiyuanColleges" />
        <FillableZhiyuanForm
          v-else
          v-model="selectedColleges"
          title="一本志愿表"
          :show-strategy="showStrategy"
          show-all-colleges
        />
      </el-col>
    </el-row>
    <el-alert
      style="margin-top: 20px;"
      type="error"
      :closable="false"
      title="请一定注意：该网站主要目的在于帮助您了解志愿填报的更多信息，并不是真正的志愿填报。请务必通过宁夏教育考试院公布的高考志愿填报入口来填报志愿。"
    />
    <el-divider />
    <div v-if="!hasCompletedZhiyuan">
      <h5>为方便我们把奖励给您，请在下面的方框中写下您的支付宝账号。（若您想通过其它支付方式获得奖励，请在框内详细说明）</h5>
      <el-input v-model="paymentMethod" type="text" placeholder="支付宝账号或其他支付方式" />
      <div align="right">
        <el-button
          :disabled="!readyToSubmit"
          class="action-button"
          type="primary"
          @click.stop="formDone"
        >完成一本志愿填写</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CollegeButtonTags from "@/components/CollegeButtonTags";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";
import CollegeAdmissionScoresTable from "@/components/CollegeAdmissionScoresTable";
import CollegeStrategySuggestions from "@/components/CollegeStrategySuggestions";
import ReadOnlyZhiyuanForm from "@/components/ReadOnlyZhiyuanForm";

export default {
  name: "ZhiyuanSubmissionForm",
  components: {
    CollegeButtonTags,
    FillableZhiyuanForm,
    ReadOnlyZhiyuanForm,
    CollegeAdmissionScoresTable,
    CollegeStrategySuggestions
  },
  data() {
    return {
      admissionScoresDialog: false,
      selectedColleges: [],
    };
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "intendedAndRecommendedColleges",
      "paymentMethod"
    ]),
    hasCompletedZhiyuan() {
      return !!this.$store.state.zhiyuanColleges;
    },
    userGroup() {
      return this.loginUser.assigned_group;
    },
    showStrategy() {
      return this.userGroup === "T3";
    },
    showAdmissionScores() {
      return ["T2", "T3"].includes(this.userGroup);
    },
    showCollegeStrategySuggestions() {
      return ["T3"].includes(this.userGroup);
    },
    readyToSubmit() {
      return this.selectedColleges.length >= 3;
    },
    zhiyuanColleges() {
      return this.hasCompletedZhiyuan
        ? this.$store.state.zhiyuanColleges
        : this.selectedColleges.map((college, i) => {
            const copied = JSON.parse(JSON.stringify(college));
            delete copied.order;
            copied.order = String.fromCharCode("A".charCodeAt(0) + i);
            return copied;
          });
    }
  },
  methods: {
    formDone() {
      this.$emit("confirmed", {
        zhiyuanColleges: this.zhiyuanColleges,
        paymentMethod: this.paymentMethod
      });
    }
  }
};
</script>
