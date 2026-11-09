import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="border-b border-border px-6 py-16 md:px-12 md:py-[90px]"
    >
      <Reveal>
        <p className="text-[13px] tracking-[0.16em] text-muted uppercase">
          Process
        </p>
      </Reveal>
      <Reveal>
        <p className="mt-5 text-[27px] leading-[1.4] tracking-[-0.025em] md:text-[clamp(24px,2.8vw,38px)]">
          From a question to something useful.
        </p>
      </Reveal>
      <Reveal>
        <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-5">
          {processSteps.map(([title], index) => (
            <button
              key={title}
              className={cn(
                "rounded-[13px] border border-border p-4 text-left transition-[background,transform] hover:-translate-y-1 md:p-5",
                active === index && "border-accent bg-card",
              )}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              type="button"
            >
              <small className="mb-0 block text-[11px] text-muted md:mb-3.5">
                0{index + 1}
              </small>
              {title}
            </button>
          ))}
        </div>
      </Reveal>
      <p
        className="mt-6 min-h-[70px] max-w-[680px] text-[17px] text-muted md:text-xl"
        aria-live="polite"
      >
        {processSteps[active][1]}
      </p>
    </section>
  );
}
