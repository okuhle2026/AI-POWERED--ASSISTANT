import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, SectionHeader } from "@/components/vault/primitives";
import { AIResponseCard } from "@/components/vault/AIResponseCard";
import { EyeOff, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/compliance")({
  component: Compliance,
});

const templates = [
  { k: "email", label: "Customer email" },
  { k: "chat", label: "Chat message" },
  { k: "complaint", label: "Complaint response" },
  { k: "fraud", label: "Fraud investigation" },
  { k: "popia", label: "POPIA request" },
  { k: "fica", label: "FICA verification" },
];

const tones = ["Professional", "Empathetic", "Formal", "Urgent", "Executive"];

function Compliance() {
  const [tpl, setTpl] = useState("email");
  const [tone, setTone] = useState("Professional");
  const [mask, setMask] = useState(true);
  const [input, setInput] = useState(
    "Customer requests confirmation of the balance on account 62012345678 and wants us to email their ID copy (8503145123089) to the branch. Draft a compliant reply.",
  );

  const masked = mask
    ? input
        .replace(/\b\d{10,}\b/g, "•••• •••• ••••")
        .replace(/\b\d{6}\d+\b/g, "•••••••••••••")
    : input;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Feature 02"
        title="Compliance Co-Pilot"
        description="Draft POPIA & FICA aligned responses with PII automatically masked, in the tone your situation needs."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.k}
                onClick={() => setTpl(t.k)}
                className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                  tpl === t.k
                    ? "bg-gradient-to-r from-neon-purple/60 to-electric-blue/60 text-white shadow-[inset_0_0_0_1px_oklch(1_0_0/0.15)]"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full resize-y rounded-xl border border-white/5 bg-black/40 p-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Tone:</span>
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    tone === t
                      ? "bg-cyan-glow/20 text-cyan-glow ring-1 ring-cyan-glow/40"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <EyeOff className="h-3.5 w-3.5" />
              Auto-mask PII
              <input
                type="checkbox"
                checked={mask}
                onChange={(e) => setMask(e.target.checked)}
                className="h-3.5 w-3.5 accent-neon-purple"
              />
            </label>
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">
            PII shield preview
          </div>
          <h3 className="text-base font-semibold">Redacted input sent to model</h3>
          <div className="mt-3 rounded-xl border border-white/5 bg-black/40 p-3 font-mono text-xs leading-relaxed text-muted-foreground">
            {masked}
          </div>
          <ul className="mt-4 space-y-2 text-xs">
            {[
              "Account numbers masked",
              "ID numbers masked",
              "OTPs stripped",
              "FICA verification recommended",
            ].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-risk-safe" />
                {s}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <AIResponseCard
        title={`${tone} draft — ${templates.find((t) => t.k === tpl)?.label}`}
        body={`Good day,\n\nThank you for reaching out to Standard Bank. For your security, we are unable to share account balances or accept identity documents by email. Please visit your nearest branch with your original ID, or use the Standard Bank app to view your balance.\n\nWe are here to help. Please let me know if you would like assistance completing FICA verification safely.\n\nKind regards,\nStandard Bank Client Care`}
        metrics={{
          securityScore: 94,
          complianceScore: 99,
          confidence: 90,
          policyMatch: 96,
          humanReview: true,
          auditId: "VLT-CMP-4421",
        }}
        nextStep="Verify customer identity via FICA before sharing any account information."
        actions={
          <div className="flex items-center gap-2">
            <button className="glass rounded-md px-3 py-1.5 text-xs">
              <Sparkles className="mr-1 inline h-3 w-3" /> Regenerate
            </button>
            <button className="rounded-md bg-gradient-to-r from-neon-purple to-electric-blue px-3 py-1.5 text-xs font-medium text-white glow-purple">
              Approve & send for review
            </button>
          </div>
        }
      />
    </div>
  );
}
