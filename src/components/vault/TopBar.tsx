import { Bell, Search, User } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const routeTitles: Record<string, { title: string; sub: string }> = {
  "/app/dashboard": { title: "Security Operations", sub: "Live posture across the frontline" },
  "/app/threat-scanner": { title: "Real-Time Threat Scanner", sub: "Analyse messages, URLs and customer requests" },
  "/app/compliance": { title: "Compliance Co-Pilot", sub: "Draft POPIA/FICA aligned responses" },
  "/app/breach-response": { title: "Breach Response Assistant", sub: "Approved guidance only" },
  "/app/task-planner": { title: "AI Productivity Centre", sub: "Notes, tasks, priorities" },
  "/app/research": { title: "Threat Intelligence Research", sub: "Malware, CVE, MITRE ATT&CK" },
  "/app/incidents": { title: "Incident Reports", sub: "Recent SOC activity" },
  "/app/chat": { title: "VaultAI Chat", sub: "Your always-on security co-pilot" },
  "/app/settings": { title: "Settings", sub: "Preferences & audit" },
};

export function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = routeTitles[pathname] ?? { title: "VaultAI", sub: "" };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/5 bg-background/60 px-6 py-4 backdrop-blur-xl">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-xs text-muted-foreground">{meta.sub}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="glass hidden md:flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground w-72">
          <Search className="h-3.5 w-3.5" />
          <input
            placeholder="Search threats, cases, policies…"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </div>

        <button className="glass relative flex h-9 w-9 items-center justify-center rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-risk-red shadow-[0_0_10px_oklch(0.68_0.23_25)]" />
        </button>

        <Link to="/app/settings" className="glass flex items-center gap-2 rounded-full py-1 pl-1 pr-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue text-white text-xs font-semibold">
            AK
          </span>
          <div className="hidden text-left sm:block">
            <div className="text-xs font-medium leading-none">Amahle Khumalo</div>
            <div className="text-[10px] text-muted-foreground">Frontline Consultant · L2</div>
          </div>
          <User className="h-3.5 w-3.5 text-muted-foreground sm:hidden" />
        </Link>
      </div>
    </header>
  );
}
