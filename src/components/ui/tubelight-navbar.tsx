import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => ({
        item,
        section: item.url.startsWith("#")
          ? document.getElementById(item.url.slice(1))
          : null,
      }))
      .filter(
        (entry): entry is { item: NavItem; section: HTMLElement } =>
          entry.section instanceof HTMLElement,
      );

    if (!sections.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const lastSection = sections[sections.length - 1];
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        setActiveTab(lastSection.item.name);
        return;
      }

      const activationLine = Math.min(window.innerHeight * 0.36, 280);
      let current = sections[0];
      for (const entry of sections) {
        if (entry.section.getBoundingClientRect().top <= activationLine) {
          current = entry;
        } else {
          break;
        }
      }
      setActiveTab(current.item.name);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const updateFromHash = () => {
      const hashItem = items.find((item) => item.url === window.location.hash);
      if (hashItem) setActiveTab(hashItem.name);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 mb-6 -translate-x-1/2 px-2 lg:top-0 lg:mb-0 lg:pt-6",
        className,
      )}
    >
      <nav
        aria-label="Section navigation"
        className="flex items-center gap-0 rounded-full border border-border bg-paper/85 px-1 py-1 shadow-lg backdrop-blur-xl sm:gap-1 xl:gap-2"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isHighlighted = (hoveredTab ?? activeTab) === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              onFocus={() => setHoveredTab(item.name)}
              onBlur={() => setHoveredTab(null)}
              aria-current={isActive ? "location" : undefined}
              aria-label={item.name}
              className={cn(
                "relative isolate flex min-h-11 min-w-10 items-center justify-center rounded-full px-2 text-sm font-semibold transition-colors sm:px-3 xl:px-5",
                "text-foreground/80",
                isHighlighted && "bg-card text-accent",
              )}
            >
              <span className="relative z-10 hidden xl:inline">{item.name}</span>
              <span className="relative z-10 xl:hidden" aria-hidden="true">
                <Icon size={18} strokeWidth={2.25} />
              </span>
              {isHighlighted && (
                <motion.span
                  layoutId="tubelight-active-indicator"
                  className="pointer-events-none absolute inset-0 z-0 rounded-full bg-accent/5"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="absolute -top-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-t-full bg-accent xl:-top-2 xl:h-1 xl:w-8">
                    <span className="absolute -top-1 -left-1 h-4 w-8 rounded-full bg-accent/20 blur-md xl:-top-2 xl:-left-2 xl:h-6 xl:w-12" />
                    <span className="absolute -top-1 left-0 h-4 w-6 rounded-full bg-accent/20 blur-md xl:-top-1 xl:h-6 xl:w-8" />
                  </span>
                </motion.span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

