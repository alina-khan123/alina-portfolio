import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/portfolio";

export function Work() {
  return (
    <section
      id="work"
      className="border-b border-border px-6 py-16 md:px-12 md:py-[90px]"
    >
      <Reveal className="mb-11 flex items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-[13px] tracking-[0.16em] text-muted uppercase">
            Selected projects
          </p>
          <h2 className="m-0 text-[30px] font-medium tracking-[-0.035em] md:text-4xl">
            Work with evidence.
          </h2>
        </div>
        <a
          className="hidden items-center gap-2 text-sm text-accent transition-transform hover:-translate-y-0.5 sm:inline-flex"
          href="https://github.com/alina-khan123?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          All repositories <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title}>
            <article className="group flex h-full flex-col border-t border-border py-7 md:py-8">
              <div className="mb-5 flex items-center justify-between gap-3 text-xs text-muted">
                <span>{project.role}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mb-2 text-[26px] leading-tight tracking-[-0.035em] md:text-[30px]">
                {project.title}
              </h3>
              <p className="mb-4 max-w-prose text-muted">{project.desc}</p>
              <p className="mb-5 border-l-2 border-accent pl-4 text-sm leading-relaxed">
                {project.outcome}
              </p>
              <ul className="mb-6 flex flex-wrap gap-2 p-0" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="list-none rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 border-b border-border py-2 text-sm text-accent transition-[gap] hover:gap-3"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} repository on GitHub`}
              >
                View project on GitHub <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

