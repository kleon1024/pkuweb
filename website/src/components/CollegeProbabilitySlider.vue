<template>
  <div>
    <h4>
      你的分数高于或等于
      <span style="color: teal;">{{ college }}</span>
      录取分数线的可能性：{{ probability }}% (
      <span
        :class="probabilityDisp.probability_class"
      >{{ probabilityDisp.probability_description }}</span>)
    </h4>
    <el-slider
      v-model="probability"
      :format-tooltip="formatTooltip"
      :marks="marks"
    />
    <div
      class="hint-text"
      style="margin-top: 20px;"
    >
      (请移动滑块来调整可能性的大小)
    </div>
  </div>
</template>

<script>
import utils from "@/plugins/utils";

export default {
  name: "CollegeProbabilitySlider",
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
      probability: this.value,
      marks: utils.getMarks(true)
    };
  },
  computed: {
    probabilityDisp() {
      return utils.getProbabilityDisp(this.probability);
    }
  },
  watch: {
    probability(prob) {
      this.$emit("input", prob);
    }
  },
  methods: {
    formatTooltip(val) {
      return `${val}%`;
    }
  }
};
</script>

