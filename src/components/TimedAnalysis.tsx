import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scenario } from '../types';
import { useLanguage } from '../i18n';
import { Markdown } from './Markdown';
import { CheckCircle, Sparkles } from 'lucide-react';

interface AgentSimulationProps {
  scenario: Scenario;
  onComplete: () => void;
  currentStage: number;
}

interface TimedAgent {
  key: string;
  name: string;
  avatar: string;
  color: string;
  lines: string[];
}

function agentStyle(name: string): { avatar: string; color: string } {
  const n = name.toLowerCase();
  if (n.includes('ceo') || n.includes('总监') || n.includes('决策')) return { avatar: '🤖', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20' };
  if (n.includes('sales') || n.includes('销售')) return { avatar: '📊', color: 'text-blue-400 border-blue-500/40 bg-blue-950/20' };
  if (n.includes('trend') || n.includes('趋势')) return { avatar: '🔍', color: 'text-amber-400 border-amber-500/40 bg-amber-950/20' };
  if (n.includes('crm') || n.includes('顾客') || n.includes('客户') || n.includes('会员')) return { avatar: '💬', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' };
  if (n.includes('inventory') || n.includes('库存') || n.includes('物流')) return { avatar: '📦', color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20' };
  return { avatar: '🧠', color: 'text-violet-400 border-violet-500/40 bg-violet-950/20' };
}

const CARD_MS = 5000; // 每张卡显示 5 秒
const CEO_MS = 3500;

export const TimedAnalysis: React.FC<AgentSimulationProps> = ({ scenario, onComplete }) => {
  const { lang } = useLanguage();
  const l = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  // Derive agents (in first-appearance order) from the scenario's scripted logs.
  const agents = useMemo<TimedAgent[]>(() => {
    const order: string[] = [];
    const map = new Map<string, TimedAgent>();
    for (const log of scenario.agentLogs) {
      if (!map.has(log.agentName)) {
        const st = agentStyle(log.agentName);
        map.set(log.agentName, { key: log.agentName, name: log.agentName, avatar: st.avatar, color: st.color, lines: [] });
        order.push(log.agentName);
      }
      map.get(log.agentName)!.lines.push(log.message);
    }
    return order.map((k) => map.get(k)!);
  }, [scenario]);

  // Build a fake CEO summary from the scenario's pre-defined product decisions.
  const ceoSummary = useMemo<string>(() => {
    const inc = scenario.products.filter((p) => p.finalAction === 'Increase').map((p) => `- **${p.name}**：${p.recommendationDetails}`);
    const test = scenario.products.filter((p) => p.finalAction === 'Test').map((p) => `- ${p.name}：${p.recommendationDetails}`);
    const keep = scenario.products.filter((p) => p.finalAction === 'Maintain').map((p) => `- ${p.name}`);
    const cut = scenario.products.filter((p) => p.finalAction === 'Reduce').map((p) => `- ${p.name}：${p.recommendationDetails}`);
    const parts = [
      `## 最终选品决策摘要`,
      `基于 ${agents.length} 位智能体的协同分析，针对「${scenario.name}」生成以下运营指令：`,
      ``,
      `**增补 / 补货**`,
      ...(inc.length ? inc : ['- （无）']),
      ``,
      `**试销 / 测试**`,
      ...(test.length ? test : ['- （无）']),
      ``,
      `**维持**`,
      ...(keep.length ? keep : ['- （无）']),
      ``,
      `**清减 / 清仓**`,
      ...(cut.length ? cut : ['- （无）']),
      ``,
      `> 综合历史销量、社媒趋势、天气与库存风险，优先保证高峰时段的供给匹配。`
    ];
    return parts.join('\n');
  }, [scenario, agents.length]);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<number[]>(() => agents.map(() => 0));
  const [done, setDone] = useState<boolean[]>(() => agents.map(() => false));
  const [ceoStatus, setCeoStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [ceoLines, setCeoLines] = useState(0);
  const [ceoText, setCeoText] = useState(ceoSummary);
  const rootRef = useRef<HTMLDivElement>(null);

  // Start at the top of the analysis so the process is always visible.
  useEffect(() => {
    rootRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  // Reveal each agent's lines across CARD_MS, then advance.
  useEffect(() => {
    if (ceoStatus !== 'idle') return;
    if (active >= agents.length) return;
    if (done[active]) {
      if (active < agents.length - 1) setActive((a) => a + 1);
      return;
    }
    const lines = agents[active].lines;
    const per = lines.length > 0 ? Math.max(350, Math.floor(CARD_MS / lines.length)) : CARD_MS;
    let k = 0;
    const id = setInterval(() => {
      k++;
      setShown((prev) => {
        const n = [...prev];
        n[active] = Math.min(k, lines.length);
        return n;
      });
      if (k >= lines.length) {
        clearInterval(id);
        window.setTimeout(() => {
          setDone((prev) => {
            const n = [...prev];
            n[active] = true;
            return n;
          });
          if (active < agents.length - 1) setActive((a) => a + 1);
          else setCeoStatus('running');
        }, Math.max(0, CARD_MS - k * per));
      }
    }, per);
    return () => clearInterval(id);
  }, [active, done, ceoStatus, agents]);

  // Reveal CEO summary across CEO_MS.
  useEffect(() => {
    if (ceoStatus !== 'running') return;
    const lines = ceoText.split('\n');
    const per = Math.max(250, Math.floor(CEO_MS / lines.length));
    let k = 0;
    const id = setInterval(() => {
      k++;
      setCeoLines(Math.min(k, lines.length));
      if (k >= lines.length) {
        clearInterval(id);
        window.setTimeout(() => setCeoStatus('done'), Math.max(0, CEO_MS - k * per));
      }
    }, per);
    return () => clearInterval(id);
  }, [ceoStatus, ceoText]);

  const allDone = ceoStatus === 'done';
  const ceoShownText = ceoText.split('\n').slice(0, ceoLines).join('\n');

  return (
    <div className="space-y-6" ref={rootRef} style={{ overflowAnchor: 'none' }}>
      {/* Prominent simulated-data banner */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-950/25 px-4 py-3">
        <span className="text-xl">⚠️</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-amber-300">【模拟数据】</div>
          <div className="text-xs text-amber-200/80">
            {l('本场景为演示用模拟数据，未调用任何真实 AI 模型，所有分析内容均为预置脚本。', 'This scenario uses DEMO DATA only — no real AI model is called; all analysis content is pre-scripted.')}
          </div>
        </div>
      </div>
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white">
            {l('多智能体选品分析', 'Multi-Agent Selection Analysis')}
          </h2>
          <span className="ml-1 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/40 text-amber-300 bg-amber-950/30">
            {l('【模拟数据】', 'SIMULATED DATA')}
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          {l(
            '以下为分阶段播放的多智能体协同分析过程（演示数据，每张卡片约 5 秒）。分析完成后将进入 CEO 决策与最终报告。',
            'A staged walkthrough of the multi-agent analysis (demo data, ~5s per card). After it finishes you will reach the CEO decision and final report.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agents.map((a, idx) => {
          const status = done[idx] ? 'done' : idx === active ? 'running' : idx < active ? 'done' : 'pending';
          const text = a.lines.slice(0, shown[idx]).join('\n');
          return (
            <div
              key={a.key}
              className={`bg-zinc-950/60 border rounded-xl p-4 transition-colors ${
                status === 'done' ? a.color : status === 'running' ? 'border-cyan-500/50' : 'border-zinc-800/80'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className={`h-10 w-10 rounded-xl border flex items-center justify-center text-xl ${a.color}`}>{a.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{a.name}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">{l('智能体', 'AGENT')}</span>
                </div>
                <div className="text-[10px] font-mono shrink-0">
                  {status === 'pending' && <span className="text-zinc-500">{l('排队中', 'Queued')}</span>}
                  {status === 'running' && (
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      {l('分析中…', 'Analyzing…')}
                    </span>
                  )}
                  {status === 'done' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      {l('完成', 'Done')}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs leading-relaxed min-h-[56px] max-h-60 overflow-y-auto">
                <Markdown text={text || (status === 'running' ? l('正在分析…', 'Analyzing…') : '')} />
              </div>
            </div>
          );
        })}
      </div>

      {/* CEO synthesis */}
      <AnimatePresence>
        {ceoStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-zinc-950/70 border rounded-xl p-5 transition-colors ${
              ceoStatus === 'done' ? 'border-violet-500/40' : 'border-zinc-800/80'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-xl border border-violet-500/40 bg-violet-950/20 text-violet-300 flex items-center justify-center text-2xl">
                👑
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">
                  {l('CEO 总结提炼 · 最终选品', 'CEO Synthesis · Final Selection')}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400">
                  {l('决策引擎', 'DECISION ENGINE')}
                </span>
              </div>
              <div className="text-[10px] font-mono shrink-0">
                {ceoStatus === 'running' && (
                  <span className="text-violet-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                    {l('汇总中…', 'Synthesizing…')}
                  </span>
                )}
                {ceoStatus === 'done' && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    {l('完成', 'Done')}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs leading-relaxed max-h-96 overflow-y-auto">
              <Markdown text={ceoShownText} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-600">
          {l('分阶段模拟分析 · 【模拟数据】', 'Staged simulation · SIMULATED DATA')}
        </span>
        <button
          disabled={!allDone}
          onClick={onComplete}
          className={`px-5 py-2.5 rounded-lg font-bold transition-all ${
            allDone
              ? 'bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500 text-zinc-950 hover:brightness-110 cursor-pointer shadow-md shadow-cyan-500/10'
              : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
          }`}
        >
          {l('生成最终选品报告 →', 'Generate Final Selection Report →')}
        </button>
      </div>
    </div>
  );
};

