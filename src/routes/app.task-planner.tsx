import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, SectionHeader } from "@/components/vault/primitives";
import {
  FileText,
  Phone,
  Calendar,
  ListChecks,
  Clock,
  LayoutGrid,
  AlertOctagon,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/app/task-planner")({
  component: Planner,
});

function Planner() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Feature 04"
        title="AI Productivity Centre"
        description="Notes, tasks, priorities and one-click fraud reports — engineered for the frontline."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: FileText, title: "Meeting Notes Summariser", body: "Turn hour-long meetings into decisions & owners." },
          { icon: Phone, title: "Call Notes Generator", body: "Structured notes from customer or SOC calls." },
          { icon: ListChecks, title: "Task Planner", body: "Prioritise your queue by risk and urgency." },
          { icon: Calendar, title: "Daily Schedule Generator", body: "Auto-build your day around SLA windows." },
          { icon: FileText, title: "Policy Summary Generator", body: "Digest new POPIA/FICA policy in seconds." },
          { icon: Clock, title: "Deadline Extractor", body: "Pull every due date from any doc or thread." },
          { icon: LayoutGrid, title: "Priority Matrix", body: "Urgent × Important, refreshed live." },
          { icon: AlertOctagon, title: "One-click Report Fraud", body: "Package evidence for SOC in one action." },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <GlassCard key={c.title} className="group p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.05]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple/30 to-electric-blue/30">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Priority matrix</h3>
            <span className="text-xs text-muted-foreground">Auto-refreshed 2m ago</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { q: "Urgent & Important", bg: "from-risk-red/25 to-risk-red/5", items: ["Verify FICA for #92K", "Review flagged emails", "SIM swap follow-up"] },
              { q: "Important, not urgent", bg: "from-electric-blue/25 to-electric-blue/5", items: ["Complete policy summary", "SOC quarterly review"] },
              { q: "Urgent, not important", bg: "from-risk-amber/25 to-risk-amber/5", items: ["Password reset ticket #442", "Meeting reschedule"] },
              { q: "Delegate / Batch", bg: "from-cyan-glow/20 to-cyan-glow/5", items: ["Compile weekly metrics", "Update team wiki"] },
            ].map((box) => (
              <div key={box.q} className={`rounded-xl border border-white/5 bg-gradient-to-br ${box.bg} p-4`}>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{box.q}</div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {box.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-glow" />
            <h3 className="text-base font-semibold">Report fraud — one click</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            VaultAI packages evidence, redacts PII and routes to SOC Tier-2 with a signed audit trail.
          </p>
          <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-risk-red to-neon-purple px-4 py-3 text-sm font-medium text-white shadow-[0_0_30px_-6px_oklch(0.68_0.23_25/0.6)]">
            Package & submit fraud report
          </button>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li>· Screenshots captured (3)</li>
            <li>· PII masked automatically</li>
            <li>· Signed with your consultant ID</li>
            <li>· Delivered to fraud@soc.internal</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
