import { useEffect, useState } from "react";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type HeaderProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

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

  return (
    <>
      <div
        className="fixed top-0 left-0 z-30 h-0.5 bg-accent"
        style={{ width: `${progress}%` }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-5 px-6 py-5 transition-colors md:px-12",
          scrolled &&
            "border-b border-border bg-paper",
        )}
      >
        <a
          href="#top"
          className={cn(
            "text-sm font-semibold transition-opacity",
            scrolled ? "opacity-100" : "opacity-0 md:opacity-0",
            scrolled && "md:opacity-100",
          )}
        >
          {profile.name}
        </a>
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
        </div>
      </header>
    </>
  );
}

