<template>
  <div>
    <center>
      <h2>你可能感兴趣或者考虑过的院校</h2>
    </center>
    <el-alert
      type="warning"
      style="margin: 10px 0;"
      title="本调查只适用于宁夏报考一批次志愿院校的同学。未填报一批次志愿的同学可能无法完成问卷并取得报酬！"
    />
    <el-form
      ref="collegeRecommendForm"
      :model="collegeRecommendForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      status-icon
    >
      <!-- <h4>1. 请问你想查看的是什么类型的院校</h4>
      <el-form-item prop="collegeType" label-width="0">
        <el-select
          v-model="collegeRecommendForm.collegeType"
          style="width: 100%;"
          placeholder="点击此处选择院校类型"
        >
          <el-option
            v-for="type in collegeRecommendForm.collegeTypes"
            :key="`college-type-${type.key}`"
            :label="type.description"
            :value="type.key"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-alert
        v-if="['B'].includes(collegeRecommendForm.collegeType)"
        type="warning"
        title="本网站主要针对一批次志愿填报。其它批次志愿填报的辅导在(siminedu.com)，我们在该网站上也为宁夏考生开通了免费使用通道，欢迎各位同学进行尝试"
        :closable="false"
        show-icon
      />
      <div v-if="['C', 'D', 'E'].includes(collegeRecommendForm.collegeType)" class="danger">
        <div>本网站主要针对一批次志愿填报。其它批次志愿填报的辅导请访问斯民教育。进入斯民教育网站并选择生源地为宁夏后，将会验证你的考生号和生日，验证成功即可免费使用。</div>
        <div align="right">
          <el-button
            type="success"
            class="redirect-button action-button"
            plain
            @click.stop="redirectUserToSimin"
          >点击进入斯民教育</el-button>
        </div>
      </div> -->
      <div>
        <el-alert
          v-show="collegeRecommendForm.collegeType && recommendedColleges.length === 0"
          type="error"
          center
          title="我们无法为您推荐学校，可能您的分数没有达到一本分数线。请查看其他选项。"
          :closable="false"
        />
        <section v-if="collegeRecommendations && recommendedColleges.length > 0">
          <h4>2. 根据我们的算法和您的信息，您在填报志愿的时候可能还听说/考虑过下面这些院校。
            <strong> 请注意，我们会在部分问题中提及这些学校。</strong>
            如果你对这些学校的名字感到陌生，请你点击下方的学校名（文字部分）在百度搜索该院校相关的信息。</h4>
          <CollegeButtonTags :colleges="recommendedColleges" />
          <el-alert
            v-if="collegeRecommendations.risk_number < 5 && collegeRecommendations.risk_number > 0"
            class="strategy-alert"
            type="success"
            title="您的分数很可能超过绝大多数一本院校的分数线。恭喜您在高考中获得如此优异的成绩！"
            :closable="false"
          />
          <el-alert
            v-if="collegeRecommendations.safe_number < 3 && collegeRecommendations.safe_number > 0"
            class="strategy-alert"
            type="warning"
            :title="`根据您的分数，能够保证您录取的一本院校只有${collegeRecommendations.safe_number}所，建议同时考虑二本及其它批次的院校，以增大录取可能性！`"
            :closable="false"
          />
          <div align="right">
            <el-button
              :disabled="recommendedColleges.length === 0"
              class="action-button"
              type="primary"
              @click.stop="submitCollegeRecommend"
            >下一步</el-button>
          </div>
        </section>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/plugins/request";

import CollegeButtonTags from "@/components/CollegeButtonTags";

export default {
  name: "CollegeRecommend",
  components: {
    CollegeButtonTags
  },
  data() {
    return {
      collegeRecommendForm: {
        collegeType: "A",
        collegeTypes: [
          {
            key: "A",
            description: "我主要想查看一本院校"
          },
          // {
          //   key: "B",
          //   description: "我想查看一本院校，同时还想查看二本或者其它类型院校"
          // },
          // {
          //   key: "C",
          //   description: "我只想查看提前批次院校"
          // },
          // {
          //   key: "D",
          //   description: "我只想查看二本院校"
          // },
          // {
          //   key: "E",
          //   description: "我还想查看其它类型的院校"
          // }
        ]
      },

      rules: {}
    };
  },
  computed: {
    collegeRecommendations() {
      return this.loginUser.college_recommendations;
    },
    recommendedColleges() {
      return this.collegeRecommendations
        ? this.collegeRecommendations.recommended_colleges
        : [];
    },
    chosenCollegeType() {
      return this.collegeRecommendForm.collegeTypes.find(
        t => t.key === this.collegeRecommendForm.collegeType
      );
    }
  },
  watch: {
    "collegeRecommendForm.collegeType": {
      handler(newType) {
        if (["A", "B"].includes(newType)) {
          if (!this.collegeRecommendations) {
            const loading = this.$loading({
              lock: true,
              text: "为您推荐学校中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            request.post(this.SHORT_LIST_URL, {}, (err, res) => {
              if (res) {
                if (res.data.failed) {
                  loading.close();
                  this.$alert(res.data.message, "推荐失败", {
                    type: "error",
                    confirmButtonText: "返回"
                  });
                } else {
                  this.$store.commit("storeCollegeRecommendations", res.data);
                  loading.close();
                }
              }
            });
          }
        }
      }
    }
  },
  methods: {
    submitCollegeRecommend() {
      this.$emit("confirmed");
    },
    redirectUserToSimin() {
      if (this.chosenCollegeType) {
        request.post(
          `${this.API_URL}/student-redirected`,
          {
            reason: this.chosenCollegeType
          },
          () => {}
        );
      }
      window.open(
        "https://siminedu.com/simin/client/user/userReg.html",
        "_blank"
      );
    }
  }
};
</script>

<style scoped>
.strategy-alert {
  margin: 10px 0;
}
.redirect-button {
  padding: 10px;
}
</style>
