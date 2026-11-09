import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { chartHeights, projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Work() {
  const [index, setIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const project = projects[index];
  const touchX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (detailOpen) dialog.showModal();
    else dialog.close();
  }, [detailOpen]);

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(projects.length - 1, next)));
  };

  return (
    <section
      id="work"
      className="border-b border-border px-6 py-16 md:px-12 md:py-[90px]"
    >
      <Reveal className="mb-11 flex items-end justify-between gap-4">
        <h2 className="m-0 text-[30px] font-medium tracking-[-0.035em] md:text-4xl">
          Selected work
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <button
            className="size-[42px] rounded-full border border-border text-xl disabled:cursor-default disabled:opacity-25"
            aria-label="Previous project"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            type="button"
          >
            ←
          </button>
          <button
            className="size-[42px] rounded-full border border-border text-xl disabled:cursor-default disabled:opacity-25"
            aria-label="Next project"
            disabled={index === projects.length - 1}
            onClick={() => go(index + 1)}
            type="button"
          >
            →
          </button>
        </div>
      </Reveal>

      <Reveal>
        <div
          className="grid grid-cols-1 items-center gap-6 md:grid-cols-[7fr_5fr] md:gap-10"
          onTouchStart={(event) => {
            touchX.current = event.changedTouches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchX.current == null) return;
            const dx = event.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-[#182021] p-5 text-[#e8eeeb] md:p-6 aspect-[4/3]">
            <div className="flex justify-between border-b border-white/20 pb-4 text-[11px] tracking-[0.1em]">
              <span>{project.title.toUpperCase()}</span>
              <span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="mt-6 mb-2 text-[34px] leading-[1.1] tracking-[-0.045em]">
              {project.kicker}
            </div>
            <div className="text-xs text-[#a7b8b0]">{project.caption}</div>
            <div className="mt-7 grid grid-cols-3 gap-2">
              {project.metrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 md:p-3.5"
                >
                  <b className="block text-xl tracking-[-0.03em] md:text-[25px]">
                    {value}
                  </b>
                  <small className="text-[10px] text-[#a7b8b0]">{label}</small>
                </div>
              ))}
            </div>
            <div
              className="mt-5 flex h-20 items-end gap-1.5 md:h-[110px]"
              aria-hidden="true"
            >
              {chartHeights.map((height, barIndex) => (
                <i
                  key={barIndex}
                  className={cn(
                    "flex-1 origin-bottom rounded-t-[3px] bg-[#91b9a5] opacity-70",
                    barIndex % 3 === 2 && "bg-[#cfaa6f]",
                  )}
                  style={{
                    height: `${height}%`,
                    animation: "grow 1s cubic-bezier(.22,1,.36,1) both",
                    animationDelay: `${barIndex * 30}ms`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 text-[10px] text-[#a7b8b0]">
              CONCEPTUAL PROJECT VISUAL · NOT A LIVE DATA FEED
            </div>
          </div>

          <div>
            <span className="text-[13px] tracking-[0.16em] text-muted uppercase">
              {project.role}
            </span>
            <h3 className="my-3 text-[32px] leading-[1.15] tracking-[-0.035em] md:text-[38px]">
              {project.title}
            </h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bc985933] bg-[#bc985918] px-2.5 py-1 text-[11px] text-[#9b7438] before:size-1.5 before:rounded-full before:bg-current">
              {project.status}
            </span>
            <p className="mt-4 text-muted">{project.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-6 border-l-2 border-accent pl-4 italic">
              {project.outcome}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-5">
              <button
                className="inline-block border-b border-border py-2 text-[13px] text-accent"
                onClick={() => setDetailOpen(true)}
                type="button"
              >
                Project notes ↗
              </button>
              {project.links?.repo && (
                <a
                  className="inline-block border-b border-border py-2 text-[13px] text-accent"
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              )}
              {project.links?.live && (
                <a
                  className="inline-block border-b border-border py-2 text-[13px] text-accent"
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex justify-center gap-2.5" aria-label="Select project">
        {projects.map((item, itemIndex) => (
          <button
            key={item.title}
            aria-label={`Show ${item.title}`}
            className={cn(
              "h-1.5 rounded-full bg-border p-0 transition-[width]",
              itemIndex === index ? "w-[23px] bg-accent" : "w-1.5",
            )}
            onClick={() => go(itemIndex)}
            type="button"
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(650px,90vw)] max-h-[80vh] overflow-auto rounded-[20px] border border-border bg-paper p-8 text-ink backdrop:bg-black/45 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) setDetailOpen(false);
        }}
        onClose={() => setDetailOpen(false)}
      >
        <button
          className="float-right text-2xl"
          aria-label="Close project details"
          onClick={() => setDetailOpen(false)}
          type="button"
        >
          ×
        </button>
        <p className="text-[13px] tracking-[0.16em] text-muted uppercase">
          Project notes
        </p>
        <h2 className="text-[30px] leading-[1.2]">{project.title}</h2>
        <p className="text-muted">{project.detail}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </dialog>
    </section>
  );
}
