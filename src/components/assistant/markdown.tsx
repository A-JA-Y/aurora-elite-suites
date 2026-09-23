import { Fragment, type ReactNode } from "react";

/**
 * Renders the small Markdown subset the assistant is allowed to use:
 * paragraphs, **bold**, *italic*, "-" bullets, "1." numbered lists,
 * [text](url) links, bare URLs and phone numbers. Never injects HTML.
 */
export function renderMarkdown(src: string): ReactNode {
  const lines = src.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={`p${blocks.length}`}>{inline(para.join(" "))}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const Tag = list.ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={`l${blocks.length}`} className={list.ordered ? "list-decimal pl-5" : "list-disc pl-5"}>
          {list.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </Tag>,
      );
      list = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const number = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || number) {
      flushPara();
      const ordered = Boolean(number);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? number)![1]);
      continue;
    }
    if (line === "") {
      flushPara();
      flushList();
      continue;
    }
    flushList();
    para.push(line.replace(/^#{1,6}\s+/, ""));
  }
  flushPara();
  flushList();
  return <>{blocks}</>;
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\((?:https?:\/\/|\/|mailto:|tel:)[^)\s]+\)|https?:\/\/[^\s)]+|\+91[\d\s]{10,13})/g;

function inline(text: string): ReactNode {
  const parts = text.split(INLINE);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <A key={i} href={link[2]}>{link[1]}</A>;
    if (/^https?:\/\//.test(part)) return <A key={i} href={part}>{part.replace(/^https?:\/\/(www\.)?/, "")}</A>;
    if (/^\+91[\d\s]+$/.test(part)) return <A key={i} href={`tel:${part.replace(/\s/g, "")}`}>{part}</A>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  const safe = /^(https?:\/\/|\/|mailto:|tel:)/.test(href) ? href : "/";
  return (
    <a
      href={safe}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-medium text-fairway underline decoration-fairway/40 underline-offset-2 hover:decoration-fairway"
    >
      {children}
    </a>
  );
}
