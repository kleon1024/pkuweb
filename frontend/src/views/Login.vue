<template>
  <el-card>
    <div slot="header">
      <el-row>
        <span class="card-title">请验证你的信息</span>
        <span style="float: right;">
          <el-button type="primary" plain :loading="loading" @click="submitForm('loginForm')">登录</el-button>
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
      </el-form-item>-->
      <el-form-item label="姓名" prop="name" required>
        <el-input v-model="loginForm.name" type="text" placeholder="请输入你的姓名" />
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
          placeholder="请选择你所在的高中或输入高中名搜索"
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
    </el-form>
  </el-card>
</template>

<script>
import request from "@/plugins/request";
import highschools from "@/assets/highschools";

export default {
  mounted() {
    this.returnCitySN = JSON.parse(localStorage.getItem("returnCitySN"));
    console.log(this.returnCitySN);
  },
  data() {
    return {
      returnCitySN: null,
      loading: false,
      loginForm: {
        name: "",
        class_selection: "",
        highschool: "",
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        class_selection: [
          { required: true, message: "请填写文理科", trigger: "blur" }
        ],
        highschool: [
          { required: true, message: "高中不能为空", trigger: "blur" }
        ],
      }
    };
  },
  computed: {
    highSchoolOptions() {
      const copied = Array.from(highschools);
      copied.sort((h1, h2) => h1.name.localeCompare(h2.name, "zh-CN"));
      return copied;
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
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
