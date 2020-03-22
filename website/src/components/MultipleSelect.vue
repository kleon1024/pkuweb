<template>
  <div>
    <h4>{{ title }}</h4>
    <el-checkbox-group v-model="selectedOptions">
      <div
        v-for="option in options"
        :key="`multiple-select-${option.key}`"
        style="margin-bottom: 5px;"
      >
        <el-checkbox
          :label="option.key"
          :value="option.key"
          border
          style="width: 100%;"
          size="large"
        >
          {{ `${option.key}. ${option.description}` }}
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "MultipleSelect",
  props: {
    value: { // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "请选择符合要求的选项"
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedOptions: this.value
    };
  },
  watch: {
    selectedOptions(options) {
      this.$emit('input', options);
    }
  }
}
</script>
