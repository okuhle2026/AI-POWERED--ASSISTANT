import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { GlassCard, SectionHeader } from "@/components/vault/primitives";
import { runVaultTool } from "@/lib/vault-ai.functions";
import {
  FileText,
  Phone,
  Calendar,
  ListChecks,
  Clock,
  LayoutGrid,
  AlertOctagon,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/app/task-planner")({
  component: Planner,
});

type ToolId =
  | "meeting-notes"
  | "call-notes"
  | "task-planner"
  | "daily-schedule"
  | "policy-summary"
  | "deadline-extractor"
  | "priority-matrix"
  | "fraud-report";

type Tool = {
  id: ToolId;
  icon: typeof FileText;
  title: string;
  body: string;
  placeholder: string;
  sample: string;
};

const TOOLS: Tool[] = [
  {
    id: "meeting-notes",
    icon: FileText,
    title: "Meeting Notes Summariser",
    body: "Turn hour-long meetings into decisions & owners.",
    placeholder: "Paste raw meeting transcript or bullet notes…",
    sample:
      "SOC weekly sync 09:00. Attendees: N. Dlamini, J. Roos, T. Ndlovu.\n- 3 phishing waves this week targeting FICA onboarding.\n- Decision: enable MFA challenge for >R50k transfers by Friday.\n- J. Roos to draft customer comms; N. Dlamini owns SIEM rule update.\n- Compliance flag: POPIA breach notification window 72h — confirm process with legal.",
  },
  {
    id: "call-notes",
    icon: Phone,
    title: "Call Notes Generator",
    body: "Structured notes from customer or SOC calls.",
    placeholder: "Paste raw call notes / bullet points…",
    sample:
      "Customer called re unauthorised debit R12,340 on card ending 4421. Verified via OTP + ID number 900101****. Advised card block, dispute form emailed. SIM swap suspected in last 48h. Escalated to fraud desk.",
  },
  {
    id: "task-planner",
    icon: ListChecks,
    title: "Task Planner",
    body: "Prioritise your queue by risk and urgency.",
    placeholder: "Dump your tasks, one per line…",
    sample:
      "Verify FICA docs for account #92K\nReview 14 flagged phishing emails\nFollow up SIM swap case #442\nPrepare quarterly SOC metrics\nUpdate team wiki with new escalation matrix\nReset password ticket #442",
  },
  {
    id: "daily-schedule",
    icon: Calendar,
    title: "Daily Schedule Generator",
    body: "Auto-build your day around SLA windows.",
    placeholder: "List today's commitments and open tasks…",
    sample:
      "9am standup (15m)\n3 fraud disputes to close today (SLA 4h)\n1 compliance training module (45m)\n5 KYC verifications pending\nManager 1:1 at 15:00",
  },
  {
    id: "policy-summary",
    icon: FileText,
    title: "Policy Summary Generator",
    body: "Digest new POPIA/FICA policy in seconds.",
    placeholder: "Paste policy text…",
    sample:
      "Effective 1 March, all high-risk customer onboarding must include enhanced due diligence per FICA s.21B, including source-of-funds verification and PEP screening. Records retention increased from 5 to 7 years. Non-compliance carries administrative sanctions.",
  },
  {
    id: "deadline-extractor",
    icon: Clock,
    title: "Deadline Extractor",
    body: "Pull every due date from any doc or thread.",
    placeholder: "Paste document, email thread or notes…",
    sample:
      "FSCA submission due 30 April. POPIA impact assessment must be filed within 14 days of incident (breach detected 12 March). Board pack circulate by Friday. Vendor SOC2 renewal expires end of Q2.",
  },
  {
    id: "priority-matrix",
    icon: LayoutGrid,
    title: "Priority Matrix",
    body: "Urgent × Important, refreshed live.",
    placeholder: "One item per line…",
    sample:
      "Verify FICA for account #92K\nReview flagged emails\nSIM swap follow-up\nPolicy summary for team\nSOC quarterly review\nPassword reset #442\nMeeting reschedule\nUpdate wiki",
  },
  {
    id: "fraud-report",
    icon: AlertOctagon,
    title: "One-click Report Fraud",
    body: "Package evidence for SOC in one action.",
    placeholder: "Describe the incident (customer, amount, channel, timeline)…",
    sample:
      "Customer T. Mokoena reports R45,000 unauthorised EFT on 14 March 08:22 from FNB business account to unknown beneficiary. Customer confirmed no OTP shared. Device fingerprint mismatch flagged by SIEM. Card ending 4421. Suspected credential phishing 3 days prior.",
  },
];

function Planner() {
  const [active, setActive] = useState<Tool>(TOOLS[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const run = useServerFn(runVaultTool);

  function pick(t: Tool) {
    setActive(t);
    setInput("");
    setOutput("");
    setError(null);
  }

  async function generate() {
    if (!input.trim()) {
      setError("Add some input first.");
      return;
    }
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const res = await run({ data: { tool: active.id, input: input.trim() } });
      setOutput(res.content || "No content returned.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copyOut() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  const isFraud = active.id === "fraud-report";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SectionHeader
        eyebrow="Feature 04"
        title="AI Productivity Centre"
        description="Live AI tools for notes, tasks, priorities and one-click fraud reports — engineered for the frontline."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === active.id;
          return (
            <button
              key={t.id}
              onClick={() => pick(t)}
              className={`group text-left rounded-2xl p-4 transition-all ${
                isActive
                  ? "glass-strong shadow-[inset_0_0_0_1px_oklch(0.68_0.24_305/0.5)] -translate-y-0.5"
                  : "glass hover:-translate-y-0.5 hover:bg-white/[0.05]"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-neon-purple to-electric-blue shadow-[0_0_24px_-4px_oklch(0.68_0.24_305/0.8)]"
                    : "bg-gradient-to-br from-neon-purple/30 to-electric-blue/30"
                }`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{t.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <active.icon className="h-4 w-4 text-cyan-glow" />
              <h3 className="text-base font-semibold">{active.title}</h3>
            </div>
            <button
              onClick={() => setInput(active.sample)}
              className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
            >
              Load sample
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{active.body}</p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={active.placeholder}
            className="mt-4 h-64 w-full resize-none rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-neon-purple/40 focus:shadow-[0_0_0_3px_oklch(0.68_0.24_305/0.15)] transition"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground">
              {input.length.toLocaleString()} chars · PII masked automatically
            </span>
            <button
              onClick={generate}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-60 ${
                isFraud
                  ? "bg-gradient-to-r from-risk-red to-neon-purple shadow-[0_0_30px_-6px_oklch(0.68_0.23_25/0.6)]"
                  : "bg-gradient-to-r from-neon-purple to-electric-blue shadow-[0_0_30px_-6px_oklch(0.68_0.24_305/0.6)]"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  {isFraud ? "Package & submit" : "Generate with VaultAI"}
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-3 rounded-lg border border-risk-red/30 bg-risk-red/10 px-3 py-2 text-xs text-risk-red">
              {error}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-glow" />
              <h3 className="text-base font-semibold">VaultAI output</h3>
            </div>
            <button
              onClick={copyOut}
              disabled={!output}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/[0.06] disabled:opacity-40 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-4 h-[calc(16rem+3.75rem)] overflow-y-auto rounded-xl border border-white/5 bg-black/30 p-4 text-sm">
            {loading && !output && (
              <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                VaultAI is thinking…
              </div>
            )}
            {!loading && !output && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Sparkles className="h-6 w-6 mb-2 opacity-60" />
                <p className="text-xs max-w-[24ch]">
                  Results will appear here — structured, POPIA/FICA aware, ready to paste.
                </p>
              </div>
            )}
            {output && (
              <pre className="whitespace-pre-wrap break-words font-sans leading-relaxed text-foreground/90">
                {output}
              </pre>
            )}
          </div>

          <ul className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
            <li>· Signed with your consultant ID</li>
            <li>· PII (ID, PAN, CVV) auto-redacted</li>
            <li>· Auditable — every generation logged</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
