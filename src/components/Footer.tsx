import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/portfolio";

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-16 md:px-12 md:py-[90px]">
      <Reveal>
        <div className="mb-10 flex gap-3.5">
          <a
            className="grid size-[42px] place-items-center rounded-full border border-border text-xs transition-transform hover:-translate-y-1"
            href={`mailto:${profile.email}`}
            aria-label="Email Alina"
          >
            @
          </a>
          <a
            className="grid size-[42px] place-items-center rounded-full border border-border text-xs transition-transform hover:-translate-y-1"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            GH
          </a>
          <a
            className="grid size-[42px] place-items-center rounded-full border border-border text-xs transition-transform hover:-translate-y-1"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            in
          </a>
        </div>
      </Reveal>
      <Reveal>
        <h2 className="mb-5 text-[clamp(40px,6vw,80px)] leading-[1.1] font-semibold tracking-[-0.05em]">
          Let’s build something
          <br />
          that matters.
        </h2>
      </Reveal>
      <Reveal>
        <a
          className="text-accent text-[clamp(14px,2vw,22px)] break-anywhere"
          href={`mailto:${profile.email}`}
        >
          {profile.email} ↗
        </a>
      </Reveal>
      <div className="mt-14 flex justify-between gap-5 text-xs text-muted">
        <span>© 2026 {profile.name}</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
