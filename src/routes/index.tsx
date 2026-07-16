import { createFileRoute, Link } from "@tanstack/react-router";
import { GuardianOrb } from "@/components/vault/GuardianOrb";
import { VaultFooter } from "@/components/vault/Footer";
import {
  ArrowRight,
  Shield,
  Sparkles,
  ScanSearch,
  ShieldCheck,
  Siren,
  ListChecks,
  BookOpenText,
  MessagesSquare,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: ScanSearch, title: "Real-Time Threat Scanner", desc: "Detect phishing, SIM swaps and social engineering in seconds." },
  { icon: ShieldCheck, title: "Compliance Co-Pilot", desc: "POPIA & FICA aligned drafts with PII automatically masked." },
  { icon: Siren, title: "Breach Response Assistant", desc: "Answers only from approved breach guidance — never fabricated." },
  { icon: ListChecks, title: "AI Productivity Centre", desc: "Meeting notes, task planner, priorities, one-click fraud reports." },
  { icon: BookOpenText, title: "Threat Intelligence Research", desc: "MITRE ATT&CK, CVEs, IOCs and mitigations at your fingertips." },
  { icon: MessagesSquare, title: "VaultAI Chat", desc: "Always-on co-pilot with pinned conversations & voice input." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Backdrop grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-electric-blue glow-purple">
            <Shield className="h-[1.125rem] w-[1.125rem] text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-gradient-brand">VaultAI</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Post-Breach Co-Pilot
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Capabilities</a>
          <a href="#why" className="hover:text-foreground transition-colors">Why VaultAI</a>
          <a href="#responsible" className="hover:text-foreground transition-colors">Responsible AI</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-muted-foreground sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-risk-safe/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-risk-safe" />
            </span>
            Enterprise AI · Operational
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-cyan-glow" />
            AI-powered Post-Breach Security Co-Pilot for frontline banking staff
          </div>

          <GuardianOrb size={340} className="mb-10" />

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient-brand">VaultAI</span>
          </h1>
          <div className="mt-4 text-lg font-medium text-foreground/90 sm:text-xl">
            Post-Breach Security Co-Pilot
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Protecting bank staff. Securing customer trust. Responding faster.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="text-sm text-muted-foreground">How can VaultAI help you today?</div>
            <Link
              to="/app/dashboard"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple via-electric-blue to-cyan-glow px-7 py-3.5 text-sm font-semibold text-white glow-purple transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-electric-blue to-cyan-glow opacity-0 blur-xl transition-opacity group-hover:opacity-70" />
              <span className="relative">Launch Security Assistant</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> Protected by Enterprise AI · POPIA & FICA aligned
            </div>
          </div>
        </div>

        {/* Live posture strip */}
        <div className="glass mt-16 grid grid-cols-2 gap-6 rounded-2xl px-6 py-5 text-sm sm:grid-cols-4">
          {[
            { k: "Threats blocked (24h)", v: "1,284", accent: "text-risk-safe" },
            { k: "Phishing intercepted", v: "312", accent: "text-cyan-glow" },
            { k: "Compliance draft time", v: "-73%", accent: "text-neon-purple" },
            { k: "Avg. response time", v: "42s", accent: "text-electric-blue" },
          ].map((s) => (
            <div key={s.k}>
              <div className={`font-mono text-2xl font-semibold ${s.accent}`}>{s.v}</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="glass rounded-2xl p-8">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Why VaultAI Exists</div>
          <h2 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Frontline consultants face phishing, social engineering, and fraud requests every day.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Following major banking cyber incidents, frontline consultants face phishing attacks,
            social engineering, fraudulent customer requests, and uncertainty about compliance
            requirements. VaultAI helps them detect threats, respond safely, remain compliant, and
            continue serving customers confidently.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">Capabilities</div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              One perimeter for the frontline
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass group relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.05]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-purple/10 blur-3xl transition-opacity group-hover:bg-neon-purple/20" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple/30 to-electric-blue/30 shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1)]">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="relative mt-4 text-base font-semibold">{f.title}</h3>
                <p className="relative mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="responsible" className="relative z-10 mx-auto max-w-6xl px-6 pb-4">
        <VaultFooter />
      </section>
    </div>
  );
}
