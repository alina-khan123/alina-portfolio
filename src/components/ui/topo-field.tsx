import { useEffect, useMemo, useRef } from "react";
import topoFieldSource from "./topo-field-source.html?raw";

type TopoFieldMode = "dark" | "light";

type TopoFieldProps = {
  mode?: TopoFieldMode;
  /** Animation speed multiplier. */
  speed?: number;
  /** Stretches/compresses the noise field driving the contour bands. */
  length?: number;
  /** Multiplies the number of contour bands (visual density of lines). */
  density?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
};

const LIGHT_PAPER = "#eef1f6";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

/** WebGL1 GLSL ES requires float literals (10.0), not ints (10). */
function glslFloat(value: number, digits = 3) {
  const fixed = Number(value).toFixed(digits);
  return fixed.includes(".") ? fixed : `${fixed}.0`;
}

function patchTopoField(
  source: string,
  {
    length,
    density,
    mode,
  }: { length: number; density: number; mode: TopoFieldMode },
) {
  let next = source
    .replace(
      "float noiseScale = 1.4;",
      `float noiseScale = ${glslFloat(1.4 * length, 3)};`,
    )
    .replace(
      "float numBands = 10.0;",
      `float numBands = ${glslFloat(10 * density, 2)};`,
    );
  if (mode === "light") {
    next = next
      .replace(
        "gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;",
        "gridLines = clamp(gridLines, 0.0, 1.0) * 0.55;",
      )
      .replace(
        "float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;",
        "float topoLines = smoothstep(0.03, 0.00, triangleWave) * 0.95;",
      )
      .replace(
        /vec3 color = vec3\(0\.0\);\s*color \+= vec3\(1\.0\) \* gridLines;\s*color \+= vec3\(1\.0\) \* topoLines;/,
        `vec3 paper = vec3(0.933, 0.945, 0.965);
                    vec3 ink = vec3(0.12, 0.14, 0.18);
                    float lines = clamp(gridLines + topoLines, 0.0, 1.0);
                    vec3 color = mix(paper, ink, lines);`,
      );
  }
  return next;
}

function buildDocument(knobs: {
  mode: TopoFieldMode;
  length: number;
  density: number;
}) {
  const background = knobs.mode === "light" ? LIGHT_PAPER : "#000000";
  const patched = patchTopoField(topoFieldSource, knobs);

  const backgroundStyle = `<style>html, body { background: ${background}; }</style>`;

  // Receives speed/opacity from the parent. Speed works by scaling the
  // clock the shader's render loop reads from performance.now().
  const controlScript = `<script>
(function () {
  var controls = { speed: 1, opacity: 1 };
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  function applyVisual() {
    var canvas = document.getElementById('topo-canvas');
    if (canvas) canvas.style.opacity = String(controls.opacity == null ? 1 : controls.opacity);
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
})();
</script>`;

  return patched.replace(
    /<head([^>]*)>/i,
    `<head$1>${controlScript}${backgroundStyle}`,
  );
}

/**
 * TopoField — an isolated, full-bleed animated WebGL background: a faint 48px grid plus
 * ultra-thin contour ("topographic") lines drawn from 2D simplex noise, drifting slowly over
 * time. Ships as a sandboxed iframe so the shader's own script/canvas loop stays self-contained.
 */
export default function TopoField({
  mode = "dark",
  speed = 1,
  length = 1,
  density = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
}: TopoFieldProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const background = mode === "light" ? LIGHT_PAPER : "#000000";

  const safeSpeed = clamp(speed, 0, 3);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  const source = useMemo(
    () =>
      buildDocument({
        mode,
        length: safeLength,
        density: safeDensity,
      }),
    [mode, safeLength, safeDensity],
  );

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: { speed: safeSpeed, opacity: safeOpacity },
      },
      "*",
    );
  }, [safeSpeed, safeOpacity, source]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title="Topo Field"
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
      }}
    />
  );
}
