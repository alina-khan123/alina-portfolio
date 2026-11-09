import { Reveal } from "@/components/Reveal";
import { credentials, skillGroups } from "@/content/portfolio";

export function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-border px-6 py-16 md:px-12 md:py-[90px]"
    >
      <Reveal>
        <p className="text-[13px] tracking-[0.16em] text-muted uppercase">
          Skills
        </p>
      </Reveal>
      <Reveal>
        <p className="mt-5 text-[27px] leading-[1.4] tracking-[-0.025em] md:text-[clamp(24px,2.8vw,38px)]">
          Tools I reach for, and the work behind them.
        </p>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-[70px] md:gap-y-[42px]">
        {Object.entries(skillGroups).map(([name, items]) => (
          <Reveal key={name}>
            <h3 className="mb-4 text-xs font-normal tracking-[0.15em] text-muted uppercase">
              {name}
            </h3>
            <ul className="m-0 list-none p-0">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3 py-2">
                  <span
                    className="grid size-6 place-items-center rounded-md border border-border text-[10px] text-accent"
                    aria-hidden="true"
                  >
                    {item.slice(0, 2)}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
        {credentials.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border px-3 py-1 text-xs"
          >
            {item}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
