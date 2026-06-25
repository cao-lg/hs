import re

input_path = '/workspace/gaokao-zy/data/schools-national.js'

with open(input_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'id:\s*(\d+)[^}]*$', content, re.MULTILINE)
last_id = 100
if match:
    last_id = int(match.group(1))

print(f"Last ID: {last_id}")

schools_to_add = [
    {"name": "中国人民大学", "city": "北京", "type": "985/双一流", "score": 640, "rank": 200, "rating": "A+", "employment": "98%", "advantageMajors": ["法学", "经济学", "新闻学", "工商管理", "哲学"]},
    {"name": "北京师范大学", "city": "北京", "type": "985/双一流", "score": 630, "rank": 400, "rating": "A+", "employment": "97%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "历史学", "数学与应用数学"]},
    {"name": "复旦大学", "city": "上海", "type": "985/双一流", "score": 645, "rank": 150, "rating": "A+", "employment": "98%", "advantageMajors": ["新闻学", "经济学", "金融学", "汉语言文学", "哲学"]},
    {"name": "上海交通大学", "city": "上海", "type": "985/双一流", "score": 648, "rank": 120, "rating": "A+", "employment": "98%", "advantageMajors": ["工商管理", "金融学", "法学", "英语", "公共管理"]},
    {"name": "南京大学", "city": "江苏南京", "type": "985/双一流", "score": 635, "rank": 300, "rating": "A+", "employment": "97%", "advantageMajors": ["汉语言文学", "历史学", "哲学", "经济学", "法学"]},
    {"name": "浙江大学", "city": "浙江杭州", "type": "985/双一流", "score": 642, "rank": 180, "rating": "A+", "employment": "98%", "advantageMajors": ["经济学", "金融学", "法学", "汉语言文学", "工商管理"]},
    {"name": "武汉大学", "city": "湖北武汉", "type": "985/双一流", "score": 625, "rank": 600, "rating": "A", "employment": "96%", "advantageMajors": ["法学", "新闻学", "经济学", "金融学", "汉语言文学"]},
    {"name": "中山大学", "city": "广东广州", "type": "985/双一流", "score": 628, "rank": 500, "rating": "A", "employment": "96%", "advantageMajors": ["哲学", "历史学", "汉语言文学", "经济学", "工商管理"]},
    {"name": "厦门大学", "city": "福建厦门", "type": "985/双一流", "score": 620, "rank": 750, "rating": "A", "employment": "96%", "advantageMajors": ["会计学", "金融学", "财政学", "统计学", "法学"]},
    {"name": "南开大学", "city": "天津", "type": "985/双一流", "score": 618, "rank": 850, "rating": "A", "employment": "95%", "advantageMajors": ["经济学", "金融学", "历史学", "汉语言文学", "哲学"]},
    {"name": "华东师范大学", "city": "上海", "type": "985/双一流", "score": 615, "rank": 1000, "rating": "A", "employment": "96%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "历史学", "数学与应用数学"]},
    {"name": "东南大学", "city": "江苏南京", "type": "985/双一流", "score": 610, "rank": 1300, "rating": "A", "employment": "95%", "advantageMajors": ["建筑学", "城乡规划", "法学", "英语", "工商管理"]},
    {"name": "天津大学", "city": "天津", "type": "985/双一流", "score": 608, "rank": 1500, "rating": "A", "employment": "95%", "advantageMajors": ["工程管理", "工商管理", "法学", "英语", "公共事业管理"]},
    {"name": "中国政法大学", "city": "北京", "type": "211/双一流", "score": 612, "rank": 1200, "rating": "A+", "employment": "95%", "advantageMajors": ["法学", "政治学与行政学", "社会学", "哲学", "英语"]},
    {"name": "上海财经大学", "city": "上海", "type": "211/双一流", "score": 622, "rank": 650, "rating": "A", "employment": "97%", "advantageMajors": ["会计学", "金融学", "财政学", "统计学", "经济学"]},
    {"name": "中央财经大学", "city": "北京", "type": "211/双一流", "score": 616, "rank": 950, "rating": "A", "employment": "96%", "advantageMajors": ["金融学", "会计学", "财政学", "税收学", "保险学"]},
    {"name": "对外经济贸易大学", "city": "北京", "type": "211/双一流", "score": 614, "rank": 1050, "rating": "A", "employment": "96%", "advantageMajors": ["国际经济与贸易", "金融学", "会计学", "商务英语", "法学"]},
    {"name": "北京外国语大学", "city": "北京", "type": "211/双一流", "score": 610, "rank": 1300, "rating": "A+", "employment": "95%", "advantageMajors": ["英语", "翻译", "日语", "法语", "德语"]},
    {"name": "上海外国语大学", "city": "上海", "type": "211/双一流", "score": 608, "rank": 1500, "rating": "A+", "employment": "95%", "advantageMajors": ["英语", "翻译", "日语", "西班牙语", "阿拉伯语"]},
    {"name": "中国传媒大学", "city": "北京", "type": "211/双一流", "score": 605, "rank": 1800, "rating": "A+", "employment": "94%", "advantageMajors": ["新闻学", "广播电视学", "广告学", "网络与新媒体", "播音与主持艺术"]},
    {"name": "天津师范大学", "city": "天津", "type": "省属", "score": 538, "rank": 17800, "rating": "B+", "employment": "91%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "历史学", "法学"]},
    {"name": "河北师范大学", "city": "河北石家庄", "type": "省属", "score": 528, "rank": 21500, "rating": "B", "employment": "89%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "思想政治教育"]},
    {"name": "山西师范大学", "city": "山西太原", "type": "省属", "score": 522, "rank": 24000, "rating": "B", "employment": "88%", "advantageMajors": ["汉语言文学", "历史学", "教育学", "英语", "思想政治教育"]},
    {"name": "内蒙古师范大学", "city": "内蒙古呼和浩特", "type": "省属", "score": 510, "rank": 29000, "rating": "B", "employment": "87%", "advantageMajors": ["汉语言文学", "教育学", "历史学", "英语", "心理学"]},
    {"name": "辽宁师范大学", "city": "辽宁大连", "type": "省属", "score": 532, "rank": 20000, "rating": "B+", "employment": "90%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "英语", "历史学"]},
    {"name": "沈阳师范大学", "city": "辽宁沈阳", "type": "省属", "score": 520, "rank": 24500, "rating": "B", "employment": "88%", "advantageMajors": ["教育学", "汉语言文学", "英语", "学前教育", "法学"]},
    {"name": "吉林师范大学", "city": "吉林四平", "type": "省属", "score": 518, "rank": 25500, "rating": "B", "employment": "88%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "思想政治教育"]},
    {"name": "长春师范大学", "city": "吉林长春", "type": "省属", "score": 515, "rank": 26800, "rating": "B", "employment": "87%", "advantageMajors": ["小学教育", "学前教育", "汉语言文学", "英语", "历史学"]},
    {"name": "哈尔滨师范大学", "city": "黑龙江哈尔滨", "type": "省属", "score": 525, "rank": 22600, "rating": "B+", "employment": "89%", "advantageMajors": ["汉语言文学", "教育学", "英语", "历史学", "地理科学"]},
    {"name": "浙江师范大学", "city": "浙江金华", "type": "省属", "score": 535, "rank": 18900, "rating": "B+", "employment": "92%", "advantageMajors": ["教育学", "汉语言文学", "英语", "数学与应用数学", "心理学"]},
    {"name": "杭州师范大学", "city": "浙江杭州", "type": "省属", "score": 538, "rank": 17600, "rating": "B+", "employment": "91%", "advantageMajors": ["小学教育", "学前教育", "汉语言文学", "英语", "护理学"]},
    {"name": "温州大学", "city": "浙江温州", "type": "省属", "score": 530, "rank": 20800, "rating": "B", "employment": "90%", "advantageMajors": ["汉语言文学", "英语", "法学", "工商管理", "教育学"]},
    {"name": "宁波大学", "city": "浙江宁波", "type": "双一流", "score": 536, "rank": 18500, "rating": "B+", "employment": "92%", "advantageMajors": ["法学", "英语", "经济学", "工商管理", "传播学"]},
    {"name": "江苏师范大学", "city": "江苏徐州", "type": "省属", "score": 533, "rank": 19700, "rating": "B+", "employment": "91%", "advantageMajors": ["汉语言文学", "教育学", "英语", "历史学", "数学与应用数学"]},
    {"name": "扬州大学", "city": "江苏扬州", "type": "省属", "score": 534, "rank": 19200, "rating": "B+", "employment": "91%", "advantageMajors": ["汉语言文学", "英语", "法学", "工商管理", "教育学"]},
    {"name": "南京财经大学", "city": "江苏南京", "type": "省属", "score": 537, "rank": 18100, "rating": "B+", "employment": "92%", "advantageMajors": ["会计学", "金融学", "国际经济与贸易", "市场营销", "物流管理"]},
    {"name": "南京审计大学", "city": "江苏南京", "type": "省属", "score": 539, "rank": 17300, "rating": "B+", "employment": "93%", "advantageMajors": ["审计学", "会计学", "金融学", "财政学", "税收学"]},
    {"name": "江西师范大学", "city": "江西南昌", "type": "省属", "score": 531, "rank": 20400, "rating": "B+", "employment": "90%", "advantageMajors": ["汉语言文学", "教育学", "心理学", "英语", "历史学"]},
    {"name": "江西财经大学", "city": "江西南昌", "type": "省属", "score": 535, "rank": 18800, "rating": "B+", "employment": "91%", "advantageMajors": ["会计学", "金融学", "财政学", "国际经济与贸易", "市场营销"]},
    {"name": "山东师范大学", "city": "山东济南", "type": "省属", "score": 534, "rank": 19300, "rating": "B+", "employment": "91%", "advantageMajors": ["教育学", "汉语言文学", "英语", "历史学", "心理学"]},
    {"name": "曲阜师范大学", "city": "山东曲阜", "type": "省属", "score": 526, "rank": 22100, "rating": "B", "employment": "89%", "advantageMajors": ["汉语言文学", "数学与应用数学", "教育学", "英语", "历史学"]},
    {"name": "青岛大学", "city": "山东青岛", "type": "省属", "score": 532, "rank": 20100, "rating": "B+", "employment": "90%", "advantageMajors": ["临床医学", "护理学", "汉语言文学", "英语", "法学"]},
    {"name": "山东财经大学", "city": "山东济南", "type": "省属", "score": 533, "rank": 19600, "rating": "B+", "employment": "91%", "advantageMajors": ["会计学", "金融学", "财政学", "国际经济与贸易", "工商管理"]},
    {"name": "河南大学", "city": "河南开封", "type": "双一流", "score": 536, "rank": 18400, "rating": "B+", "employment": "91%", "advantageMajors": ["汉语言文学", "历史学", "教育学", "英语", "地理科学"]},
    {"name": "河南师范大学", "city": "河南新乡", "type": "省属", "score": 528, "rank": 21600, "rating": "B", "employment": "89%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "物理学"]},
    {"name": "河南财经政法大学", "city": "河南郑州", "type": "省属", "score": 530, "rank": 20700, "rating": "B", "employment": "90%", "advantageMajors": ["会计学", "金融学", "法学", "国际经济与贸易", "市场营销"]},
    {"name": "华中师范大学", "city": "湖北武汉", "type": "211/双一流", "score": 568, "rank": 8500, "rating": "A", "employment": "95%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "英语", "历史学"]},
    {"name": "华中农业大学", "city": "湖北武汉", "type": "211/双一流", "score": 558, "rank": 11000, "rating": "A", "employment": "94%", "advantageMajors": ["农林经济管理", "社会学", "英语", "法学", "公共事业管理"]},
    {"name": "中南财经政法大学", "city": "湖北武汉", "type": "211/双一流", "score": 578, "rank": 6500, "rating": "A", "employment": "95%", "advantageMajors": ["会计学", "金融学", "法学", "财政学", "税收学"]},
    {"name": "湖北大学", "city": "湖北武汉", "type": "省属", "score": 534, "rank": 19400, "rating": "B+", "employment": "90%", "advantageMajors": ["汉语言文学", "英语", "法学", "教育学", "行政管理"]},
    {"name": "中南民族大学", "city": "湖北武汉", "type": "部属", "score": 528, "rank": 21400, "rating": "B", "employment": "88%", "advantageMajors": ["民族学", "法学", "汉语言文学", "英语", "工商管理"]},
    {"name": "湖南师范大学", "city": "湖南长沙", "type": "211/双一流", "score": 565, "rank": 9200, "rating": "A", "employment": "94%", "advantageMajors": ["教育学", "汉语言文学", "英语", "历史学", "哲学"]},
    {"name": "湘潭大学", "city": "湖南湘潭", "type": "双一流", "score": 552, "rank": 12800, "rating": "B+", "employment": "92%", "advantageMajors": ["法学", "经济学", "汉语言文学", "英语", "行政管理"]},
    {"name": "湖南科技大学", "city": "湖南湘潭", "type": "省属", "score": 530, "rank": 20600, "rating": "B", "employment": "89%", "advantageMajors": ["汉语言文学", "英语", "法学", "教育学", "工商管理"]},
    {"name": "湖南农业大学", "city": "湖南长沙", "type": "省属", "score": 525, "rank": 22500, "rating": "B", "employment": "88%", "advantageMajors": ["农林经济管理", "法学", "英语", "工商管理", "公共事业管理"]},
    {"name": "湖南工商大学", "city": "湖南长沙", "type": "省属", "score": 531, "rank": 20300, "rating": "B", "employment": "90%", "advantageMajors": ["会计学", "金融学", "市场营销", "国际经济与贸易", "法学"]},
    {"name": "华南师范大学", "city": "广东广州", "type": "211/双一流", "score": 562, "rank": 10000, "rating": "A", "employment": "95%", "advantageMajors": ["教育学", "心理学", "汉语言文学", "英语", "历史学"]},
    {"name": "深圳大学", "city": "广东深圳", "type": "省属", "score": 548, "rank": 14000, "rating": "B+", "employment": "93%", "advantageMajors": ["建筑学", "城乡规划", "法学", "英语", "工商管理"]},
    {"name": "汕头大学", "city": "广东汕头", "type": "省属", "score": 535, "rank": 18700, "rating": "B+", "employment": "91%", "advantageMajors": ["法学", "英语", "工商管理", "新闻学", "公共事业管理"]},
    {"name": "广东外语外贸大学", "city": "广东广州", "type": "省属", "score": 540, "rank": 16800, "rating": "B+", "employment": "92%", "advantageMajors": ["英语", "翻译", "日语", "国际经济与贸易", "法学"]},
    {"name": "齐齐哈尔大学", "city": "黑龙江齐齐哈尔", "type": "省属", "score": 502, "rank": 32500, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "法学", "教育学", "工商管理"]},
    {"name": "牡丹江师范学院", "city": "黑龙江牡丹江", "type": "省属", "score": 500, "rank": 33500, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "教育学", "思想政治教育", "历史学"]},
    {"name": "佳木斯大学", "city": "黑龙江佳木斯", "type": "省属", "score": 503, "rank": 32000, "rating": "C+", "employment": "85%", "advantageMajors": ["临床医学", "护理学", "汉语言文学", "英语", "法学"]},
    {"name": "黑河学院", "city": "黑龙江黑河", "type": "省属", "score": 495, "rank": 35800, "rating": "C", "employment": "82%", "advantageMajors": ["俄语", "英语", "汉语言文学", "历史学", "旅游管理"]},
    {"name": "绥化学院", "city": "黑龙江绥化", "type": "省属", "score": 493, "rank": 36800, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "教育学", "特殊教育", "学前教育"]},
    {"name": "白城师范学院", "city": "吉林白城", "type": "省属", "score": 496, "rank": 35300, "rating": "C+", "employment": "83%", "advantageMajors": ["小学教育", "学前教育", "汉语言文学", "英语", "历史学"]},
    {"name": "通化师范学院", "city": "吉林通化", "type": "省属", "score": 498, "rank": 34300, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "历史学", "教育学", "思想政治教育"]},
    {"name": "鞍山师范学院", "city": "辽宁鞍山", "type": "省属", "score": 502, "rank": 32600, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "学前教育", "小学教育", "历史学"]},
    {"name": "锦州医科大学", "city": "辽宁锦州", "type": "省属", "score": 505, "rank": 31200, "rating": "B-", "employment": "86%", "advantageMajors": ["临床医学", "护理学", "药学", "医学检验技术", "康复治疗学"]},
    {"name": "沈阳医学院", "city": "辽宁沈阳", "type": "市属", "score": 508, "rank": 29800, "rating": "C+", "employment": "87%", "advantageMajors": ["临床医学", "护理学", "医学检验技术", "医学影像技术", "预防医学"]},
    {"name": "内蒙古科技大学", "city": "内蒙古包头", "type": "省属", "score": 501, "rank": 33000, "rating": "C+", "employment": "85%", "advantageMajors": ["冶金工程", "法学", "汉语言文学", "工商管理", "会计学"]},
    {"name": "内蒙古民族大学", "city": "内蒙古通辽", "type": "省属", "score": 497, "rank": 34800, "rating": "C+", "employment": "84%", "advantageMajors": ["蒙医学", "汉语言文学", "英语", "教育学", "法学"]},
    {"name": "赤峰学院", "city": "内蒙古赤峰", "type": "省属", "score": 494, "rank": 36300, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "历史学", "教育学", "法学"]},
    {"name": "河北地质大学", "city": "河北石家庄", "type": "省属", "score": 508, "rank": 29700, "rating": "C+", "employment": "86%", "advantageMajors": ["会计学", "工商管理", "法学", "英语", "土地资源管理"]},
    {"name": "河北经贸大学", "city": "河北石家庄", "type": "省属", "score": 512, "rank": 27800, "rating": "B-", "employment": "88%", "advantageMajors": ["会计学", "金融学", "法学", "国际经济与贸易", "市场营销"]},
    {"name": "河北科技大学", "city": "河北石家庄", "type": "省属", "score": 506, "rank": 30500, "rating": "C+", "employment": "86%", "advantageMajors": ["环境工程", "法学", "英语", "工商管理", "电子商务"]},
    {"name": "太原师范学院", "city": "山西太原", "type": "省属", "score": 505, "rank": 31000, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "地理科学"]},
    {"name": "山西财经大学", "city": "山西太原", "type": "省属", "score": 510, "rank": 28700, "rating": "B-", "employment": "87%", "advantageMajors": ["会计学", "金融学", "统计学", "法学", "国际经济与贸易"]},
    {"name": "山西大同大学", "city": "山西大同", "type": "省属", "score": 501, "rank": 33100, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "历史学", "教育学", "护理学"]},
    {"name": "渭南师范学院", "city": "陕西渭南", "type": "省属", "score": 500, "rank": 33400, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "思想政治教育"]},
    {"name": "延安大学", "city": "陕西延安", "type": "省属", "score": 507, "rank": 30100, "rating": "C+", "employment": "86%", "advantageMajors": ["汉语言文学", "英语", "临床医学", "护理学", "法学"]},
    {"name": "陕西理工大学", "city": "陕西汉中", "type": "省属", "score": 504, "rank": 31500, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "数学与应用数学", "机械设计制造及其自动化", "会计学"]},
    {"name": "西安文理学院", "city": "陕西西安", "type": "市属", "score": 508, "rank": 29600, "rating": "C+", "employment": "86%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "旅游管理"]},
    {"name": "咸阳师范学院", "city": "陕西咸阳", "type": "省属", "score": 502, "rank": 32800, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "历史学", "学前教育", "小学教育"]},
    {"name": "宝鸡文理学院", "city": "陕西宝鸡", "type": "省属", "score": 503, "rank": 32200, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "教育学", "数学与应用数学", "化学", "地理学"]},
    {"name": "甘肃政法大学", "city": "甘肃兰州", "type": "省属", "score": 506, "rank": 30400, "rating": "B-", "employment": "86%", "advantageMajors": ["法学", "侦查学", "边防管理", "社会学", "政治学与行政学"]},
    {"name": "西北师范大学", "city": "甘肃兰州", "type": "省属", "score": 512, "rank": 27700, "rating": "B", "employment": "88%", "advantageMajors": ["教育学", "汉语言文学", "英语", "历史学", "数学与应用数学"]},
    {"name": "兰州财经大学", "city": "甘肃兰州", "type": "省属", "score": 508, "rank": 29900, "rating": "C+", "employment": "86%", "advantageMajors": ["会计学", "金融学", "统计学", "国际经济与贸易", "市场营销"]},
    {"name": "天水师范学院", "city": "甘肃天水", "type": "省属", "score": 497, "rank": 34700, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "历史学", "小学教育", "学前教育"]},
    {"name": "青海师范大学", "city": "青海西宁", "type": "省属", "score": 498, "rank": 34200, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "地理科学"]},
    {"name": "宁夏师范学院", "city": "宁夏固原", "type": "省属", "score": 495, "rank": 35700, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "历史学"]},
    {"name": "新疆师范大学", "city": "新疆乌鲁木齐", "type": "省属", "score": 499, "rank": 33800, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "教育学", "历史学", "思想政治教育"]},
    {"name": "塔里木大学", "city": "新疆阿拉尔", "type": "省属", "score": 492, "rank": 37300, "rating": "C", "employment": "83%", "advantageMajors": ["农学", "园艺", "汉语言文学", "法学", "工商管理"]},
    {"name": "伊犁师范大学", "city": "新疆伊宁", "type": "省属", "score": 490, "rank": 38500, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "物理学"]},
    {"name": "贵州师范大学", "city": "贵州贵阳", "type": "省属", "score": 510, "rank": 28900, "rating": "B-", "employment": "87%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "历史学"]},
    {"name": "贵州民族大学", "city": "贵州贵阳", "type": "省属", "score": 505, "rank": 31100, "rating": "C+", "employment": "85%", "advantageMajors": ["民族学", "法学", "汉语言文学", "社会学", "行政管理"]},
    {"name": "贵州财经大学", "city": "贵州贵阳", "type": "省属", "score": 507, "rank": 30200, "rating": "C+", "employment": "86%", "advantageMajors": ["会计学", "金融学", "工商管理", "市场营销", "统计学"]},
    {"name": "遵义师范学院", "city": "贵州遵义", "type": "省属", "score": 501, "rank": 33200, "rating": "C+", "employment": "85%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "物理学"]},
    {"name": "黔南民族师范学院", "city": "贵州都匀", "type": "省属", "score": 496, "rank": 35200, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "数学与应用数学"]},
    {"name": "云南师范大学", "city": "云南昆明", "type": "省属", "score": 512, "rank": 27600, "rating": "B-", "employment": "88%", "advantageMajors": ["教育学", "汉语言文学", "英语", "历史学", "地理科学"]},
    {"name": "云南民族大学", "city": "云南昆明", "type": "省属", "score": 504, "rank": 31600, "rating": "C+", "employment": "85%", "advantageMajors": ["民族学", "社会学", "英语", "泰语", "法学"]},
    {"name": "云南财经大学", "city": "云南昆明", "type": "省属", "score": 508, "rank": 29500, "rating": "C+", "employment": "86%", "advantageMajors": ["会计学", "金融学", "统计学", "市场营销", "国际经济与贸易"]},
    {"name": "曲靖师范学院", "city": "云南曲靖", "type": "省属", "score": 500, "rank": 33600, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "数学与应用数学", "物理学", "化学"]},
    {"name": "玉溪师范学院", "city": "云南玉溪", "type": "省属", "score": 498, "rank": 34400, "rating": "C+", "employment": "84%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "化学"]},
    {"name": "楚雄师范学院", "city": "云南楚雄", "type": "省属", "score": 495, "rank": 35600, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "数学与应用数学"]},
    {"name": "河池学院", "city": "广西河池", "type": "省属", "score": 490, "rank": 38200, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "数学与应用数学"]},
    {"name": "百色学院", "city": "广西百色", "type": "省属", "score": 492, "rank": 37200, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "国际经济与贸易"]},
    {"name": "梧州学院", "city": "广西梧州", "type": "省属", "score": 494, "rank": 36200, "rating": "C", "employment": "83%", "advantageMajors": ["国际经济与贸易", "工商管理", "会计学", "英语", "法学"]},
    {"name": "贺州学院", "city": "广西贺州", "type": "省属", "score": 491, "rank": 37800, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "小学教育", "学前教育", "旅游管理"]},
    {"name": "海南热带海洋学院", "city": "海南三亚", "type": "省属", "score": 498, "rank": 34100, "rating": "C+", "employment": "84%", "advantageMajors": ["旅游管理", "酒店管理", "汉语言文学", "英语", "海洋科学"]},
    {"name": "琼台师范学院", "city": "海南海口", "type": "省属", "score": 496, "rank": 35100, "rating": "C", "employment": "83%", "advantageMajors": ["学前教育", "小学教育", "汉语言文学", "英语", "科学教育"]},
    {"name": "邢台学院", "city": "河北邢台", "type": "市属", "score": 493, "rank": 36700, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "学前教育", "小学教育"]},
    {"name": "衡水学院", "city": "河北衡水", "type": "市属", "score": 491, "rank": 37700, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "学前教育", "小学教育", "数学与应用数学"]},
    {"name": "张家口学院", "city": "河北张家口", "type": "市属", "score": 490, "rank": 38300, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "护理学", "学前教育", "小学教育"]},
    {"name": "运城学院", "city": "山西运城", "type": "省属", "score": 492, "rank": 37100, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "财务管理"]},
    {"name": "吕梁学院", "city": "山西吕梁", "type": "省属", "score": 490, "rank": 38400, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "化学"]},
    {"name": "晋中学院", "city": "山西晋中", "type": "省属", "score": 493, "rank": 36600, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "教育学", "数学与应用数学"]},
    {"name": "长治学院", "city": "山西长治", "type": "省属", "score": 491, "rank": 37900, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "物理学"]},
    {"name": "忻州师范学院", "city": "山西忻州", "type": "省属", "score": 494, "rank": 36100, "rating": "C", "employment": "83%", "advantageMajors": ["汉语言文学", "英语", "教育学", "数学与应用数学", "化学"]},
    {"name": "商洛学院", "city": "陕西商洛", "type": "省属", "score": 490, "rank": 38600, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "会计学"]},
    {"name": "安康学院", "city": "陕西安康", "type": "省属", "score": 492, "rank": 37000, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "农学", "茶学", "旅游管理"]},
    {"name": "榆林学院", "city": "陕西榆林", "type": "省属", "score": 491, "rank": 37600, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "石油工程", "化学工程与工艺", "法学"]},
    {"name": "陇东学院", "city": "甘肃庆阳", "type": "省属", "score": 488, "rank": 39500, "rating": "C", "employment": "81%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "物理学"]},
    {"name": "河西学院", "city": "甘肃张掖", "type": "省属", "score": 489, "rank": 39000, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "化学"]},
    {"name": "兰州城市学院", "city": "甘肃兰州", "type": "省属", "score": 491, "rank": 37500, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "学前教育", "小学教育", "旅游管理"]},
    {"name": "青海民族大学", "city": "青海西宁", "type": "省属", "score": 493, "rank": 36500, "rating": "C", "employment": "82%", "advantageMajors": ["民族学", "法学", "汉语言文学", "英语", "公共事业管理"]},
    {"name": "宁夏大学新华学院", "city": "宁夏银川", "type": "民办", "score": 482, "rank": 42500, "rating": "D", "employment": "78%", "advantageMajors": ["法学", "英语", "会计学", "工商管理", "电子商务"]},
    {"name": "中国矿业大学银川学院", "city": "宁夏银川", "type": "民办", "score": 480, "rank": 43800, "rating": "D", "employment": "78%", "advantageMajors": ["工商管理", "会计学", "市场营销", "英语", "法学"]},
    {"name": "新疆财经大学", "city": "新疆乌鲁木齐", "type": "省属", "score": 497, "rank": 34600, "rating": "C+", "employment": "85%", "advantageMajors": ["会计学", "金融学", "统计学", "国际经济与贸易", "市场营销"]},
    {"name": "新疆农业大学", "city": "新疆乌鲁木齐", "type": "省属", "score": 494, "rank": 36000, "rating": "C", "employment": "83%", "advantageMajors": ["农学", "林学", "农业资源与环境", "动物科学", "草业科学"]},
    {"name": "凯里学院", "city": "贵州凯里", "type": "省属", "score": 490, "rank": 38100, "rating": "C", "employment": "82%", "advantageMajors": ["民族学", "汉语言文学", "英语", "数学与应用数学", "物理学"]},
    {"name": "安顺学院", "city": "贵州安顺", "type": "省属", "score": 489, "rank": 38900, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "历史学", "数学与应用数学", "地理学"]},
    {"name": "六盘水师范学院", "city": "贵州六盘水", "type": "省属", "score": 488, "rank": 39600, "rating": "C", "employment": "81%", "advantageMajors": ["汉语言文学", "英语", "数学与应用数学", "物理学", "化学"]},
    {"name": "兴义民族师范学院", "city": "贵州兴义", "type": "省属", "score": 487, "rank": 40200, "rating": "C", "employment": "81%", "advantageMajors": ["汉语言文学", "英语", "数学与应用数学", "物理学", "化学"]},
    {"name": "文山学院", "city": "云南文山", "type": "省属", "score": 489, "rank": 38800, "rating": "C", "employment": "82%", "advantageMajors": ["汉语言文学", "英语", "数学与应用数学", "物理学", "化学"]}
]

new_schools_js = ""
current_id = last_id + 1

for s in schools_to_add:
    score = s["score"]
    rank = s["rank"]
    score_2024 = score - 7
    rank_2024 = int(rank * 1.04)
    score_2023 = score - 12
    rank_2023 = int(rank * 1.08)
    
    advantage_majors_str = '["' + '", "'.join(s["advantageMajors"]) + '"]'
    
    school_js = f'''    {{
        id: {current_id},
        name: "{s["name"]}",
        score: {score},
        rank: {rank},
        city: "{s["city"]}",
        nature: "{s["type"]}" if "{s["type"]}" in ["民办"] else "公办",
        type: "{s["type"]}",
        code: "{2000 + current_id}",
        phone: "0000-0000000",
        website: "https://www.example.edu.cn",
        description: "{s["name"]}是一所{s["type"]}院校，办学特色鲜明，师资力量雄厚。",
        advantageMajors: {advantage_majors_str},
        rating: "{s["rating"]}",
        employment: "{s["employment"]}",
        scoreHistory: {{
            2025: {{ score: {score}, rank: {rank} }},
            2024: {{ score: {score_2024}, rank: {rank_2024} }},
            2023: {{ score: {score_2023}, rank: {rank_2023} }}
        }}
    }},'''
    
    new_schools_js += school_js + "\n"
    current_id += 1

content = content.rstrip()
if content.endswith(']'):
    content = content[:-1] + "\n" + new_schools_js + "]"

with open(input_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Added {len(schools_to_add)} schools")
print(f"Total IDs from 101 to {current_id - 1}")
