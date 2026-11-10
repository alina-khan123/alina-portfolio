import { useEffect, useRef, useState } from "react";

type Orbit = "inner" | "outer";

type Tool = {
  name: string;
  logo: string;
  orbit: Orbit;
  phase: number;
  speed: number;
};

const tools: Tool[] = [
  { name: "Claude", logo: "/tools/claude.png", orbit: "inner", phase: 0, speed: -0.3 },
  { name: "Codex", logo: "/tools/codex.png", orbit: "inner", phase: Math.PI / 2, speed: -0.3 },
  { name: "Qwen", logo: "/tools/qwen.png", orbit: "inner", phase: Math.PI, speed: -0.3 },
  { name: "AWS", logo: "/tools/aws-mark.svg", orbit: "inner", phase: (Math.PI * 3) / 2, speed: -0.3 },
  { name: "Cursor", logo: "/tools/cursor.png", orbit: "outer", phase: 0, speed: 0.2 },
  { name: "n8n", logo: "/tools/n8n.png", orbit: "outer", phase: (Math.PI * 2) / 5, speed: 0.2 },
  { name: "GitHub", logo: "/tools/github.png", orbit: "outer", phase: (Math.PI * 4) / 5, speed: 0.2 },
  { name: "Hermes", logo: "/tools/hermesagent.png", orbit: "outer", phase: (Math.PI * 6) / 5, speed: 0.2 },
  { name: "Higgsfield", logo: "/tools/higgsfield.webp", orbit: "outer", phase: (Math.PI * 8) / 5, speed: 0.2 },
];

export function OrbitingTools() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [stageSize, setStageSize] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setStageSize(entry.contentRect.width);
    });
    resizeObserver.observe(stage);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const delta = (now - previous) / 1000;
      previous = now;
      setTime((current) => current + delta);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <div
      className="orbit-scene"
      role="img"
      aria-label="Orbiting logos for Claude, Codex, Qwen, AWS, Cursor, n8n, GitHub, Hermes, and Higgsfield"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="orbit-plane" ref={stageRef} aria-hidden="true">
        <div className="orbit-ring orbit-ring-outer" />
        <div className="orbit-ring orbit-ring-inner" />
        {tools.map((tool) => {
          const radiusX = stageSize * (tool.orbit === "outer" ? 0.41 : 0.22);
          const radiusY = stageSize * (tool.orbit === "outer" ? 0.28 : 0.15);
          const angle = time * tool.speed + tool.phase;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;
          const depth = Math.sin(angle) * 22;

          return (
            <span
              key={tool.name}
              className="orbit-item"
              style={{
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${depth}px)`,
              }}
            >
              <img
                className={`orbit-logo orbit-logo-${tool.name.toLowerCase()}`}
                src={tool.logo}
                alt=""
                draggable="false"
              />
            </span>
          );
        })}
        <div className="orbit-core">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="m20 15-9 9 9 9M28 15l9 9-9 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
