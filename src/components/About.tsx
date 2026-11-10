import { Reveal } from "@/components/Reveal";
import { aboutTags } from "@/content/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 gap-8 border-b border-border px-6 py-16 md:grid-cols-[4fr_7fr] md:gap-[8%] md:px-12 md:py-[90px]"
    >
      <Reveal>
        <p className="text-[13px] tracking-[0.16em] text-muted uppercase">
          About
        </p>
      </Reveal>
      <div>
        <Reveal>
          <p className="mb-7 text-[27px] leading-[1.4] tracking-[-0.025em] md:text-[clamp(24px,2.8vw,38px)]">
            I’m interested in the moment an intelligent system becomes genuinely
            useful.
          </p>
        </Reveal>
        <Reveal>
          <p className="mb-4 max-w-[760px] text-base text-muted md:text-lg">
            Not just a clever response, but a reliable workflow. A model that
            understands a dialect. An agent that uses the right tool. An
            automation that saves someone from doing the same task twice.
          </p>
        </Reveal>
        <Reveal>
          <p className="mb-4 max-w-[760px] text-base text-muted md:text-lg">
            I’m a Computer Science undergraduate specialising in Big Data and AI
            at the University of Wollongong in Dubai. My work spans multi-agent
            systems, model fine-tuning, machine learning, and workflow
            automation, with a focus on validation, evaluation, and
            optimization.
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-10 text-[13px] tracking-[0.16em] text-muted uppercase">
            Currently working with
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-4 flex flex-wrap gap-2">
            {aboutTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs transition-transform hover:-translate-y-0.5 hover:bg-card"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-6 font-serif text-[28px] text-accent italic">
            still learning. always building.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

