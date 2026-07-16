import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanSearch,
  ShieldCheck,
  Siren,
  ListChecks,
  BookOpenText,
  FileWarning,
  MessagesSquare,
  Settings,
  Shield,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Threat Scanner", url: "/app/threat-scanner", icon: ScanSearch },
  { title: "Compliance Co-Pilot", url: "/app/compliance", icon: ShieldCheck },
  { title: "Breach Response", url: "/app/breach-response", icon: Siren },
  { title: "Task Planner", url: "/app/task-planner", icon: ListChecks },
  { title: "Research Assistant", url: "/app/research", icon: BookOpenText },
  { title: "Incident Reports", url: "/app/incidents", icon: FileWarning },
  { title: "VaultAI Chat", url: "/app/chat", icon: MessagesSquare },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-white/5 bg-sidebar/80 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-electric-blue glow-purple">
          <Shield className="h-[1.125rem] w-[1.125rem] text-white" strokeWidth={2} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-gradient-brand">
            VaultAI
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Security Co-Pilot
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const active = pathname === item.url;
          const Icon = item.icon;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                active
                  ? "bg-white/[0.06] text-foreground shadow-[inset_0_0_0_1px_oklch(0.68_0.24_305/0.4)]"
                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
                  active
                    ? "bg-gradient-to-br from-neon-purple/40 to-electric-blue/40 text-white shadow-[0_0_18px_-2px_oklch(0.68_0.24_305/0.7)]"
                    : "bg-white/[0.03] group-hover:bg-white/[0.06]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4">
        <div className="glass rounded-xl p-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-risk-safe opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-risk-safe" />
            </span>
            <span className="font-medium">SOC status: Operational</span>
          </div>
          <p className="mt-1 text-muted-foreground">
            Enterprise AI perimeter active. All models POPIA/FICA aligned.
          </p>
        </div>
      </div>
    </aside>
  );
}
