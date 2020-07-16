<template>
  <div>
    <center>
      <h2>模拟情景</h2>
    </center>
    <p>在本部分中，您需要回答一些虚拟场景中的问题。这些问题有助于我们更加了解考生在报考中可能遇到的问题，为高考改革提供有价值的参考。希望您能够认真作答。</p>
    <section style="margin-top: 50px;">
      <p>您填写的一批次志愿是：</p>
      <FillableZhiyuanForm :colleges="intendedColleges2" disabled />
    </section>
    <p>请回答以下问题:</p>
    <section style="margin-top: 50px;">
      <h4>1. 如果你的分数低于 {{ intendedColleges2[0].full_name }} 的录取分数线，但高于{{ intendedColleges2[1].full_name }}和{{ intendedColleges2[2].full_name }}的录取分数线，那么你______</h4>
      <el-radio-group v-model="q1_answer">
        <el-row style="margin-top: 20px;">
          <el-radio label="A">A. 一定会被{{ intendedColleges2[0].full_name }}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio label="B">B. 一定会被{{ intendedColleges2[1].full_name }}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio label="C">C. 一定会被{{ intendedColleges2[2].full_name }}录取</el-radio>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-radio
            label="D"
          >D. 可能会被{{ intendedColleges2[1].full_name }}录取，也可能被{{ intendedColleges2[2].full_name }}录取</el-radio>
        </el-row>
      </el-radio-group>
    </section>
    <section style="margin-top: 50px;">
      <h4>2. 假设你只能在一本志愿表中填写两所院校，C院校，D院校的位置空着，那么你会如何填写？</h4>
      <FillableZhiyuanForm
        v-model="selected2Colleges"
        :intendeds="intendedColleges2"
        :choices="2"
        show-all-colleges
      />
    </section>
    <section style="margin-top: 50px;">
      <h4>3. 假设你只能在一本志愿表中填写一所院校，B院校，C院校，D院校的位置空着，那么你会如何填写？</h4>
      <FillableZhiyuanForm
        v-model="selected1Colleges"
        :intendeds="intendedColleges2"
        :choices="1"
        show-all-colleges
      />
    </section>
    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="satisfactionsDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FillableZhiyuanForm from "@/components/FillableZhiyuanForm2";

export default {
  name: "SimulationSceneOne",
  components: {
    FillableZhiyuanForm
  },
  data() {
    return {
      q1_answer: "",
      selected2Colleges: [],
      selected1Colleges: []
    };
  },
  computed: {
    ...mapState(["intendedColleges2"]),
    submitAnswer() {
      return {
        q1_answer: this.q1_answer,
        selected2Colleges: this.selected2Colleges,
        selected1Colleges: this.selected1Colleges
      };
    },
    checkNumber() {
      return this.selected2Colleges.length == 2 && this.selected2Colleges.length == 1;
    },
  },
  mounted() {},
  methods: {
    satisfactionsDone() {
      if (!this.checkNumber) {
        this.$message({
          message: "请填写所有志愿",
          type: "error"
        });
      } else {
        this.$store.commit("storeSim12Answer", this.submitAnswer);
        this.$emit("confirmed");
      }
    }
  }
};
</script>

