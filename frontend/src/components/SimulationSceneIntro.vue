<template>
  <div>
    <p>接下来，你需要在以下三个场景中回答一些问题：</p>
<p>【情景：风险偏好测试游戏】 </p>
<p>【情景：帮助韩梅梅报志愿】 </p>
<p>【情景：帮助李华报志愿】 </p>
<p>系统从以上情景的题目中随机抽取一道题目，并根据你在题目中的回答给予额外的报酬。每一道题都可能被抽到并影响完成问卷的报酬，因此我们建议你仔细阅读并认真完成每一道题。 </p>
    <div align="center" style="margin-top: 50px;">
      <el-button type="primary" @click.stop="satisfactionsDone">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SimulationSceneOne",
  methods: {
    satisfactionsDone() {
        this.$emit("confirmed");
      }
    }
};
</script>

