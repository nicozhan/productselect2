// agon-agent/server — Two-tier analysis proxy (plain Node, zero deps)
//
// Tier 1: InfiniSynapse Server API — N beverage-focused data analysts (real newTask
//         calls, verifiable in the InfiniSynapse console; retail KB is retrieved when
//         relevant, e.g. productKnowledge cites the beverage bestseller report).
// Tier 2: Favor (chat-completions) — CEO role, synthesizes all reports into
//         the final SKU list. Per-scenario model: legoland uses qwen3-max,
//         cbd-office uses a ChatGPT-class model (default gpt-5.5).
//
// Keys stay server-side only. Frontend talks to /api/* here (Vite dev proxy).
import http from 'node:http';
import crypto from 'node:crypto';

const KEY = process.env.INFINISYNAPSE_API_KEY;
const SERVER = process.env.INFINISYNAPSE_SERVER || 'https://app.infinisynapse.cn';
const FAVOR_KEY = process.env.FAVOR_API_KEY;
const FAVOR = process.env.FAVOR_SERVER || 'https://api.favorais.com/v1';
const CEO_MODEL = process.env.CEO_MODEL || 'qwen3-max';      // legoland CEO
const CBD_CEO_MODEL = process.env.CBD_CEO_MODEL || 'gpt-5.5'; // cbd CEO (ChatGPT-class)
const PORT = Number(process.env.PORT || 8787);
const AGENT_TIMEOUT_MS = Number(process.env.AGENT_TIMEOUT_MS || 150000);

if (!KEY) {
  console.error('[server] FATAL: INFINISYNAPSE_API_KEY is not set. Export it before starting.');
  process.exit(1);
}
if (!FAVOR_KEY) {
  console.error('[server] FATAL: FAVOR_API_KEY is not set (needed for the CEO tier).');
  process.exit(1);
}

// ECHO_GATE: a prompt-only phrase used to recognise OUR task's user-echo on the
// globally-broadcast SSE wire. It never appears verbatim in model answers, so the echo
// is detected and SKIPPED (never recorded as answer text). Every prompt MUST end with it.
const ECHO_GATE = '输出结构清晰，300字以内';

// ---- Scenario config: agents (Tier1) + CEO model (Tier2) ----------------
// Beverage-only prompts, general-knowledge grounded; retail KB categories referenced so
// InfiniSynapse retrieval can kick in when relevant.
const LEGO_AGENTS = [
  { key: 'visitorFlow', prompt:
    '你是上海乐高乐园（上海金山区，2025开园，亚洲首座乐高乐园）智能售卖机【饮料选品】数据分析师，专注游客流量。\n' +
    '仅从饮料视角、基于通用知识分析：①工作日vs周末客流差异对饮料购买频次的影响；②暑期/节假日高峰的饮料消费需求特征；' +
    '③亲子家庭（2-12岁儿童+家长）的饮料消费习惯；④对园内饮料点位与SKU上量的启示。\n' +
    '可参考零售饮品常见品类（无糖茶/气泡水/功能饮料/即饮咖啡/牛奶），但结论须贴合乐高乐园场景。输出结构清晰，300字以内。' },
  { key: 'seasonal', prompt:
    '你是上海乐高乐园智能售卖机【饮料选品】数据分析师，专注节假日与寒暑假。\n' +
    '仅从饮料视角、基于通用知识：①法定节假日、暑假、五一/十一黄金周、圣诞元旦的客流与饮料消费波动；②四季对冷饮/热饮/瓶装水销量的影响；' +
    '③按季节与节假日给出饮料SKU上量与补货节奏（夏季冰饮、冬季热饮）。输出结构清晰，300字以内。' },
  { key: 'weather', prompt:
    '你是上海乐高乐园智能售卖机【饮料选品】数据分析师，专注天气影响。\n' +
    '仅从饮料视角、基于通用知识：①上海金山区高温（35℃+）对冰饮/瓶装水的拉动；②梅雨季/雨天对热饮（热巧克力、姜茶）与室内饮品的影响；' +
    '③"天气→饮料SKU"的动态补货策略。输出结构清晰，300字以内。' },
  { key: 'xiaohongshu', prompt:
    '你是上海乐高乐园智能售卖机【饮料选品】数据分析师，专注小红书趋势。\n' +
    '仅从饮料视角、基于通用知识：分析小红书上乐高乐园打卡、亲子游中饮料/饮品相关种草趋势（网红饮品、高颜值杯子、儿童友好低糖饮品、IP联名饮料）；' +
    '提炼①最热饮品话题；②对园内饮料选品的启发；③值得上架的新饮品。输出结构清晰，300字以内。' },
  { key: 'productKnowledge', prompt:
    '你是上海乐高乐园智能售卖机【饮料选品】数据分析师，专注商品知识。\n' +
    '基于通用饮料知识与零售常见饮品品类（无糖茶如东方树叶、气泡水、红牛功能饮料、雀巢即饮咖啡、每日鲜语/蒙牛牛奶等），' +
    '为乐高乐园游客（2-12岁亲子家庭）给出智能售卖机饮料 Top SKU 与建议新增饮品，并说明每款乐高场景适配理由。输出结构清晰，300字以内。' },
];

const CBD_AGENTS = [
  { key: 'visitorFlow', prompt:
    '你是深圳南山区粤海街道科兴科学园智能售卖机【饮料选品】数据分析师，专注写字楼白领人流量。\n' +
    '仅从饮料视角、基于通用知识分析：①早高峰 8:00-9:30 与午间 12:00-13:30 双峰的饮料购买特征；' +
    '②周边科技园（互联网/硬件企业）通勤客群与访客的饮料消费习惯；③双峰对柜内饮料 SKU 上量的启示。\n' +
    '可参考常见饮品（无糖茶/冷萃咖啡/气泡水/功能饮料/蛋白饮），但结论须贴合写字楼场景。输出结构清晰，300字以内。' },
  { key: 'seasonal', prompt:
    '你是深圳南山区科兴科学园智能售卖机【饮料选品】数据分析师，专注节假日与季节性。\n' +
    '仅从饮料视角、基于通用知识：①深圳"空城效应"（春节/国庆外地员工返乡，楼宇客流骤降）对饮料销量的影响；' +
    '②暑期实习生/暑期班、暑期高温对冷饮的拉动；③周末（南山科技园周末人少）vs 工作日的饮料消费差异；④按季节给出饮料 SKU 上量与补货节奏。输出结构清晰，300字以内。' },
  { key: 'weather', prompt:
    '你是深圳南山区科兴科学园智能售卖机【饮料选品】数据分析师，专注天气影响。\n' +
    '仅从饮料视角、基于通用知识：①深圳高温湿热（夏季常 35℃+）与"回南天"高湿对冰饮/瓶装水/热饮的影响；' +
    '②台风/暴雨对通勤客群与柜机销量的影响；③"天气→饮料 SKU"动态补货策略（如高温拉升冰美式、电解质水）。输出结构清晰，300字以内。' },
  { key: 'xiaohongshu', prompt:
    '你是深圳南山区科技园智能售卖机【饮料选品】数据分析师，专注小红书趋势。\n' +
    '仅从饮料视角、基于通用知识：分析小红书/本地生活上深圳南山科技园白领、打工人关于饮料的种草趋势（无糖茶、冷萃/冰美式、生椰/椰子水、电解质水、高蛋白代餐饮、0糖0卡）；' +
    '提炼①最热饮品话题；②对写字楼饮料选品的启发；③值得上架的新饮品。输出结构清晰，300字以内。' },
  { key: 'productKnowledge', prompt:
    '你是深圳南山区科兴科学园智能售卖机【饮料选品】数据分析师，专注商品知识。\n' +
    '基于通用饮料知识与零售常见饮品品类（无糖茶如东方树叶、冷萃/冰美式咖啡、椰子水、电解质水、气泡水、高蛋白代餐奶昔等），' +
    '为写字楼白领（注重健康、愿为品质溢价）给出智能售卖机饮料 Top SKU 与建议新增饮品，并说明每款写字楼场景适配理由。输出结构清晰，300字以内。' },
];

const CONFIG = {
  legoland: { name: '上海乐高乐园智能售卖机', agents: LEGO_AGENTS, ceoModel: CEO_MODEL },
  'cbd-office': { name: '深圳南山区科兴科学园智能柜', agents: CBD_AGENTS, ceoModel: CBD_CEO_MODEL },
};
function getConfig(scenario) {
  return CONFIG[scenario] || CONFIG['cbd-office'];
}

function sseWrite(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Tier 1: one InfiniSynapse agent (verified capture recipe, see lego_bev6) ----
//
// InfiniSynapse gotchas this handles:
// 1. /api/ai/events is a GLOBAL broadcast → ignore everything before our own echo,
//    and run agents SEQUENTIALLY so the wire carries only one task at a time.
// 2. The echo is detected via ECHO_GATE (prompt-only phrase) and SKIPPED — matching a
//    phrase that also appears in answers would record the echo itself as the "answer".
// 3. `partial:true` text events are CUMULATIVE SNAPSHOTS, not deltas → REPLACE the
//    buffer, never append (appending snowballs into megabytes of repeated text).
async function runAgent(agent, onPartial) {
  const connId = crypto.randomUUID();
  const esRes = await fetch(`${SERVER}/api/ai/events?connId=${connId}`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: 'text/event-stream' },
  });
  if (!esRes.ok || !esRes.body) throw new Error(`SSE open failed HTTP ${esRes.status}`);
  const reader = esRes.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let own = false, snapshot = '', finalText = '', taskId = null, last = Date.now();

  const pump = (async () => {
    try {
      while (true) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += dec.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf('\n\n')) >= 0) {
          const block = buf.slice(0, idx); buf = buf.slice(idx + 2);
          let data = '';
          for (const ln of block.split('\n')) if (ln.startsWith('data:')) data += ln.slice(5).trim();
          if (!data) continue;
          let parsed; try { parsed = JSON.parse(data); } catch { continue; }
          const msg = parsed?.message;
          if (!msg || msg.say !== 'text' || typeof msg.text !== 'string') continue;
          // Own echo → mark and SKIP (do not record).
          if (msg.text.includes(ECHO_GATE)) { own = true; taskId = msg.taskId ?? taskId; continue; }
          if (!own) continue; // global broadcast: ignore anything before our echo
          if (msg.partial) {
            snapshot = msg.text; // cumulative snapshot → REPLACE
            if (onPartial) onPartial(snapshot);
          } else if (msg.text.length > 80) {
            finalText = msg.text;
          }
          last = Date.now();
        }
      }
    } catch { /* reader cancelled */ }
  })();

  await sleep(400);
  const postRes = await fetch(`${SERVER}/api/ai/message`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'newTask', text: agent.prompt, connId, chatSettings: { mode: 'act' } }),
  });
  if (!postRes.ok) throw new Error(`newTask HTTP ${postRes.status}`);

  const start = Date.now();
  while (Date.now() - start < AGENT_TIMEOUT_MS) {
    await sleep(600);
    if (finalText && Date.now() - last > 8000) break;                       // final + quiet
    if (!finalText && snapshot.length > 100 && Date.now() - last > 25000) break; // stalled
  }
  try { reader.cancel(); } catch { /* ignore */ }
  await pump;
  const out = (finalText && !/提交|完成所有|分析阶段/.test(finalText)) ? finalText : snapshot;
  return { text: out.trim(), taskId };
}

// ---- Tier 2: Favor chat-completions as CEO (capped input + retry/backoff) ----
async function runCeo(findings, model, name, attempt = 1) {
  const sys =
    '你是智能售卖机选品的CEO，负责根据多位数据分析师（InfiniSynapse检索，均围绕"饮料"）的报告，' +
    '提炼核心洞察，并给出最终的智能售卖机【饮料】SKU选品清单与理由。语言简洁、可执行、只谈饮料。';
  const user =
    `以下是各数据分析师关于「${name}」的饮料选品报告：\n\n` +
    findings.map((f) => `【${f.key}】\n${f.text.slice(0, 1800)}`).join('\n\n') +
    '\n\n请输出：\n1) 核心洞察（3条，每条1句话，仅饮料）；\n2) 最终饮料选品清单（Top 8 饮品SKU，含品类与一句话理由，仅饮料）。';
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 120000);
  try {
    const res = await fetch(`${FAVOR}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${FAVOR_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: sys }, { role: 'user', content: user }],
        temperature: 0.7,
      }),
      signal: ctrl.signal,
    });
    const j = await res.json();
    const c = j?.choices?.[0]?.message?.content;
    if (!c) throw new Error('empty completion: ' + JSON.stringify(j).slice(0, 200));
    return c;
  } catch (e) {
    if (attempt < 4) {
      console.log(`[server] CEO(${model}) retry ${attempt}: ${e.message}`);
      await sleep(3000 * attempt);
      return runCeo(findings, model, name, attempt + 1);
    }
    throw e;
  } finally { clearTimeout(t); }
}

// ---- Orchestration: sequential Tier 1 → Tier 2, streamed to the frontend ----
async function runAll(res, scenario) {
  const cfg = getConfig(scenario);
  const findings = [];
  for (const agent of cfg.agents) {
    sseWrite(res, 'agent_start', { key: agent.key });
    try {
      const t0 = Date.now();
      const { text, taskId } = await runAgent(agent, (partial) => {
        sseWrite(res, 'agent_partial', { key: agent.key, text: partial.slice(0, 4000) });
      });
      findings.push({ key: agent.key, text });
      sseWrite(res, 'agent', { key: agent.key, text, taskId, ms: Date.now() - t0 });
    } catch (e) {
      sseWrite(res, 'agent', { key: agent.key, text: '', taskId: null, error: String(e?.message || e) });
    }
  }

  const ok = findings.filter((f) => f.text.length > 50);
  if (ok.length === 0) {
    sseWrite(res, 'error', { message: 'no agent produced a usable report; CEO skipped' });
  } else {
    sseWrite(res, 'ceo_start', { model: cfg.ceoModel, reports: ok.length });
    try {
      const t0 = Date.now();
      const ceoText = await runCeo(ok, cfg.ceoModel, cfg.name);
      sseWrite(res, 'ceo', { model: cfg.ceoModel, text: ceoText, ms: Date.now() - t0 });
    } catch (e) {
      sseWrite(res, 'ceo', { model: cfg.ceoModel, text: '', error: String(e?.message || e) });
    }
  }
  sseWrite(res, 'done', { ok: true });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  if (path === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      server: SERVER,
      scenarios: Object.entries(CONFIG).map(([id, c]) => ({ id, agents: c.agents.length, ceoModel: c.ceoModel })),
    }));
    return;
  }

  // Generalized live analysis stream, scenario-selected.
  if (path === '/api/analysis/stream') {
    const scenario = url.searchParams.get('scenario') || 'cbd-office';
    const cfg = getConfig(scenario);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    sseWrite(res, 'start', { total: cfg.agents.length, ceoModel: cfg.ceoModel, scenario: cfg.name });
    try {
      await runAll(res, scenario);
    } catch (e) {
      sseWrite(res, 'error', { message: String(e?.message || e) });
    }
    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`[server] two-tier proxy listening on http://localhost:${PORT}`);
  for (const [id, c] of Object.entries(CONFIG)) {
    console.log(`[server] scenario=${id}  tier1=${SERVER} (${c.agents.length} agents)  tier2=${FAVOR} (CEO: ${c.ceoModel})`);
  }
});
