function between(p, l, r) {
  return p >= l && p <= r;
}

const marksBase = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  60: "60",
  70: "70",
  80: "80",
  90: "90",
  100: "100"
};

export default {
  getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max - min) + Math.floor(min));
  },
  getMarks(withPercentageSign) {
    const copiedMarks = JSON.parse(JSON.stringify(marksBase));
    if (withPercentageSign) {
      Object.keys(copiedMarks).forEach(key => {
        copiedMarks[key] = `${copiedMarks[key]}%`;
      })
    }
    return copiedMarks;
  },

  getProbabilityDisp(probability) {
    let propDesc = "完全不可能";
    let propClass = "danger";
    if (between(probability, 1, 4)) {
      propDesc = "几乎不可能";
    } else if (between(probability, 5, 9)) {
      propDesc = "可能性微乎其微";
    } else if (between(probability, 10, 14)) {
      propDesc = "可能性很小";
    } else if (between(probability, 15, 19)) {
      propDesc = "可能性较小";
      propClass = "warning";
    } else if (between(probability, 20, 39)) {
      propDesc = "有一定的可能性";
      propClass = "warning";
    } else if (between(probability, 40, 59)) {
      propDesc = "有相当的可能性";
      propClass = "info";
    } else if (between(probability, 60, 74)) {
      propDesc = "可能性较大";
      propClass = "info";
    } else if (between(probability, 75, 84)) {
      propDesc = "可能性很大";
      propClass = "info";
    } else if (between(probability, 85, 94)) {
      propDesc = "可能性极大";
      propClass = "success";
    } else if (between(probability, 95, 99)) {
      propDesc = "几乎一定";
      propClass = "success";
    } else if (probability === 100) {
      propDesc = "肯定，必然";
      propClass = "success";
    }
    return {
      probability_description: propDesc,
      probability_class: propClass
    };
  }
};
