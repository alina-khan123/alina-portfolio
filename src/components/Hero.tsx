import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/portfolio";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-svh flex-col justify-between border-0 px-6 pt-32 pb-10 md:px-12 md:pt-40"
    >
      <div>
        <Reveal>
          <p className="mb-7 text-base tracking-[0.28em] text-muted uppercase md:text-2xl">
            {profile.name}
          </p>
        </Reveal>
        <Reveal>
          <h1 className="max-w-[1210px] text-[13vw] leading-[0.98] font-bold tracking-[-0.055em] md:text-[6.4vw] md:tracking-[-0.065em]">
            <span className="block">I build AI systems</span>
            <span className="block">people can rely on.</span>
          </h1>
        </Reveal>
        <p className="mt-8 text-lg text-accent md:mt-9 md:text-xl">
          AI &amp; Automation Engineer · Big Data &amp; AI student
        </p>
      </div>
      <Reveal className="mt-16 flex flex-wrap items-end justify-between gap-6 text-[11px] text-muted md:mt-20 md:items-center md:text-[13px]">
        <p className="max-w-[180px] md:max-w-none">
          {profile.location}
          <br />
          {profile.study}
        </p>
        <div className="flex items-center gap-5">
          <a className="rounded-full bg-accent px-5 py-3 text-sm text-white transition-transform hover:-translate-y-0.5" href="#work">
            View selected work <span aria-hidden="true">↗</span>
          </a>
          <a className="flex items-center gap-2 underline decoration-border underline-offset-4" href="#about">
            About <span aria-hidden="true">↓</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

