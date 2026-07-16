import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, SectionHeader } from "@/components/vault/primitives";
import { AIResponseCard } from "@/components/vault/AIResponseCard";
import { Siren, Sparkles, Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/breach-response")({
  component: BreachResponse,
});

const suggested = [
  "What do I tell a customer asking if their card details were exposed?",
  "A customer received a suspicious SMS after the breach. What next?",
  "How do I explain the delay in our fraud investigations?",
  "Customer wants full breach details — what am I allowed to share?",
];

function BreachResponse() {
  const [q, setQ] = useState(suggested[0]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "escalate">("done");

  const ask = (query: string) => {
    setQ(query);
    setState("loading");
    setTimeout(() => {
      const escalate = /full breach details|internal/i.test(query);
      setState(escalate ? "escalate" : "done");
    }, 900);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        eyebrow="Feature 03"
        title="Breach Response Assistant"
        description='"What do I tell this customer?" — VaultAI responds only using approved breach guidance. Never invents information.'
      />

      <GlassCard className="p-5">
        <div className="flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask about approved breach messaging…"
            className="flex-1 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
          <button
            onClick={() => ask(q)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue px-5 py-3 text-sm font-medium text-white glow-purple"
          >
            <Siren className="h-4 w-4" /> Ask VaultAI
          </button>
        </div>
      </GlassCard>

      {state === "loading" && (
        <GlassCard className="flex items-center justify-center p-10 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-neon-purple" />
          Consulting approved breach knowledge base…
        </GlassCard>
      )}

      {state === "escalate" && (
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-risk-red/20 text-risk-red">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-risk-red/80">
                Guidance unavailable
              </div>
              <h3 className="mt-1 text-lg font-semibold">Escalate to Compliance Lead.</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The requested information is not part of VaultAI's approved knowledge base. Do not
                invent or infer breach details. Route this enquiry to the on-call Compliance Lead.
              </p>
              <button className="mt-4 rounded-md bg-gradient-to-r from-neon-purple to-electric-blue px-3 py-1.5 text-xs font-medium text-white glow-purple">
                Escalate now — case #VLT-BR-9910
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {state === "done" && (
        <>
          <AIResponseCard
            title="Approved breach messaging draft"
            body={`Thank you for contacting Standard Bank.\n\nWe want to assure you that we take the security of your information extremely seriously. While we are unable to share internal investigation details, we can confirm the following:\n\n• No action is required from you at this time.\n• We monitor accounts 24/7 and will contact you directly if we detect any unusual activity.\n• Standard Bank will never ask for your password, PIN or OTP by email, SMS or phone.\n\nIf you notice anything suspicious, please contact our Fraud Hotline immediately on 0800 020 600.`}
            metrics={{
              securityScore: 97,
              complianceScore: 99,
              confidence: 88,
              policyMatch: 99,
              humanReview: true,
              auditId: "VLT-BR-8829",
            }}
            nextStep="Do not share internal investigation status. Route escalations to Compliance Lead."
          />

          <GlassCard className="p-5">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-cyan-glow" />
              <span className="font-medium">Approved knowledge sources</span>
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
              {[
                "Breach Comms Playbook v3.1 (§ 4.2)",
                "POPIA Customer Communication Guidance",
                "FICA Enhanced Due Diligence — 2024 amendment",
                "Standard Bank Fraud Hotline SOP",
              ].map((s) => (
                <li key={s} className="rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                  {s}
                </li>
              ))}
            </ul>
          </GlassCard>
        </>
      )}
    </div>
  );
}
