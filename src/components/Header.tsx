import { useEffect, useState } from "react";
import { nav, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type HeaderProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      setProgress((window.scrollY / max) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section, footer");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-30 h-0.5 bg-accent"
        style={{ width: `${progress}%` }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto] items-center gap-5 px-6 py-5 transition-colors md:grid-cols-[1fr_auto_1fr] md:px-12",
          scrolled &&
            "border-b border-border bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-2xl",
          open && "bg-paper",
        )}
      >
        <a
          href="#top"
          className={cn(
            "text-sm font-semibold transition-opacity",
            scrolled || open ? "opacity-100" : "opacity-0 md:opacity-0",
            scrolled && "md:opacity-100",
          )}
        >
          {profile.name}
        </a>
        <nav
          aria-label="Main navigation"
          className={cn(
            "hidden items-center gap-8 text-sm text-muted md:flex",
            open &&
              "!flex absolute top-[76px] right-0 left-0 flex-col border-b border-border bg-paper px-6 py-8",
          )}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100",
                active === item.href && "after:scale-x-100",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <a
            className="rounded-full border border-border px-3.5 py-1.5 text-[13px] text-muted"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            ↗ Resume
          </a>
          <button
            className="grid size-9 place-items-center rounded-full border border-border text-muted"
            aria-label="Switch colour theme"
            onClick={onToggleTheme}
            type="button"
          >
            {theme === "dark" ? "☾" : "☼"}
          </button>
          <button
            className="grid size-9 place-items-center rounded-full border border-border text-muted md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? "×" : "≡"}
          </button>
        </div>
      </header>
    </>
  );
}
