import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, RiskBadge, SectionHeader } from "@/components/vault/primitives";
import { FileWarning, Download } from "lucide-react";

export const Route = createFileRoute("/app/incidents")({
  component: Incidents,
});

const rows = [
  { id: "INC-2026-0417", type: "Phishing", channel: "Email", risk: "red" as const, status: "Contained", opened: "10:24 · today", owner: "SOC Tier-2" },
  { id: "INC-2026-0416", type: "SIM swap attempt", channel: "Voice", risk: "critical" as const, status: "Investigating", opened: "09:41 · today", owner: "Fraud" },
  { id: "INC-2026-0415", type: "Malicious URL", channel: "WhatsApp", risk: "amber" as const, status: "Closed", opened: "Yesterday", owner: "SOC Tier-1" },
  { id: "INC-2026-0414", type: "Insider anomaly", channel: "IAM", risk: "amber" as const, status: "Monitoring", opened: "Yesterday", owner: "Insider Risk" },
  { id: "INC-2026-0413", type: "Data exfil attempt", channel: "Email", risk: "red" as const, status: "Closed", opened: "2 days ago", owner: "DLP" },
  { id: "INC-2026-0412", type: "Credential stuffing", channel: "Web", risk: "amber" as const, status: "Closed", opened: "2 days ago", owner: "IAM" },
];

function Incidents() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Records"
        title="Incident Reports"
        description="Every VaultAI-assisted case, immutable and audit-ready."
      />

      <GlassCard className="p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <FileWarning className="h-4 w-4 text-cyan-glow" />
            <span className="text-sm font-medium">Recent incidents</span>
          </div>
          <button className="glass inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs hover:bg-white/10">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left font-medium">Case</th>
                <th className="px-5 py-3 text-left font-medium">Type</th>
                <th className="px-5 py-3 text-left font-medium">Channel</th>
                <th className="px-5 py-3 text-left font-medium">Risk</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Owner</th>
                <th className="px-5 py-3 text-left font-medium">Opened</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3">{r.type}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.channel}</td>
                  <td className="px-5 py-3"><RiskBadge level={r.risk} /></td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                      r.status === "Closed"
                        ? "bg-risk-safe/15 text-risk-safe"
                        : r.status === "Contained"
                        ? "bg-electric-blue/15 text-electric-blue"
                        : "bg-risk-amber/15 text-risk-amber"
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.owner}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
