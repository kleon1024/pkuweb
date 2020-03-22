<template>
  <div>
    <div
      class="selected-tags"
      align="left"
    >
      <el-tag
        v-for="index in numberOfSelections"
        :key="index"
        :type="selectedItemsForSubmitting[index - 1] ? 'success' : 'danger'"
      >
        第{{ index }}重要：<strong v-if="selectedItemsForSubmitting[index - 1]">{{ selectedItemsForSubmitting[index - 1].description }}</strong>
        <u v-else><em>请在下方选择</em></u>
      </el-tag>
    </div>
    <el-form-item
      :prop="prop"
      label-width="0"
      required
    >
      <el-select
        v-model="selectedItems"
        multiple
        :placeholder="placeholder"
        style="width: 100%;"
        :multiple-limit="numberOfSelections"
      >
        <el-option
          v-for="option in options"
          :key="option.key"
          :label="`${option.key}. ${option.description}`"
          :value="option.key"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "PrioritySelect",
  props: {
    prop: {
      type: String,
      required: true
    },
    value: { // in order to use v-model to bind a value to this component
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    numberOfSelections: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String,
      default: "请先选择你认为最重要的因素"
    }
  },

  data() {
    return {
      selectedItems: this.value
    };
  },

  computed: {
    selectedItemsForSubmitting() {
      return this.selectedItems.map(itemKey => this.options.find(option => option.key === itemKey));
    }
  },

  watch: {
    selectedItems(newItems) {
      this.$emit('input', newItems);
    }
  }
}
</script>

<style scoped>

.selected-tags {
  margin-bottom: 10px;
}

.el-tag {
  margin: 0 5px 5px 0;
}
</style>

