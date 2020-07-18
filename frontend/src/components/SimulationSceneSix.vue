<template>
  <div>
    <center>
      <h2>风险偏好测试游戏</h2>
    </center>
      <p>
      在下面的每一道小题中，你将面临两个选项，请选择你更偏好的那个选项。
      </p>
      <p
        style="color:red; font-weight: bold;"
      >每一道小题都有相同的可能性被抽中，在该小题中你更偏好的那个选项将作为完成本问卷的额外报酬，因此我们建议你认真完成所有的题目。</p>
      <el-form
        ref="riskForm"
        :model="riskForm"
        :rules="rules"
        label-position="left"
        label-width="90px"
        status-icon
      >
      <section style="margin-top: 20px">
        <el-row
          v-for="(item, index) in riskForm.risk_list"
          :key="`risk-take0-${index}`"
          :gutter="1"
        >
          <el-form-item
            :label="'1(' + (index + 1) + ')：'"
            :prop="'risk_list.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group v-model="item.value">
              <el-radio label="A" style="margin-right: 5px">25%的概率获得{{ 30 + index * 5 }}元，75%的概率获得20元</el-radio>
              <el-radio label="B" style="margin-right: 5px">50%的概率获得25元，50%的概率获得20元</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        </section>
        <section style="margin-top: 20px">
        <el-row
          v-for="(item, index) in riskForm.risk_list2"
          :key="`risk-take1-${index}`"
          :gutter="1"
        >
          <el-form-item
            :label="'2(' + (index + 1) + ')'"
            :prop="'risk_list2.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group v-model="item.value">
              <el-radio label="A" style="margin-right: 5px">25%的概率获得{{ 30 + index * 5 }}元，75%的概率获得20元</el-radio>
              <el-radio label="B" style="margin-right: 5px">50%的概率获得25元，50%的概率获得5元</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        </section>
      </el-form>
    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="testDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm";
import utils from "@/plugins/utils";
import request from "@/plugins/request";

export default {
  name: "SimulationSceneSeven",
  components: {
    FillableZhiyuanForm
  },
  data() {
    var risk_list = [];
    var risk_list2 = [];
    for (var i = 0; i< 8; i++) {
      risk_list.push({
        value: ""
      })
      risk_list2.push({
        value: ""
      })
    }

    return {
      riskForm: {
        risk_list: risk_list,
        risk_list2: risk_list2,
      }
    };
  },
  computed: {
    ...mapState([
    ]),
  },
  mounted() {
  },
  methods: {
    testDone() {
      this.$refs["riskForm"].validate(valid => {
        this.$store.commit("storeRiskForm", this.riskForm);
        this.$emit("confirmed");
      })
    }
  }
};
</script>

