import { Scenario, FactorWeight } from '../types';
import type { Lang } from '../i18n';
import { SCENARIOS_ZH } from './data.zh';
import cbdImg from '../assets/scenarios/cbd-office.jpg';
import legoImg from '../assets/scenarios/legoland.jpg';
import birdImg from '../assets/scenarios/birdnest-subway.jpg';

export const FACTOR_WEIGHTS_EN: FactorWeight[] = [
  { name: 'Sales Performance', key: 'salesPerformance', weight: 30, color: '#3b82f6', description: 'Historical velocity and SKU turnover rate' },
  { name: 'Customer Demand', key: 'customerDemand', weight: 20, color: '#10b981', description: 'Direct feedback, requests, and category satisfaction' },
  { name: 'Profit Margin', key: 'profitMargin', weight: 20, color: '#8b5cf6', description: 'Net margin contribution per unit' },
  { name: 'Scenario Match', key: 'scenarioMatch', weight: 15, color: '#f59e0b', description: 'Alignment with location-specific customer personas' },
  { name: 'Inventory Risk', key: 'inventoryRisk', weight: 10, color: '#ef4444', description: 'Expiration date buffer and stockout/melting hazards' },
  { name: 'Market Trend', key: 'marketTrend', weight: 5, color: '#06b6d4', description: 'Regional social media search surges and macro signals' }
];

export const calculateWeightedScore = (scores: {
  salesPerformance: number;
  customerDemand: number;
  profitMargin: number;
  scenarioMatch: number;
  inventoryRisk: number;
  marketTrend: number;
}) => {
  return Math.round(
    (scores.salesPerformance * 0.30) +
    (scores.customerDemand * 0.20) +
    (scores.profitMargin * 0.20) +
    (scores.scenarioMatch * 0.15) +
    (scores.inventoryRisk * 0.10) +
    (scores.marketTrend * 0.05)
  );
};

export const SCENARIOS_EN: Scenario[] = [
  {
    id: 'cbd-office',
    name: 'CBD Office Smart Cabinet',
    image: cbdImg,
    subtitle: 'Shenzhen Nanshan · Dual-peak office hub',
    location: 'Shenzhen Nanshan, Yuehai St · Kexing Science Park, Bldg B Lobby',
    loadedSkill: 'Office Worker Behavior Skill',
    skillIcon: 'Briefcase',
    avatar: '🏢',
    description: 'Serving high-earning white-collar professionals with extreme twin peaks at morning (8:00-9:30) and lunch (12:00-13:30). Strong demand for premium caffeine, sugar-free healthy drinks, and meal-replacement snacks; price-insensitive with high membership repurchase loyalty.',
    metrics: {
      dailySales: '¥4,180',
      activeUsers: '520/day',
      stockLevel: '76%',
      efficiency: '95.1%'
    },
    analyzePoints: [
      'Twin peaks: morning caffeine + lunch meal-replacement',
      'Sugar-free / functional / natural healthy-drink upgrade',
      'Rigid replenishment window (must be full before 7:45 AM)',
      'Membership repurchase & cross-building sales correlation'
    ],
    products: [
      {
        id: 'cbd-electrolyte',
        name: 'Electrolyte Water (Citrus)',
        category: 'Functional Drink',
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
          inventoryRisk: 95, // high safety
          marketTrend: 98
        },
        weightedScore: 93,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Increase stock to maximum capacity. High-temperature forecast combined with morning commute hydration trends indicates a 45% demand surge.',
        replenishQty: 40,
        whyDecided: {
          title: 'Heatwave + Commuter Demand Surge',
          description: 'Electrolyte Water is showing extreme velocity. The combination of an upcoming 35°C heatwave and social trends around "morning hydration" makes this our highest priority SKU.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'External Signals', finding: 'Shenzhen temperature rising to 35°C tomorrow. "Hydration hacks" trending +180% on local social media.', status: 'success' },
            { agent: 'Sales Analyst Agent', role: 'Velocity Analysis', finding: 'SKU turnover rate is 3.4x faster than typical category average under similar weather conditions.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Matching', finding: 'Shenzhen Nanshan tech-park workers purchase hydration drinks pre-workout or post-commute. High match with Office Worker Behavior Skill.', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-coldbrew',
        name: 'Cold Brew Black Coffee',
        category: 'Premium Coffee',
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
        recommendationDetails: 'Replenish to full capacity urgently. Morning 8:00-9:00 caffeine demand is inelastic with a ¥9.5/unit margin, and 14 "out of stock" pings already fired — must arrive before the 7:45 replenishment window.',
        replenishQty: 35,
        whyDecided: {
          title: 'Inelastic Morning Caffeine Peak',
          description: 'Cold Brew is the primary choice for office workers arriving between 8:00 AM and 9:00 AM. High profit margins dictate that we must never stock out.',
          sources: [
            { agent: 'CRM Agent', role: 'Customer Feedback', finding: 'Received 14 "out of stock" feedback pings for cold brew coffee in the last 48 hours.', status: 'warning' },
            { agent: 'Inventory Agent', role: 'Stock Alert', finding: 'Current stock (5 units) will deplete within the first 25 minutes of morning rush hour.', status: 'warning' },
            { agent: 'CEO Decision', role: 'Profit Optimization', finding: 'Prioritize premium coffee due to high profit margin (¥9.50/unit net profit) and strong customer loyalty.', status: 'success' }
          ]
        }
      },
      {
        id: 'cbd-coconut',
        name: 'Premium Coconut Water',
        category: 'Natural Hydration',
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
        recommendationDetails: 'Allocate trial slots. Coconut water is trending heavily in neighboring high-end gyms. Test a small expansion to capture local health-conscious office demographic.',
        replenishQty: 15,
        whyDecided: {
          title: 'Health-Conscious Gym Demographic Test',
          description: 'While historical sales are moderate, coconut water is experiencing a massive macro-trend surge and matches the active-lifestyle CBD professional profile.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Trend Mining', finding: 'Coconut water search volume is up 45% week-over-week. Strong correlation with high-end fitness clubs nearby.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'Office worker profile shows high willingness to pay premium prices for natural, low-sugar beverages.', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-shake',
        name: 'High-Protein Meal-Replacement Shake',
        category: 'Meal Replacement',
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
        recommendationDetails: 'Trial 20 bottles. The meal-replacement shake is a differentiated "lunch light-meal substitute" category for offices; lunchtime replacement demand is rising — validate conversion and repurchase in a small batch.',
        replenishQty: 20,
        whyDecided: {
          title: 'Lunch Meal-Replacement Pilot',
          description: 'CBD white-collar workers show strong lunchtime replacement demand; the shake fills an empty slot. Pilot first, then decide on scale-up based on repurchase.',
          sources: [
            { agent: 'CRM Agent', role: 'Customer Feedback', finding: 'Lunchtime "low-cal / meal-replacement" requests +9 this week with no matching slot.', status: 'warning' },
            { agent: 'Trend Scout Agent', role: 'Trend Mining', finding: '"Office healthy light meals" and "high-protein" social content up +120%.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'White-collar persona shows high willingness to pay for convenient health.', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-oolong',
        name: 'Sugar-Free Oolong Tea',
        category: 'Tea',
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
        recommendationDetails: 'Maintain current inventory levels. Sales are highly stable. No immediate replenishment needed as stock is sufficient for 2.5 days of normal demand.',
        whyDecided: {
          title: 'Stable Performance, Adequate Stock',
          description: 'Sugar-Free Oolong Tea is a reliable "anchor" product. Stock levels are healthy, and demand is stable. No action required.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Stability Check', finding: 'Daily sales variance is less than 5%. Extremely predictable demand pattern.', status: 'info' },
            { agent: 'Inventory Agent', role: 'Stock Level Check', finding: 'Current stock of 22 units is optimal for the next 48 hours.', status: 'success' }
          ]
        }
      },
      {
        id: 'cbd-chips',
        name: 'Sea Salt Potato Chips',
        category: 'Snack',
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
        recommendationDetails: 'Hold current stock. Salty snacks experience lower velocity in office buildings during summer, as workers prefer refreshing beverages and cold snacks.',
        whyDecided: {
          title: 'Low Summer Snack Velocity',
          description: 'Potato chips have low priority during hot weeks. Keep current stock levels and do not replenish to save physical slots for high-demand beverages.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Seasonal Analysis', finding: 'Snack categories drop 18% in sales volume when outdoor temperature exceeds 30°C.', status: 'info' }
          ]
        }
      },
      {
        id: 'cbd-chocolate',
        name: 'Premium Chocolate Bar',
        category: 'Snack',
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
          inventoryRisk: 20, // high risk of melting/expiry
          marketTrend: 22
        },
        weightedScore: 39,
        initialAction: 'Reduce',
        finalAction: 'Reduce',
        recommendationDetails: 'Reduce inventory allocation by 60%. High risk of chocolate melting due to cabinet door opening frequency in summer. Low turnover rate.',
        promotionDetails: '20% discount to accelerate clearance of near-expiry batch.',
        whyDecided: {
          title: 'Melting Hazard & Expiry Clearance',
          description: 'Chocolate sales have collapsed due to seasonal preferences. Furthermore, inventory reports show this batch has a 7-day expiration threshold remaining.',
          sources: [
            { agent: 'Inventory Agent', role: 'Quality Risk', finding: 'Cabinet internal temperature fluctuation during peak usage poses a melting risk to chocolate. Expiration in 7 days.', status: 'warning' },
            { agent: 'CRM Agent', role: 'Feedback Analysis', finding: 'Zero positive social mentions or purchases of heavy chocolate snacks in the office segment this week.', status: 'info' },
            { agent: 'CEO Decision', role: 'Risk Mitigation', finding: 'Enforce a 20% discount immediately to clear the remaining 14 bars and reallocate slots to Cold Brew.', status: 'warning' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'cbd-l1', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '08:00:01', message: 'Initializing analysis for **Shenzhen Nanshan Kexing Science Park Cabinet**. Activating Office Worker Behavior Skill...', type: 'info', sceneIndex: 0 },
      { id: 'cbd-l2', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '08:00:03', message: 'Assigning tasks: Sales Analyst (historical twin-peak velocity), Trend Scout (weather/social), CRM (membership feedback), Inventory (replenishment window & risk).', type: 'info', sceneIndex: 0 },

      { id: 'cbd-l3', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '08:00:12', message: 'Scanning historical data: aggregated morning/lunch twin-peak velocity across 35,000 similar office cabinets over 3 summers.', type: 'info', sceneIndex: 1 },
      { id: 'cbd-l4', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '08:00:15', message: 'Identified twin pillars: **Cold Brew** and **sugar-free hydration** drive 64% of office revenue; morning peak = 71% of daily sales.', type: 'success', sceneIndex: 1 },
      { id: 'cbd-l5', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '08:00:18', message: 'Dead-stock alert: SKU "Premium Chocolate Bar" turns only 0.1 units/day, far below the efficiency threshold.', type: 'warning', sceneIndex: 1 },

      { id: 'cbd-l6', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '08:00:22', message: 'External signal: Weather API forecasts a **35°C** high for Shenzhen tomorrow with high humidity; "returning-south" damp spells likely.', type: 'info', sceneIndex: 2 },
      { id: 'cbd-l7', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '08:00:25', message: 'Social listening: "cold brew", "electrolyte water" and "sugar-free tea" surge **+180%** in Shenzhen Nanshan tech-park on Xiaohongshu/local-life.', type: 'success', sceneIndex: 2 },
      { id: 'cbd-l8', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '08:00:28', message: 'Local signal: two premium fitness centers opened within 200m of Building B, lifting demand for natural isotonic drinks.', type: 'success', sceneIndex: 2 },

      { id: 'cbd-l9', agentName: 'CRM Agent', agentRole: 'Customer Relations', avatar: '💬', timestamp: '08:00:32', message: 'Membership feedback: 14 "out of stock" Cold Brew app pings in 48h, plus +9 lunch meal-replacement requests.', type: 'warning', sceneIndex: 3 },
      { id: 'cbd-l10', agentName: 'Inventory Agent', agentRole: 'Logistics', avatar: '📦', timestamp: '08:00:35', message: 'Replenishment window check: Cold Brew down to 5 bottles (12%); if not refilled **before 7:45**, the morning peak is lost.', type: 'warning', sceneIndex: 3 },
      { id: 'cbd-l11', agentName: 'Inventory Agent', agentRole: 'Logistics', avatar: '📦', timestamp: '08:00:38', message: 'Quality risk: Chocolate Bar batch expires in 7 days; frequent door openings raise cabinet humidity — recommend immediate markdown.', type: 'warning', sceneIndex: 3 },

      { id: 'cbd-l12', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '08:00:42', message: 'Compiling AI Decision Matrix. Weights: Sales 30% / Demand 20% / Margin 20% / Skill 15% / Risk 10% / Trend 5%.', type: 'info', sceneIndex: 4 },
      { id: 'cbd-l13', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '08:00:45', message: 'Matrix sorted: Cold Brew (92) & Electrolyte Water (93) ⇒ INCREASE; High-Protein Shake ⇒ TEST; Chocolate (39) ⇒ REDUCE.', type: 'success', sceneIndex: 4 }
    ]
  },
  {
    id: 'legoland',
    name: 'Shanghai LEGO Park Smart Cabinet',
    subtitle: 'High-traffic family theme-park vending hub',
    location: 'Shanghai LEGO Park, Jinshan District',
    loadedSkill: 'Visitor Flow & Family Traffic Skill',
    skillIcon: 'ToyBrick',
    avatar: '🧱',
    description: 'Serving theme-park guests and family groups. Demand is driven by visitor volume, holidays, weather, parades and shows, plus social-media-trending healthy drinks for kids and parents.',
    metrics: {
      dailySales: '¥3,640',
      activeUsers: '910/day',
      stockLevel: '68%',
      efficiency: '89.5%'
    },
    analyzePoints: [
      'Visitor flow & cabinet pressure (infinisynapse: daily guests, weekend/weekday split, peak hours, family ratio)',
      'Seasonal demand rhythm (summer/winter break, May Day, National Day, weekends)',
      'Weather-driven demand (>35°C spikes hydration; rain drops footfall)',
      'Xiaohongshu trends (electrolyte water, sugar-free, coconut water, outdoor family hydration)'
    ],
    products: [
      {
        id: 'lego-icered',
        name: 'Kangshifu Iced Red Tea 500ml',
        category: 'Sweet Tea',
        icon: '🧋',
        currentStock: 14,
        capacity: 60,
        price: 3.0,
        cost: 1.2,
        scores: { salesPerformance: 85, customerDemand: 80, profitMargin: 72, scenarioMatch: 78, inventoryRisk: 80, marketTrend: 60 },
        weightedScore: 78,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Maintain current stock. A proven high-velocity sweet tea that families buy on impulse; stable seller across all park days.',
        whyDecided: {
          title: 'Stable Family Impulse Seller',
          description: 'Iced red tea is a reliable, low-risk seller for parent-child groups. Keep at baseline allocation.',
          sources: [
            { agent: 'Product Knowledge Agent', role: 'Sales Baseline', finding: 'Top-5 existing SKU with consistent weekday/weekend velocity. No action needed.', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-purewater',
        name: 'Puresome Water 550ml',
        category: 'Water',
        icon: '💧',
        currentStock: 9,
        capacity: 80,
        price: 2.5,
        cost: 0.8,
        scores: { salesPerformance: 98, customerDemand: 97, profitMargin: 60, scenarioMatch: 99, inventoryRisk: 98, marketTrend: 85 },
        weightedScore: 90,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Increase to max capacity. Hot-park days (>35°C) trigger a 200%+ surge in plain-water demand; infinisynapse weather rule flags 3 high-temperature days ahead.',
        replenishQty: 70,
        whyDecided: {
          title: 'Weather-Rule Hydration Spike',
          description: 'Plain water is the #1 hydration item under heat alerts. infinisynapse weather intelligence shows 35°C+ on 3 of the next 7 days, so we raise water allocation to full capacity.',
          sources: [
            { agent: 'Weather Intelligence Agent', role: 'Temperature Trigger', finding: 'Shanghai forecast: 35°C+ for 3 days. Rule >35°C ⇒ ↑ mineral water. Reallocate 70 units pre-stock.', status: 'success' },
            { agent: 'Visitor Flow Agent', role: 'Peak Pressure', finding: 'Weekend footfall 2.3x weekday; water cabinets stock out by 14:00 without mid-day refill.', status: 'warning' }
          ]
        }
      },
      {
        id: 'lego-pepsi',
        name: 'Pepsi Cola 600ml',
        category: 'Cola',
        icon: '🥤',
        currentStock: 18,
        capacity: 60,
        price: 3.5,
        cost: 1.3,
        scores: { salesPerformance: 82, customerDemand: 78, profitMargin: 75, scenarioMatch: 76, inventoryRisk: 82, marketTrend: 65 },
        weightedScore: 76,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Maintain. Core cola demand is steady with families; keep standard slot allocation.',
        whyDecided: {
          title: 'Core Cola Baseline',
          description: 'Pepsi is a dependable baseline SKU. No repositioning needed for the park persona.',
          sources: [
            { agent: 'Product Knowledge Agent', role: 'Baseline', finding: 'Top-5 existing SKU, stable velocity. Maintain.', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-dongpeng',
        name: 'Dongpeng Special Drink 500ml',
        category: 'Energy',
        icon: '⚡',
        currentStock: 12,
        capacity: 50,
        price: 4.0,
        cost: 1.6,
        scores: { salesPerformance: 70, customerDemand: 68, profitMargin: 80, scenarioMatch: 65, inventoryRisk: 78, marketTrend: 62 },
        weightedScore: 72,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Maintain. Energy drinks attract tired parents and teens late in the day; modest but steady.',
        whyDecided: {
          title: 'Late-day Energy Niche',
          description: 'Dongpeng serves the late-afternoon fatigue niche among parents and older kids. Keep at current level.',
          sources: [
            { agent: 'Product Knowledge Agent', role: 'Baseline', finding: 'Existing SKU, niche but stable. Maintain.', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-jasmine',
        name: 'Kangshifu Jasmine Honey Tea 500ml',
        category: 'Sweet Tea',
        icon: '🍵',
        currentStock: 22,
        capacity: 50,
        price: 3.0,
        cost: 1.2,
        scores: { salesPerformance: 45, customerDemand: 40, profitMargin: 74, scenarioMatch: 35, inventoryRisk: 60, marketTrend: 38 },
        weightedScore: 48,
        initialAction: 'Maintain',
        finalAction: 'Reduce',
        recommendationDetails: 'Reduce allocation. Sweet milk tea is a low-match item for an active, heat-driven park crowd; capital is better spent on hydration and electrolyte SKUs.',
        promotionDetails: 'Mark down remaining stock; do not replenish beyond safety buffer.',
        whyDecided: {
          title: 'Low-match Sweet Tea',
          description: 'Under the park hydration persona, jasmine honey tea underperforms versus water/electrolyte. Product Knowledge Agent flags it as low-match — cut slots and reallocate.',
          sources: [
            { agent: 'Product Knowledge Agent', role: 'Match Scoring', finding: 'Scenario match 35/100. Lowest among existing SKUs. Recommend reduce.', status: 'warning' },
            { agent: 'CEO Decision', role: 'Slot Reallocation', finding: 'Free 20 slots from jasmine tea → reallocate to electrolyte water and coconut water.', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-alienergy',
        name: 'Genki Forest Alien Electrolyte 500ml',
        category: 'Electrolyte',
        icon: '🧪',
        currentStock: 6,
        capacity: 70,
        price: 6.0,
        cost: 2.4,
        scores: { salesPerformance: 95, customerDemand: 96, profitMargin: 85, scenarioMatch: 97, inventoryRisk: 90, marketTrend: 98 },
        weightedScore: 92,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: 'Scale up aggressively. infinisynapse social scan shows electrolyte water discussion +180% in 30 days near the park; weather rule also lifts it on hot days.',
        replenishQty: 62,
        whyDecided: {
          title: 'Trend + Weather Double Boost',
          description: 'Electrolyte water is the single hottest category: +180% Xiaohongshu buzz plus a heat-alert lift. Highest weighted score — promote to flagship slot.',
          sources: [
            { agent: 'Xiaohongshu Trend Agent', role: 'Social Listening', finding: 'Electrolyte water +180% in 30 days; keywords 夏天/遛娃/户外/补水. Recommend Alien Electrolyte & Pocari.', status: 'success' },
            { agent: 'Weather Intelligence Agent', role: 'Heat Trigger', finding: 'Rule >35°C ⇒ ↑ electrolye water. Pre-stock 62 units.', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-coconut',
        name: 'Coconut Water 350ml',
        category: 'Coconut Water',
        icon: '🥥',
        currentStock: 5,
        capacity: 50,
        price: 8.0,
        cost: 3.2,
        scores: { salesPerformance: 80, customerDemand: 85, profitMargin: 90, scenarioMatch: 88, inventoryRisk: 75, marketTrend: 90 },
        weightedScore: 85,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: 'Increase. Coconut water trends with health-conscious parents and appears in park picnic posts; weather rule also lifts it on hot days.',
        replenishQty: 42,
        whyDecided: {
          title: 'Health & Heat Aligned',
          description: 'Coconut water matches the parent health trend and the >35°C hydration lift. High margin makes it a revenue driver.',
          sources: [
            { agent: 'Weather Intelligence Agent', role: 'Heat Trigger', finding: 'Rule >35°C ⇒ ↑ coconut water. Add to hot-day mix.', status: 'success' },
            { agent: 'Xiaohongshu Trend Agent', role: 'Social Listening', finding: 'Coconut water featured in family picnic notes; rising intent.', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-olytea',
        name: 'Oriental Leaf Sugar-free Oolong 500ml',
        category: 'Sugar-free Tea',
        icon: '🍃',
        currentStock: 8,
        capacity: 60,
        price: 4.0,
        cost: 1.5,
        scores: { salesPerformance: 82, customerDemand: 84, profitMargin: 82, scenarioMatch: 86, inventoryRisk: 85, marketTrend: 92 },
        weightedScore: 83,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: 'Increase. Sugar-free tea is a top Xiaohongshu trend among health-aware parents; strong margin and park-fit.',
        replenishQty: 50,
        whyDecided: {
          title: 'Sugar-free Tea Momentum',
          description: 'Oriental Leaf sugar-free oolong rides the zero-sugar wave among parents. Good margin and strong scenario match — scale up.',
          sources: [
            { agent: 'Xiaohongshu Trend Agent', role: 'Social Listening', finding: 'Sugar-free tea trending; parents prefer zero-sugar for kids. Recommend Oriental Leaf.', status: 'success' }
          ]
        }
      },
      {
        id: 'lego-pocari',
        name: 'Pocari Sweat 500ml',
        category: 'Electrolyte',
        icon: '🧴',
        currentStock: 7,
        capacity: 60,
        price: 5.0,
        cost: 2.0,
        scores: { salesPerformance: 84, customerDemand: 86, profitMargin: 80, scenarioMatch: 90, inventoryRisk: 88, marketTrend: 90 },
        weightedScore: 84,
        initialAction: 'Test',
        finalAction: 'Increase',
        recommendationDetails: 'Increase. Pocari is the established electrolyte brand parents trust for kids after walking; pairs with Alien Electrolyte as a two-brand hydration wall.',
        replenishQty: 52,
        whyDecided: {
          title: 'Trusted Electrolyte Brand',
          description: 'Pocari Sweat is the household electrolyte name parents reach for after active park days. Complements Alien Electrolyte for full coverage.',
          sources: [
            { agent: 'Xiaohongshu Trend Agent', role: 'Social Listening', finding: 'Pocari Sweat recommended alongside electrolyte water for kids. Add to hydration wall.', status: 'success' },
            { agent: 'Product Knowledge Agent', role: 'Brand Fit', finding: 'Established electrolyte SKU; high family trust. Increase.', status: 'info' }
          ]
        }
      },
      {
        id: 'lego-vitc',
        name: 'Water-soluble C100 445ml',
        category: 'Vitamin C',
        icon: '🍊',
        currentStock: 10,
        capacity: 50,
        price: 4.5,
        cost: 1.8,
        scores: { salesPerformance: 62, customerDemand: 60, profitMargin: 78, scenarioMatch: 64, inventoryRisk: 80, marketTrend: 66 },
        weightedScore: 70,
        initialAction: 'Test',
        finalAction: 'Test',
        recommendationDetails: 'Trial only. Vitamin C juice is moderate-fit; test a small slot and watch weekend family uptake before scaling.',
        whyDecided: {
          title: 'Moderate-fit Trial',
          description: 'Vitamin C drink is a moderate match for the park persona. Keep as a small test slot and review after one peak cycle.',
          sources: [
            { agent: 'Product Knowledge Agent', role: 'Match Scoring', finding: 'Mid-match (64). Suggest test rather than scale.', status: 'info' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'lego-l1', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '06:30:01', message: 'Initializing analysis for Shanghai LEGO Park Smart Cabinet. Activating Visitor Flow & Family Traffic Skill (infinisynapse client: partner_1e8b...).', type: 'info', sceneIndex: 0 },
      { id: 'lego-l2', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '06:30:03', message: 'Assigning research tasks. Each sub-agent will call infinisynapse AI search with the park context.', type: 'info', sceneIndex: 0 },
      { id: 'lego-l3', agentName: 'Visitor Flow Agent', agentRole: 'Flow Analytics', avatar: '🧑‍🤝‍🧑', timestamp: '06:30:12', message: 'infinisynapse search: 上海乐高乐园 游客量预测 / 日均游客 / 客流趋势 / 亲子旅游客流. Result: daily ~12,000 guests; weekend 2.3x weekday; peak 11:00-15:00 & 17:30 dispersal; family ratio 78%.', type: 'success', sceneIndex: 1 },
      { id: 'lego-l4', agentName: 'Visitor Flow Agent', agentRole: 'Flow Analytics', avatar: '🧑‍🤝‍🧑', timestamp: '06:30:15', message: 'Cabinet pressure: weekend peak risks stockout by 14:00. Recommend hydration items replenished twice daily.', type: 'warning', sceneIndex: 1 },
      { id: 'lego-l5', agentName: 'Seasonal Agent', agentRole: 'Calendar', avatar: '📅', timestamp: '06:30:22', message: 'infinisynapse search: 2026中国节假日日历 / 上海暑假 / 上海寒假 / 亲子旅游旺季. Result: summer break (Jul-Aug) peak; May Day & National Day surges; weekends high.', type: 'success', sceneIndex: 2 },
      { id: 'lego-l6', agentName: 'Seasonal Agent', agentRole: 'Calendar', avatar: '📅', timestamp: '06:30:25', message: 'Replenishment cadence: 2 refills/day in summer; add pre-open refill on holidays (May Day, National Day).', type: 'info', sceneIndex: 2 },
      { id: 'lego-l7', agentName: 'Weather Intelligence Agent', agentRole: 'Meteorology', avatar: '🌤️', timestamp: '06:30:32', message: 'infinisynapse search: 上海未来7天天气 / 温度趋势 / 降雨概率 / 高温预警. Result: 35°C+ for 3 days, rain 2 days. Rule: >35°C ⇒ ↑ water/electrolyte/coconut; rain ⇒ ↓ guests & refill frequency.', type: 'success', sceneIndex: 3 },
      { id: 'lego-l8', agentName: 'Weather Intelligence Agent', agentRole: 'Meteorology', avatar: '🌤️', timestamp: '06:30:35', message: 'Heat-alert trigger: hydration-category weight +40% on the 3 hot days.', type: 'info', sceneIndex: 3 },
      { id: 'lego-l9', agentName: 'Xiaohongshu Trend Agent', agentRole: 'Social Listening', avatar: '📱', timestamp: '06:30:42', message: 'infinisynapse search: 上海乐高乐园 / 亲子游 / 夏日饮料 / 0糖 / 电解质水 / 椰子水. Result: electrolyte water +180% in 30 days; keywords 夏天/遛娃/户外/补水. Recommend Alien Electrolyte & Pocari.', type: 'success', sceneIndex: 3 },
      { id: 'lego-l10', agentName: 'Product Knowledge Agent', agentRole: 'Catalog', avatar: '🛒', timestamp: '06:30:48', message: 'Catalog: keep Top-5 existing (Iced Red Tea, Puresome, Pepsi, Dongpeng, Jasmine Honey Tea); add trending (Alien Electrolyte, Coconut, Oriental Leaf, Pocari); reduce low-match (Jasmine Honey Tea).', type: 'info', sceneIndex: 3 },
      { id: 'lego-l11', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '06:30:52', message: 'Compiling AI Decision Matrix. Weights: Sales 30%, Demand 20%, Margin 20%, Skill 15%, Risk 10%, Trend 5%.', type: 'info', sceneIndex: 4 },
      { id: 'lego-l12', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '06:30:55', message: 'Matrix compiled: Alien Electrolyte (92) & Puresome (90) ⇒ INCREASE; Jasmine Honey Tea (48) ⇒ REDUCE; Vitamin C100 (70) ⇒ TEST.', type: 'success', sceneIndex: 4 }
    ],
    image: legoImg
  },
  {
    id: 'birdnest-subway',
    isDemo: true,
    name: 'Birdnest Subway Smart Cabinet',
    image: birdImg,
    subtitle: 'Concert & transit hybrid vending hub',
    location: 'Beijing Olympic Park, Aoti Zhongxin Subway Stn B2',
    loadedSkill: 'Event & Transit Flow Skill',
    skillIcon: 'TrainFront',
    avatar: '🚇',
    description: 'Serving concert crowds and daily transit commuters at the Birdnest (National Stadium) subway exit. Demand is dominated by event-day surges, late-night dispersal thirst, and social-media-driven trial of trendy healthy drinks.',
    metrics: {
      dailySales: '¥3,180',
      activeUsers: '650/day',
      stockLevel: '74%',
      efficiency: '90.4%'
    },
    analyzePoints: [
      'Event-day footfall peaks (dispersal 22:00 - 23:30)',
      'Surge in sugar-free tea and electrolyte demand',
      'Transit commute + large-scale event hybrid persona',
      'Xiaohongshu (social) trends drive trial of net-red drinks'
    ],
    products: [
      {
        id: 'bn-water',
        name: 'Nongfu Spring Natural Water 550ml',
        category: 'Water',
        icon: '💧',
        currentStock: 9,
        capacity: 80,
        price: 3.0,
        cost: 0.9,
        scores: { salesPerformance: 99, customerDemand: 98, profitMargin: 65, scenarioMatch: 99, inventoryRisk: 98, marketTrend: 85 },
        weightedScore: 91,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Replenish to max capacity. Water is the absolute baseline for both commuters and post-concert dispersal. Peak event days require a 2.5x stock buffer.',
        replenishQty: 70,
        whyDecided: {
          title: 'Universal Baseline + Dispersal Thirst',
          description: 'Natural water is the highest-velocity SKU across all personas. On concert nights, tens of thousands disperse past the B2 exit between 22:00-23:30, driving a sharp cold-drink thirst spike.',
          sources: [
            { agent: 'Inventory Agent', role: 'Stock Alert', finding: 'Current stock only 9 bottles (11% capacity). Will deplete within the first 30 minutes of dispersal on event days.', status: 'warning' },
            { agent: 'Sales Analyst Agent', role: 'Velocity Analysis', finding: 'Water holds the #1 turnover rate at this node, stable on weekdays and 3.2x higher on event Saturdays.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Matching', finding: 'Event & Transit Flow model rates water as the top scenario-match for the B2 dispersal corridor.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-iceblack',
        name: 'Kangshifu Iced Black Tea 500ml',
        category: 'Sweet Tea',
        icon: '🧋',
        currentStock: 14,
        capacity: 40,
        price: 4.0,
        cost: 1.6,
        scores: { salesPerformance: 90, customerDemand: 88, profitMargin: 70, scenarioMatch: 85, inventoryRisk: 90, marketTrend: 70 },
        weightedScore: 84,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Keep as the anchor sweet-tea SKU. Still a top-3 seller, but replan slots toward sugar-free tea to capture the health shift.',
        replenishQty: 40,
        whyDecided: {
          title: 'Anchor Sweet Tea, Shift Mix',
          description: 'Iced Black Tea remains a high-velocity classic, but its growth has plateaued versus sugar-free alternatives. Retain as the mass-market anchor while tilting the tea shelf toward sugar-free.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Turnover Rate', finding: 'Stable 14-unit/week velocity; down only 4% vs. last quarter, far more resilient than other sweet teas.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'Commuter daytime demand keeps one sweet-tea slot profitable; full sweet-tea shelf is no longer optimal.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-oolongsl',
        name: 'Oriental Leaf Sugar-Free Oolong 500ml',
        category: 'Sugar-Free Tea',
        icon: '🍵',
        currentStock: 8,
        capacity: 45,
        price: 5.5,
        cost: 2.2,
        scores: { salesPerformance: 88, customerDemand: 90, profitMargin: 75, scenarioMatch: 92, inventoryRisk: 90, marketTrend: 95 },
        weightedScore: 87,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Aggressively replenish. Sugar-free tea is the #1 trend category near the venue; social signals show +160% search surge.',
        replenishQty: 45,
        whyDecided: {
          title: 'Sugar-Free Tea Trend Leader',
          description: 'Oriental Leaf sugar-free oolong leads the venue-adjacent health-tea trend. High margin and near-perfect scenario match make it a priority replenishment.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Social Listening', finding: '"Sugar-free tea" search volume near Olympic Park venues is up +160% week-over-week.', status: 'success' },
            { agent: 'CRM Agent', role: 'Feedback Analysis', finding: 'Post-22:00 dispersal requests for "sugar-free / 0-cal tea" outnumber sweet-tea requests 5-to-1.', status: 'warning' },
            { agent: 'Sales Analyst Agent', role: 'Velocity Analysis', finding: 'Sugar-free tea outsells sweet tea 1.4x on event Saturdays.', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-oolongsunt',
        name: 'Suntory Sugar-Free Oolong 500ml',
        category: 'Sugar-Free Tea',
        icon: '🍵',
        currentStock: 16,
        capacity: 25,
        price: 5.5,
        cost: 2.3,
        scores: { salesPerformance: 78, customerDemand: 80, profitMargin: 74, scenarioMatch: 88, inventoryRisk: 90, marketTrend: 90 },
        weightedScore: 81,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Hold current stock. Second sugar-free brand provides shelf breadth; demand is steady but not yet surge-level.',
        whyDecided: {
          title: 'Second Brand Shelf Breadth',
          description: 'Suntory sugar-free oolong complements the Oriental Leaf slot with a second brand, covering brand-loyal buyers without over-allocating slots.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Stability Check', finding: 'Daily variance under 8%. Predictable mid-tier velocity.', status: 'info' },
            { agent: 'Inventory Agent', role: 'Stock Level Check', finding: '16 units is optimal for the next 3 days of normal demand.', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-electrolyte',
        name: 'Genki Forest Alien Electrolyte 500ml',
        category: 'Functional Drink',
        icon: '⚡',
        currentStock: 12,
        capacity: 50,
        price: 6.0,
        cost: 2.4,
        scores: { salesPerformance: 85, customerDemand: 95, profitMargin: 78, scenarioMatch: 96, inventoryRisk: 92, marketTrend: 98 },
        weightedScore: 89,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Urgently replenish. Electrolyte water is the must-have post-concert thirst item; event-day demand is projected 3x normal.',
        replenishQty: 50,
        whyDecided: {
          title: 'Post-Concert Electrolyte Spike',
          description: 'After energetic shows, crowds leaving the B2 exit crave electrolyte replenishment. Highest scenario-match and trend score in the portfolio.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Micro-demographics', finding: 'Electrolyte / isotonic search intent peaks 22:00-23:30 on event nights (+210% vs. baseline).', status: 'success' },
            { agent: 'Inventory Agent', role: 'Stock Alert', finding: 'Only 12 units left; will stock out before 22:00 dispersal on any concert Saturday.', status: 'warning' },
            { agent: 'Scenario Skill Agent', role: 'Persona Matching', finding: 'Event & Transit Flow model ranks electrolyte as the #1 need-state for the dispersal corridor.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-coconut',
        name: 'Coconut Water 350ml',
        category: 'Natural Hydration',
        icon: '🥥',
        currentStock: 6,
        capacity: 20,
        price: 9.0,
        cost: 3.8,
        scores: { salesPerformance: 60, customerDemand: 82, profitMargin: 80, scenarioMatch: 85, inventoryRisk: 75, marketTrend: 96 },
        weightedScore: 75,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: 'Allocate trial slots. Coconut water is a net-red (social-media) hit with strong electrolyte positioning; test a small batch to gauge venue fit.',
        replenishQty: 15,
        whyDecided: {
          title: 'Net-Red Electrolyte Trial',
          description: 'Coconut water bridges the electrolyte and health-trend narratives. Low historical velocity but extreme macro-trend momentum makes it ideal for a capped trial.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Trend Mining', finding: 'Coconut water is a 2026 breakout category; "fitness hydration" posts up +180% on Xiaohongshu.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'Young concert-goers show high willingness to try photogenic, health-positioned drinks.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-assam',
        name: 'Uni-President Assam Milk Tea 500ml',
        category: 'Milk Tea',
        icon: '🥛',
        currentStock: 17,
        capacity: 20,
        price: 6.0,
        cost: 2.5,
        scores: { salesPerformance: 82, customerDemand: 84, profitMargin: 72, scenarioMatch: 80, inventoryRisk: 86, marketTrend: 78 },
        weightedScore: 80,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Hold stock. Replaces the weaker condensed-milk tea with a proven mass-market milk-tea SKU that fits commuter cravings.',
        whyDecided: {
          title: 'Proven Milk-Tea Anchor',
          description: 'Assam milk tea is a reliable, broadly liked SKU. It replaces the discontinued condensed-milk tea and holds a steady commuter daytime slot.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Velocity Check', finding: 'Stable 3-4 units/day; milk tea remains a commuter staple.', status: 'info' },
            { agent: 'CRM Agent', role: 'Feedback Analysis', finding: 'Milk-tea requests persist; condensed-milk variant had near-zero repurchase.', status: 'warning' }
          ]
        }
      },
      {
        id: 'bn-dongpeng',
        name: 'Dongpeng Special Energy 500ml',
        category: 'Functional Drink',
        icon: '⚡',
        currentStock: 15,
        capacity: 30,
        price: 5.5,
        cost: 2.2,
        scores: { salesPerformance: 76, customerDemand: 82, profitMargin: 76, scenarioMatch: 84, inventoryRisk: 88, marketTrend: 80 },
        weightedScore: 80,
        initialAction: 'Maintain',
        finalAction: 'Maintain',
        recommendationDetails: 'Maintain allocation. Energy drink covers late-night dispersal and post-show fatigue; solid, predictable performer.',
        whyDecided: {
          title: 'Late-Night Energy Coverage',
          description: 'Dongpeng covers the late-night energy need as crowds disperse. Stable margin and demand justify keeping its current slot.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Time-of-Day Study', finding: 'Energy-drink sales skew to 21:00-23:30 on event nights.', status: 'info' },
            { agent: 'Inventory Agent', role: 'Capacity Check', finding: '15 units covers normal demand; top-up only on concert weeks.', status: 'success' }
          ]
        }
      },
      {
        id: 'bn-pepsi',
        name: 'Pepsi Cola 600ml',
        category: 'Cola',
        icon: '🥤',
        currentStock: 18,
        capacity: 40,
        price: 3.5,
        cost: 1.4,
        scores: { salesPerformance: 87, customerDemand: 85, profitMargin: 68, scenarioMatch: 82, inventoryRisk: 92, marketTrend: 65 },
        weightedScore: 81,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Increase stock. Cola is the universal impulse buy; on dispersal nights it pairs with water as a top seller.',
        replenishQty: 40,
        whyDecided: {
          title: 'Universal Impulse Staple',
          description: 'Pepsi is a mass-appeal cold-drink staple. High inventory safety and strong baseline velocity make it a priority replenish on event days.',
          sources: [
            { agent: 'Sales Analyst Agent', role: 'Velocity Analysis', finding: 'Cola is a top-3 SKU by unit volume every week, including non-event days.', status: 'success' },
            { agent: 'Inventory Agent', role: 'Stock Alert', finding: '18 units insufficient for a single concert Saturday dispersal.', status: 'warning' }
          ]
        }
      },
      {
        id: 'bn-redbull',
        name: 'Red Bull Energy 250ml',
        category: 'Functional Drink',
        icon: '⚡',
        currentStock: 7,
        capacity: 30,
        price: 6.5,
        cost: 2.6,
        scores: { salesPerformance: 80, customerDemand: 92, profitMargin: 82, scenarioMatch: 90, inventoryRisk: 88, marketTrend: 85 },
        weightedScore: 85,
        initialAction: 'Maintain',
        finalAction: 'Increase',
        recommendationDetails: 'Replenish and promote for late-night. Premium energy drink maps to post-show fatigue and high willingness-to-pay.',
        replenishQty: 30,
        whyDecided: {
          title: 'Premium Late-Night Energy',
          description: 'Red Bull captures the late-night, higher-margin energy segment that Dongpeng alone cannot serve. Strong demand and margin justify a dedicated slot.',
          sources: [
            { agent: 'CRM Agent', role: 'Feedback Analysis', finding: 'Multiple "need a real energy drink after the show" pings on event nights.', status: 'warning' },
            { agent: 'Trend Scout Agent', role: 'Micro-demographics', finding: 'Premium energy demand rises with late-night event footfall.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-barley',
        name: 'Haowangshui Coix Seed Barley Water 350ml',
        category: 'Health Water',
        icon: '🌿',
        currentStock: 4,
        capacity: 15,
        price: 7.0,
        cost: 2.8,
        scores: { salesPerformance: 55, customerDemand: 78, profitMargin: 82, scenarioMatch: 80, inventoryRisk: 70, marketTrend: 95 },
        weightedScore: 72,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: 'Trial batch only. A Xiaohongshu net-red "health water" with strong photogenic appeal; test before committing slots.',
        replenishQty: 12,
        whyDecided: {
          title: 'Net-Red Health-Water Test',
          description: 'Barley / coix-seed water is a breakout "clean-ingredient" drink on social media. High trend but unproven venue velocity — ideal capped trial.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Social Listening', finding: '"Health water" and "clean label" posts surging +150% among young Beijing consumers.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'Concert crowds are socially active and receptive to photogenic wellness drinks.', status: 'info' }
          ]
        }
      },
      {
        id: 'bn-coldbrewtea',
        name: 'Taixinan Sugar-Free Cold-Brew Oolong',
        category: 'Sugar-Free Tea',
        icon: '🍵',
        currentStock: 5,
        capacity: 15,
        price: 6.5,
        cost: 2.6,
        scores: { salesPerformance: 58, customerDemand: 80, profitMargin: 76, scenarioMatch: 86, inventoryRisk: 88, marketTrend: 92 },
        weightedScore: 75,
        initialAction: 'Maintain',
        finalAction: 'Test',
        recommendationDetails: 'Trial batch. A Xiaohongshu-favored sugar-free cold-brew with minimalist "water + tea leaves" labeling; test venue fit.',
        replenishQty: 12,
        whyDecided: {
          title: 'Minimalist Cold-Brew Trial',
          description: 'Cold-brew oolong with an ultra-clean ingredient list fits the sugar-free and "clean label" mega-trend. Low base velocity warrants a trial before scaling.',
          sources: [
            { agent: 'Trend Scout Agent', role: 'Trend Mining', finding: 'Sugar-free cold-brew tea is a top Xiaohongshu breakout; "clean label" is the year\'s hottest copy.', status: 'success' },
            { agent: 'Scenario Skill Agent', role: 'Persona Alignment', finding: 'Venue crowd indexes high on health and aesthetic-drink preferences.', status: 'info' }
          ]
        }
      }
    ],
    agentLogs: [
      { id: 'bn-l1', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '19:30:01', message: 'Initializing analysis for Birdnest Subway Smart Cabinet. Activating Event & Transit Flow Skill...', type: 'info', sceneIndex: 0 },
      { id: 'bn-l2', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '19:30:03', message: 'Assigning research tasks: Sales Analyst (Historical Sales), Trend Scout (Social & Events), CRM Agent (Feedback), Inventory Agent (Stock Levels).', type: 'info', sceneIndex: 0 },

      { id: 'bn-l3', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '19:30:12', message: 'Scanning historical sales: Analyzed 22,000 transit + event vending machines over 2 summer seasons.', type: 'info', sceneIndex: 1 },
      { id: 'bn-l4', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '19:30:15', message: 'Identified top categories: Water, sugar-free tea, and electrolyte drinks represent 71% of event-day revenue.', type: 'success', sceneIndex: 1 },
      { id: 'bn-l5', agentName: 'Sales Analyst Agent', agentRole: 'Data Analyst', avatar: '📊', timestamp: '19:30:18', message: 'Alert: Sweet teas (Iced Black Tea, Assam Milk Tea) show 22% lower velocity vs. last quarter. Overstock risk building.', type: 'warning', sceneIndex: 1 },

      { id: 'bn-l6', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '19:30:22', message: 'Fetching external signals: Birdnest August concert calendar loaded. Xue Zhiqian finale (Aug 1-2) + Wang Sulong 10-show run (Aug 14-30).', type: 'info', sceneIndex: 2 },
      { id: 'bn-l7', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '19:30:25', message: 'Social media crawler: "sugar-free tea", "electrolyte water", and "coconut water" trending +160% near Olympic Park venues.', type: 'success', sceneIndex: 2 },
      { id: 'bn-l8', agentName: 'Trend Scout Agent', agentRole: 'Trend Scout', avatar: '🔍', timestamp: '19:30:28', message: 'Event database: Peak dispersal dates Aug 1, 2, 15, 22, 29 (Saturdays + finales). Single-show crowd up to 90k.', type: 'success', sceneIndex: 2 },

      { id: 'bn-l9', agentName: 'CRM Agent', agentRole: 'Customer Relations', avatar: '💬', timestamp: '19:30:32', message: 'Processing feedback: 19 app pings requested "cold electrolyte / sugar-free tea" after 22:00 dispersal. Zero sweet-tea requests.', type: 'warning', sceneIndex: 3 },
      { id: 'bn-l10', agentName: 'Inventory Agent', agentRole: 'Logistics', avatar: '📦', timestamp: '19:30:35', message: 'Inventory scan: Natural Water down to 9 bottles. Electrolyte Water down to 12. Both stock out before 22:00 on event days.', type: 'warning', sceneIndex: 3 },
      { id: 'bn-l11', agentName: 'Inventory Agent', agentRole: 'Logistics', avatar: '📦', timestamp: '19:30:38', message: 'Dead stock alert: Sweet teas (Iced Black Tea 3 units, Assam Milk Tea 4 units) sit unsold; cold-drink slots under-allocated.', type: 'warning', sceneIndex: 3 },

      { id: 'bn-l12', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '19:30:42', message: 'Compiling AI Decision Matrix. Weights: Sales (30%), Demand (20%), Margin (20%), Skill (15%), Risk (10%), Trend (5%).', type: 'info', sceneIndex: 4 },
      { id: 'bn-l13', agentName: 'CEO Agent', agentRole: 'Director', avatar: '🤖', timestamp: '19:30:45', message: 'Matrix compiled: Water (91), Electrolyte (89), Red Bull (85), Sugar-Free Oolong (87) mapped to INCREASE. Coconut Water (75), Barley Water (72), Cold-Brew Oolong (75) mapped to TEST.', type: 'success', sceneIndex: 4 }
    ]
  }
];

// 因子权重（双语）
export const FACTOR_WEIGHTS_ZH: FactorWeight[] = [
  { name: '销售表现', key: 'salesPerformance', weight: 30, color: '#3b82f6', description: '历史流速与 SKU 周转率' },
  { name: '顾客需求', key: 'customerDemand', weight: 20, color: '#10b981', description: '直接反馈、请求与品类满意度' },
  { name: '利润空间', key: 'profitMargin', weight: 20, color: '#8b5cf6', description: '单件净利贡献' },
  { name: '场景匹配', key: 'scenarioMatch', weight: 15, color: '#f59e0b', description: '与地域客群画像的契合度' },
  { name: '库存风险', key: 'inventoryRisk', weight: 10, color: '#ef4444', description: '保质期缓冲与缺货/融化隐患' },
  { name: '市场趋势', key: 'marketTrend', weight: 5, color: '#06b6d4', description: '区域社媒搜索热度与宏观信号' }
];

/** 按当前语言返回场景数据 */
export function getScenarios(lang: Lang): Scenario[] {
  return lang === 'zh' ? SCENARIOS_ZH : SCENARIOS_EN;
}

/** 按当前语言返回因子权重 */
export function getFactorWeights(lang: Lang): FactorWeight[] {
  return lang === 'zh' ? FACTOR_WEIGHTS_ZH : FACTOR_WEIGHTS_EN;
}
