<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">致宁夏2019届考生的一封信</span>
        <span style="float: right;">
          <el-button
            type="primary"
            plain
            @click="gotoZhiyuan('loginForm')"
          >进入志愿辅导</el-button>
        </span>
      </el-row>
    </div>
    <img
      class="letter-fall-back"
      :src="require('@/assets/nx_letter.png')"
      width="100%"
    >
  </el-card>
</template>

<script>
export default {
  methods: {
    gotoZhiyuan() {
      this.$router.push("/zhiyuan");
    }
  }
};
</script>

