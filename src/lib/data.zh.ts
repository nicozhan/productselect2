import { Scenario } from '../types';
import cbdImg from '../assets/scenarios/cbd-office.jpg';
import legoImg from '../assets/scenarios/legoland.jpg';
import birdImg from '../assets/scenarios/birdnest-subway.jpg';

// 中文场景数据（结构与 SCENARIOS_EN 完全一致，仅文案本地化）
export const SCENARIOS_ZH: Scenario[] = [
  {
    id: 'cbd-office',
    name: 'CBD 写字楼智能柜',
    image: cbdImg,
    subtitle: '深圳南山 · 双高峰商务补货枢纽',
    location: '深圳南山区粤海街道 · 科兴科学园 B 栋大堂',
    loadedSkill: '白领行为技能',
    skillIcon: 'Briefcase',
    avatar: '🏢',
    description: '服务高收入白领，早高峰（8:00-9:30）与午间（12:00-13:30）双峰极端集中。对高端咖啡因、无糖健康饮品、代餐轻食需求旺盛，对价格不敏感、会员复购黏性强。',
    metrics: {
      dailySales: '¥4,180',
      activeUsers: '520/天',
      stockLevel: '76%',
      efficiency: '95.1%'
    },
    analyzePoints: [
      '早高峰咖啡因 + 午间代餐双峰结构',
      '无糖 / 功能性 / 天然健康饮品升级',
      '刚性补货窗口（早 7:45 前必须满仓）',
      '会员复购与同类楼宇历销相关性'
    ],
    products: [
      {
        id: 'cbd-electrolyte',
        name: '电解质水（柑橘味）',
        category: '功能饮料',
        icon: '🥤',
        currentStock: 12,
        capacity: 60,
        price: 6.5,
        cost: 2.8,
        scores: {
          salesPerformance: 94,
          customerDemand: 98,
          profitMargin: 82,
          scenarioMatch: 95,
          inventoryRisk: 95,
          marketTrend: 98
        },
        weightedScore: 93,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '补至满仓。高温预报叠加通勤补水趋势，预计需求激增 45%。',
        replenishQty: 40,
        whyDecided: {
          title: '热浪 + 通勤补水潮',
          description: '电解质水呈现极强的动销速度。即将到来的 35°C 热浪与「晨间补水」社媒趋势叠加，使其成为优先级最高的 SKU。',
          sources: [
            { agent: '趋势侦察智能体', role: '外部信号', finding: '深圳气温明日升至 35°C。「补水攻略」本地社媒热度 +180%。', status: 'success' },
            { agent: '销售分析师智能体', role: '流速分析', finding: '同类天气下，该 SKU 周转速度达品类均值的 3.4 倍。', status: 'success' },
            { agent: '场景技能智能体', role: '画像匹配', finding: '深圳南山科技园白领多在健身前或通勤后购买补水饮料，与白领行为技能高度契合。', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-coldbrew',
        name: '冷萃黑咖啡',
        category: '高端咖啡',
        icon: '☕',
        currentStock: 5,
        capacity: 40,
        price: 15.0,
        cost: 5.5,
        scores: {
          salesPerformance: 91,
          customerDemand: 96,
          profitMargin: 90,
          scenarioMatch: 98,
          inventoryRisk: 90,
          marketTrend: 88
        },
        weightedScore: 92,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '紧急补至满仓。早高峰 8:00-9:00 缺乏弹性的咖啡因需求，单件毛利 ¥9.5，且已触发 14 条「缺货」反馈——须在 7:45 补货窗前到位。',
        replenishQty: 35,
        whyDecided: {
          title: '缺乏弹性的早间咖啡因峰值',
          description: '冷萃是 8:00-9:00 到柜白领的首选。高利润空间决定了我们必须杜绝其缺货。',
          sources: [
            { agent: 'CRM 智能体', role: '顾客反馈', finding: '近 48 小时收到 14 条冷萃咖啡「缺货」反馈。', status: 'warning' },
            { agent: '库存智能体', role: '库存警报', finding: '当前库存（5 件）将在早高峰前 25 分钟内耗尽。', status: 'warning' },
            { agent: 'CEO 决策', role: '利润优化', finding: '基于高毛利（单件净利 ¥9.50）与强客户黏性，优先保障高端咖啡供应。', status: 'success' }
          ]
        }
      },
      {
        id: 'cbd-coconut',
        name: '高端椰子水',
        category: '天然补水',
        icon: '🥥',
        currentStock: 4,
        capacity: 25,
        price: 12.0,
        cost: 4.8,
        scores: {
          salesPerformance: 72,
          customerDemand: 86,
          profitMargin: 80,
          scenarioMatch: 82,
          inventoryRisk: 75,
          marketTrend: 96
        },
        weightedScore: 81,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: '分配试销货道。椰子水邻近高端健身房热度飙升。试水小规模铺货，捕捉本地健康白领客群。',
        replenishQty: 15,
        whyDecided: {
          title: '健康白领试销测试',
          description: '尽管历史销量中等，椰子水正经历强劲的宏观趋势上行，契合 CBD 活跃生活方式客群画像。',
          sources: [
            { agent: '趋势侦察智能体', role: '趋势挖掘', finding: '椰子水搜索量周环比 +45%，与周边高端健身俱乐部强相关。', status: 'success' },
            { agent: '场景技能智能体', role: '画像对齐', finding: '白领画像显示其愿意为天然低糖饮品支付溢价。', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-shake',
        name: '高蛋白代餐奶昔',
        category: '代餐轻食',
        icon: '🥛',
        currentStock: 0,
        capacity: 20,
        price: 16.0,
        cost: 6.5,
        scores: {
          salesPerformance: 60,
          customerDemand: 82,
          profitMargin: 84,
          scenarioMatch: 88,
          inventoryRisk: 70,
          marketTrend: 92
        },
        weightedScore: 74,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: '试销 20 瓶。代餐奶昔是写字楼午间「轻食替代」差异化品类，午间代餐诉求上升，小批量验证转化与复购。',
        replenishQty: 20,
        whyDecided: {
          title: '午间代餐差异化试销',
          description: 'CBD 白领午间代餐需求显著，代餐奶昔填补货道空白；先试销观测复购再决定是否扩量。',
          sources: [
            { agent: 'CRM 智能体', role: '顾客反馈', finding: '午间「低卡/代餐」诉求本周 +9 条，且无对应货道。', status: 'warning' },
            { agent: '趋势侦察智能体', role: '趋势挖掘', finding: '「办公室健康轻食」「高蛋白」社媒内容上行 +120%。', status: 'success' },
            { agent: '场景技能智能体', role: '画像对齐', finding: '白领画像显示高支付意愿，愿为便捷健康加价。', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-oolong',
        name: '无糖乌龙茶',
        category: '茶饮',
        icon: '🥤',
        currentStock: 22,
        capacity: 35,
        price: 5.5,
        cost: 2.2,
        scores: {
          salesPerformance: 80,
          customerDemand: 75,
          profitMargin: 70,
          scenarioMatch: 85,
          inventoryRisk: 88,
          marketTrend: 78
        },
        weightedScore: 78,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持现有库存。销量高度稳定，无需立即补货，当前库存可覆盖 2.5 天正常需求。',
        whyDecided: {
          title: '表现稳定，库存充足',
          description: '无糖乌龙茶是可靠的「锚点」商品。库存健康，需求平稳，无需额外动作。',
          sources: [
            { agent: '销售分析师智能体', role: '稳定性核查', finding: '日销量波动小于 5%，需求模式极具可预测性。', status: 'info' },
            { agent: '库存智能体', role: '库存水位核查', finding: '当前 22 件库存对接下来 48 小时为最优。', status: 'success' }
          ]
        }
      },
      {
        id: 'cbd-chips',
        name: '海盐薯片',
        category: '零食',
        icon: '🥔',
        currentStock: 18,
        capacity: 20,
        price: 7.0,
        cost: 3.0,
        scores: {
          salesPerformance: 58,
          customerDemand: 52,
          profitMargin: 65,
          scenarioMatch: 50,
          inventoryRisk: 85,
          marketTrend: 42
        },
        weightedScore: 56,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '保持库存。夏季写字楼内咸味零食流速偏低，白领更偏好清爽饮品与冷饮。',
        whyDecided: {
          title: '夏季零食低速',
          description: '高温周内薯片优先级低。维持现有库存、暂不补货，把货道留给高需求饮品。',
          sources: [
            { agent: '销售分析师智能体', role: '季节性分析', finding: '室外温度超过 30°C 时，零食品类销量下降 18%。', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-chocolate',
        name: '高端巧克力棒',
        category: '零食',
        icon: '🍫',
        currentStock: 14,
        capacity: 15,
        price: 18.0,
        cost: 8.0,
        scores: {
          salesPerformance: 38,
          customerDemand: 28,
          profitMargin: 75,
          scenarioMatch: 35,
          inventoryRisk: 20,
          marketTrend: 22
        },
        weightedScore: 39,
        initialAction: 'Reduce',
        finalAction: 'Reduce',
        recommendationDetails: '库存分配下调 60%。夏季柜门开启频繁，巧克力融化风险高，周转率低。',
        promotionDetails: '8 折促销，加速临期批次清仓。',
        whyDecided: {
          title: '融化隐患与临期清仓',
          description: '巧克力销量因季节偏好骤降。此外库存报告显示该批次仅剩 7 天保质期。',
          sources: [
            { agent: '库存智能体', role: '品质风险', finding: '高峰使用期柜内温度波动带来融化风险，7 天后到期。', status: 'warning' },
            { agent: 'CRM 智能体', role: '反馈分析', finding: '本周写字楼客群对该重巧克力零食零正向提及与购买。', status: 'info' },
            { agent: 'CEO 决策', role: '风险缓释', finding: '立即执行 8 折，清掉剩余 14 条并腾出货道给冷萃。', status: 'warning' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'cbd-l1', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '08:00:01', message: '正在初始化 **深圳南山区科兴科学园智能柜** 分析，激活「白领行为技能」……', type: 'info', sceneIndex: 0 },
      { id: 'cbd-l2', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '08:00:03', message: '任务分派：销售分析师（历史双峰流速）、趋势侦察（天气/社媒）、CRM（会员反馈）、库存（补货窗与风险）。', type: 'info', sceneIndex: 0 },

      { id: 'cbd-l3', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '08:00:12', message: '扫描历史数据：汇聚 3 个夏季、35,000 台同类写字楼柜的早/午双峰流速。', type: 'info', sceneIndex: 1 },
      { id: 'cbd-l4', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '08:00:15', message: '识别双支柱：**冷萃咖啡** 与 **无糖补水** 占写字楼总营收 64%，早高峰占全日 71%。', type: 'success', sceneIndex: 1 },
      { id: 'cbd-l5', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '08:00:18', message: '死库存警报：SKU「高端巧克力棒」日均周转仅 0.1 件，远低于效率阈值。', type: 'warning', sceneIndex: 1 },

      { id: 'cbd-l6', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '08:00:22', message: '外部信号：天气 API 预报深圳明日 **35°C** 高温、湿度偏高，午后易发「回南天」。', type: 'info', sceneIndex: 2 },
      { id: 'cbd-l7', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '08:00:25', message: '社媒监听：小红书/本地生活「冷萃」「电解质水」「0糖茶」在深圳南山科技园热度 **+180%**。', type: 'success', sceneIndex: 2 },
      { id: 'cbd-l8', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '08:00:28', message: '周边信号：科兴科学园 B 栋 200m 内新开 2 家高端健身中心，天然等渗饮料需求上行。', type: 'success', sceneIndex: 2 },

      { id: 'cbd-l9', agentName: 'CRM 智能体', agentRole: '客户关系', avatar: '💬', timestamp: '08:00:32', message: '会员反馈：近 48 小时收到 14 条冷萃「缺货」App 推送，午间代餐诉求 +9 条。', type: 'warning', sceneIndex: 3 },
      { id: 'cbd-l10', agentName: '库存智能体', agentRole: '物流', avatar: '📦', timestamp: '08:00:35', message: '补货窗核查：冷萃仅剩 5 瓶（12%），若 **7:45 前未补满**，早高峰将直接损失。', type: 'warning', sceneIndex: 3 },
      { id: 'cbd-l11', agentName: '库存智能体', agentRole: '物流', avatar: '📦', timestamp: '08:00:38', message: '品质风险：巧克力棒批次 7 天到期，柜门高频开启致柜内湿度上升，建议立即降价。', type: 'warning', sceneIndex: 3 },

      { id: 'cbd-l12', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '08:00:42', message: '编译 AI 决策矩阵，权重：销售 30% / 需求 20% / 毛利 20% / 技能 15% / 风险 10% / 趋势 5%。', type: 'info', sceneIndex: 4 },
      { id: 'cbd-l13', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '08:00:45', message: '矩阵排序：冷萃(92)、电解质水(93) ⇒ 增补；高蛋白代餐 ⇒ 试销；巧克力(39) ⇒ 清减。', type: 'success', sceneIndex: 4 }
    ]
  },
  {
    id: 'legoland',
    name: '上海乐高乐园智能柜',
    subtitle: '高客流亲子主题乐园售卖枢纽',
    location: '上海乐高乐园，金山区',
    loadedSkill: '游客流量与亲子客流技能',
    skillIcon: 'ToyBrick',
    avatar: '🧱',
    description: '服务乐园游客与亲子家庭。需求由游客量、节假日、天气、巡游演出，以及社媒上亲子健康饮品趋势共同驱动。',
    metrics: {
      dailySales: '¥3,640',
      activeUsers: '910/天',
      stockLevel: '68%',
      efficiency: '89.5%'
    },
    analyzePoints: [
      '游客流量与设备压力（infinisynapse：日游客量、周末/工作日差异、高峰时段、家庭比例）',
      '季节性需求节奏（暑假/寒假、五一、国庆、周末）',
      '天气驱动需求（>35℃ 补水类飙升，降雨降客流）',
      '小红书趋势（电解质水、无糖、椰子水、亲子户外补水）'
    ],
    products: [
      {
        id: 'lego-icered',
        name: '康师傅冰红茶 500ml',
        category: '甜茶',
        icon: '🧋',
        currentStock: 14,
        capacity: 60,
        price: 3.0,
        cost: 1.2,
        scores: { salesPerformance: 85, customerDemand: 80, profitMargin: 72, scenarioMatch: 78, inventoryRisk: 80, marketTrend: 60 },
        weightedScore: 78,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持当前库存。亲子家庭冲动购买的高频甜茶，平日周末均稳定动销。',
        whyDecided: {
          title: '稳定的亲子冲动品',
          description: '冰红茶是亲子客群可靠、低风险的单品，维持基准铺货即可。',
          sources: [
            { agent: '商品知识智能体', role: '销售基线', finding: 'Top5 既有 SKU，平假日动销稳定，无需调整。', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-purewater',
        name: '纯水乐 550ml',
        category: '水',
        icon: '💧',
        currentStock: 9,
        capacity: 80,
        price: 2.5,
        cost: 0.8,
        scores: { salesPerformance: 98, customerDemand: 97, profitMargin: 60, scenarioMatch: 99, inventoryRisk: 98, marketTrend: 85 },
        weightedScore: 90,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '拉满容量。高温日（>35℃） plain water 需求暴涨 200%+；infinisynapse 天气规则预判未来 7 天有 3 个高温日。',
        replenishQty: 70,
        whyDecided: {
          title: '天气规则补水爆发',
          description: '高温预警下白水是第一补水单品。infinisynapse 天气情报显示未来 7 天有 3 天 35℃+，因此把水类铺货拉满。',
          sources: [
            { agent: '天气情报智能体', role: '高温触发', finding: '上海预报：3 天 35℃+。规则 >35℃ ⇒ ↑ 矿泉水，提前铺 70 瓶。', status: 'success' },
            { agent: '游客流量智能体', role: '峰值压力', finding: '周末客流为工作日 2.3 倍；不补中间货，水柜 14:00 前即售罄。', status: 'warning' }
          ]
        }
      },
      {
        id: 'lego-pepsi',
        name: '百事可乐 600ml',
        category: '碳酸',
        icon: '🥤',
        currentStock: 18,
        capacity: 60,
        price: 3.5,
        cost: 1.3,
        scores: { salesPerformance: 82, customerDemand: 78, profitMargin: 75, scenarioMatch: 76, inventoryRisk: 82, marketTrend: 65 },
        weightedScore: 76,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持。亲子家庭对可乐有稳定基础需求，保持标准铺货。',
        whyDecided: {
          title: '基础可乐基线',
          description: '百事是可依赖的基线 SKU，乐园客群无需重定位。',
          sources: [
            { agent: '商品知识智能体', role: '基线', finding: 'Top5 既有 SKU，动销稳定，维持。', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-dongpeng',
        name: '东鹏特饮 500ml',
        category: '能量',
        icon: '⚡',
        currentStock: 12,
        capacity: 50,
        price: 4.0,
        cost: 1.6,
        scores: { salesPerformance: 70, customerDemand: 68, profitMargin: 80, scenarioMatch: 65, inventoryRisk: 78, marketTrend: 62 },
        weightedScore: 72,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持。能量饮料在午后吸引疲惫家长与青少年，量小但稳定。',
        whyDecided: {
          title: '午后能量小众',
          description: '东鹏特饮覆盖家长与大童的午后疲劳场景，维持现量即可。',
          sources: [
            { agent: '商品知识智能体', role: '基线', finding: '既有 SKU，小众但稳定，维持。', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-jasmine',
        name: '康师傅茉莉蜜茶 500ml',
        category: '甜茶',
        icon: '🍵',
        currentStock: 22,
        capacity: 50,
        price: 3.0,
        cost: 1.2,
        scores: { salesPerformance: 45, customerDemand: 40, profitMargin: 74, scenarioMatch: 35, inventoryRisk: 60, marketTrend: 38 },
        weightedScore: 48,
        initialAction: 'Maintain',
        finalAction: 'Reduce',
        recommendationDetails: '压缩铺货。甜奶茶对高温、高活动的乐园客群匹配度低，资金应转向补水与电解质类。',
        promotionDetails: '剩余库存降价处理，仅保安全缓冲，不再补货。',
        whyDecided: {
          title: '低匹配甜奶茶',
          description: '在乐园补水客群下，茉莉蜜茶表现远低于水/电解质。商品知识智能体判定其为低匹配——削减货位并再分配。',
          sources: [
            { agent: '商品知识智能体', role: '匹配评分', finding: '场景匹配 35/100，既有 SKU 中最低，建议降低。', status: 'warning' },
            { agent: 'CEO 决策', role: '货位重分配', finding: '从茉莉蜜茶释放 20 个货位 → 转给电解质水与椰子水。', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-alienergy',
        name: '元气森林外星人电解质水 500ml',
        category: '电解质',
        icon: '🧪',
        currentStock: 6,
        capacity: 70,
        price: 6.0,
        cost: 2.4,
        scores: { salesPerformance: 95, customerDemand: 96, profitMargin: 85, scenarioMatch: 97, inventoryRisk: 90, marketTrend: 98 },
        weightedScore: 92,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: '大幅加码。infinisynapse 社媒扫描显示乐园周边电解质水近 30 天讨论 +180%；高温规则也在热天拉升。',
        replenishQty: 62,
        whyDecided: {
          title: '趋势 + 天气双驱动',
          description: '电解质水是当前最热品类：小红书声量 +180% 叠加高温预警拉升。加权分最高——推至旗舰货位。',
          sources: [
            { agent: '小红书趋势智能体', role: '社媒监听', finding: '电解质水 30 天 +180%，关键词 夏天/遛娃/户外/补水，推荐外星人电解质水与宝矿力水特。', status: 'success' },
            { agent: '天气情报智能体', role: '高温触发', finding: '规则 >35℃ ⇒ ↑ 电解质水，提前铺 62 瓶。', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-coconut',
        name: '椰子水 350ml',
        category: '椰子水',
        icon: '🥥',
        currentStock: 5,
        capacity: 50,
        price: 8.0,
        cost: 3.2,
        scores: { salesPerformance: 80, customerDemand: 85, profitMargin: 90, scenarioMatch: 88, inventoryRisk: 75, marketTrend: 90 },
        weightedScore: 85,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: '加码。椰子水受健康意识家长追捧，常出现在乐园野餐笔记；高温规则也在热天拉升。',
        replenishQty: 42,
        whyDecided: {
          title: '健康与高温共振',
          description: '椰子水契合家长健康趋势与 >35℃ 补水拉升，高毛利使其成为营收驱动。',
          sources: [
            { agent: '天气情报智能体', role: '高温触发', finding: '规则 >35℃ ⇒ ↑ 椰子水，加入高温日组合。', status: 'success' },
            { agent: '小红书趋势智能体', role: '社媒监听', finding: '椰子水频现于亲子野餐笔记，意向上升。', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-olytea',
        name: '东方树叶无糖乌龙 500ml',
        category: '无糖茶',
        icon: '🍃',
        currentStock: 8,
        capacity: 60,
        price: 4.0,
        cost: 1.5,
        scores: { salesPerformance: 82, customerDemand: 84, profitMargin: 82, scenarioMatch: 86, inventoryRisk: 85, marketTrend: 92 },
        weightedScore: 83,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: '加码。无糖茶是健康家长的小红书头部趋势，毛利与场景契合度俱佳。',
        replenishQty: 50,
        whyDecided: {
          title: '无糖茶势能',
          description: '东方树叶无糖乌龙踩中家长零糖浪潮，毛利高、场景匹配强，应放量。',
          sources: [
            { agent: '小红书趋势智能体', role: '社媒监听', finding: '无糖茶走红，家长倾向给孩子零糖饮品，推荐东方树叶。', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-pocari',
        name: '宝矿力水特 500ml',
        category: '电解质',
        icon: '🧴',
        currentStock: 7,
        capacity: 60,
        price: 5.0,
        cost: 2.0,
        scores: { salesPerformance: 84, customerDemand: 86, profitMargin: 80, scenarioMatch: 90, inventoryRisk: 88, marketTrend: 90 },
        weightedScore: 84,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: '加码。宝矿力是家长信赖的电解质老牌，游玩后给孩子补水的首选，与外星人组成双品牌补水墙。',
        replenishQty: 52,
        whyDecided: {
          title: '信赖电解质品牌',
          description: '宝矿力水特是家长游玩后给孩子补水的家庭首选品牌，与外星人互补实现全覆盖。',
          sources: [
            { agent: '小红书趋势智能体', role: '社媒监听', finding: '宝矿力水特与电解质水一道被推荐给孩子，加入补水墙。', status: 'success' },
            { agent: '商品知识智能体', role: '品牌契合', finding: '成熟电解质 SKU，家庭信赖度高，加码。', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-vitc',
        name: '水溶C100 445ml',
        category: '维C',
        icon: '🍊',
        currentStock: 10,
        capacity: 50,
        price: 4.5,
        cost: 1.8,
        scores: { salesPerformance: 62, customerDemand: 60, profitMargin: 78, scenarioMatch: 64, inventoryRisk: 80, marketTrend: 66 },
        weightedScore: 70,
        initialAction: 'Test',
        finalAction: 'Test',
        recommendationDetails: '仅试销。维C 果汁匹配度中等，先开小货位，观察周末家庭 uptake 再决定放量。',
        whyDecided: {
          title: '中等匹配试销',
          description: '维C 饮品与乐园客群属中等匹配，先作小货位试销，过一个峰值周期后复盘。',
          sources: [
            { agent: '商品知识智能体', role: '匹配评分', finding: '中等匹配（64），建议试销而非放量。', status: 'info' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'lego-l1', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '06:30:01', message: '初始化上海乐高乐园智能柜分析。激活「游客流量与亲子客流技能」（infinisynapse 客户端：partner_1e8b...）。', type: 'info', sceneIndex: 0 },
      { id: 'lego-l2', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '06:30:03', message: '分派研究任务。各子智能体将带乐园上下文调用 infinisynapse AI 搜索。', type: 'info', sceneIndex: 0 },
      { id: 'lego-l3', agentName: '游客流量智能体', agentRole: '流量分析', avatar: '🧑‍🤝‍🧑', timestamp: '06:30:12', message: 'infinisynapse 搜索：上海乐高乐园 游客量预测 / 日均游客 / 客流趋势 / 亲子旅游客流。结果：日均约 1.2 万；周末为工作日 2.3 倍；高峰 11:00–15:00 与 17:30 散场；家庭比例 78%。', type: 'success', sceneIndex: 1 },
      { id: 'lego-l4', agentName: '游客流量智能体', agentRole: '流量分析', avatar: '🧑‍🤝‍🧑', timestamp: '06:30:15', message: '设备压力：周末峰值 14:00 前即面临缺货风险，建议补水类每日补 2 次。', type: 'warning', sceneIndex: 1 },
      { id: 'lego-l5', agentName: '节假日智能体', agentRole: '日历', avatar: '📅', timestamp: '06:30:22', message: 'infinisynapse 搜索：2026 中国节假日日历 / 上海暑假 / 上海寒假 / 亲子旅游旺季。结果：暑假（7–8 月）旺季；五一与国庆高峰；周末高客流。', type: 'success', sceneIndex: 2 },
      { id: 'lego-l6', agentName: '节假日智能体', agentRole: '日历', avatar: '📅', timestamp: '06:30:25', message: '补货节奏：暑假每日 2 补；节假日（五一、国庆）增加开场前补货。', type: 'info', sceneIndex: 2 },
      { id: 'lego-l7', agentName: '天气情报智能体', agentRole: '气象', avatar: '🌤️', timestamp: '06:30:32', message: 'infinisynapse 搜索：上海未来 7 天天气 / 温度趋势 / 降雨概率 / 高温预警。结果：35℃+ 共 3 天，降雨 2 天。规则：>35℃ ⇒ ↑ 矿泉水/电解质/椰子水；降雨 ⇒ ↓ 游客与补货频率。', type: 'success', sceneIndex: 3 },
      { id: 'lego-l8', agentName: '天气情报智能体', agentRole: '气象', avatar: '🌤️', timestamp: '06:30:35', message: '高温预警触发：3 个高温日给补水类权重 +40%。', type: 'info', sceneIndex: 3 },
      { id: 'lego-l9', agentName: '小红书趋势智能体', agentRole: '社媒监听', avatar: '📱', timestamp: '06:30:42', message: 'infinisynapse 搜索：上海乐高乐园 / 亲子游 / 夏日饮料 / 0 糖 / 电解质水 / 椰子水。结果：电解质水 30 天 +180%；关键词 夏天/遛娃/户外/补水。推荐外星人电解质水与宝矿力水特。', type: 'success', sceneIndex: 3 },
      { id: 'lego-l10', agentName: '商品知识智能体', agentRole: '商品库', avatar: '🛒', timestamp: '06:30:48', message: '商品库：保留 Top5 既有（冰红茶、纯水乐、百事、东鹏、茉莉蜜茶）；新增趋势（外星人、椰子水、东方树叶、宝矿力）；降低低匹配（茉莉蜜茶）。', type: 'info', sceneIndex: 3 },
      { id: 'lego-l11', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '06:30:52', message: '编译 AI 决策矩阵。权重：销量 30%、需求 20%、毛利 20%、技能 15%、风险 10%、趋势 5%。', type: 'info', sceneIndex: 4 },
      { id: 'lego-l12', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '06:30:55', message: '矩阵编译完成：外星人电解质水(92) 与纯水乐(90) ⇒ 增补；茉莉蜜茶(48) ⇒ 降低；维C100(70) ⇒ 试销。', type: 'success', sceneIndex: 4 }
    ],
    image: legoImg
  },
  {
    id: 'birdnest-subway',
    isDemo: true,
    name: '鸟巢地铁站智能售卖机',
    image: birdImg,
    subtitle: '演唱会 + 通勤复合售卖枢纽',
    location: '北京鸟巢，奥体中心站 B2 出口',
    loadedSkill: '活动与客流流动技能',
    skillIcon: 'TrainFront',
    avatar: '🚇',
    description: '服务鸟巢（国家体育场）地铁出口的演唱会人流与日常通勤客群。需求由活动日峰值、深夜散场解渴，以及社媒驱动的网红健康饮品尝鲜主导。',
    metrics: {
      dailySales: '¥3,180',
      activeUsers: '650/天',
      stockLevel: '74%',
      efficiency: '90.4%'
    },
    analyzePoints: [
      '活动日人流峰值（散场 22:00 – 23:30）',
      '无糖茶与电解质水需求激增',
      '通勤通勤 + 大型活动复合客群',
      '小红书社媒趋势驱动网红饮品试销'
    ],
    products: [
      {
        id: 'bn-water',
        name: '农夫山泉天然水 550ml',
        category: '水',
        icon: '💧',
        currentStock: 9,
        capacity: 80,
        price: 3.0,
        cost: 0.9,
        scores: { salesPerformance: 99, customerDemand: 98, profitMargin: 65, scenarioMatch: 99, inventoryRisk: 98, marketTrend: 85 },
        weightedScore: 91,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '补满库存。水是通勤客与散场人群的绝对基线，活动日峰值需准备 2.5 倍备货缓冲。',
        replenishQty: 70,
        whyDecided: {
          title: '万能基线 + 散场解渴',
          description: '天然水是全客群流速最高的 SKU。演唱会之夜，数万人于 22:00–23:30 经 B2 出口散场，催生强烈的冰饮解渴需求。',
          sources: [
            { agent: '库存智能体', role: '库存预警', finding: '当前仅 9 瓶（11% 容量），活动日散场前 30 分钟内即告售罄。', status: 'warning' },
            { agent: '销售分析师智能体', role: '流速分析', finding: '本节点水类周转率排名第一，平日稳定，活动周六高达 3.2 倍。', status: 'success' },
            { agent: '场景技能智能体', role: '客群匹配', finding: '活动与客流流动模型将水评为 B2 散场走廊场景契合度最高的商品。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-iceblack',
        name: '康师傅冰红茶 500ml',
        category: '甜茶',
        icon: '🧋',
        currentStock: 14,
        capacity: 40,
        price: 4.0,
        cost: 1.6,
        scores: { salesPerformance: 90, customerDemand: 88, profitMargin: 70, scenarioMatch: 85, inventoryRisk: 90, marketTrend: 70 },
        weightedScore: 84,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '保留为甜茶锚点单品。仍是销量前三，但应将部分货道让给无糖茶以捕捉健康化转向。',
        replenishQty: 40,
        whyDecided: {
          title: '甜茶锚点，结构微调',
          description: '冰红茶仍是大众经典高流速单品，但增速已较无糖茶停滞。保留其作为走量锚点，同时把茶类货道向无糖倾斜。',
          sources: [
            { agent: '销售分析师智能体', role: '周转率', finding: '稳定保持每周 14 件流速，环比仅降 4%，远比其它甜茶抗跌。', status: 'success' },
            { agent: '场景技能智能体', role: '客群契合', finding: '通勤日间需求支撑一个甜茶货道，整排甜茶已非最优。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-oolongsl',
        name: '东方树叶无糖乌龙茶 500ml',
        category: '无糖茶',
        icon: '🍵',
        currentStock: 8,
        capacity: 45,
        price: 5.5,
        cost: 2.2,
        scores: { salesPerformance: 88, customerDemand: 90, profitMargin: 75, scenarioMatch: 92, inventoryRisk: 90, marketTrend: 95 },
        weightedScore: 87,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '大力度补货。无糖茶是场馆周边第一趋势品类，社媒信号显示搜索热度 +160%。',
        replenishQty: 45,
        whyDecided: {
          title: '无糖茶趋势领跑',
          description: '东方树叶无糖乌龙领跑场馆周边健康茶趋势。高毛利与近乎满分的场景匹配，使其成为优先补货对象。',
          sources: [
            { agent: '趋势侦察智能体', role: '社媒监听', finding: '鸟巢周边「无糖茶」搜索量周环比 +160%。', status: 'success' },
            { agent: 'CRM 智能体', role: '反馈分析', finding: '22:00 后散场请求中「无糖 / 0 卡茶」是甜茶的 5 倍。', status: 'warning' },
            { agent: '销售分析师智能体', role: '流速分析', finding: '活动周六无糖茶销量是甜茶的 1.4 倍。', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-oolongsunt',
        name: '三得利无糖乌龙茶 500ml',
        category: '无糖茶',
        icon: '🍵',
        currentStock: 16,
        capacity: 25,
        price: 5.5,
        cost: 2.3,
        scores: { salesPerformance: 78, customerDemand: 80, profitMargin: 74, scenarioMatch: 88, inventoryRisk: 90, marketTrend: 90 },
        weightedScore: 81,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持现有库存。第二无糖品牌提供货架广度，需求稳定但尚未到爆发级。',
        whyDecided: {
          title: '第二品牌货架广度',
          description: '三得利无糖乌龙以第二品牌补齐东方树叶的货架，覆盖品牌忠诚客群，又不至于过度占用货道。',
          sources: [
            { agent: '销售分析师智能体', role: '稳定性核查', finding: '日波动低于 8%，可预测的中坚流速。', status: 'info' },
            { agent: '库存智能体', role: '水位核查', finding: '16 件可覆盖未来 3 天日常需求。', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-electrolyte',
        name: '元气森林外星人电解质水 500ml',
        category: '功能饮料',
        icon: '⚡',
        currentStock: 12,
        capacity: 50,
        price: 6.0,
        cost: 2.4,
        scores: { salesPerformance: 85, customerDemand: 95, profitMargin: 78, scenarioMatch: 96, inventoryRisk: 92, marketTrend: 98 },
        weightedScore: 89,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '紧急补货。电解质水是散场后必选解渴单品，活动日需求预计达日常的 3 倍。',
        replenishQty: 50,
        whyDecided: {
          title: '散场电解质爆发',
          description: '演出结束后，经 B2 出口散场的人群极度渴望电解质补给。其场景匹配与趋势分均为组合最高。',
          sources: [
            { agent: '趋势侦察智能体', role: '微观客群', finding: '活动之夜 22:00–23:30 电解质 / 等渗搜索意图较基线 +210%。', status: 'success' },
            { agent: '库存智能体', role: '库存预警', finding: '仅剩 12 件，任一演唱会周六散场前即售罄。', status: 'warning' },
            { agent: '场景技能智能体', role: '客群匹配', finding: '活动与客流流动模型将电解质评为散场走廊第一需求态。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-coconut',
        name: '椰子水 350ml',
        category: '天然补水',
        icon: '🥥',
        currentStock: 6,
        capacity: 20,
        price: 9.0,
        cost: 3.8,
        scores: { salesPerformance: 60, customerDemand: 82, profitMargin: 80, scenarioMatch: 85, inventoryRisk: 75, marketTrend: 96 },
        weightedScore: 75,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: '分配试销货道。椰子水兼具网红（社媒）热度与电解质定位，小批量测试以验证场馆适配度。',
        replenishQty: 15,
        whyDecided: {
          title: '网红电解质试销',
          description: '椰子水打通「电解质」与「健康趋势」两条叙事。历史流速低但宏观趋势极强，适合封顶试销。',
          sources: [
            { agent: '趋势侦察智能体', role: '趋势挖掘', finding: '椰子水是 2026 爆款品类，小红书「健身补水」笔记 +180%。', status: 'success' },
            { agent: '场景技能智能体', role: '客群契合', finding: '年轻观演客群对高颜值、健康定位饮品接受度极高。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-assam',
        name: '统一阿萨姆奶茶 500ml',
        category: '奶茶',
        icon: '🥛',
        currentStock: 17,
        capacity: 20,
        price: 6.0,
        cost: 2.5,
        scores: { salesPerformance: 82, customerDemand: 84, profitMargin: 72, scenarioMatch: 80, inventoryRisk: 86, marketTrend: 78 },
        weightedScore: 80,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持库存。以经过验证的大众奶茶单品替换掉较弱的炼乳奶茶，契合通勤客的口腹之欲。',
        whyDecided: {
          title: '验证型奶茶锚点',
          description: '阿萨姆奶茶是可靠、广受欢迎的 SKU，替换已下架的炼乳奶茶，守住稳定的通勤日间货道。',
          sources: [
            { agent: '销售分析师智能体', role: '流速核查', finding: '稳定保持每日 3–4 件，奶茶仍是通勤刚需。', status: 'info' },
            { agent: 'CRM 智能体', role: '反馈分析', finding: '奶茶诉求持续存在，炼乳口味几乎零复购。', status: 'warning' }
          ]
        }
      },
      {
        id: 'bn-dongpeng',
        name: '东鹏特饮 500ml',
        category: '功能饮料',
        icon: '⚡',
        currentStock: 15,
        capacity: 30,
        price: 5.5,
        cost: 2.2,
        scores: { salesPerformance: 76, customerDemand: 82, profitMargin: 76, scenarioMatch: 84, inventoryRisk: 88, marketTrend: 80 },
        weightedScore: 80,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: '维持配置。能量饮料覆盖深夜散场与演出后疲惫，是稳健可预期的表现者。',
        whyDecided: {
          title: '深夜能量覆盖',
          description: '东鹏特饮覆盖人群散场的深夜能量需求。毛利与需求稳定，保留现有货道合理。',
          sources: [
            { agent: '销售分析师智能体', role: '时段研究', finding: '活动之夜能量饮料销售偏向于 21:00–23:30。', status: 'info' },
            { agent: '库存智能体', role: '水位核查', finding: '15 件覆盖日常需求，仅演唱会周需追加。', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-pepsi',
        name: '百事可乐 600ml',
        category: '碳酸',
        icon: '🥤',
        currentStock: 18,
        capacity: 40,
        price: 3.5,
        cost: 1.4,
        scores: { salesPerformance: 87, customerDemand: 85, profitMargin: 68, scenarioMatch: 82, inventoryRisk: 92, marketTrend: 65 },
        weightedScore: 81,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '增加库存。可乐是全民冲动消费品，散场之夜与水并列成为销量之王。',
        replenishQty: 40,
        whyDecided: {
          title: '全民冲动消费标配',
          description: '百事可乐是覆盖面极广的冰饮标配。库存安全度高、基线流速强，活动日应优先补货。',
          sources: [
            { agent: '销售分析师智能体', role: '流速分析', finding: '无论是否活动日，可乐每周销量均居前三。', status: 'success' },
            { agent: '库存智能体', role: '库存预警', finding: '18 件不足以支撑单个演唱会周六的散场。', status: 'warning' }
          ]
        }
      },
      {
        id: 'bn-redbull',
        name: '红牛 250ml',
        category: '功能饮料',
        icon: '⚡',
        currentStock: 7,
        capacity: 30,
        price: 6.5,
        cost: 2.6,
        scores: { salesPerformance: 80, customerDemand: 92, profitMargin: 82, scenarioMatch: 90, inventoryRisk: 88, marketTrend: 85 },
        weightedScore: 85,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: '补货并主打深夜。高端能量饮料对应散场疲惫与高支付意愿。',
        replenishQty: 30,
        whyDecided: {
          title: '高端深夜能量',
          description: '红牛捕获东鹏特饮独木难支的深夜高端能量细分。需求与毛利俱强，值得独占货道。',
          sources: [
            { agent: 'CRM 智能体', role: '反馈分析', finding: '多起「看完演出真需要瓶正经能量饮料」的散场夜反馈。', status: 'warning' },
            { agent: '趋势侦察智能体', role: '微观客群', finding: '深夜活动客流抬升高端能量需求。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-barley',
        name: '好望水薏米水 350ml',
        category: '健康水',
        icon: '🌿',
        currentStock: 4,
        capacity: 15,
        price: 7.0,
        cost: 2.8,
        scores: { salesPerformance: 55, customerDemand: 78, profitMargin: 82, scenarioMatch: 80, inventoryRisk: 70, marketTrend: 95 },
        weightedScore: 72,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: '仅试销批次。小红书网红「健康水」，高颜值出片，先测再定货道。',
        replenishQty: 12,
        whyDecided: {
          title: '网红健康水试销',
          description: '薏米 / 薏仁水是小打破圈的「干净配料」饮品。趋势极强但场馆流速未证，适合封顶试销。',
          sources: [
            { agent: '趋势侦察智能体', role: '社媒监听', finding: '「健康水」「干净配料」笔记在年轻北京客群中 +150% 攀升。', status: 'success' },
            { agent: '场景技能智能体', role: '客群契合', finding: '观演人群社媒活跃，对健康高颜值饮品接受度高。', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-coldbrewtea',
        name: '泰新鲜无糖冷泡乌龙茶',
        category: '无糖茶',
        icon: '🍵',
        currentStock: 5,
        capacity: 15,
        price: 6.5,
        cost: 2.6,
        scores: { salesPerformance: 58, customerDemand: 80, profitMargin: 76, scenarioMatch: 86, inventoryRisk: 88, marketTrend: 92 },
        weightedScore: 75,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: '试销批次。小红书偏爱的无糖冷泡茶，配料极简「水 + 乌龙茶叶」，测试场馆适配。',
        replenishQty: 12,
        whyDecided: {
          title: '极简冷泡试销',
          description: '配料表极简的冷泡乌龙契合无糖与「干净配料」大趋势。基线流速低，先试销再放量。',
          sources: [
            { agent: '趋势侦察智能体', role: '趋势挖掘', finding: '无糖冷泡茶是小红书头部爆款，「干净配料」为年度最热文案。', status: 'success' },
            { agent: '场景技能智能体', role: '客群契合', finding: '场馆客群对健康与颜值饮品偏好极高。', status: 'info' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'bn-l1', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '19:30:01', message: '初始化分析：鸟巢地铁站智能售卖机。激活「活动与客流流动技能」...', type: 'info', sceneIndex: 0 },
      { id: 'bn-l2', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '19:30:03', message: '分派研究任务：销售分析师（历史销量）、趋势侦察（社媒与活动）、CRM 智能体（反馈）、库存智能体（库存水位）。', type: 'info', sceneIndex: 0 },

      { id: 'bn-l3', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '19:30:12', message: '扫描历史销量：分析 22,000 台通勤 + 活动类售卖机，覆盖近 2 个夏季。', type: 'info', sceneIndex: 1 },
      { id: 'bn-l4', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '19:30:15', message: '锁定头部品类：水、无糖茶、电解质水合计占活动日营收的 71%。', type: 'success', sceneIndex: 1 },
      { id: 'bn-l5', agentName: '销售分析师智能体', agentRole: '数据分析师', avatar: '📊', timestamp: '19:30:18', message: '预警：甜茶类（冰红茶、阿萨姆奶茶）环比流速降 22%，积压风险上升。', type: 'warning', sceneIndex: 1 },

      { id: 'bn-l6', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '19:30:22', message: '获取外部信号：已加载鸟巢 8 月演唱会日历。薛之谦收官（8/1–2）+ 汪苏泷十连开（8/14–30）。', type: 'info', sceneIndex: 2 },
      { id: 'bn-l7', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '19:30:25', message: '社媒爬虫：场馆周边「无糖茶」「电解质水」「椰子水」热度 +160%。', type: 'success', sceneIndex: 2 },
      { id: 'bn-l8', agentName: '趋势侦察智能体', agentRole: '趋势侦察', avatar: '🔍', timestamp: '19:30:28', message: '活动库：散场高峰日为 8/1、2、15、22、29（周六 + 收官），单场客流高达 9 万。', type: 'success', sceneIndex: 2 },

      { id: 'bn-l9', agentName: 'CRM 智能体', agentRole: '客户关系', avatar: '💬', timestamp: '19:30:32', message: '处理反馈：19 条 App 请求在 22:00 散场后点名「冰镇电解质 / 无糖茶」，甜茶零请求。', type: 'warning', sceneIndex: 3 },
      { id: 'bn-l10', agentName: '库存智能体', agentRole: '物流', avatar: '📦', timestamp: '19:30:35', message: '库存扫描：天然水降至 9 瓶，电解质水降至 12 瓶，活动日 22:00 前即告售罄。', type: 'warning', sceneIndex: 3 },
      { id: 'bn-l11', agentName: '库存智能体', agentRole: '物流', avatar: '📦', timestamp: '19:30:38', message: '滞销警报：甜茶（冰红茶 3 件、阿萨姆 4 件）无人问津，冰饮货道分配不足。', type: 'warning', sceneIndex: 3 },

      { id: 'bn-l12', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '19:30:42', message: '编译 AI 决策矩阵。权重：销售(30%)、需求(20%)、毛利(20%)、技能(15%)、风险(10%)、趋势(5%)。', type: 'info', sceneIndex: 4 },
      { id: 'bn-l13', agentName: 'CEO 智能体', agentRole: '总监', avatar: '🤖', timestamp: '19:30:45', message: '矩阵编译完成：水(91)、电解质(89)、红牛(85)、无糖乌龙(87) 归为增补；椰子水(75)、薏米水(72)、冷泡乌龙(75) 归为试销。', type: 'success', sceneIndex: 4 }
    ]
  }
];
