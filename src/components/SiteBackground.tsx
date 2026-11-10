import TopoField from "@/components/ui/topo-field";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function SiteBackground({ theme }: { theme: "dark" | "light" }) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {reduced ? (
        <div
          className={cn(
            "h-full w-full",
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_top,_#2a2724,_#0b0b0a_58%)]"
              : "bg-[radial-gradient(circle_at_top,_#f4efe6,_#e7e2d8_58%)]",
          )}
        />
      ) : (
        <TopoField
          className="h-full w-full"
          mode={theme}
          speed={0.55}
          length={1.15}
          density={1.25}
          opacity={0.92}
          hue={18}
          saturation={0.42}
          brightness={theme === "dark" ? 1.08 : 1.02}
        />
      )}
      <div
        className={cn(
          "absolute inset-0",
          theme === "dark"
            ? "bg-gradient-to-b from-black/55 via-black/20 to-black/70"
            : "bg-gradient-to-b from-[#f7f4ee]/55 via-[#f7f4ee]/15 to-[#f7f4ee]/70",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(247,244,238,0.45)_100%)]",
        )}
      />
    </div>
  );
}

