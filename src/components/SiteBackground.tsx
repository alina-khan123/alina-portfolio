export function SiteBackground({ theme }: { theme: "dark" | "light" }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${theme === "dark" ? "bg-[#171715]" : "bg-[#f7f4ee]"}`}
      aria-hidden="true"
    />
  );
}

