import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, SectionHeader } from "@/components/vault/primitives";
import { Fingerprint, ShieldCheck, Bell, User2 } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SectionHeader
        eyebrow="Preferences"
        title="Settings"
        description="Personalise VaultAI and review your audit posture."
      />

      <GlassCard className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue text-sm font-semibold text-white glow-purple">
            AK
          </div>
          <div>
            <div className="text-sm font-semibold">Amahle Khumalo</div>
            <div className="text-xs text-muted-foreground">Frontline Consultant · L2 · Employee 8823145</div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="divide-y divide-white/5 p-0">
        {[
          { icon: Bell, title: "Alert channels", desc: "Where VaultAI notifies you", value: "In-app + Email" },
          { icon: ShieldCheck, title: "Human review requirement", desc: "Require review for customer-facing drafts", value: "Enabled" },
          { icon: Fingerprint, title: "Biometric confirmation", desc: "Confirm high-risk actions with biometrics", value: "On" },
          { icon: User2, title: "Language", desc: "Interface language", value: "English (ZA)" },
        ].map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-cyan-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.desc}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{r.value}</div>
            </div>
          );
        })}
      </GlassCard>

      <GlassCard className="p-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Audit</div>
        <h3 className="text-base font-semibold">Recent VaultAI activity</h3>
        <ul className="mt-3 space-y-2 text-xs">
          {[
            "VLT-8F3A21 · Phishing scan · today 10:24",
            "VLT-CMP-4421 · Compliance draft · today 09:38",
            "VLT-BR-8829 · Breach response · yesterday",
            "VLT-RSCH-1105 · Threat research · yesterday",
          ].map((a) => (
            <li key={a} className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 font-mono text-muted-foreground">
              <span>{a}</span>
              <span className="rounded bg-risk-safe/15 px-1.5 py-0.5 text-risk-safe">Verified</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
