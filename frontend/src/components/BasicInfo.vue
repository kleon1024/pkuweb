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
        label-width="90px"
        status-icon
      >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="basicInfoForm.name" type="text" placeholder="请输入你的姓名" />
        </el-form-item>
        <el-form-item label="选科" prop="class_selection" required>
          <el-radio-group v-model="basicInfoForm.class_selection">
            <el-radio-button label="1">理科</el-radio-button>
            <el-radio-button label="2">文科</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在高中" prop="highschool" required>
          <el-select
            v-model="basicInfoForm.highschool"
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
        <h4>1. 请输入你的高考总分，排名及各科分数</h4>
        <el-row :gutter="20">
          <el-alert
            type="error"
            center
            :closable="false"
            title="按高考总分排名，含加分"
          />
          <el-col :xs="48" :sm="24">
            <el-form-item label="排名" prop="ranking" required>
              <el-input v-model.number="basicInfoForm.ranking" placeholder="例如：1500" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="总分" prop="total_score" required>
              <el-input v-model.number="basicInfoForm.total_score" placeholder="例如：565" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="语文" prop="literature_score" required>
              <el-input v-model.number="basicInfoForm.literature_score" placeholder="例如：100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="数学" required prop="math_score">
              <el-input v-model.number="basicInfoForm.math_score" placeholder="例如：105" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="英语" prop="foreign_language_score" required>
              <el-input v-model.number="basicInfoForm.foreign_language_score" placeholder="例如：105" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="理综/文综" prop="zonghe_score" required>
              <el-input v-model.number="basicInfoForm.zonghe_score" placeholder="例如：225" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="政策加分" prop="extra_score" required>
              <el-input v-model.number="basicInfoForm.extra_score" placeholder="例如：10" />
            </el-form-item>
          </el-col>
          <el-col v-show="basicInfoForm.total_score && !totalScoreValid" :xs="24">
            <el-alert type="error" title="总分不等于各科分数及政策加分之和，请检查是否输入错误" center :closable="false" />
          </el-col>
        </el-row>
        <div
          v-for="(priorityQuestionKey, index) in prioritySelectionQuestionKeys"
          :key="`priority-question-${index}`"
        >
          <h4>
            {{ index + 2 }}.
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

        <h4>6. 假设在录取过程结束后，您得知自己已被志愿中的某大学录取。请问你是否一定会入读该一本大学(第一空); 如果填写的是“否”，请问你打算在接下来一年里(第二空)</h4>
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
        <h4>
          7.
          现在，请列出你正在考虑的院校，以及你得知这些院校的原因。如果你还没有正在考虑的院校，我们建议你首先查阅高校录取计划和招生手册，或者利用互联网对院校进行初步了解，准确填写此题将有助于我们对你的志愿报考进行有针对性的辅导。如果你还没有正在考虑的院校，请跳过此题
        </h4>
        <el-row
          v-for="rowNumber in collegesToConsider.numOfColleges"
          :key="`college-selection-${rowNumber}`"
          :gutter="5"
        >
          <el-col :span="12">
            <el-form-item :label="`院校 ${rowNumber}`">
              <el-select
                v-model="selectedCollegeIndices[rowNumber - 1]"
                :disabled="rowNumber > 1 && (selectedCollegeIndices[rowNumber - 2] == null || reasonForSelectedColleges[rowNumber - 2] == null)"
                clearable
                filterable
                placeholder="选择或搜索院校"
                style="width: 100%;"
              >
                <el-alert slot="empty" type="error" title="输入有误，没有匹配的院校" :closable="false" center />
                <el-option
                  v-for="(college, index) in allColleges"
                  :key="`basic-info-form-college-list-${rowNumber}-${index}`"
                  :disabled="selectedCollegeIndices.includes(index)"
                  :label="college.full_name"
                  :value="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="reasonForSelectedColleges[rowNumber - 1]"
              :disabled="rowNumber > 1 && (selectedCollegeIndices[rowNumber - 2] == null || reasonForSelectedColleges[rowNumber - 2] == null)"
              placeholder="选择该院校的主要原因"
              style="width: 100%;"
            >
              <el-option
                v-for="reason in collegesToConsider.reasons"
                :key="reason.key"
                :label="reason.description"
                :value="reason.key"
              />
            </el-select>
          </el-col>
        </el-row>
        <h4>
          8.
          为了帮助我们更好地对你填报志愿进行风险的评估，我们将测试你对风险的承受能力。请在下面的每一道小题中，你将面临两个选项。请选出对你自己来说更好的那个选项：
        </h4>
        <el-row v-for="(item, index) in basicInfoForm.risk_list" :key="`risk-take-${index}`" :gutter="1">
          <el-form-item
            :label="'第' + (index + 1) + '题：'"
            :prop="'risk_list.' + index + '.value'"
            :rules="{ required: true, message: '请选择一项', trigger: 'blur' }"
            required
          >
            <el-radio-group v-model="item.value">
              <el-radio label="A" style="margin-right: 15px">50%的概率获得2元，50%的概率获得30元</el-radio>
              <el-radio label="B" style="margin-right: 15px">100%的概率获得{{ index * 2 + 4 }}元</el-radio>
            </el-radio-group>
          </el-form-item>
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
    const totalScoreValidator = (rule, score, callback) => {
      if (score < 0 || score > 750) {
        callback(new Error("总分应该介于 0 到 750 之间"));
      } else {
        callback();
      }
    };

    var risk_list = Array();
    for (var i = 0; i < 8; i++) {
      risk_list.push({ value: "" });
    }
    return {
      allColleges: [],
      loading: false,
      formConfig: BasicInfoFormConfig,
      basicInfoForm: {
        risk_list: risk_list,
        name: "",
        class_selection: "",
        highschool: "",
        total_score: "",
        ranking: "",
        literature_score: "",
        math_score: "",
        foreign_language_score: "",
        zonghe_score: "",
        extra_score: "",
        college_factors: [],
        college_types: [],
        college_locations: [],
        college_majors: [],
        will_attend: true,
        reason_not_attending: "A"
      },
      selectedCollegeIndices: Array(
        BasicInfoFormConfig.collegesToConsider.numOfColleges
      ),
      reasonForSelectedColleges: Array(
        BasicInfoFormConfig.collegesToConsider.numOfColleges
      ),
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        class_selection: [
          { required: true, message: "请填写文理科", trigger: "blur" }
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
    computedTotalScore() {
      return (
        this.basicInfoForm.zonghe_score +
        this.basicInfoForm.math_score +
        this.basicInfoForm.literature_score +
        this.basicInfoForm.foreign_language_score +
        this.basicInfoForm.extra_score
      );
    },
    totalScoreValid() {
      return this.basicInfoForm.total_score === this.computedTotalScore;
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
    selectedColleges() {
      return this.selectedCollegeIndices
        .map((colIndex, i) => {
          if (colIndex == null) return null;
          const college = this.allColleges[colIndex];
          college.reason = this.reasonForSelectedColleges[i];
          return college;
        })
        .filter(college => college != null);
    },
    dataToSubmit() {
      const data = JSON.parse(JSON.stringify(this.basicInfoForm));
      data.selected_colleges = this.selectedColleges;
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
  mounted() {
    this.retrieveCollegeList();
  },
  methods: {
    retrieveCollegeList() {
      const busy = this.$loading({
        lock: true,
        text: "从服务器获取数据中，请耐心等待...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      request.post(`${this.API_URL}/college-admins`, {}, (err, res) => {
        if (res) {
          if (res.data.failed) {
            this.$alert(res.data.message, "获取数据失败", {
              type: "error",
              confirmButtonText: "去检查",
              callback: () => {
                busy.close();
              }
            });
          } else {
            const returnedColleges = Array.from(res.data);
            returnedColleges.sort((c1, c2) =>
              c1.full_name.localeCompare(c2.full_name, "zh-CN")
            ); // 按照大学名称字母排序;
            this.allColleges = returnedColleges;
            busy.close();
          }
        } else {
          this.$message({
            message: "无法连接服务器，请稍后再试",
            type: "error"
          });
          busy.close();
        }
      });
    },
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
        this.loading = true;
        if (!this.totalScoreValid) {
          valid = false;
        }
        if (valid) {
          request.post(
            `${this.API_URL}/basic-info`,
            this.dataToSubmit,
            (err, res) => {
              if (res) {
                if (res.data.failed) {
                  this.$alert(res.data.message, "提交失败", {
                    type: "error",
                    confirmButtonText: "去检查",
                    callback: () => {
                      this.loading = false;
                    }
                  });
                } else {
                  this.$message({
                    message:
                      "信息填写完毕！现在你可以使用魁伟系统进行志愿填报了。该软件主要针对报考一批次的同学。欲报考其它批次高校的同学请和客服人员联系。",
                    type: "success"
                  });
                  this.$store.commit("updateBasicInfo", this.basicInfoForm);
                  this.$emit("confirmed");
                  this.loading = false;
              }
              } else {
                this.$message({
                  message: "无法连接服务器，请稍后再试",
                  type: "error"
                });
                this.loading = false;
              }
            }
          );
        } else {
          this.$message({
            message: "有信息未填写或，有误。完整的信息填写能让我们更好地提供志愿报考辅导！",
            type: "error"
          });
          this.loading = false;
        }
      });
    }
  }
};
</script>
