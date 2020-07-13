export default {
  college_factors: {
    type: "priority_select",
    description: "选择三个择校时您最重视的因素",
    hint: "请先选择对您来说最重要的因素",
    numberOfSelections: 3,
    options: [
      {
        key: "A",
        description: "生源质量"
      },
      {
        key: "B",
        description: "社会声誉"
      },
      {
        key: "C",
        description: "科研规模"
      },
      {
        key: "D",
        description: "毕业比例"
      },
      {
        key: "E",
        description: "有研究生院"
      },
      {
        key: "F",
        description: "985高校"
      },
      {
        key: "G",
        description: "211高校"
      },
      {
        key: "H",
        description: "一流大学建设高校"
      },
      {
        key: "I",
        description: "院校类型(请在第3题中详细说明)"
      },
      {
        key: "J",
        description: "地理位置(请在第4题中详细说明)"
      },
      {
        key: "K",
        description: "能去自己最喜欢的专业(请在第5题中详细说明)"
      }
    ]
  },

  college_types: {
    type: "priority_select",
    description: "选择三种您最想去的院校类型",
    hint: "请先选择您最满意的院校类型",
    numberOfSelections: 3,
    options: [
      {
        key: "A",
        description: "综合类"
      },
      {
        key: "B",
        description: "理工类"
      },
      {
        key: "C",
        description: "财经类"
      },
      {
        key: "D",
        description: "师范类"
      },
      {
        key: "E",
        description: "语言类"
      },
      {
        key: "F",
        description: "政法类"
      },
      {
        key: "G",
        description: "林业，农业类"
      },
      {
        key: "H",
        description: "民族类"
      },
      {
        key: "I",
        description: "体育类"
      },
      {
        key: "J",
        description: "医药类"
      }
    ]
  },

  college_locations: {
    type: "priority_select",
    description: "选择三个您最理想的大学所在地理位置",
    hint: "请先选择您最理想的地理位置",
    numberOfSelections: 3,
    options: [
      {
        key: "A",
        description: "特大城市（北京，上海，广州，深圳）",
        options: [
          {
            city_code: "1101",
            city: "北京"
          },
          {
            city_code: "3101",
            city: "上海"
          },
          {
            city_code: "4401",
            city: "广州"
          },
          {
            city_code: "4403",
            city: "深圳"
          }
        ]
      },
      {
        key: "B",
        description: "北方近海主要城市（天津，大连，秦皇岛，烟台，青岛）",
        options: [
          {
            city_code: "2102",
            city: "大连"
          },
          {
            city_code: "1303",
            city: "秦皇岛"
          },
          {
            city_code: "1201",
            city: "天津"
          },
          {
            city_code: "3706",
            city: "烟台"
          },
          {
            city_code: "3702",
            city: "青岛"
          }
        ]
      },
      {
        key: "C",
        description: "南方近海主要城市（厦门，珠海，杭州，苏州，宁波）",
        options: [
          {
            city_code: "3502",
            city: "厦门"
          },
          {
            city_code: "4404",
            city: "珠海"
          },
          {
            city_code: "3205",
            city: "苏州"
          },
          {
            city_code: "3301",
            city: "杭州"
          },
          {
            city_code: "3302",
            city: "宁波"
          }
        ]
      },
      {
        key: "D",
        description: "南方其它主要城市（南京，南昌，长沙，常州，镇江）",
        options: [
          {
            city_code: "3201",
            city: "南京"
          },
          {
            city_code: "3601",
            city: "南昌"
          },
          {
            city_code: "4301",
            city: "长沙"
          },
          {
            city_code: "3204",
            city: "常州"
          },
          {
            city_code: "3211",
            city: "镇江"
          }
        ]
      },
      {
        key: "E",
        description: "北方其它主要城市（哈尔滨，沈阳，济南，石家庄，长春）",
        options: [
          {
            city_code: "2301",
            city: "哈尔滨"
          },
          {
            city_code: "2101",
            city: "沈阳"
          },
          {
            city_code: "1301",
            city: "石家庄"
          },
          {
            city_code: "3701",
            city: "济南"
          },
          {
            city_code: "2201",
            city: "长春"
          }
        ]
      },
      {
        key: "F",
        description: "西北主要城市（西安，兰州，银川，乌鲁木齐，西宁",
        options: [
          {
            city_code: "6101",
            city: "西安"
          },
          {
            city_code: "6201",
            city: "兰州"
          },
          {
            city_code: "6401",
            city: "银川"
          },
          {
            city_code: "6501",
            city: "乌鲁木齐"
          },
          {
            city_code: "6301",
            city: "西宁"
          }
        ]
      },
      {
        key: "G",
        description: "西南主要城市（重庆，成都，昆明，贵阳，南宁）",
        options: [
          {
            city_code: "5001",
            city: "重庆"
          },
          {
            city_code: "5101",
            city: "成都"
          },
          {
            city_code: "5301",
            city: "昆明"
          },
          {
            city_code: "5201",
            city: "贵阳"
          },
          {
            city_code: "4501",
            city: "南宁"
          }
        ]
      },
      {
        key: "H",
        description: "中部主要城市（合肥，郑州，太原，武汉）",
        options: [
          {
            city_code: "3401",
            city: "合肥"
          },
          {
            city_code: "4101",
            city: "郑州"
          },
          {
            city_code: "1401",
            city: "太原"
          },
          {
            city_code: "4201",
            city: "武汉"
          }
        ]
      },
      {
        key: "I",
        description: "其他",
        options: []
      }
    ]    
  },

  college_majors: {
    type: "priority_select",
    description: "请从下列选项中选出您比较想在本科学习的专业",
    hint: "请先选择您最想学的专业",
    numberOfSelections: 3,
    options: [
      {
        key: "A",
        description: "文学，历史学，哲学"
      },
      {
        key: "B",
        description: "经济，金融，管理(会计，营销)"
      },
      {
        key: "C",
        description: "法学，教育学"
      },
      {
        key: "D",
        description: "理学(数学，物理，化学，生物，计算机)"
      },
      {
        key: "E",
        description: "工学"
      },
      {
        key: "F",
        description: "医学"
      },
      {
        key: "G",
        description: "农学"
      },
      {
        key: "H",
        description: "军事，教育学，艺术学"
      }
    ]
  },

  collegesToConsider: {
    type: "misc",
    numOfColleges: 7,
    reasons: [
      {
        key: "A",
        description: "父母希望/要求报考"
      },
      {
        key: "B",
        description: "同学正在考虑报考"
      },
      {
        key: "C",
        description: "朋友正在考虑报考/已经入读"
      },
      {
        key: "D",
        description: "高中老师推荐"
      },
      {
        key: "E",
        description: "离亲戚住址较近"
      },
      {
        key: "F",
        description: "自己在网上搜寻查找"
      },
      {
        key: "G",
        description: "招生手册或者大学录取工作人员"
      },
      {
        key: "H",
        description: "其他"
      }
    ]
  },

  reasonsForNotAttending: [
    {
      key: "A",
      description: "在该大学上学"
    },
    {
      key: "B",
      description: "在家中全日制复读"
    },
    {
      key: "C",
      description: "在学校全日制复读"
    },
    {
      key: "D",
      description: "找工作"
    },
    {
      key: "E",
      description: "帮家里干农活/做生意"
    },
    {
      key: "F",
      description: "其它"
    }
  ]
};
