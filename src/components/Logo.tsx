import React from 'react';

/**
 * Brand mark for VendSolution — a teal→cyan→sky gradient tile with a
 * white "V" (vending) and a node dot, evoking the smart-cabinet network.
 */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-9 w-9' }) => (
  <svg viewBox="0 0 40 40" className={className} role="img" aria-label="VendSolution">
    <defs>
      <linearGradient id="vs-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="55%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#vs-grad)" />
    <path
      d="M11.5 13 L20 27.5 L28.5 13"
      fill="none"
      stroke="#ffffff"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="27.5" r="3" fill="#ffffff" />
  </svg>
);

interface LogoProps {
  onHome?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onHome, className = '' }) => {
  const inner = (
    <div className="flex items-center gap-3">
      <LogoMark className="h-9 w-9 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]" />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white text-base sm:text-lg leading-none">
            Vend<span className="text-teal-300">Solution</span>
          </span>
          <span className="bg-teal-500/10 border border-teal-500/25 text-teal-300 text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-widest">
            AI
          </span>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono block -mt-0.5 leading-none">
          无人零售 AI 操作系统
        </span>
      </div>
    </div>
  );

  if (onHome) {
    return (
      <button
        onClick={onHome}
        title="返回首页"
        className={`group flex items-center cursor-pointer rounded-lg -ml-1 px-1 py-0.5 transition-opacity hover:opacity-80 ${className}`}
      >
        {inner}
      </button>
    );
  }
  return inner;
};
