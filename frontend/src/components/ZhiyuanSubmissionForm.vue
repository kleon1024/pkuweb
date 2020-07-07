<template>
  <div>
    <div>
        <br/>
        <br/> 姓名：{{ loginUser.name }} 
        <br/> 学校：{{ highschool }} 
        <br/> 科目：{{ class_select }} 
        <br/> 班级：{{ loginUser.class_number }} 
        <br/>
        <br/> 请在这里截屏作为完成问卷的凭证。
    </div>
    <div v-if="!hasCompletedZhiyuan">
      <h5>为方便我们把奖励给您，请在下面的方框中写下您的支付宝/微信账号。（若您想通过其它支付方式获得奖励，请在框内详细说明）</h5>
      <el-input v-model="paymentMethod" type="text" placeholder="支付宝账号或其他支付方式" />
      <div align="right" style="margin-top: 15px">
        <el-button
          class="action-button"
          type="primary"
          @click.stop="formDone"
        >确认</el-button>
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
import highschools from "@/assets/highschools";

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
      paymentMethod: "",
    };
  },
  methods: {
    formDone() {
      this.$emit("confirmed", {
        // zhiyuanColleges: this.zhiyuanColleges,
        paymentMethod: this.paymentMethod,
      });
    }
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "loginUser",
      "intendedAndRecommendedColleges",
    ]),
    hasCompletedZhiyuan() {
      return false; //!!this.$store.state.zhiyuanColleges;
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
      return true;
    },
    highschool() {
      for (var i = 0; i < highschools.length; i++) {
        if (highschools[i].code == this.loginUser.highschool) {
          return highschools[i].name;
        }
      }
      return ""
    },
    class_select() {
      var result = ""
      switch(this.loginUser.class_selection) {
        case 1: result = "理科"; break;
        case 2: result = "文科"; break;
      }
      return result;
    },
  },
};
</script>
