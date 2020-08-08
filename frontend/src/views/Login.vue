<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">请填写您的身份信息</span>
      </el-row>
    </div>
    <el-alert type="success" center :closable="false" style="margin-bottom: 15px" 
              title="为了确保您能够获得此次调查的报酬，请务必填写完整、准确的身份信息。" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="left"
      label-width="90px"
    >
      <!-- <el-form-item
        label="准考证号"
        prop="gaokao_id"
        required
      >
        <el-input
          v-model="loginForm.gaokao_id"
          minlength="10"
          maxlength="10"
          show-word-limit
          placeholder="输入您的高考准考证号"
        >
          <span slot="prepend">1964</span>
        </el-input>
      </el-form-item>
      <el-form-item
        label="生日"
        prop="birthdate"
        required
      >
        <el-date-picker
          v-model="loginForm.birthdate"
          type="date"
          style="width: 100%;"
        />
      </el-form-item>-->
      <el-form-item label="姓名" prop="name" required>
        <el-input v-model="loginForm.name" type="text" placeholder="请输入您的姓名" />
      </el-form-item>
      <el-form-item label="选科" prop="class_selection" required>
        <el-radio-group v-model="loginForm.class_selection">
          <el-radio-button label="1">理科</el-radio-button>
          <el-radio-button label="2">文科</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在高中" prop="highschool" required>
        <el-select
          v-model="loginForm.highschool"
          style="width: 100%;"
          placeholder="请选择或输入高中名搜索"
          filterable
        >
          <el-option
            v-for="highschool in highSchoolOptions"
            :key="highschool.code"
            :label="highschool.name"
            :value="highschool.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级号" prop="class_number" required>
        <el-input v-model="loginForm.class_number" type="number" placeholder="请输入您的班级号" />
      </el-form-item>
      <el-alert v-show="loginForm.class_number && !classNumberValid" type="error" title="请输入大于零的班级号" center :closable="false" />
      <el-row :gutter="20">
        <el-alert type="success" center :closable="false" style="margin-bottom: 15px" title="按高考总分排名，含加分" />
        <el-col :xs="48" :sm="24">
          <el-form-item label="高考排名" prop="ranking" required>
            <el-input v-model.number="loginForm.ranking" placeholder="例如：1500" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="高考总分" prop="total_score" required>
            <el-input v-model.number="loginForm.total_score" placeholder="例如：565" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="语文" prop="literature_score" required>
            <el-input v-model.number="loginForm.literature_score" placeholder="例如：100" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="数学" required prop="math_score">
            <el-input v-model.number="loginForm.math_score" placeholder="例如：105" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="英语" prop="foreign_language_score" required>
            <el-input v-model.number="loginForm.foreign_language_score" placeholder="例如：105" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="理综/文综" prop="zonghe_score" required>
            <el-input v-model.number="loginForm.zonghe_score" placeholder="例如：225" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="政策加分" prop="extra_score" required>
            <el-input v-model.number="loginForm.extra_score" placeholder="例如：10" />
          </el-form-item>
        </el-col>
        <el-col v-show="loginForm.total_score && !totalScoreValid" :xs="24">
          <el-alert type="error" title="总分不等于各科分数及政策加分之和，请检查是否输入错误" center :closable="false" />
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <span style="float: right;">
        <el-button type="primary" plain :loading="loading" @click="submitForm('loginForm')">完成信息填写，进入问卷调查</el-button>
      </span>
    </el-row>
  </el-card>
</template>

<script>
import request from "@/plugins/request";
import highschools from "@/assets/highschools";

export default {
  mounted() {
    this.returnCitySN = JSON.parse(localStorage.getItem("returnCitySN"));
  },
  data() {
    const totalScoreValidator = (rule, score, callback) => {
      if (score > 750) {
        callback(new Error("总分应该介于 0 到 750 之间"));
      } else {
        callback()
      }
    };

    const classNumberValidator = (rule, score, callback) => {
      if (score <= 0) {
        callback(new Error("班级号应该大于0"));
      } else {
        callback();
      }
    }

    return {
      returnCitySN: null,
      loading: false,
      loginForm: {
        name: "",
        class_selection: "",
        class_number: "",
        highschool: "",
        total_score: "",
        ranking: "",
        literature_score: "",
        math_score: "",
        foreign_language_score: "",
        zonghe_score: "",
        extra_score: ""
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        class_selection: [
          { required: true, message: "请填写文理科", trigger: "blur" }
        ],
        class_number: [
          { required: true, message: "请填写班级号", trigger: "blur" }
        ],
        highschool: [
          { required: true, message: "高中不能为空", trigger: "blur" }
        ],
        total_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          },
          {
            validator: totalScoreValidator,
            trigger: "blur"
          }
        ],
        ranking: [
          {
            pattern: /^\d{1,5}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ],
        literature_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ],
        math_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ],
        foreign_language_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ],
        zonghe_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ],
        extra_score: [
          {
            pattern: /^\d{1,3}$/,
            required: true,
            message: "请务必正确填写",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    highSchoolOptions() {
      const copied = Array.from(highschools);
      // copied.sort((h1, h2) => h1.name.localeCompare(h2.name, "zh-CN"));
      return copied;
    },
    totalScoreValid() {
      return this.loginForm.total_score === this.computedTotalScore;
    },
    classNumberValid() {
      return this.loginForm.class_number > 0;
    },
    computedTotalScore() {
      return (
        this.loginForm.zonghe_score +
        this.loginForm.math_score +
        this.loginForm.literature_score +
        this.loginForm.foreign_language_score +
        this.loginForm.extra_score
      );
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (!this.totalScoreValid || !this.classNumberValid) {
          valid = false;
        }

        if (
          (parseInt(this.loginForm.class_selection) == 1 &&
            this.loginForm.total_score < 434) ||
          (parseInt(this.loginForm.class_selection) == 2 &&
            this.loginForm.total_score < 523)
        ) {
          this.$message({
            message: "无法连接服务器，请稍后再试",
            type: "error"
          });
          this.loading = false;
          return;
        }

        if (valid) {
          const reqBody = {
            login: this.loginForm,
            ip: this.returnCitySN
          };

          request.post(`${this.API_URL}/login`, reqBody, (err, res) => {
            if (res) {
              if (res.data.failed) {
                this.$alert(res.data.message, "登录失败", {
                  type: "error",
                  confirmButtonText: "去检查",
                  callback: () => {
                    this.loading = false;
                  }
                });
              } else {
                this.$message({
                  message: "登录成功，页面将自动跳转",
                  type: "success"
                });
                this.$store.dispatch("login", res.data).then(() => {
                  this.$router.push("/zhiyuan");
                });
              }
            } else {
              this.$message({
                message: "无法连接服务器，请稍后再试",
                type: "error"
              });
              this.loading = false;
            }
          });
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
