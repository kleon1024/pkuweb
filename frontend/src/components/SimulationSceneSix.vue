<template>
  <div>
    <center>
      <h2>风险偏好测试游戏</h2>
    </center>
    <p>在下面的每道小题中，每题都有两个选项。其中选项A的报酬是不变的，选项B的报酬随着题号的增加而上升。因此，随着题号的增加，你至多只能有一次机会从选项A切换到选项B。</p>
    <p style="color:red; font-weight: bold;">每一道小题都有相同的可能性被抽中，在该小题中您更偏好的那个选项将作为完成本问卷的额外报酬，因此我们建议您认真完成所有的题目。</p>
    <el-form
      ref="riskForm"
      :model="riskForm"
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
              <el-radio
                label="A"
                style="margin-right: 5px; font-weight: bold; font-size: 120%;"
              >A.50%的概率获得 25元，50%的概率获得20元</el-radio>
              <el-radio
                label="B"
                style="margin-right: 5px; font-weight: bold; font-size: 120%;"
              >B.25%的概率获得 <span class="danger"> {{ 30 + index * 5 }} </span> 元，75%的概率获得20元</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </section>
    </el-form>
    <div
      align="center"
      style="margin-top: 50px;"
    >
      <el-button
        type="primary"
        @click.stop="testDone"
      >下一步</el-button>
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
    FillableZhiyuanForm,
  },
  data() {
    var risk_list = [];
    var risk_list2 = [];
    for (var i = 0; i < 7; i++) {
      risk_list.push({
        value: "",
      });
      risk_list2.push({
        value: "",
      });
    }

    return {
      riskForm: {
        risk_list: risk_list,
        risk_list2: risk_list2,
      },
    };
  },
  computed: {
    ...mapState(["randomOrder"]),
    checkAnswer() {
      var changed = false;
      var lastVal = "";
      for (var index in this.riskForm.risk_list) {
        var a = this.riskForm.risk_list[index];
        if (lastVal === "") {
          lastVal = a.value;
          continue;
        } else {
          if (a.value !== lastVal) {
            if (changed) {
              return false;
            } else {
              lastVal = a.value;
              changed = true;
            }
          }
        }
      }
      return true;
    },
  },
  mounted() {},
  methods: {
    testDone() {
      this.$refs["riskForm"].validate((valid) => {
        if (valid) {
          this.$store.commit("storeRiskForm", this.riskForm);
          this.$emit("confirmed");
        }
      });
    },
  },
};
</script>

