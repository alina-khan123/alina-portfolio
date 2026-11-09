import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ x: -40, y: -40 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || !finePointer) return;
    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, [reduced, finePointer]);

  if (reduced || !finePointer) return null;

  return (
    <div
      className="pointer-events-none fixed z-[100] size-[18px] rounded-full border border-accent"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden="true"
    />
  );
}
