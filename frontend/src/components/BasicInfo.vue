<template>
  <div>
    <center>
      <h2>基本信息完善</h2>
    </center>
    <section ref="basic-info-form" style="margin-top: 20px;">
      <el-form
        ref="basicInfoForm"
        :model="basicInfoForm"
        :rules="rules"
        label-position="left"
        label-width="120px"
        status-icon
      >
        <h3>基本信息</h3>
        <h4>1. 您的性别是：</h4>
        <el-form-item prop="gender" label-width="0" required>
          <el-radio-group v-model="basicInfoForm.gender">
            <el-radio-button label="male">男</el-radio-button>
            <el-radio-button label="female">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <h4>2.您父亲的教育水平是：</h4>
        <el-form-item prop="papa_education" label-width="0" required>
          <el-select
            v-model="basicInfoForm.papa_education"
            style="width: 100%;"
            placeholder="请选择一项"
            filterable
          >
            <el-option v-for="edu in educationOptions" :key="edu" :label="edu" :value="edu" />
          </el-select>
        </el-form-item>
        <h4>3.您母亲的教育水平是：</h4>
        <el-form-item prop="mama_education" label-width="0" required>
          <el-select
            v-model="basicInfoForm.mama_education"
            style="width: 100%;"
            placeholder="请选择一项"
            filterable
          >
            <el-option v-for="edu in educationOptions" :key="edu" :label="edu" :value="edu" />
          </el-select>
        </el-form-item>
        <h4>4. 作为一名考生，您属于：</h4>
        <el-form-item prop="student_type" label-width="0" required>
          <el-select
            v-model="basicInfoForm.student_type"
            style="width: 100%;"
            placeholder="请选择一项"
            filterable
          >
            <el-option v-for="type in studentTypeOptions" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>
        <h4>5. 和同班同学家庭的经济状况相比，您认为自己的家庭：</h4>
        <el-form-item prop="economics" label-width="0" required>
          <el-select
            v-model="basicInfoForm.economics"
            style="width: 100%;"
            placeholder="请选择一项"
            filterable
          >
            <el-option v-for="eco in economicsOptions" :key="eco" :label="eco" :value="eco" />
          </el-select>
        </el-form-item>
        <h4>6. 您父亲的工作是：</h4>
        <el-form-item prop="papa_job" label-width="0" required>
          <el-select
            v-model="basicInfoForm.papa_job"
            style="width: 100%;"
            placeholder="请选择职业"
            filterable
          >
            <el-option v-for="job in jobOptions" :key="job" :label="job" :value="job" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="otherPapaJob" prop="other_papa_job" label-width="0" required>
          <el-input placeholder="其他职业说明" v-model="basicInfoForm.other_papa_job" />
        </el-form-item>
        <h4>7. 您母亲的工作是：</h4>
        <el-form-item prop="mama_job" label-width="0" required>
          <el-select
            v-model="basicInfoForm.mama_job"
            style="width: 100%;"
            placeholder="请选择职业"
            filterable
          >
            <el-option v-for="job in jobOptions" :key="job" :label="job" :value="job" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="otherMamaJob" prop="other_mama_job" label-width="0" required>
          <el-input placeholder="其他职业说明" v-model="basicInfoForm.other_mama_job" />
        </el-form-item>
        <h4>8.请选择家庭所在县/市（区）：</h4>
        <el-form-item prop="family_location" label-width="0" required>
          <el-select
            v-model="basicInfoForm.family_location"
            style="width: 100%;"
            placeholder="请选择您所在的县/市（区）"
            filterable
          >
            <el-option
              v-for="location in locationOptions"
              :key="location"
              :label="location"
              :value="location"
            />
          </el-select>
        </el-form-item>
        <h4>9. 请选择您的出生年月：</h4>
        <el-form-item prop="birthdate" label-width="0" required>
          <el-date-picker
            v-model="basicInfoForm.birthdate"
            type="month"
            default-value="2000-01"
            style="width: 100%;"
          />
        </el-form-item>
        <h3>志愿信息</h3>
        <div
          v-for="(priorityQuestionKey, index) in prioritySelectionQuestionKeys"
          :key="`priority-question-${index}`"
        >
          <h4>
            {{ index + 3 }}.
            {{ prioritySelectionQuestions[index].description }}（{{ prioritySelectionQuestions[index].hint }}）
          </h4>
          <PrioritySelect
            v-model="basicInfoForm[priorityQuestionKey]"
            :prop="priorityQuestionKey"
            :options="prioritySelectionQuestions[index].options"
            :number-of-selections="prioritySelectionQuestions[index].numberOfSelections"
            :placeholder="`${prioritySelectionQuestions[index].hint}，从左到右重要性依次降低`"
          />
        </div>

        <h4>7. 请评估下列信息来源对你了解录取规则，选择志愿院校有多大帮助</h4>
        <el-row v-for="(option, index) in mediaSourceOptions" :key="option">
          <el-form-item
            :label="option"
            :prop="'media_source_list.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group v-model="basicInfoForm.media_source_list[index].value">
              <el-radio label="A">完全没有帮助</el-radio>
              <el-radio label="B">有一点帮助</el-radio>
              <el-radio label="C">有很大帮助</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h4>8. 假设在录取过程结束后，您得知自己已被志愿中的某大学录取。请问您是否一定会入读该大学(第一空); 如果填写的是“否”，请问您打算在接下来一年里(第二空)</h4>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8">
            <el-form-item label="第一空">
              <el-radio-group v-model="basicInfoForm.will_attend">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="16">
            <el-form-item label="第二空">
              <el-select
                v-model="basicInfoForm.reason_not_attending"
                :disabled="disableReasonForNotAttending"
                placeholder="接下来一年的计划"
                style="width: 100%;"
              >
                <el-option
                  v-for="reason in reasonsForNotAttending"
                  :key="reason.key"
                  :label="reason.description"
                  :value="reason.key"
                  :disabled="reason.key==='A' && !disableReasonForNotAttending"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div align="center" style="margin-top: 20px">
          <el-button type="primary" :loading="loading" @click.stop="submitBasicInfo">提交并进入下一步</el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import request from "@/plugins/request";

import PrioritySelect from "@/components/PrioritySelect";
import BasicInfoFormConfig from "@/assets/survey/BasicInfo";
import highschools from "@/assets/highschools";

export default {
  name: "BasicInfo",
  components: {
    PrioritySelect
  },
  data() {
    var list = [];
    for (var i = 0; i < 7; i++) {
      list.push({
        value: ""
      })
    }

    return {
      allColleges: [],
      loading: false,
      formConfig: BasicInfoFormConfig,
      basicInfoForm: {
        gender: "",
        papa_education: "",
        mama_education: "",
        student_type: "",
        economics: "",
        papa_job: "",
        other_papa_job: "",
        mama_job: "",
        other_mama_job: "",
        family_location: "",
        birthdate: "",
        college_factors: [],
        college_types: [],
        college_locations: [],
        college_majors: [],
        will_attend: true,
        reason_not_attending: "A",
        media_source_list: list,
      },
      rules: {
        media_source_list: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择一项", trigger: "blur" }],
        papa_education: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        mama_education: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        papa_job: [{ required: true, message: "请选择一项", trigger: "blur" }],
        mama_education: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        economics: [{ required: true, message: "请选择一项", trigger: "blur" }],
        student_type: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        family_location: [
          { required: true, message: "请选择一项", trigger: "blur" }
        ],
        birthdate: [
          { required: true, message: "请选择一个日期", trigger: "blur" }
        ],
        other_papa_job: [
          {
            required: true,
            message: "请填写职业信息",
            trigger: "blur"
          }
        ],
        other_mama_job: [
          {
            required: true,
            message: "请填写职业信息",
            trigger: "blur"
          }
        ],
        college_factors: [
          {
            validator: this.getValidatorByQuestion(
              BasicInfoFormConfig.college_factors
            ),
            trigger: "change"
          }
        ],
        college_types: [
          {
            validator: this.getValidatorByQuestion(
              BasicInfoFormConfig.college_types
            ),
            trigger: "change"
          }
        ],
        college_locations: [
          {
            validator: this.getValidatorByQuestion(
              BasicInfoFormConfig.college_locations
            ),
            trigger: "change"
          }
        ],
        college_majors: [
          {
            validator: this.getValidatorByQuestion(
              BasicInfoFormConfig.college_majors
            ),
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    otherPapaJob() {
      var val = this.basicInfoForm.papa_job.startsWith("Q");
      if (!val) {
        this.other_papa_job = this.basicInfoForm.papa_job;
      } else {
        this.other_papa_job = "";
      }
      return val;
    },
    otherMamaJob() {
      var val = this.basicInfoForm.mama_job.startsWith("Q");
      if (!val) {
        this.other_mama_job = this.basicInfoForm.mama_job;
      } else {
        this.other_mama_job = "";
      }
      return val;
    },
    mediaSourceOptions() {
      return [
        "父母亲戚",
        "学校老师",
        "同学好友",
        "门户网站",
        "微信公众号",
        "招生手册",
        "报纸/电视节目"
      ];
    },
    educationOptions() {
      return [
        "A. 小学或以下",
        "B. 初中",
        "C. 中专/技校/职业高中",
        "D. 普通高中",
        "E. 大学专科",
        "F. 大学本科",
        "G. 研究生及以上"
      ];
    },
    studentTypeOptions() {
      return ["A. 农村应届", "B. 城市应届", "C. 农村往届", "D. 城市往届"];
    },
    economicsOptions() {
      return [
        "A. 比平均水平好很多",
        "B. 比平均水平稍好",
        "C. 平均水平",
        "D. 比平均水平稍差",
        "E. 比平均水平好很多"
      ];
    },
    jobOptions() {
      return [
        "A. 农民",
        "B. 产业工人",
        "C. 一般技术员/技术工人",
        "D. 专业技术人员（如教师，医生，工程师等）",
        "E. 销售及服务行业人员",
        "F. 中小学及幼儿园教师",
        "G. 大学教师",
        "H. 新闻，文艺，体育工作者",
        "I. 企业，事业单位中高层管理人员",
        "J. 政府机关普通工作人员",
        "K. 机关干部（正科及以下）",
        "L. 机关干部（副处及以上）",
        "M. 个体户和自由职业者",
        "N. 私营企业主",
        "O. 军人",
        "P. 无业",
        "Q. 其它（请说明）"
      ];
    },
    locationOptions() {
      return [
        "银川市兴庆区",
        "银川市西夏区",
        "银川市金凤区",
        "银川市永宁县",
        "银川市贺兰县",
        "灵武市",
        "吴忠市利通区",
        "吴忠市红寺堡区",
        "吴忠市盐池县",
        "吴忠市同心县",
        "青铜峡市",
        "固原市原州区",
        "固原市西吉县",
        "固原市隆德县",
        "固原市泾源县",
        "固原市彭阳县",
        "石嘴山市大武口区",
        "石嘴山市惠农区",
        "石嘴山市平罗县",
        "中卫市沙坡头区",
        "中卫市中宁县",
        "中卫市海原县"
      ];
    },
    highSchoolOptions() {
      const copied = Array.from(highschools);
      copied.sort((h1, h2) => h1.name.localeCompare(h2.name, "zh-CN"));
      return copied;
    },
    selectedHighschool() {
      return this.form.highschools.find(
        hs => hs.code === this.basicInfoForm.highschool
      );
    },
    prioritySelectionQuestionKeys() {
      return Object.keys(BasicInfoFormConfig).filter(
        key => BasicInfoFormConfig[key].type === "priority_select"
      );
    },
    prioritySelectionQuestions() {
      return this.prioritySelectionQuestionKeys.map(
        key => BasicInfoFormConfig[key]
      );
    },
    collegesToConsider() {
      return BasicInfoFormConfig.collegesToConsider;
    },
    reasonsForNotAttending() {
      return BasicInfoFormConfig.reasonsForNotAttending;
    },
    disableReasonForNotAttending() {
      return this.basicInfoForm.will_attend;
    },
    dataToSubmit() {
      const data = JSON.parse(JSON.stringify(this.basicInfoForm));
      if (data.will_attend) {
        delete data.reason_not_attending;
      }
      return data;
    }
  },
  watch: {
    disableReasonForNotAttending(newVal) {
      this.basicInfoForm.reason_not_attending = newVal ? "A" : "C";
    }
  },
  mounted() {},
  methods: {
    getValidatorByQuestion(question) {
      const numberOfSelections = question.numberOfSelections;
      const validateTopFactors = (rule, selectedFactors, callback) => {
        if (!selectedFactors || selectedFactors.length != numberOfSelections) {
          callback(new Error(`请选择 ${numberOfSelections} 个选项`));
        } else {
          callback();
        }
      };
      return validateTopFactors;
    },
    submitBasicInfo() {
      this.$refs["basicInfoForm"].validate(valid => {
        if (valid) {
          this.$store.commit("updateBasicInfo", this.dataToSubmit);
          this.$emit("confirmed");
        } else {
          this.$message({
            message: "有信息未填写或有误。",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
