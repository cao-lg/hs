const Majors = [
    {
        id: 1,
        name: "汉语言文学",
        category: "文学",
        type: "中国语言文学类",
        duration: "4年",
        employment: "教师/编辑/文案/公务员",
        salary: "4500-6000",
        description: "汉语言文学专业培养具有汉语言文学基本理论、基础知识和基本技能的高级专门人才。",
        schools: ["安徽大学", "安徽师范大学", "安庆师范大学", "淮北师范大学"]
    },
    {
        id: 2,
        name: "法学",
        category: "法学",
        type: "法学类",
        duration: "4年",
        employment: "律师/法官/法务/公务员",
        salary: "5000-8000",
        description: "法学专业培养系统掌握法学知识，熟悉我国法律和党的相关政策的高级专门人才。",
        schools: ["安徽大学", "安徽财经大学", "安徽师范大学", "合肥工业大学"]
    },
    {
        id: 3,
        name: "英语",
        category: "文学",
        type: "外国语言文学类",
        duration: "4年",
        employment: "翻译/外贸/教师/外企",
        salary: "4500-7000",
        description: "英语专业培养具有扎实的英语语言基础和比较广泛的科学文化知识的复合型高级人才。",
        schools: ["安徽大学", "安徽师范大学", "安庆师范大学", "淮北师范大学"]
    },
    {
        id: 4,
        name: "新闻学",
        category: "文学",
        type: "新闻传播学类",
        duration: "4年",
        employment: "记者/编辑/新媒体/公关",
        salary: "4500-7000",
        description: "新闻学专业培养具备系统的新闻理论知识与技能、宽广的文化与科学知识的高级专门人才。",
        schools: ["安徽大学", "安徽师范大学", "合肥大学"]
    },
    {
        id: 5,
        name: "会计学",
        category: "管理学",
        type: "工商管理类",
        duration: "4年",
        employment: "会计/审计/财务/银行",
        salary: "4500-7000",
        description: "会计学专业培养具备管理、经济、法律和会计学等方面知识和能力的高级专门人才。",
        schools: ["安徽财经大学", "安徽大学", "合肥工业大学", "铜陵学院"]
    },
    {
        id: 6,
        name: "财务管理",
        category: "管理学",
        type: "工商管理类",
        duration: "4年",
        employment: "财务分析/理财/企业管理",
        salary: "5000-8000",
        description: "财务管理专业培养具备管理、经济、法律和理财、金融等方面知识和能力的高级专门人才。",
        schools: ["安徽财经大学", "安徽大学", "合肥工业大学", "安徽建筑大学"]
    },
    {
        id: 7,
        name: "行政管理",
        category: "管理学",
        type: "公共管理类",
        duration: "4年",
        employment: "公务员/行政/人力资源",
        salary: "4000-6000",
        description: "行政管理专业培养具备行政学、管理学、政治学、法学等方面知识的高级专门人才。",
        schools: ["安徽大学", "安徽师范大学", "安徽财经大学", "合肥大学"]
    },
    {
        id: 8,
        name: "工商管理",
        category: "管理学",
        type: "工商管理类",
        duration: "4年",
        employment: "企业管理/营销/创业",
        salary: "4500-7000",
        description: "工商管理专业培养具备管理、经济、法律及企业管理方面知识和能力的高级专门人才。",
        schools: ["安徽大学", "安徽财经大学", "合肥工业大学", "安徽工程大学"]
    },
    {
        id: 9,
        name: "市场营销",
        category: "管理学",
        type: "工商管理类",
        duration: "4年",
        employment: "销售/市场/品牌策划",
        salary: "4500-8000",
        description: "市场营销专业培养具备管理、经济、法律、市场营销等方面知识和能力的高级专门人才。",
        schools: ["安徽财经大学", "安徽大学", "安徽工程大学", "合肥大学"]
    },
    {
        id: 10,
        name: "人力资源管理",
        category: "管理学",
        type: "工商管理类",
        duration: "4年",
        employment: "HR/招聘/培训/薪酬",
        salary: "4500-7000",
        description: "人力资源管理专业培养具备管理、经济、法律及人力资源管理等方面知识和能力的高级专门人才。",
        schools: ["安徽大学", "安徽财经大学", "安徽师范大学", "安徽建筑大学"]
    },
    {
        id: 11,
        name: "经济学",
        category: "经济学",
        type: "经济学类",
        duration: "4年",
        employment: "金融/经济分析/公务员",
        salary: "5000-8000",
        description: "经济学专业培养具备比较扎实的经济学理论基础，熟悉现代经济学理论的专门人才。",
        schools: ["安徽大学", "安徽财经大学", "合肥工业大学", "安徽师范大学"]
    },
    {
        id: 12,
        name: "金融学",
        category: "经济学",
        type: "金融学类",
        duration: "4年",
        employment: "银行/证券/保险/投资",
        salary: "5000-10000",
        description: "金融学专业培养具备金融学方面的理论知识和业务技能的专门人才。",
        schools: ["安徽财经大学", "安徽大学", "合肥工业大学", "安徽农业大学"]
    },
    {
        id: 13,
        name: "国际经济与贸易",
        category: "经济学",
        type: "经济与贸易类",
        duration: "4年",
        employment: "外贸/跨境电商/海关",
        salary: "4500-7000",
        description: "国际经济与贸易专业培养掌握国际贸易基本知识与基本技能的应用型高级专门人才。",
        schools: ["安徽大学", "安徽财经大学", "安徽工业大学", "合肥大学"]
    },
    {
        id: 14,
        name: "教育学",
        category: "教育学",
        type: "教育学类",
        duration: "4年",
        employment: "教师/教育管理/培训",
        salary: "4000-6000",
        description: "教育学专业培养具有良好思想道德品质、较高教育理论素养和较强教育实际工作能力的人才。",
        schools: ["安徽师范大学", "淮北师范大学", "安庆师范大学", "合肥师范学院"]
    },
    {
        id: 15,
        name: "学前教育",
        category: "教育学",
        type: "教育学类",
        duration: "4年",
        employment: "幼儿园教师/早教",
        salary: "4000-6000",
        description: "学前教育专业培养具备学前教育专业知识，能在托幼机构从事保教和研究工作的人才。",
        schools: ["安徽师范大学", "淮北师范大学", "合肥师范学院", "安庆师范大学"]
    },
    {
        id: 16,
        name: "小学教育",
        category: "教育学",
        type: "教育学类",
        duration: "4年",
        employment: "小学教师/教育管理",
        salary: "4000-6500",
        description: "小学教育专业培养德、智、体、美全面发展，具有较高教育理论素养的小学教育工作者。",
        schools: ["安徽师范大学", "安庆师范大学", "合肥师范学院", "淮北师范大学"]
    },
    {
        id: 17,
        name: "历史学",
        category: "历史学",
        type: "历史学类",
        duration: "4年",
        employment: "教师/文博/公务员",
        salary: "4000-6000",
        description: "历史学专业培养具有一定的马克思主义基本理论素养和系统专业知识的历史学高级专门人才。",
        schools: ["安徽大学", "安徽师范大学", "淮北师范大学", "安庆师范大学"]
    },
    {
        id: 18,
        name: "哲学",
        category: "哲学",
        type: "哲学类",
        duration: "4年",
        employment: "研究/编辑/公务员",
        salary: "4000-6000",
        description: "哲学专业培养具有一定马克思主义哲学理论素养和系统专业知识的哲学高级专门人才。",
        schools: ["安徽大学", "安徽师范大学"]
    },
    {
        id: 19,
        name: "社会学",
        category: "法学",
        type: "社会学类",
        duration: "4年",
        employment: "社工/调研/公务员",
        salary: "4000-6000",
        description: "社会学专业培养具备较全面的社会学理论知识，较熟练的社会调查技能的专门人才。",
        schools: ["安徽大学", "安徽师范大学", "淮北师范大学"]
    },
    {
        id: 20,
        name: "心理学",
        category: "理学",
        type: "心理学类",
        duration: "4年",
        employment: "心理咨询/HR/教育",
        salary: "4500-7000",
        description: "心理学专业培养具备心理学的基本理论、基本知识、基本技能的高级专门人才。",
        schools: ["安徽师范大学", "安徽医科大学", "淮北师范大学"]
    },
    {
        id: 21,
        name: "护理学",
        category: "医学",
        type: "护理学类",
        duration: "4年",
        employment: "护士/护理管理/涉外",
        salary: "5000-8000",
        description: "护理学专业培养具备人文社会科学、医学、预防保健的基本知识及护理学的基本理论知识和技能的人才。",
        schools: ["安徽医科大学", "蚌埠医科大学", "皖南医学院", "安徽中医药大学"]
    },
    {
        id: 22,
        name: "中医学",
        category: "医学",
        type: "中医学类",
        duration: "5年",
        employment: "中医医生/理疗/养生",
        salary: "5000-8000",
        description: "中医学专业培养具备中医药理论基础、中医学专业知识和专业实践技能的医学高级专门人才。",
        schools: ["安徽中医药大学", "安徽医科大学"]
    },
    {
        id: 23,
        name: "针灸推拿学",
        category: "医学",
        type: "中医学类",
        duration: "5年",
        employment: "针灸师/推拿/康复",
        salary: "5000-7000",
        description: "针灸推拿学专业培养具备中医药理论基础、针灸推拿专业知识和实践技能的医学人才。",
        schools: ["安徽中医药大学"]
    },
    {
        id: 24,
        name: "中药学",
        category: "医学",
        type: "中药学类",
        duration: "4年",
        employment: "中药研发/质检/销售",
        salary: "4500-7000",
        description: "中药学专业培养具备中药学基础理论、基本知识、基本技能的中药学高级专门人才。",
        schools: ["安徽中医药大学", "安徽医科大学", "安徽农业大学"]
    },
    {
        id: 25,
        name: "社会工作",
        category: "法学",
        type: "社会学类",
        duration: "4年",
        employment: "社工/公益/社区",
        salary: "3500-5000",
        description: "社会工作专业培养具备社会学、社会工作的基本理论和知识的专门人才。",
        schools: ["安徽大学", "安徽师范大学", "淮北师范大学"]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Majors };
}
