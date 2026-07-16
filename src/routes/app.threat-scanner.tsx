import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, RiskBadge, ScoreGauge, SectionHeader } from "@/components/vault/primitives";
import { AIResponseCard } from "@/components/vault/AIResponseCard";
import { ScanSearch, Loader2, Link2, MessageSquare, Mail, Image, Sparkles, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/threat-scanner")({
  component: ThreatScanner,
});

const samples = [
  {
    label: "Phishing email",
    text: `From: security@standardbnk-verify.co
Subject: Urgent FICA re-verification required within 24 hours

Dear Customer, due to recent regulatory changes your account will be suspended unless you verify your identity immediately. Click the secure link below and enter your online banking password and OTP to prevent suspension.

Verify now: hxxp://standardbnk-verify.co/fica/reauth?id=88231`,
  },
  {
    label: "SIM swap request",
    text: "Hi, I lost my phone in a mugging yesterday. My new SIM is active but I can't log in. Please move my number to the new SIM and reset my banking OTPs — my ID is 8503145xxxxx and account 62012xxxxxx. Please do this urgently, I have a payment to make.",
  },
];

function ThreatScanner() {
  const [input, setInput] = useState(samples[0].text);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | typeof mockResult>(mockResult);
  const [channel, setChannel] = useState<"email" | "sms" | "whatsapp" | "url" | "request">("email");

  const runScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(mockResult);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Feature 01"
        title="Real-Time Threat Scanner"
        description="Paste any email, SMS, WhatsApp, URL or customer request. VaultAI classifies risk, flags indicators, and drafts a safe reply."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {[
              { k: "email", label: "Email", icon: Mail },
              { k: "sms", label: "SMS", icon: MessageSquare },
              { k: "whatsapp", label: "WhatsApp", icon: MessageSquare },
              { k: "url", label: "URL", icon: Link2 },
              { k: "request", label: "Customer request", icon: MessageSquare },
              { k: "image", label: "Screenshot", icon: Image, disabled: true },
            ].map((c: any) => {
              const Icon = c.icon;
              const active = channel === c.k;
              return (
                <button
                  key={c.k}
                  disabled={c.disabled}
                  onClick={() => !c.disabled && setChannel(c.k)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all ${
                    active
                      ? "bg-gradient-to-r from-neon-purple/60 to-electric-blue/60 text-white shadow-[inset_0_0_0_1px_oklch(1_0_0/0.15)]"
                      : "glass text-muted-foreground hover:text-foreground"
                  } ${c.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {c.label}
                  {c.disabled && <span className="text-[9px] opacity-70">soon</span>}
                </button>
              );
            })}
          </div>

          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste an email, SMS, WhatsApp message, URL or customer request…"
            className="w-full resize-y rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs leading-relaxed outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>Load sample:</span>
              {samples.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setInput(s.text)}
                  className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[11px] hover:bg-white/[0.06]"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={runScan}
              disabled={scanning}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-purple to-electric-blue px-4 py-2 text-sm font-medium text-white glow-purple disabled:opacity-70"
            >
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />}
              {scanning ? "Analysing…" : "Scan for threats"}
            </button>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center p-5 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Assessment</div>
          {scanning || !result ? (
            <div className="flex h-40 w-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-neon-purple" />
            </div>
          ) : (
            <>
              <ScoreGauge value={result.riskScore} label={`${result.classification} · ${result.confidence}% confidence`} />
              <div className="mt-3">
                <RiskBadge level={result.riskLevel} score={result.riskScore} />
              </div>
              <div className="mt-4 w-full space-y-2 text-xs">
                {result.dimensions.map((d) => (
                  <IndicatorRow key={d.name} name={d.name} value={d.value} />
                ))}
              </div>
            </>
          )}
        </GlassCard>
      </div>

      {result && !scanning && (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold">Indicators detected</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {result.indicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg border border-white/5 bg-black/20 p-3">
                    <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${
                      ind.severity === "high" ? "text-risk-red" : ind.severity === "med" ? "text-risk-amber" : "text-cyan-glow"
                    }`} />
                    <div>
                      <div className="font-medium">{ind.label}</div>
                      <div className="text-xs text-muted-foreground">{ind.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="text-base font-semibold">Recommended actions</h3>
              <ol className="mt-3 space-y-2 text-sm">
                {result.actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/20 p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-risk-red/30 bg-risk-red/[0.08] p-3 text-xs text-risk-red">
                <Sparkles className="h-4 w-4" /> Escalation recommended: notify SOC Tier-2 immediately.
              </div>
            </GlassCard>
          </div>

          <AIResponseCard
            title="Safe reply — customer message"
            body={`Good day,\n\nThank you for reaching out. For your security we cannot process account changes or verify identity via email. Please visit your nearest branch with your official ID, or call the number printed on the back of your bank card. Standard Bank will never ask for your password or one-time PIN.\n\nKind regards,\nStandard Bank`}
            metrics={{
              securityScore: 96,
              complianceScore: 98,
              confidence: 92,
              policyMatch: 94,
              humanReview: true,
              auditId: "VLT-8F3A21",
            }}
            nextStep="Send only after review. Do not include account numbers, IDs or OTPs in the reply."
          />
        </>
      )}
    </div>
  );
}

function IndicatorRow({ name, value }: { name: string; value: number }) {
  const color =
    value >= 70 ? "oklch(0.68 0.23 25)" : value >= 40 ? "oklch(0.8 0.17 80)" : "oklch(0.75 0.18 155)";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
        <div className="h-full" style={{ width: `${value}%`, background: color, boxShadow: `0 0 10px ${color}80` }} />
      </div>
    </div>
  );
}

const mockResult = {
  classification: "Credential phishing",
  riskScore: 89,
  riskLevel: "critical" as const,
  confidence: 94,
  dimensions: [
    { name: "Phishing likelihood", value: 92 },
    { name: "Social engineering", value: 78 },
    { name: "SIM swap indicators", value: 12 },
    { name: "Malicious URL score", value: 88 },
    { name: "PII exposure risk", value: 44 },
  ],
  indicators: [
    { label: "Look-alike domain", detail: "'standardbnk-verify.co' impersonates the legitimate brand domain.", severity: "high" as const },
    { label: "Credential harvesting request", detail: "Message asks for password and OTP — never legitimate.", severity: "high" as const },
    { label: "Urgency pressure tactic", detail: "'Within 24 hours' pressures the customer to act without verification.", severity: "med" as const },
    { label: "Insecure link", detail: "URL uses hxxp obfuscation and does not resolve to a trusted CA.", severity: "high" as const },
  ],
  actions: [
    "Do not click the link or reply to the sender.",
    "Report the message to the SOC phishing queue.",
    "Warn the customer to ignore the message and confirm via a trusted channel.",
    "Escalate to Tier-2 SOC for domain takedown request.",
    "Log the case in the audit trail with reference VLT-8F3A21.",
  ],
};
