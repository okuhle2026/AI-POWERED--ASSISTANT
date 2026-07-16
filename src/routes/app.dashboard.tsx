import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ShieldCheck,
  Fish,
  Briefcase,
  Activity,
  ListChecks,
  FileText,
  Gauge,
  ArrowUpRight,
  TrendingUp,
  ScanSearch,
  Siren,
} from "lucide-react";
import { GlassCard, RiskBadge } from "@/components/vault/primitives";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const kpis = [
  { icon: AlertTriangle, label: "Active Security Alerts", value: "17", delta: "+3", accent: "text-risk-red" },
  { icon: Fish, label: "Phishing Attempts Blocked Today", value: "312", delta: "+24%", accent: "text-cyan-glow" },
  { icon: ShieldCheck, label: "Compliance Status", value: "98%", delta: "POPIA/FICA", accent: "text-risk-safe" },
  { icon: Briefcase, label: "Open Fraud Cases", value: "6", delta: "-2", accent: "text-risk-amber" },
  { icon: Activity, label: "SOC Productivity Score", value: "87", delta: "+5", accent: "text-neon-purple" },
  { icon: ListChecks, label: "Today's Tasks", value: "12", delta: "4 due", accent: "text-electric-blue" },
  { icon: FileText, label: "Recent Policy Updates", value: "3", delta: "This week", accent: "text-cyan-glow" },
  { icon: Gauge, label: "Security Risk Score", value: "24", delta: "Low", accent: "text-risk-safe" },
];

const alerts = [
  { title: "Suspected SIM swap — customer #48A9C1", risk: "critical" as const, time: "2m ago", channel: "Inbound call" },
  { title: "Phishing email flagged — 'FICA verification required'", risk: "red" as const, time: "11m ago", channel: "Email" },
  { title: "Unusual login pattern — consultant desk 12", risk: "amber" as const, time: "38m ago", channel: "IAM" },
  { title: "WhatsApp OTP-harvesting attempt", risk: "red" as const, time: "1h ago", channel: "WhatsApp" },
  { title: "Malicious URL blocked in customer message", risk: "amber" as const, time: "2h ago", channel: "Web" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Problem statement */}
      <GlassCard className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-electric-blue/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Why VaultAI Exists</div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Frontline resilience after a cyber incident
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Following major banking cyber incidents, frontline consultants face phishing attacks,
              social engineering, fraudulent customer requests, and uncertainty about compliance
              requirements. VaultAI helps them detect threats, respond safely, remain compliant, and
              continue serving customers confidently.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/app/threat-scanner"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-purple to-electric-blue px-4 py-2 text-sm font-medium text-white glow-purple"
            >
              <ScanSearch className="h-4 w-4" /> Scan a message
            </Link>
            <Link
              to="/app/breach-response"
              className="glass inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm hover:bg-white/10"
            >
              <Siren className="h-4 w-4" /> Breach guidance
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <GlassCard key={k.label} className="p-4">
              <div className="flex items-center justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ${k.accent}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> {k.delta}
                </span>
              </div>
              <div className="mt-3 font-mono text-3xl font-semibold tracking-tight">{k.value}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                {k.label}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Alerts feed */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Live feed</div>
              <h3 className="text-base font-semibold">Active Security Alerts</h3>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <ul className="divide-y divide-white/5">
            {alerts.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {a.channel} · {a.time}
                  </div>
                </div>
                <RiskBadge level={a.risk} />
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Risk gauge / posture */}
        <GlassCard className="p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Posture</div>
          <h3 className="text-base font-semibold">Enterprise risk index</h3>
          <div className="mt-4 flex flex-col items-center">
            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(oklch(0.75 0.18 155) 0deg, oklch(0.75 0.18 155) 84deg, oklch(1 0 0 / 0.06) 84deg)",
                filter: "drop-shadow(0 0 24px oklch(0.75 0.18 155 / 0.4))",
              }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-background/80 backdrop-blur">
                <div className="font-mono text-3xl font-semibold text-risk-safe">24</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Low risk
                </div>
              </div>
            </div>
            <div className="mt-4 w-full space-y-2 text-xs">
              <PostureRow label="Endpoint hygiene" value={92} />
              <PostureRow label="Phishing exposure" value={68} inverse />
              <PostureRow label="Policy adherence" value={98} />
              <PostureRow label="Human review coverage" value={88} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Today's tasks & policy */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h3 className="text-base font-semibold">Today's Tasks</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { t: "Review 3 flagged emails in queue 'Retail-04'", d: "10:30", p: "High" },
              { t: "Complete FICA verification for customer #92K", d: "11:15", p: "High" },
              { t: "Attend SOC daily standup", d: "13:00", p: "Med" },
              { t: "Summarise policy #POL-2024-19", d: "15:00", p: "Med" },
            ].map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-neon-purple" />
                  <span className="truncate">{t.t}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{t.d}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 ${
                      t.p === "High"
                        ? "bg-risk-red/15 text-risk-red"
                        : "bg-risk-amber/15 text-risk-amber"
                    }`}
                  >
                    {t.p}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-base font-semibold">Recent Policy Updates</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { title: "POPIA — Customer data handling amendment", tag: "POPIA", date: "Today" },
              { title: "FICA — Enhanced due diligence thresholds", tag: "FICA", date: "2d ago" },
              { title: "Fraud response playbook v3.1 released", tag: "Fraud", date: "5d ago" },
            ].map((p, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground">{p.date}</div>
                </div>
                <span className="rounded-full bg-electric-blue/15 px-2 py-0.5 text-[10px] font-medium text-electric-blue">
                  {p.tag}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

function PostureRow({ label, value, inverse }: { label: string; value: number; inverse?: boolean }) {
  const good = inverse ? 100 - value : value;
  const color =
    good > 80 ? "oklch(0.75 0.18 155)" : good > 55 ? "oklch(0.8 0.17 80)" : "oklch(0.68 0.23 25)";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full"
          style={{ width: `${value}%`, background: color, boxShadow: `0 0 10px ${color}80` }}
        />
      </div>
    </div>
  );
}
