/* eslint-disable no-unused-vars */
const zhiyuanQuizItems = [
  {
    disabled: zhiyuanColleges => false, // 不用修改
    groups: ['T1', 'T2', 'T3', 'C'], // 适用于哪些组的学生
    collegeOrder: [1, 2, 3, 4], // 志愿表中学校的顺序即第一行是X1, 第二行是X2， 第三行是X3，第四行是X4 (这里的1，2，3，4和 X1, X2, X3, X4 对应，而不是表格行号，行号由这个数组的顺序决定)
    collegeHighlight: [1, 2], // 志愿表需要用红色标注的学校（对应表格第一，第二行两个学校），这里的顺序并不重要，只需要表明哪些学校需要标红
    description: '根据您在上一环节中填写的内容，您的一本志愿如下', // 志愿表上方的描述
    questions: [
      // 该问题中的子问题
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计', // 命题描述
        proposition: '您最终进入X1读书' // 命题本身
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X2）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X1或X2）包含了前一道问题中的情况（就读于X1），所以和前一道题相比，本题的可能性应该会更大或者相等' // 提示
      }
    ]
  },
  {
    disabled: zhiyuanColleges => false,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [2, 1, 3, 4],
    collegeHighlight: [1, 2], // 志愿表需要用红色标注的学校（对应表格第一，第二行两个学校），这里的顺序并不重要，只需要表明哪些学校需要标红
    descriptionHighlight:
      '假设您改变了志愿表中院校排列的顺序：您把X1和X2对应的院校的位置调换了一下。',
    description: '在调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X2读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X2，X1）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X2或X1）包含了前一道问题中的情况（就读于X2），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [4, 1, 3, 2],
    collegeHighlight: [1, 2],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X4读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X4，X1）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X4或X1）包含了前一道问题中的情况（就读于X4），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 4, 3, 2],
    collegeHighlight: [1, 2],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X4）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X1或X4）包含了前一道问题中的情况（就读于X1），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [3, 4, 1, 2],
    collegeHighlight: [3, 4],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入后两所志愿院校（即X1，X2）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X1或X2）包含了前一道问题中的情况（就读于X1），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [3, 4, 2, 1],
    collegeHighlight: [3, 4],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X2读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入后两所志愿院校（即X2，X1）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X2或X1）包含了前一道问题中的情况（就读于X2），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length >= 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [3, 1, 2],
    collegeHighlight: [2, 3],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入后两所志愿院校（即X1，X2）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X1或X2）包含了前一道问题中的情况（就读于X1），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length >= 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [3, 2, 1],
    collegeHighlight: [2, 3],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X2读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入后两所志愿院校（即X2，X1）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X2或X1）包含了前一道问题中的情况（就读于X2），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => false,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 3, 2, 4],
    collegeHighlight: [1, 2],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X3）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X1或X3）包含了前一道问题中的情况（就读于X1），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => false,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [3, 1, 2, 4],
    collegeHighlight: [1, 2],
    descriptionHighlight: '假设您把志愿表中几所院校位置调换了一下。',
    description: '调换之后，您的志愿表如下',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X3读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X3，X1）中的某一所读书',
        hint:
          '提示：本题的情况（就读于X3或X1）包含了前一道问题中的情况（就读于X3），所以和前一道题相比，本题的可能性应该会更大或者相等'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 2, 3, 4],
    collegeAdminScores: [-2, -10, -5, -20],
    descriptionHighlight:
      '现在，重新考虑您原先填写的志愿。在该问题中，假设您已经知道这些学校的录取分数线分别是多少了。',
    description: '四所学校的分数线如下表中“录取分数线”一栏所示',
    sub_description:
      '根据您的填写，您的高考总分是score分。没有填写提前批次志愿的情况下，请对下列情况发生的可能性（概率）做一个估计。如果您认为某情况肯定会发生，那么请将可能性调整至100%；如果您认为某情况一定不会发生，请将可能性调整至0%',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X2）中的某一所读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入志愿表上的任意一所院校（即X1，X2，X3，X4）读书'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length < 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 2, 3, 4],
    collegeAdminScores: [2, -2, 5, 10],
    descriptionHighlight:
      '现在，重新考虑您原先填写的志愿。在该问题中，假设您已经知道这些学校的录取分数线分别是多少了。',
    description: '四所学校的分数线如下表中“录取分数线”一栏所示',
    sub_description:
      '根据您的填写，您的高考总分是score分。没有填写提前批次志愿的情况下，请对下列情况发生的可能性（概率）做一个估计。如果您认为某情况肯定会发生，那么请将可能性调整至100%；如果您认为某情况一定不会发生，请将可能性调整至0%',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X2）中的某一所读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入志愿表上的任意一所院校（即X1，X2，X3，X4）读书'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length >= 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 2, 3],
    collegeAdminScores: [-2, -10, -5],
    descriptionHighlight:
      '现在，重新考虑您原先填写的志愿。在该问题中，假设您已经知道这些学校的录取分数线分别是多少了。',
    description: '四所学校的分数线如下表中“录取分数线”一栏所示',
    sub_description:
      '根据您的填写，您的高考总分是score分。没有填写提前批次志愿的情况下，请对下列情况发生的可能性（概率）做一个估计。如果您认为某情况肯定会发生，那么请将可能性调整至100%；如果您认为某情况一定不会发生，请将可能性调整至0%',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X2）中的某一所读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入志愿表上的任意一所院校（即X1，X2，X3）读书'
      }
    ]
  },
  {
    disabled: zhiyuanColleges => zhiyuanColleges.length >= 4,
    groups: ['T1', 'T2', 'T3', 'C'],
    collegeOrder: [1, 2, 3],
    collegeAdminScores: [2, -2, 5],
    descriptionHighlight:
      '现在，重新考虑您原先填写的志愿。在该问题中，假设您已经知道这些学校的录取分数线分别是多少了。',
    description: '四所学校的分数线如下表中“录取分数线”一栏所示',
    sub_description:
      '根据您的填写，您的高考总分是score分。没有填写提前批次志愿的情况下，请对下列情况发生的可能性（概率）做一个估计。如果您认为某情况肯定会发生，那么请将可能性调整至100%；如果您认为某情况一定不会发生，请将可能性调整至0%',
    questions: [
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入X1读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入前两所志愿院校（即X1，X2）中的某一所读书'
      },
      {
        propositionDescription:
          '假设您没有填写提前批次的志愿，请对下列情况发生的可能性（概率）做一个估计',
        proposition: '您最终进入志愿表上的任意一所院校（即X1，X2，X3）读书'
      }
    ]
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const highlightName = name => {
  return `<span style="color: red;">${name}</span>`;
};

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

const replaceColleges = (str, zhiyuanColleges, highlightColleges = []) => {
  if (!str) return str;
  let replacedStr = str;
  ['X1', 'X2', 'X3', 'X4'].slice(0, zhiyuanColleges.length).forEach((cs, i) => {
    let replaceBy = zhiyuanColleges[i].full_name;
    replaceBy = highlightColleges.includes(i + 1)
      ? highlightName(replaceBy)
      : replaceBy;
    replacedStr = replaceAll(replacedStr, cs, replaceBy);
  });
  return replacedStr;
};

module.exports = {
  getQuestions(userInfo, zhiyuanColleges) {
    return zhiyuanQuizItems.map(item => {
      return {
        disabled: item.disabled(zhiyuanColleges),
        groups: item.groups,
        collegeOrder: item.collegeOrder,
        collegeHighlight: item.collegeHighlight,
        collegeAdminScores: item.collegeAdminScores,
        description: item.description,
        descriptionHighlight: replaceColleges(item.descriptionHighlight, zhiyuanColleges),
        subDescription: item.subDescription
          ? replaceAll(item.subDescription, 'score', userInfo.score)
          : item.subDescription,
        questions: item.questions.map(question => {
          return {
            propositionDescription: question.propositionDescription,
            proposition: replaceColleges(
              question.proposition,
              zhiyuanColleges,
              item.collegeHighlight
            ),
            hint: replaceColleges(question.hint, zhiyuanColleges)
          };
        })
      };
    });
  }
};
