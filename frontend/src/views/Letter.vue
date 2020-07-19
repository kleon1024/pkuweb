<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">北京大学问卷调查</span>
      </el-row>
    </div>
    <div>
      <strong>
        <p>您好！</p>
        <p>我们是来自北京大学教育学院的课题团队， 目前正在开展一项有关高考志愿填报与学校选择的学术研究。</p>
        <p>我们诚挚邀请您有偿填写一份简短的网络问卷。 完成问卷大约需要25分钟。问卷提交成功后，我们会立即向您支付100元的现金报酬。</p>
        <p>问卷内容将不会涉及任何敏感身份信息，所有数据将会被严格保密、并仅被用于学术研究。</p>
        <p>
          关于此次问卷调查的更多信息，您可以登陆
          <a target="_blank" href="http://www.gse.pku.edu.cn/syxw/tzgg/99309.htm">北京大学教育学院官网</a> 进行浏览。
        </p>如果您在填写过程中有任何疑问，请通过邮件（yqding@gse.pku.edu.cn）或微信（pku_zhiyuan1）联系我们。感谢您的支持与配合！
      </strong>
    </div>
    <el-row>
      <span style="float: right;">
        <el-button type="primary" plain @click="gotoZhiyuan('loginForm')">进入问卷调查</el-button>
      </span>
    </el-row>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      nx_letter:
        "https://cm-1301052396.cos.ap-shanghai.myqcloud.com/nx_letter.png"
    };
  },
  methods: {
    gotoZhiyuan() {
      this.$router.push("/zhiyuan");
    }
  }
};
</script>

