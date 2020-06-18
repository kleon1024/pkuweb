<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">我们的联系方式</span>
        <span style="float: right;">
          <el-button type="primary" plain @click="$router.push('/zhiyuan')">进入志愿辅导</el-button>
        </span>
      </el-row>
    </div>
    <div>
      <p>
        北京大学教育学院丁老师: 010-62756724
        <br />宁夏考试院张老师: 0951-5559159
      </p>
    </div>
    <p>我们将在高考结束后及时向您推送高考志愿辅导的相关信息。如果您有任何疑问，也可以随时通过微信与我们联系。高考志愿填报前夕，宁夏考试院还会通过官方平台向您再发送一条短信，提醒您关注这个微信号的相关通知。</p>
    <p>
      请添加志愿咨询微信号
      <strong>pku_zhiyuan</strong>. 也可以直接扫描下方的二维码添加我们的微信。
    </p>
    <div align="center">
      <img height="480" v-lazy="qr_source" alt="二维码" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      qr_source: "https://cm-1301052396.cos.ap-shanghai.myqcloud.com/qr.png"
    };
  }
};
</script>