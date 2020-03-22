<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div>
      <span class="danger">{{ descriptionHighlight || "" }}</span> {{ description }}
    </div>
    <ReadOnlyZhiyuanForm
      :highlights="highlights"
      :colleges="colleges"
      :college-admin-scores="collegeAdminScores"
    />
    <div v-if="subDescription">
      {{ subDescription }}
    </div>
    <div
      v-for="(question, index) in questions"
      ref="questions"
      :key="`probability-question-${index}`"
    >
      <div
        style="margin: 15px 0;"
        v-html="`<span>Q${index + 1}. </span>${question.propositionDescription}`"
      />
      <div align="center">
        <h4>
          <span v-html="question.proposition" />的概率:
          <span
            :class="probabilityDisps[index].probability_class"
          >{{ probabilities[index] }}%（{{ probabilityDisps[index].probability_description }}）</span>
        </h4>
      </div>
      <div>
        <div
          v-if="question.hint"
          class="danger"
        >
          {{ question.hint }}
        </div>
      </div>
      <div align="center">
        <el-slider
          v-model="probabilities[index]"
          :format-tooltip="formatTooltip"
          :marks="marks"
          :step="step"
        />
        <strong>(请移动滑块来调整可能性的大小，滑块越靠右，可能性越大)</strong>
      </div>
    </div>
  </div>
</template>

<script>
import ReadOnlyZhiyuanForm from "@/components/ReadOnlyZhiyuanForm";
import utils from "@/plugins/utils";

export default {
  name: "ZhiyuanProbabiltyQuestion",
  components: {
    ReadOnlyZhiyuanForm
  },
  props: {
    value: {
      // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ""
    },
    descriptionHighlight: {
      type: String,
      required: false,
      default: ""
    },
    highlights: {
      type: Array,
      require: false,
      default: null
    },
    colleges: {
      type: Array,
      required: true
    },
    subDescription: {
      type: String,
      required: false,
      default: null
    },
    collegeAdminScores: {
      type: Array,
      required: false,
      default: null
    },
    questions: {
      type: Array,
      required: true
    },
    step: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    return {
      probabilities: this.value,
      marks: utils.getMarks(true)
    };
  },
  computed: {
    probabilityDisps() {
      return this.probabilities.map(prop => utils.getProbabilityDisp(prop));
    }
  },
  watch: {
    probabilities(prob) {
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
