import React from 'react';

/**
 * Lightweight, dependency-free Markdown renderer tailored for the dark "AI brain"
 * theme. Handles the subset the agent/CEO reports actually emit:
 *   # / ## / ### / ####  headings
 *   - / *  unordered lists       1. ordered lists
 *   >  blockquotes              ---  horizontal rules
 *   **bold**  *italic*  `code`  [text](url)
 * Paragraphs preserve single line breaks as <br/>.
 */
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  // Order matters: code first, then links, then bold, then italic.
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let i = 0;

  const codeRe = /`([^`]+)`/;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
  const boldRe = /\*\*([^*]+)\*\*/;
  const italRe = /(?<![\*])\*([^*]+)\*(?![\*])/;

  while (rest.length > 0) {
    // code
    const c = rest.match(codeRe);
    if (c && c.index !== undefined) {
      if (c.index > 0) nodes.push(rest.slice(0, c.index));
      nodes.push(
        <code key={`${keyPrefix}-c${i}`} className="px-1 py-0.5 rounded bg-zinc-900 text-cyan-300 font-mono text-[11px] border border-zinc-800">
          {c[1]}
        </code>
      );
      rest = rest.slice(c.index + c[0].length);
      i++;
      continue;
    }
    // link
    const l = rest.match(linkRe);
    if (l && l.index !== undefined) {
      if (l.index > 0) nodes.push(rest.slice(0, l.index));
      nodes.push(
        <a key={`${keyPrefix}-l${i}`} href={l[2]} target="_blank" rel="noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
          {l[1]}
        </a>
      );
      rest = rest.slice(l.index + l[0].length);
      i++;
      continue;
    }
    // bold
    const b = rest.match(boldRe);
    if (b && b.index !== undefined) {
      if (b.index > 0) nodes.push(rest.slice(0, b.index));
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="text-white font-semibold">
          {b[1]}
        </strong>
      );
      rest = rest.slice(b.index + b[0].length);
      i++;
      continue;
    }
    // italic
    const it = rest.match(italRe);
    if (it && it.index !== undefined) {
      if (it.index > 0) nodes.push(rest.slice(0, it.index));
      nodes.push(
        <em key={`${keyPrefix}-i${i}`} className="text-zinc-200">
          {it[1]}
        </em>
      );
      rest = rest.slice(it.index + it[0].length);
      i++;
      continue;
    }
    nodes.push(rest);
    break;
  }
  return nodes;
}

interface MarkdownProps {
  text: string;
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ text, className = '' }) => {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // blank
    if (line.trim() === '') {
      i++;
      continue;
    }

    // horizontal rule
    if (/^(\-{3,}|\*{3,})\s*$/.test(line.trim())) {
      blocks.push(<hr key={`hr-${i}`} className="border-zinc-800 my-2" />);
      i++;
      continue;
    }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const content = parseInline(h[2], `h${i}`);
      const cls =
        level === 1 ? 'text-base font-bold text-white mt-1'
        : level === 2 ? 'text-sm font-bold text-cyan-300 mt-2'
        : level === 3 ? 'text-xs font-bold text-zinc-100 mt-1.5'
        : 'text-xs font-semibold text-zinc-300';
      const headTags = ['h1', 'h2', 'h3', 'h4'] as const;
      const Tag: React.ElementType = headTags[level - 1] ?? 'p';
      blocks.push(
        <Tag key={`h-${i}`} className={cls}>
          {content}
        </Tag>
      );
      i++;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote key={`bq-${i}`} className="border-l-2 border-cyan-500/40 pl-3 py-0.5 text-zinc-400 italic text-xs leading-relaxed">
          {quote.map((q, qi) => (
            <div key={qi}>{parseInline(q, `bq${i}-${qi}`)}</div>
          ))}
        </blockquote>
      );
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1">
          {items.map((it, ii) => (
            <li key={ii} className="text-xs text-zinc-300 leading-relaxed marker:text-cyan-500">
              {parseInline(it, `ul${i}-${ii}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 space-y-1">
          {items.map((it, ii) => (
            <li key={ii} className="text-xs text-zinc-300 leading-relaxed marker:text-cyan-500">
              {parseInline(it, `ol${i}-${ii}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // paragraph (collect consecutive normal lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(\#{1,4}\s|>\s?|[-*]\s+|\d+\.\s+|(\-{3,}|\*{3,})\s*$)/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={`p-${i}`} className="text-xs text-zinc-300 leading-relaxed">
        {para.map((p, pi) => (
          <React.Fragment key={pi}>
            {parseInline(p, `p${i}-${pi}`)}
            {pi < para.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return <div className={`space-y-1.5 ${className}`}>{blocks}</div>;
};
