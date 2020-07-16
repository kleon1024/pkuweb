<template>
  <div>
    <h4 v-if="!noCollege">
      {{ index }}. 进入
      <span style="color: red;">{{ college }}</span>
      就读的满意程度：{{ satisfaction }} %
    </h4>
    <h4 v-if="noCollege">
      如果你没有被任何一本志愿录取，那么你的满意程度是：
    </h4>
    <el-slider v-model="satisfaction" :marks="marks" @change="onChange" />
    <div class="hint-text" style="margin-top: 20px; color: red;">(请至少移动一次滑块来调整您的满意程度)</div>
  </div>
</template>

<script>
import utils from "@/plugins/utils";

export default {
  name: "CollegeSatisfactionSlider",
  props: {
    value: {
      // in order to use v-model to bind a value to this component
      type: Number,
      required: false,
      default: 0
    },
    college: {
      type: String,
      required: false,
      default: "北京大学"
    },
    index: {
      type: Number,
      required: true,
      default: 0
    },
    noCollege: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      satisfaction: this.value,
      marks: utils.getMarks(false),
    };
  },
  watch: {
    satisfaction(satis) {
      this.$emit("input", satis);
    }
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

