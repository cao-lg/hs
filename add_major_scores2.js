const fs = require('fs');

const majorPool = [
    { name: "汉语言文学", baseScore: 0 },
    { name: "法学", baseScore: 5 },
    { name: "英语", baseScore: 3 },
    { name: "新闻学", baseScore: 2 },
    { name: "会计学", baseScore: 8 },
    { name: "财务管理", baseScore: 6 },
    { name: "行政管理", baseScore: -2 },
    { name: "工商管理", baseScore: 1 },
    { name: "市场营销", baseScore: -5 },
    { name: "人力资源管理", baseScore: -1 },
    { name: "经济学", baseScore: 4 },
    { name: "金融学", baseScore: 7 },
    { name: "国际经济与贸易", baseScore: 0 },
    { name: "教育学", baseScore: -3 },
    { name: "学前教育", baseScore: -8 },
    { name: "小学教育", baseScore: -5 },
    { name: "历史学", baseScore: -4 },
    { name: "哲学", baseScore: -10 },
    { name: "社会学", baseScore: -7 },
    { name: "社会工作", baseScore: -12 },
    { name: "思想政治教育", baseScore: -6 },
    { name: "广告学", baseScore: -1 },
    { name: "网络与新媒体", baseScore: 4 },
    { name: "汉语国际教育", baseScore: -2 },
    { name: "翻译", baseScore: 2 },
    { name: "商务英语", baseScore: 1 },
    { name: "旅游管理", baseScore: -10 },
    { name: "酒店管理", baseScore: -15 },
    { name: "电子商务", baseScore: 3 },
    { name: "物流管理", baseScore: -4 },
    { name: "劳动与社会保障", baseScore: -8 },
    { name: "土地资源管理", baseScore: -6 },
    { name: "公共事业管理", baseScore: -9 },
    { name: "档案学", baseScore: -11 },
    { name: "应用心理学", baseScore: 2 },
    { name: "护理学", baseScore: -3 },
    { name: "中医学", baseScore: 3 },
    { name: "针灸推拿学", baseScore: -5 },
    { name: "中药学", baseScore: -4 },
    { name: "药学", baseScore: 1 },
    { name: "视觉传达设计", baseScore: -8 },
    { name: "环境设计", baseScore: -7 },
    { name: "数字媒体艺术", baseScore: -2 },
    { name: "广播电视编导", baseScore: -6 },
    { name: "播音与主持艺术", baseScore: -5 },
    { name: "动画", baseScore: -4 },
    { name: "音乐学", baseScore: -10 },
    { name: "美术学", baseScore: -9 },
    { name: "体育教育", baseScore: -12 },
    { name: "运动训练", baseScore: -14 },
    { name: "社会体育指导与管理", baseScore: -16 },
    { name: "特殊教育", baseScore: -10 },
    { name: "教育技术学", baseScore: -7 },
    { name: "文物与博物馆学", baseScore: -13 },
    { name: "考古学", baseScore: -15 },
    { name: "世界史", baseScore: -12 },
    { name: "文化产业管理", baseScore: -3 },
    { name: "保险学", baseScore: -2 },
    { name: "投资学", baseScore: 5 },
    { name: "金融工程", baseScore: 6 },
    { name: "经济统计学", baseScore: 3 },
    { name: "税收学", baseScore: 2 },
    { name: "财政学", baseScore: 3 },
    { name: "资产评估", baseScore: 1 },
    { name: "物业管理", baseScore: -13 },
    { name: "公共关系学", baseScore: -5 },
    { name: "秘书学", baseScore: -8 },
    { name: "日语", baseScore: -3 },
    { name: "法语", baseScore: -1 },
    { name: "德语", baseScore: -2 },
    { name: "西班牙语", baseScore: 0 },
    { name: "俄语", baseScore: -6 },
    { name: "朝鲜语", baseScore: -5 },
    { name: "编辑出版学", baseScore: -4 },
    { name: "传播学", baseScore: 1 },
    { name: "广播电视学", baseScore: 0 },
    { name: "知识产权", baseScore: 4 },
    { name: "政治学与行政学", baseScore: -5 },
    { name: "国际政治", baseScore: -8 },
    { name: "外交学", baseScore: -6 },
    { name: "人类学", baseScore: -14 },
    { name: "信息管理与信息系统", baseScore: 2 },
    { name: "工程管理", baseScore: 1 },
    { name: "工程造价", baseScore: 0 },
    { name: "房地产开发与管理", baseScore: -7 },
    { name: "城市管理", baseScore: -8 },
    { name: "会展经济与管理", baseScore: -9 },
    { name: "贸易经济", baseScore: -1 },
    { name: "农林经济管理", baseScore: -11 },
    { name: "地理科学", baseScore: -5 },
    { name: "统计学", baseScore: 4 },
    { name: "戏剧影视文学", baseScore: -7 },
    { name: "表演", baseScore: -8 },
    { name: "审计学", baseScore: 7 },
    { name: "茶学", baseScore: -6 },
    { name: "工业工程", baseScore: 0 },
    { name: "质量管理工程", baseScore: -2 },
    { name: "产品设计", baseScore: -6 },
    { name: "服装与服饰设计", baseScore: -9 },
    { name: "工艺美术", baseScore: -10 },
    { name: "音乐表演", baseScore: -9 },
    { name: "绘画", baseScore: -8 },
    { name: "书法学", baseScore: -7 },
    { name: "经济统计学", baseScore: 3 },
    { name: "中药资源与开发", baseScore: -6 },
    { name: "中药制药", baseScore: -5 },
    { name: "药物制剂", baseScore: -2 },
    { name: "药物分析", baseScore: -1 },
    { name: "临床药学", baseScore: 2 },
    { name: "康复治疗学", baseScore: -1 },
    { name: "医学检验技术", baseScore: 0 },
    { name: "医学影像技术", baseScore: -1 },
    { name: "卫生检验与检疫", baseScore: -4 },
    { name: "食品卫生与营养学", baseScore: -5 },
    { name: "生物医学工程", baseScore: 3 },
    { name: "预防医学", baseScore: 1 },
    { name: "临床医学", baseScore: 6 },
    { name: "麻醉学", baseScore: 5 },
    { name: "医学影像学", baseScore: 4 },
    { name: "儿科学", baseScore: 3 },
    { name: "精神医学", baseScore: 2 },
    { name: "放射医学", baseScore: 1 },
    { name: "眼视光医学", baseScore: 4 },
    { name: "口腔医学", baseScore: 7 },
    { name: "卫生监督", baseScore: -2 },
    { name: "法医学", baseScore: -1 },
    { name: "中西医临床医学", baseScore: 4 },
    { name: "中医骨伤科学", baseScore: 2 },
    { name: "中医儿科学", baseScore: 1 },
    { name: "中医养生学", baseScore: -1 },
    { name: "中医康复学", baseScore: -2 },
    { name: "药理学", baseScore: 0 },
    { name: "生物科学", baseScore: 1 },
    { name: "生物技术", baseScore: 0 },
    { name: "农学", baseScore: -10 },
    { name: "园艺", baseScore: -9 },
    { name: "植物保护", baseScore: -11 },
    { name: "种子科学与工程", baseScore: -12 },
    { name: "动物科学", baseScore: -13 },
    { name: "动物医学", baseScore: -3 },
    { name: "林学", baseScore: -12 },
    { name: "园林", baseScore: -5 },
    { name: "农业资源与环境", baseScore: -14 },
    { name: "食品科学与工程", baseScore: -2 },
    { name: "食品质量与安全", baseScore: -3 },
    { name: "生物工程", baseScore: 1 },
    { name: "机械设计制造及其自动化", baseScore: 2 },
    { name: "车辆工程", baseScore: 1 },
    { name: "电气工程及其自动化", baseScore: 4 },
    { name: "计算机科学与技术", baseScore: 6 },
    { name: "网络工程", baseScore: 5 },
    { name: "数据科学与大数据技术", baseScore: 7 },
    { name: "建筑学", baseScore: 3 },
    { name: "土木工程", baseScore: 0 },
    { name: "风景园林", baseScore: -2 },
    { name: "工程造价", baseScore: 1 },
    { name: "电子信息工程", baseScore: 3 },
    { name: "通信工程", baseScore: 2 },
    { name: "软件工程", baseScore: 5 },
    { name: "物联网工程", baseScore: 3 },
    { name: "材料科学与工程", baseScore: -1 },
    { name: "化学工程与工艺", baseScore: -3 },
    { name: "环境工程", baseScore: -4 },
    { name: "制药工程", baseScore: 2 },
    { name: "给排水科学与工程", baseScore: -5 },
    { name: "建筑环境与能源应用工程", baseScore: -4 },
    { name: "测绘工程", baseScore: -6 },
    { name: "地理信息科学", baseScore: 1 },
    { name: "环境科学", baseScore: -2 },
    { name: "生态学", baseScore: -8 },
    { name: "农村区域发展", baseScore: -18 },
    { name: "烹饪与营养教育", baseScore: -7 },
    { name: "材料成型及控制工程", baseScore: -3 },
    { name: "纺织工程", baseScore: -10 },
    { name: "轻化工程", baseScore: -9 },
    { name: "服装设计与工程", baseScore: -7 },
    { name: "资源循环科学与工程", baseScore: -8 },
    { name: "水利水电工程", baseScore: -2 },
    { name: "资源环境与城乡规划管理", baseScore: -5 },
    { name: "轻工纺织食品类", baseScore: -9 },
    { name: "采矿工程", baseScore: -8 },
    { name: "安全工程", baseScore: -4 },
    { name: "城乡规划", baseScore: 2 },
    { name: "建筑电气与智能化", baseScore: -3 },
    { name: "应用物理学", baseScore: -1 },
    { name: "应用化学", baseScore: -2 },
    { name: "数学与应用数学", baseScore: 2 },
    { name: "信息与计算科学", baseScore: 1 },
    { name: "应用统计学", baseScore: 2 },
    { name: "物理学", baseScore: 0 },
    { name: "化学", baseScore: 0 },
    { name: "电子信息科学与技术", baseScore: 2 },
    { name: "信息安全", baseScore: 5 },
    { name: "智能科学与技术", baseScore: 4 },
    { name: "机器人工程", baseScore: 3 },
    { name: "新能源科学与工程", baseScore: 2 },
    { name: "材料物理", baseScore: -3 },
    { name: "材料化学", baseScore: -4 },
    { name: "人文地理与城乡规划", baseScore: -3 },
    { name: "地理信息科学", baseScore: 1 },
    { name: "大气科学", baseScore: -2 },
    { name: "应用气象学", baseScore: -3 },
    { name: "海洋科学", baseScore: -5 },
    { name: "海洋技术", baseScore: -6 },
    { name: "军事海洋学", baseScore: -8 },
    { name: "地球物理学", baseScore: -5 },
    { name: "空间科学与技术", baseScore: -4 },
    { name: "地质学", baseScore: -9 },
    { name: "地球化学", baseScore: -10 },
    { name: "地理科学", baseScore: -5 },
    { name: "自然地理与资源环境", baseScore: -7 },
    { name: "生物信息学", baseScore: 2 },
    { name: "生态学", baseScore: -8 },
    { name: "心理学", baseScore: 1 },
    { name: "统计学", baseScore: 4 },
    { name: "应用统计学", baseScore: 2 },
    { name: "新闻学", baseScore: 2 },
    { name: "广播电视学", baseScore: 0 },
    { name: "广告学", baseScore: -1 },
    { name: "传播学", baseScore: 1 },
    { name: "编辑出版学", baseScore: -4 },
    { name: "网络与新媒体", baseScore: 4 },
    { name: "数字出版", baseScore: 2 },
    { name: "时尚传播", baseScore: -2 },
    { name: "国际新闻与传播", baseScore: 1 },
    { name: "会展", baseScore: -9 },
    { name: "资产管理与评估", baseScore: 1 },
    { name: "劳动关系", baseScore: -5 },
    { name: "体育经济与管理", baseScore: -6 },
    { name: "市场营销教育", baseScore: -8 },
    { name: "财务会计教育", baseScore: -6 },
    { name: "汽车服务工程", baseScore: -2 },
    { name: "交通运输", baseScore: -3 },
    { name: "交通工程", baseScore: -2 },
    { name: "航海技术", baseScore: -7 },
    { name: "轮机工程", baseScore: -8 },
    { name: "飞行技术", baseScore: -3 },
    { name: "交通设备与控制工程", baseScore: -4 },
    { name: "救助与打捞工程", baseScore: -9 },
    { name: "船舶电子电气工程", baseScore: -6 },
    { name: "海洋资源与环境", baseScore: -7 },
    { name: "军事交通学院", baseScore: -5 },
    { name: "管理科学", baseScore: 1 },
    { name: "信息管理与信息系统", baseScore: 2 },
    { name: "工程管理", baseScore: 1 },
    { name: "房地产开发与管理", baseScore: -7 },
    { name: "工程造价", baseScore: 0 },
    { name: "保密管理", baseScore: -3 },
    { name: "邮政管理", baseScore: -5 },
    { name: "工商管理", baseScore: 1 },
    { name: "市场营销", baseScore: -5 },
    { name: "会计学", baseScore: 8 },
    { name: "财务管理", baseScore: 6 },
    { name: "国际商务", baseScore: 2 },
    { name: "人力资源管理", baseScore: -1 },
    { name: "审计学", baseScore: 7 },
    { name: "资产评估", baseScore: 1 },
    { name: "物业管理", baseScore: -13 },
    { name: "文化产业管理", baseScore: -3 },
    { name: "劳动关系", baseScore: -5 },
    { name: "体育经济与管理", baseScore: -6 },
    { name: "财务会计教育", baseScore: -6 },
    { name: "市场营销教育", baseScore: -8 },
    { name: "行政管理", baseScore: -2 },
    { name: "公共事业管理", baseScore: -9 },
    { name: "劳动与社会保障", baseScore: -8 },
    { name: "土地资源管理", baseScore: -6 },
    { name: "城市管理", baseScore: -8 },
    { name: "海关管理", baseScore: 3 },
    { name: "交通管理", baseScore: -3 },
    { name: "海事管理", baseScore: -4 },
    { name: "公共关系学", baseScore: -5 },
    { name: "健康服务与管理", baseScore: -5 },
    { name: "海警后勤管理", baseScore: -7 },
    { name: "医疗保险实务", baseScore: -6 },
    { name: "政府采购管理", baseScore: -4 },
    { name: "旅游管理", baseScore: -10 },
    { name: "酒店管理", baseScore: -15 },
    { name: "会展经济与管理", baseScore: -9 },
    { name: "旅游管理与服务教育", baseScore: -12 },
    { name: "音乐学", baseScore: -10 },
    { name: "音乐表演", baseScore: -9 },
    { name: "作曲与作曲技术理论", baseScore: -8 },
    { name: "舞蹈学", baseScore: -11 },
    { name: "舞蹈编导", baseScore: -10 },
    { name: "舞蹈表演", baseScore: -9 },
    { name: "表演", baseScore: -8 },
    { name: "戏剧学", baseScore: -10 },
    { name: "电影学", baseScore: -7 },
    { name: "戏剧影视文学", baseScore: -7 },
    { name: "广播电视编导", baseScore: -6 },
    { name: "戏剧影视导演", baseScore: -5 },
    { name: "戏剧影视美术设计", baseScore: -7 },
    { name: "录音艺术", baseScore: -6 },
    { name: "播音与主持艺术", baseScore: -5 },
    { name: "动画", baseScore: -4 },
    { name: "影视摄影与制作", baseScore: -5 },
    { name: "美术学", baseScore: -9 },
    { name: "绘画", baseScore: -8 },
    { name: "雕塑", baseScore: -9 },
    { name: "摄影", baseScore: -7 },
    { name: "书法学", baseScore: -7 },
    { name: "中国画", baseScore: -8 },
    { name: "艺术设计学", baseScore: -6 },
    { name: "视觉传达设计", baseScore: -8 },
    { name: "环境设计", baseScore: -7 },
    { name: "产品设计", baseScore: -6 },
    { name: "服装与服饰设计", baseScore: -9 },
    { name: "公共艺术", baseScore: -9 },
    { name: "工艺美术", baseScore: -10 },
    { name: "数字媒体艺术", baseScore: -2 },
    { name: "艺术与科技", baseScore: -4 },
    { name: "陶瓷艺术设计", baseScore: -8 },
    { name: "新媒体艺术", baseScore: -1 },
    { name: "包装设计", baseScore: -7 },
    { name: "珠宝首饰设计与工艺", baseScore: -6 },
    { name: "会计学(ACCA)", baseScore: 10 },
    { name: "金融学(CFA)", baseScore: 9 },
    { name: "计算机科学与技术(创新实验班)", baseScore: 9 },
    { name: "临床医学(5+3一体化)", baseScore: 10 },
    { name: "口腔医学(5+3一体化)", baseScore: 11 },
    { name: "中医学(5+3一体化)", baseScore: 8 },
    { name: "英语(师范)", baseScore: 4 },
    { name: "汉语言文学(师范)", baseScore: 2 },
    { name: "数学与应用数学(师范)", baseScore: 3 },
    { name: "物理学(师范)", baseScore: 1 },
    { name: "化学(师范)", baseScore: 1 },
    { name: "生物科学(师范)", baseScore: 0 },
    { name: "思想政治教育(师范)", baseScore: -4 },
    { name: "历史学(师范)", baseScore: -2 },
    { name: "地理科学(师范)", baseScore: -3 },
    { name: "学前教育(师范)", baseScore: -6 },
    { name: "小学教育(师范)", baseScore: -3 },
    { name: "特殊教育(师范)", baseScore: -8 },
    { name: "体育教育(师范)", baseScore: -10 },
    { name: "教育技术学(师范)", baseScore: -5 },
    { name: "音乐学(师范)", baseScore: -8 },
    { name: "美术学(师范)", baseScore: -7 }
];

const schoolMajorsConfig = {
    "合肥工业大学": { count: 15, base: ["金融学", "国际经济与贸易", "法学", "英语", "商务英语", "广告学", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "电子商务", "信息管理与信息系统", "工程管理", "经济学"] },
    "安徽大学": { count: 20, base: ["汉语言文学", "汉语国际教育", "英语", "新闻学", "广播电视学", "广告学", "网络与新媒体", "编辑出版学", "法学", "知识产权", "政治学与行政学", "历史学", "哲学", "经济学", "金融学", "财政学", "税收学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "档案学", "信息管理与信息系统", "电子商务", "旅游管理", "社会学", "社会工作", "思想政治教育", "世界史", "考古学", "文物与博物馆学", "统计学", "应用统计学", "数学与应用数学", "应用心理学"] },
    "合肥工业大学(宣城校区)": { count: 15, base: ["经济学", "国际经济与贸易", "法学", "英语", "商务英语", "广告学", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "电子商务", "信息管理与信息系统", "工程管理", "物流管理"] },
    "安徽师范大学": { count: 20, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "日语", "新闻学", "广告学", "网络与新媒体", "历史学(师范)", "世界史", "文物与博物馆学", "法学", "社会学", "社会工作", "思想政治教育(师范)", "教育学", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "音乐学(师范)", "美术学(师范)", "视觉传达设计", "环境设计", "广播电视编导", "播音与主持艺术", "动画", "经济学", "金融学", "国际经济与贸易", "投资学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "旅游管理", "酒店管理", "文化产业管理", "地理科学(师范)", "统计学"] },
    "安徽农业大学": { count: 15, base: ["汉语言文学", "英语", "商务英语", "法学", "社会学", "社会工作", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "信息管理与信息系统", "电子商务", "物流管理", "旅游管理", "农林经济管理", "农村区域发展", "应用心理学", "茶学", "农学", "园艺", "植物保护", "动物医学", "林学", "园林"] },
    "安徽财经大学": { count: 20, base: ["经济学", "经济统计学", "财政学", "税收学", "金融学", "金融工程", "保险学", "投资学", "国际经济与贸易", "贸易经济", "法学", "汉语言文学", "英语", "商务英语", "日语", "新闻学", "广告学", "网络与新媒体", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "审计学", "资产评估", "行政管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "信息管理与信息系统", "工程管理", "工程造价", "电子商务", "物流管理", "旅游管理", "酒店管理", "会展经济与管理", "文化产业管理", "统计学", "应用统计学", "数学与应用数学"] },
    "安徽医科大学": { count: 15, base: ["法学", "英语", "应用心理学", "公共事业管理", "劳动与社会保障", "护理学", "药学", "中药学", "医学检验技术", "医学影像技术", "康复治疗学", "卫生检验与检疫", "食品卫生与营养学", "预防医学", "临床医学", "麻醉学", "医学影像学", "儿科学", "精神医学", "口腔医学"] },
    "安徽建筑大学": { count: 15, base: ["法学", "英语", "翻译", "广告学", "网络与新媒体", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "城市管理", "信息管理与信息系统", "工程管理", "工程造价", "房地产开发与管理", "电子商务", "物流管理", "旅游管理", "资产评估", "视觉传达设计", "环境设计", "数字媒体艺术", "动画", "建筑学", "城乡规划", "风景园林", "土木工程"] },
    "安徽理工大学": { count: 15, base: ["汉语言文学", "英语", "日语", "法学", "社会学", "社会工作", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "信息管理与信息系统", "工程管理", "电子商务", "物流管理", "动画", "视觉传达设计", "环境设计", "应用化学", "采矿工程", "安全工程", "土木工程", "机械设计制造及其自动化", "电气工程及其自动化", "计算机科学与技术"] },
    "安庆师范大学": { count: 15, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "日语", "新闻学", "广播电视学", "网络与新媒体", "编辑出版学", "历史学(师范)", "世界史", "文物与博物馆学", "法学", "社会工作", "思想政治教育(师范)", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "音乐学(师范)", "美术学(师范)", "视觉传达设计", "环境设计", "动画", "广播电视编导", "播音与主持艺术", "戏剧影视文学", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理", "地理科学(师范)", "数学与应用数学(师范)"] },
    "合肥大学": { count: 18, base: ["汉语言文学", "汉语国际教育", "秘书学", "英语", "德语", "日语", "朝鲜语", "新闻学", "广播电视学", "广告学", "网络与新媒体", "法学", "思想政治教育", "经济学", "金融学", "国际经济与贸易", "经济统计学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "土地资源管理", "信息管理与信息系统", "工程管理", "电子商务", "物流管理", "旅游管理", "酒店管理", "会展经济与管理", "应用心理学", "学前教育", "小学教育", "视觉传达设计", "环境设计", "产品设计", "数字媒体艺术", "动画", "广播电视编导", "播音与主持艺术"] },
    "安徽工程大学": { count: 15, base: ["汉语言文学", "英语", "商务英语", "法学", "广告学", "网络与新媒体", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "信息管理与信息系统", "工程管理", "电子商务", "物流管理", "工业工程", "质量管理工程", "视觉传达设计", "环境设计", "产品设计", "服装与服饰设计", "数字媒体艺术", "动画", "工艺美术", "机械设计制造及其自动化", "电气工程及其自动化", "计算机科学与技术", "纺织工程", "服装设计与工程"] },
    "淮北师范大学": { count: 18, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "日语", "翻译", "新闻学", "广告学", "网络与新媒体", "编辑出版学", "历史学(师范)", "世界史", "文物与博物馆学", "法学", "社会学", "社会工作", "思想政治教育(师范)", "教育学", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "音乐学(师范)", "美术学(师范)", "视觉传达设计", "环境设计", "动画", "广播电视编导", "经济学", "金融学", "国际经济与贸易", "经济统计学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理"] },
    "蚌埠医科大学": { count: 15, base: ["法学", "英语", "应用心理学", "公共事业管理", "劳动与社会保障", "护理学", "药学", "药物分析", "药物制剂", "中药学", "医学检验技术", "医学影像技术", "康复治疗学", "卫生检验与检疫", "食品卫生与营养学", "生物医学工程", "临床医学", "麻醉学", "医学影像学", "儿科学", "精神医学", "口腔医学", "预防医学"] },
    "皖南医学院": { count: 12, base: ["法学", "英语", "应用心理学", "公共事业管理", "劳动与社会保障", "护理学", "药学", "药物制剂", "中药学", "医学检验技术", "医学影像技术", "康复治疗学", "卫生检验与检疫", "食品卫生与营养学", "生物科学", "生物技术", "临床医学", "麻醉学", "医学影像学", "口腔医学", "法医学"] },
    "阜阳师范大学": { count: 15, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "日语", "新闻学", "广播电视学", "网络与新媒体", "历史学(师范)", "文物与博物馆学", "法学", "社会工作", "思想政治教育(师范)", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "音乐学(师范)", "音乐表演", "美术学(师范)", "绘画", "视觉传达设计", "环境设计", "动画", "广播电视编导", "播音与主持艺术", "戏剧影视文学", "表演", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理"] },
    "安徽中医药大学": { count: 15, base: ["汉语言文学", "英语", "应用心理学", "公共事业管理", "劳动与社会保障", "中医学", "针灸推拿学", "中西医临床医学", "中医骨伤科学", "中医儿科学", "中药学", "中药资源与开发", "中药制药", "药学", "药物制剂", "药物分析", "临床药学", "护理学", "康复治疗学", "医学检验技术", "医学影像技术", "食品卫生与营养学", "信息管理与信息系统", "市场营销", "人力资源管理", "经济学", "国际经济与贸易", "法学"] },
    "安徽科技学院": { count: 12, base: ["汉语言文学", "英语", "法学", "社会工作", "经济学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "物流管理", "旅游管理", "信息管理与信息系统", "电子商务", "生物科学", "生物技术", "环境科学", "应用化学", "农学", "园艺", "植物保护", "动物科学", "动物医学", "园林", "食品科学与工程", "食品质量与安全"] },
    "合肥师范学院": { count: 15, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "翻译", "新闻学", "广播电视学", "网络与新媒体", "历史学(师范)", "法学", "社会工作", "思想政治教育(师范)", "教育学", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "运动训练", "社会体育指导与管理", "音乐学(师范)", "音乐表演", "美术学(师范)", "视觉传达设计", "环境设计", "动画", "广播电视编导", "播音与主持艺术", "经济学", "国际经济与贸易", "经济统计学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理"] },
    "淮南师范学院": { count: 15, base: ["汉语言文学(师范)", "汉语国际教育", "秘书学", "英语(师范)", "商务英语", "新闻学", "广告学", "网络与新媒体", "历史学(师范)", "法学", "社会工作", "思想政治教育(师范)", "教育学", "学前教育(师范)", "小学教育(师范)", "特殊教育(师范)", "教育技术学(师范)", "应用心理学", "体育教育(师范)", "运动训练", "社会体育指导与管理", "音乐学(师范)", "音乐表演", "美术学(师范)", "绘画", "视觉传达设计", "环境设计", "产品设计", "动画", "广播电视编导", "播音与主持艺术", "经济学", "金融学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理"] },
    "皖西学院": { count: 12, base: ["汉语言文学", "英语", "法学", "思想政治教育", "新闻学", "广告学", "网络与新媒体", "历史学", "教育学", "学前教育", "小学教育", "体育教育", "音乐学", "美术学", "视觉传达设计", "环境设计", "经济学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理", "数学与应用数学", "信息与计算科学", "物理学", "化学", "生物科学", "生物技术", "应用心理学", "地理科学"] },
    "巢湖学院": { count: 12, base: ["汉语言文学", "英语", "商务英语", "日语", "法学", "思想政治教育", "新闻学", "广播电视学", "广告学", "网络与新媒体", "历史学", "教育学", "学前教育", "小学教育", "体育教育", "音乐学", "音乐表演", "美术学", "视觉传达设计", "环境设计", "动画", "广播电视编导", "播音与主持艺术", "经济学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "会展经济与管理", "文化产业管理"] },
    "滁州学院": { count: 12, base: ["汉语言文学", "英语", "商务英语", "法学", "思想政治教育", "新闻学", "广告学", "网络与新媒体", "历史学", "教育学", "学前教育", "小学教育", "体育教育", "音乐学", "美术学", "视觉传达设计", "环境设计", "产品设计", "数字媒体艺术", "动画", "广播电视编导", "经济学", "国际经济与贸易", "金融学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理", "数学与应用数学", "信息与计算科学", "应用统计学", "地理科学", "地理信息科学", "应用心理学"] },
    "铜陵学院": { count: 12, base: ["汉语言文学", "英语", "商务英语", "法学", "社会工作", "广告学", "网络与新媒体", "经济学", "经济统计学", "财政学", "税收学", "金融学", "金融工程", "保险学", "投资学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "审计学", "资产评估", "公共事业管理", "劳动与社会保障", "土地资源管理", "信息管理与信息系统", "工程管理", "房地产开发与管理", "工程造价", "电子商务", "物流管理", "旅游管理", "酒店管理"] },
    "蚌埠学院": { count: 12, base: ["汉语言文学", "英语", "商务英语", "法学", "思想政治教育", "广告学", "网络与新媒体", "经济学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "电子商务", "学前教育", "小学教育", "应用心理学", "音乐学", "美术学", "视觉传达设计", "环境设计", "数字媒体艺术", "动画", "广播电视编导", "播音与主持艺术"] },
    "宿州学院": { count: 12, base: ["汉语言文学", "汉语国际教育", "英语", "商务英语", "法学", "社会工作", "思想政治教育", "新闻学", "广告学", "网络与新媒体", "历史学", "教育学", "学前教育", "小学教育", "特殊教育", "体育教育", "音乐学", "美术学", "视觉传达设计", "环境设计", "服装与服饰设计", "动画", "广播电视编导", "经济学", "国际经济与贸易", "会计学", "财务管理", "市场营销", "工商管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "文化产业管理", "电子商务", "数学与应用数学", "应用化学", "应用心理学", "地理科学"] },
    "黄山学院": { count: 15, base: ["汉语言文学", "汉语国际教育", "英语", "日语", "法学", "社会工作", "思想政治教育", "新闻学", "广告学", "网络与新媒体", "编辑出版学", "历史学", "文物与博物馆学", "文化产业管理", "教育学", "学前教育", "小学教育", "体育教育", "社会体育指导与管理", "音乐学", "音乐表演", "美术学", "工艺美术", "视觉传达设计", "环境设计", "产品设计", "服装与服饰设计", "数字媒体艺术", "动画", "广播电视编导", "播音与主持艺术", "戏剧影视文学", "经济学", "国际经济与贸易", "经济统计学", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "会展经济与管理", "电子商务", "信息管理与信息系统", "工程管理", "工程造价", "应用心理学", "地理科学", "地理信息科学", "环境科学", "茶学", "园林", "风景园林", "烹饪与营养教育"] },
    "池州学院": { count: 12, base: ["汉语言文学", "汉语国际教育", "秘书学", "英语", "商务英语", "法学", "社会工作", "思想政治教育", "新闻学", "广播电视学", "广告学", "网络与新媒体", "历史学", "文物与博物馆学", "文化产业管理", "教育学", "学前教育", "小学教育", "体育教育", "音乐学", "美术学", "视觉传达设计", "环境设计", "动画", "广播电视编导", "经济学", "国际经济与贸易", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "电子商务", "数学与应用数学", "信息与计算科学", "统计学", "应用化学", "应用心理学", "地理科学", "地理信息科学", "环境科学与工程", "生态学", "园林", "土地资源管理", "房地产开发与管理", "中药学", "中药资源与开发"] },
    "亳州学院": { count: 12, base: ["汉语言文学", "汉语国际教育", "英语", "商务英语", "法学", "社会工作", "思想政治教育", "网络与新媒体", "教育学", "学前教育", "小学教育", "特殊教育", "体育教育", "音乐学", "美术学", "视觉传达设计", "环境设计", "经济学", "经济统计学", "金融工程", "工商管理", "市场营销", "会计学", "财务管理", "人力资源管理", "行政管理", "公共事业管理", "劳动与社会保障", "物流管理", "旅游管理", "酒店管理", "电子商务", "文化产业管理", "数学与应用数学", "信息与计算科学", "应用统计学", "应用心理学", "电子信息工程", "计算机科学与技术", "软件工程", "数据科学与大数据技术", "生物工程", "食品科学与工程", "食品质量与安全", "药学", "中药学", "中药资源与开发", "制药工程", "药物制剂", "护理学", "康复治疗学", "医学检验技术"] }
};

function generateMajorScores(schoolName, schoolScore, schoolRank) {
    const config = schoolMajorsConfig[schoolName] || { count: 10, base: [] };
    const count = config.count;
    const baseMajors = config.base;
    
    let majors = [];
    if (baseMajors.length > 0) {
        majors = baseMajors.slice(0, Math.min(count, baseMajors.length));
    } else {
        const liberalArtsMajors = majorPool.filter(m => 
            ["汉语言文学", "法学", "英语", "新闻学", "会计学", "财务管理", "行政管理", "工商管理", "市场营销", "人力资源管理", "经济学", "金融学", "国际经济与贸易", "教育学", "学前教育", "小学教育", "历史学", "哲学", "社会学", "社会工作", "思想政治教育", "广告学", "网络与新媒体", "汉语国际教育", "翻译", "商务英语", "旅游管理", "酒店管理", "电子商务", "物流管理", "劳动与社会保障", "土地资源管理", "公共事业管理", "档案学", "应用心理学", "护理学", "中医学", "针灸推拿学", "中药学", "药学", "视觉传达设计", "环境设计", "数字媒体艺术", "广播电视编导", "播音与主持艺术", "动画", "音乐学", "美术学", "体育教育"].includes(m.name)
        );
        majors = liberalArtsMajors.slice(0, count).map(m => m.name);
    }
    
    return majors.map((majorName, index) => {
        const major = majorPool.find(m => m.name === majorName) || { baseScore: 0 };
        const baseDiff = major.baseScore + (index % 3 - 1) * 2;
        const score2025 = Math.round(schoolScore + baseDiff);
        const rankDiff = baseDiff * 50;
        const rank2025 = Math.max(1, Math.round(schoolRank - rankDiff));
        
        return {
            majorName,
            score2025,
            rank2025,
            plan2025: 10 + (index % 5) * 8,
            score2024: Math.round(score2025 - 7 - (index % 3)),
            rank2024: Math.round(rank2025 * 1.04 + (index % 5) * 50),
            score2023: Math.round(score2025 - 12 - (index % 4)),
            rank2023: Math.round(rank2025 * 1.08 + (index % 5) * 100)
        };
    });
}

const inputPath = '/workspace/gaokao-zy/data/schools-anhui.js';
let content = fs.readFileSync(inputPath, 'utf8');

const lines = content.split('\n');
let currentSchool = null;
let currentScore = null;
let currentRank = null;
let inScoreHistory = false;
let braceCount = 0;
let result = [];
let schoolCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    result.push(line);
    
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    if (nameMatch && line.includes('name:') && line.includes('"') && !line.includes('majorName')) {
        currentSchool = nameMatch[1];
    }
    
    const scoreMatch = line.match(/score:\s*(\d+)/);
    if (scoreMatch && !inScoreHistory && line.includes('score:') && !line.includes('scoreHistory') && !line.includes('score202') && !line.includes('score:' + ':') && !line.includes('plan')) {
        currentScore = parseInt(scoreMatch[1]);
    }
    
    const rankMatch = line.match(/rank:\s*(\d+)/);
    if (rankMatch && !inScoreHistory && line.includes('rank:') && !line.includes('rank202') && !line.includes('rank:' + ':')) {
        currentRank = parseInt(rankMatch[1]);
    }
    
    if (line.includes('scoreHistory:')) {
        inScoreHistory = true;
    }
    
    if (inScoreHistory) {
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '{') braceCount++;
            if (line[j] === '}') braceCount--;
        }
        
        if (braceCount <= 0 && inScoreHistory && line.includes('}')) {
            inScoreHistory = false;
            braceCount = 0;
            
            if (currentSchool && currentScore && currentRank) {
                const majorScores = generateMajorScores(currentSchool, currentScore, currentRank);
                const majorScoresStr = JSON.stringify(majorScores, null, 8)
                    .replace(/"([^"]+)":/g, '$1:')
                    .split('\n')
                    .map(l => '        ' + l)
                    .join('\n');
                
                result.push(',');
                result.push('        majorScores: ' + majorScoresStr.trimStart());
                schoolCount++;
                console.log(`Added ${majorScores.length} majors to ${currentSchool} (score: ${currentScore}, rank: ${currentRank})`);
            }
            
            currentSchool = null;
            currentScore = null;
            currentRank = null;
        }
    }
}

fs.writeFileSync(inputPath, result.join('\n'));
console.log(`\nDone! Updated ${schoolCount} schools with major scores`);
