<template>
  <div>
    <div>
      <br />
      <br />
      姓名：{{ loginUser.name }}
      <br />
      学校：{{ highschool }}
      <br />
      科目：{{ class_select }}
      <br />
      班级：{{ loginUser.class_number }}
      <br />
    </div>
    <div>
      <el-form
        ref="paymentForm"
        :model="paymentForm"
        :rules="rules"
        label-position="left"
        label-width="0"
        status-icon
      >
        <h5>为方便我们把报酬给您，请在下面的方框中写下您的支付宝/微信账号。（若您想通过其它支付方式获得报酬，请在框内详细说明）</h5>
        <el-form-item prop="pay" required>
          <el-radio-group v-model="paymentForm.pay">
            <el-radio-button label="alipay">支付宝</el-radio-button>
            <el-radio-button label="wechat">微信</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="paymentMethod" required>
          <el-input v-model="paymentForm.paymentMethod" type="text" placeholder="支付宝账号或其他支付方式" />
        </el-form-item>
        <h5>如果你是经由其它同学的推荐填写的本问卷，请在下方输入推荐码：</h5>
        <el-form-item prop="inviteCode" required>
          <el-input v-model="paymentForm.inviteCode" type="text" placeholder="推荐码（如果没有请填无）" />
        </el-form-item>
      </el-form>
      <div align="right" style="margin-top: 15px">
        <el-button class="action-button" type="primary" @click.stop="formDone">完成</el-button>
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
    CollegeStrategySuggestions,
  },
  data() {
    return {
      paymentForm: {
        pay: "",
        paymentMethod: "",
        inviteCode: ""
      },
    };
  },
  methods: {
    formDone() {
      this.$refs["paymentForm"].validate((valid) => {
        if (valid) {
          this.$emit("confirmed", this.paymentForm);
        }
      });
    },
  },
  computed: {
    ...mapState([
      "intendedColleges",
      "loginUser",
      "intendedAndRecommendedColleges",
    ]),
    rules() {
      return {
        pay: [{ required: true, message: "请选择一项", trigger: "blur" }],
        paymentMethod: [{ required: true, message: "请填写", trigger: "blur" }],
        inviteCode: [{ required: true, message: "请填写", trigger: "blur" }],
      };
    },
    isShow() {
      return this.loginUser.highschool == "A1";
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
      return "";
    },
    class_select() {
      var result = "";
      switch (this.loginUser.class_selection) {
        case 1:
          result = "理科";
          break;
        case 2:
          result = "文科";
          break;
      }
      return result;
    },
  },
};
</script>
