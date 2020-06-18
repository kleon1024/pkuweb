<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">请验证你的信息</span>
        <span style="float: right;">
          <el-button
            type="primary"
            plain
            :loading="loading"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </span>
      </el-row>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
    >
      <el-form-item
        label="准考证号"
        prop="gaokao_id"
        required
      >
        <el-input
          v-model="loginForm.gaokao_id"
          minlength="10"
          maxlength="10"
          show-word-limit
          placeholder="输入你的高考准考证号"
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
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from "@/plugins/request";

export default {
  data() {
    return {
      loading: false,
      ip: null,
      loginForm: {
        gaokao_id: null,
        birthdate: new Date("2000/01/01")
      },
      rules: {
        gaokao_id: [
          {
            pattern: /^\d{10}$/,
            required: true,
            message: "请输入准考证号除去开头1964后剩余的10位数字"
          }
        ],
        birthdate: [
          {
            type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    parsedBirthDate() {
      const selectedBirthDate = this.loginForm.birthdate;
      const year = selectedBirthDate.getFullYear();
      const month = selectedBirthDate.getMonth() + 1;
      const date = selectedBirthDate.getDate();
      return `${year}${month
        .toString()
        .padStart(2, "0")}${date.toString().padStart(2, "0")}`;
    },
    parsedGaokaoId() {
      return `1964${this.loginForm.gaokao_id}`;
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request.get('http://pv.sohu.com/cityjson?ie=utf-8', {}, (err, res) => {
            if (res) {
              console.log(res);
              this.ip = res.data;
            }
          })
          
          const reqBody = {
            gaokao_id: this.parsedGaokaoId,
            birthdate: this.parsedBirthDate,
            ip: this.ip,
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
