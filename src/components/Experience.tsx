import { Reveal } from "@/components/Reveal";
import { chapters } from "@/content/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-border px-6 py-16 md:px-12 md:py-[90px]"
    >
      <Reveal>
        <p className="text-[13px] tracking-[0.16em] text-muted uppercase">
          Experience
        </p>
      </Reveal>
      <div className="mt-11">
        {chapters.map((chapter) => (
          <article
            key={chapter.title}
            className="relative grid grid-cols-1 gap-3.5 border-b border-border py-9 last:border-b-0 md:grid-cols-[1fr_6fr] lg:grid-cols-[1fr_2fr_7fr_2fr] lg:gap-6"
          >
            <div className="mt-2 hidden size-2.5 rounded-full bg-accent lg:block" />
            <div className="text-[13px] text-muted">
              {chapter.label}
              <small className="mt-2 block">{chapter.dates}</small>
            </div>
            <Reveal>
              <h3 className="mb-3.5 text-[28px] leading-[1.2] tracking-[-0.035em] transition-transform duration-500 md:text-[32px] md:group-hover:translate-x-2">
                {chapter.title}
              </h3>
              <p className="m-0 text-muted">{chapter.body}</p>
            </Reveal>
            <div className="flex flex-wrap gap-2">
              {chapter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
