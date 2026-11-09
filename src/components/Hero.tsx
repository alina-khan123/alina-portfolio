import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % profile.roles.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

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
            <span className="block">Building AI that works.</span>
            <span className="block">And software that matters.</span>
          </h1>
        </Reveal>
        <div className="mt-8 h-12 overflow-hidden font-serif text-[27px] text-accent italic md:mt-9 md:text-[32px]">
          <span className="block transition-all duration-300">
            {profile.roles[roleIndex]}
          </span>
        </div>
      </div>
      <Reveal className="mt-24 flex items-end justify-between gap-6 text-[11px] text-muted md:items-center md:text-[13px]">
        <p className="max-w-[180px] md:max-w-none">
          {profile.location}
          <br />
          {profile.study}
        </p>
        <a className="flex items-center gap-3" href="#about">
          Scroll to learn more <span className="text-2xl">↓</span>
        </a>
      </Reveal>
    </section>
  );
}
