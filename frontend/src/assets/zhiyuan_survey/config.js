module.exports = {
  demoQuestion: {
    demoQuestionCorrectAnswers: ["A", "A"],
    examples: [
      {
        key: 1,
        description:
          "乙大学是甲同学梦寐以求的大学。虽然乙的分数线非常高，录取甲的可能性微乎其微，但如果乙大学愿意录取甲，甲会毫不犹豫的选择去乙大学。甲对乙学校的满意程度是 100"
      },
      {
        key: 2,
        description:
          "丙大学对于甲同学来说还算一所不错的大学。比起乙大学来，在丙大学就读并没有那么令甲同学满意。甲对丙大学的满意程度是 60"
      },
      {
        key: 3,
        description:
          "丁大学对于甲同学来说只能算一所勉强可以接受的大学。甲同学选择该学校完全 是因为该学校的分数线比较低，是一个保险的选择。对于甲同学来说，就读于丁大学比就 读于乙或者丙差远了。甲对丁大学的满意程度是 10"
      }
    ],
    questions: [
      {
        description:
          "如果乙，丙两所大学都愿意录取甲同学，那么为了去自己更满意的大学，甲同学会选择去",
        options: [
          {
            key: "A",
            description: "乙"
          },
          {
            key: "B",
            description: "丙"
          }
        ]
      },
      {
        description:
          "如果乙，丁两所大学都愿意录取甲同学，那么为了去自己更满意的大学，甲同学会选择去",
        options: [
          {
            key: "A",
            description: "乙"
          },
          {
            key: "B",
            description: "丁"
          }
        ]
      }
    ]
  },
  collegeCompare: {
    collegePairs: [ // 这里定义四个问题每个问题中院校的顺序
      [1, 2], // 代表比较 X1, X2
      [1, 3],
      [1, 4],
      [2, 4]
    ],
    answerOptions: [ // 这四个题目有共同点就是比较两个学校，因此可以简化为如下模板, 对应文档中 page5-3
      {
        key: "A",
        description: "因为和后者相比，我对前者更满意"
      },
      {
        key: "B",
        description: "调换两所学校的位置，录取结果也不会有太大变化"
      },
      {
        key: "C",
        description: "顺序不重要。若两所学校都愿意录取，选出一所即可"
      },
      {
        key: "D",
        description: "因为前者录取概率更高，放在 FIRST-COLLEGE-ORDER 院校的位置更保险"
      },
      {
        key: "E",
        description: "因为家人/朋友要求把前者放在更靠前的位置上"
      },
  
      {
        key: "F",
        description: "因为 SECOND-COLLEGE-ORDER 院校志愿的录取优先权比 FIRST-COLLEGE-ORDER 院校志愿要低很多"
      },
      {
        key: "G",
        description: "因为我认为自己在任何情况下都不会去上 SECOND-COLLEGE-ORDER 院校志愿"
      },
      {
        key: "H",
        description: "因为和院校相比，我更在乎专业"
      },
      {
        key: "I",
        description: "其他"
      }
    ]
  }
};
