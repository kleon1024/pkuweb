<template>
  <div>
    <h4>
      进入
      <span style="color: teal;">{{ college }}</span>
      就读的满意程度：{{ satisfaction }}
    </h4>
    <el-slider
      v-model="satisfaction"
      :marks="marks"
    />
    <div
      class="hint-text"
      style="margin-top: 20px;"
    >
      (请移动滑块来调整你的满意程度)
    </div>
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
    }
  },
  data() {
    return {
      satisfaction: this.value,
      marks: utils.getMarks(false)
    };
  },
  watch: {
    satisfaction(satis) {
      this.$emit("input", satis);
    }
  }
};
</script>

