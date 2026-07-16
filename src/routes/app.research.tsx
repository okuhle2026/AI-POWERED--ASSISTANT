import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, RiskBadge, SectionHeader } from "@/components/vault/primitives";
import { BookOpenText, Search, ExternalLink, Bug, Shield } from "lucide-react";

export const Route = createFileRoute("/app/research")({
  component: Research,
});

const topics = ["Malware", "CVE", "Attack techniques", "Banking fraud", "Ransomware", "Social engineering"];

function Research() {
  const [q, setQ] = useState("Latest banking-sector ransomware trends 2026");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Feature 05"
        title="AI Threat Intelligence Research Assistant"
        description="Structured intelligence — Executive Summary, MITRE ATT&CK mapping, IOCs, mitigations and trends."
      />

      <GlassCard className="p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-black/40 py-3 pl-9 pr-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue px-4 py-3 text-sm font-medium text-white glow-purple">
            <BookOpenText className="h-4 w-4" /> Research
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button key={t} className="glass rounded-full px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground">
              {t}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Executive Summary</div>
              <h3 className="text-base font-semibold">Banking-sector ransomware — Q1 2026 outlook</h3>
            </div>
            <RiskBadge level="red" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Ransomware operators are increasingly targeting mid-tier African banks using
            initial access via phishing-as-a-service kits, followed by lateral movement through
            unpatched Citrix and VPN appliances. Double-extortion remains the dominant model.
            Frontline staff should treat any "urgent FICA re-verification" outreach as suspicious
            and follow the escalation SOP.
          </p>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">MITRE ATT&CK mapping</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {[
                "TA0001 · Initial Access",
                "T1566 · Phishing",
                "T1078 · Valid Accounts",
                "T1486 · Data Encrypted for Impact",
                "T1567 · Exfiltration Over Web Service",
              ].map((t) => (
                <span key={t} className="glass rounded-md px-2 py-1 font-mono text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Indicators of Compromise</div>
            <ul className="mt-2 space-y-2 font-mono text-xs">
              {[
                { t: "sha256", v: "9f2b1c…a41d — dropper 'invoice.pdf.exe'" },
                { t: "domain", v: "standardbnk-verify[.]co" },
                { t: "ip", v: "185.199.108[.]153 (staging)" },
                { t: "ttp", v: "Cobalt Strike beacon over HTTPS 443" },
              ].map((i) => (
                <li key={i.v} className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                  <span className="rounded bg-neon-purple/20 px-1.5 py-0.5 text-[10px] uppercase text-neon-purple">
                    {i.t}
                  </span>
                  <span className="truncate">{i.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Mitigations</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { icon: Shield, t: "Enforce MFA on all VPN and Citrix access." },
              { icon: Shield, t: "Patch Citrix ADC / NetScaler to latest baseline." },
              { icon: Bug, t: "Block sender domain and hash on gateway." },
              { icon: Shield, t: "Simulate phishing drills for frontline teams." },
              { icon: Shield, t: "Ensure offline, immutable backups exist." },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
                  <span>{m.t}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Latest trends</div>
            <ul className="mt-2 space-y-2 text-xs">
              <li className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                <span>Voice-cloning fraud +182% YoY</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                <span>QR code phishing ("quishing") targeting SMEs</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2">
                <span>Deep-fake CFO wire fraud in African fintechs</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
