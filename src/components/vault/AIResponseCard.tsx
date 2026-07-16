import { Check, Copy, Download, ShieldCheck, AlertTriangle, Fingerprint } from "lucide-react";
import { useState, type ReactNode } from "react";
import { GlassCard } from "./primitives";

export interface AIResponseMetrics {
  securityScore: number;
  complianceScore: number;
  confidence: number;
  policyMatch: number;
  humanReview?: boolean;
  auditId: string;
}

export function AIResponseCard({
  title,
  body,
  metrics,
  nextStep,
  editable = true,
  actions,
}: {
  title: string;
  body: string;
  metrics: AIResponseMetrics;
  nextStep?: string;
  editable?: boolean;
  actions?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState(body);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <GlassCard className="p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">
            AI Draft Response
          </div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copy}
            className="glass flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs hover:bg-white/10"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button className="glass flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs hover:bg-white/10">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {editable ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full resize-y rounded-lg border border-white/5 bg-black/30 p-3 text-sm leading-relaxed outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />
      ) : (
        <div className="rounded-lg border border-white/5 bg-black/30 p-3 text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Security" value={metrics.securityScore} accent="oklch(0.75 0.18 155)" />
        <Metric label="Compliance" value={metrics.complianceScore} accent="oklch(0.68 0.2 250)" />
        <Metric label="Confidence" value={metrics.confidence} accent="oklch(0.68 0.24 305)" />
        <Metric label="Policy Match" value={metrics.policyMatch} accent="oklch(0.82 0.14 200)" />
      </div>

      {nextStep && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-cyan-glow/20 bg-cyan-glow/[0.06] p-3 text-xs">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
          <div>
            <div className="font-medium text-cyan-glow">Next step</div>
            <div className="text-muted-foreground">{nextStep}</div>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3 text-[11px] text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Fingerprint className="h-3.5 w-3.5" /> Audit ID · <span className="font-mono">{metrics.auditId}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-risk-safe" /> Approved Knowledge Base
          </span>
          {metrics.humanReview && (
            <span className="inline-flex items-center gap-1.5 text-risk-amber">
              <AlertTriangle className="h-3.5 w-3.5" /> Human review required
            </span>
          )}
        </div>
        {actions ?? (
          <button className="rounded-md bg-gradient-to-r from-neon-purple to-electric-blue px-3 py-1.5 text-xs font-medium text-white glow-purple">
            Escalate to Compliance Lead
          </button>
        )}
      </div>
    </GlassCard>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono text-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}, oklch(0.9 0.05 300))`,
            boxShadow: `0 0 12px ${accent}80`,
          }}
        />
      </div>
    </div>
  );
}
