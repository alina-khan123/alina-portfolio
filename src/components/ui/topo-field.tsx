import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import topoFieldSource from "./topo-field-source.html?raw";

type TopoFieldMode = "dark" | "light";

export type TopoFieldProps = {
  /** "auto" follows the page's light/dark scheme via prefers-color-scheme. */
  mode?: TopoFieldMode | "auto";
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
  style?: CSSProperties;
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

function readAutomaticMode(): TopoFieldMode {
  if (typeof document === "undefined" || typeof window === "undefined")
    return "dark";
  const root = document.documentElement;
  const declared = root.dataset.scheme ?? root.dataset.theme;
  if (declared === "light" || declared === "dark") return declared;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useAutomaticMode(enabled: boolean) {
  const [autoMode, setAutoMode] = useState<TopoFieldMode>(readAutomaticMode);

  useEffect(() => {
    if (
      !enabled ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    )
      return undefined;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setAutoMode(readAutomaticMode());
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-scheme", "data-theme", "class"],
    });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, [enabled]);

  return autoMode;
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

function buildFocusedDocument(knobs: {
  mode: TopoFieldMode;
  length: number;
  density: number;
}) {
  const background = knobs.mode === "light" ? LIGHT_PAPER : "#000000";
  const patched = patchTopoField(topoFieldSource, knobs);
  const targetJson = JSON.stringify([
    { selector: "#topo-canvas", role: "background" },
  ]).replace(/</g, "\\u003c");

  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;

  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = { speed: 1, opacity: 1 };
  window.__SF_CONTROLS = controls;
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
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;

  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) {
      if (root.parentElement !== document.body) document.body.appendChild(root);
    });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

  return patched
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
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
  style,
}: TopoFieldProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const automaticMode = useAutomaticMode(mode === "auto");
  const resolvedMode: TopoFieldMode =
    mode === "auto" ? automaticMode : mode === "light" ? "light" : "dark";
  const background = resolvedMode === "light" ? LIGHT_PAPER : "#000000";

  const safeSpeed = clamp(speed, 0, 3);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  const source = useMemo(
    () =>
      buildFocusedDocument({
        mode: resolvedMode,
        length: safeLength,
        density: safeDensity,
      }),
    [resolvedMode, safeLength, safeDensity],
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
        ...style,
      }}
    />
  );
}
