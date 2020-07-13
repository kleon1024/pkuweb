<template>
  <div>
    <center>
      <h4>{{ title }}</h4>
    </center>
    <el-table :data="collegeOrders" border style="margin-top: 25px;">
      <el-table-column align="center" label="志愿号" width="150">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >二批次 {{ ["A", "B", "C", "D", "E", "F", "G", "H"][scope.row - 1] }} 院校</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="院校">
        <template slot-scope="scope">
          <el-input
            :disabled="disabled"
            placeholder="请输入学校"
            v-model="filledColleges[scope.row - 1]"
            clearable
            @input="filledColleges[scope.row - 1]=filledColleges[scope.row - 1].replace(/[^\u4e00-\u9fa5]/g,'');"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/plugins/request";
import { mapState } from "vuex";
export default {
  name: "FillableZhiyuanForm2",
  props: {
    value: {
      // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "二批次志愿表"
    },
    showStrategy: {
      type: Boolean,
      required: false,
      default: false
    },
    showAllColleges: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    colleges: {
      type: Array,
      required: false,
      default: () => Array()
    },
    choices: {
      type: Number,
      required: false,
      default: 8
    }
  },
  mounted() {},
  data() {
    var filledColleges = Array(8).fill("");
    if (this.disabled) {
      filledColleges = this.colleges;
    }

    return {
      filledColleges: filledColleges,
      collegeOrders: Array.from(new Array(this.choices).keys(), x => x + 1)
    };
  },
  methods: {},
  computed: {},
  watch: {
    filledColleges(colleges) {
      this.$emit("input", colleges);
    }
  }
};
</script>
