import { Reveal } from "./Reveal";

interface ProseSection {
  title: string;
  text?: string;
  items?: string[];
}

export function ProseSections({ sections, numbered = false }: { sections: ProseSection[]; numbered?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((s, i) => (
        <Reveal key={s.title} delay={0.03 * Math.min(i, 5)} as="section">
          <h2 className="font-display text-[1.6rem] leading-tight text-charcoal">
            {numbered && <span className="mr-3 text-oak">{i + 1}.</span>}
            {s.title}
          </h2>
          {s.text && <p className="mt-3 max-w-[70ch] text-[1rem] leading-relaxed text-charcoal/80">{s.text}</p>}
          {s.items && (
            <ul className="mt-3 flex max-w-[70ch] flex-col gap-2 pl-5 text-[1rem] leading-relaxed text-charcoal/80 marker:text-brass">
              {s.items.map((it) => (
                <li key={it} className="list-disc">
                  {it}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}
