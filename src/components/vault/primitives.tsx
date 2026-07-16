import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div className={`${strong ? "glass-strong" : "glass"} rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      {eyebrow && (
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80 mb-1">
          {eyebrow}
        </div>
      )}
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

type RiskLevel = "safe" | "amber" | "red" | "critical";

export function RiskBadge({ level, score }: { level: RiskLevel; score?: number }) {
  const map: Record<RiskLevel, { label: string; bg: string; text: string }> = {
    safe: { label: "Safe", bg: "bg-risk-safe/15", text: "text-risk-safe" },
    amber: { label: "Elevated", bg: "bg-risk-amber/15", text: "text-risk-amber" },
    red: { label: "High Risk", bg: "bg-risk-red/15", text: "text-risk-red" },
    critical: { label: "Critical", bg: "bg-risk-critical/20", text: "text-risk-critical" },
  };
  const s = map[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${s.bg} ${s.text} ring-1 ring-inset ring-current/20`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
      {typeof score === "number" && (
        <span className="ml-1 font-mono opacity-80">{score}/100</span>
      )}
    </span>
  );
}

export function ScoreGauge({ value, label }: { value: number; label?: string }) {
  const level: RiskLevel =
    value < 30 ? "safe" : value < 60 ? "amber" : value < 85 ? "red" : "critical";
  const color =
    level === "safe"
      ? "oklch(0.75 0.18 155)"
      : level === "amber"
      ? "oklch(0.8 0.17 80)"
      : level === "red"
      ? "oklch(0.68 0.23 25)"
      : "oklch(0.6 0.28 15)";

  const angle = (Math.min(Math.max(value, 0), 100) / 100) * 360;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${angle}deg, oklch(1 0 0 / 0.06) ${angle}deg)`,
          filter: `drop-shadow(0 0 24px ${color}66)`,
        }}
      >
        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-background/80 backdrop-blur">
          <div className="font-mono text-3xl font-semibold" style={{ color }}>
            {value}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Risk Score
          </div>
        </div>
      </div>
      {label && <div className="mt-3 text-xs text-muted-foreground">{label}</div>}
    </div>
  );
}
