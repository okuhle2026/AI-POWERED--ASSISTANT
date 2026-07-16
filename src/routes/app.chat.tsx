import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/vault/primitives";
import {
  MessagesSquare,
  Mic,
  Pin,
  Plus,
  Send,
  Sparkles,
  ShieldCheck,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/app/chat")({
  component: Chat,
});

const suggested = [
  "Check this email for phishing.",
  "Summarise today's security policy.",
  "Write a POPIA-compliant response.",
  "Explain this fraud alert.",
  "Create my investigation plan.",
];

const pinned = [
  "Phishing playbook Q1",
  "FICA edge cases",
  "SIM swap runbook",
];

const historyList = [
  "Voice-cloning fraud brief",
  "POPIA response — customer #92K",
  "Ransomware trends 2026",
  "Deepfake CFO scenario",
];

type Msg = { role: "user" | "ai"; text: string };

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text:
        "Hi Amahle 👋 I'm VaultAI, your Post-Breach Security Co-Pilot. Ask me to check an email, draft a compliant reply, or plan your investigation. Every response is scored for security, compliance and confidence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Here's an approved draft based on the Standard Bank breach playbook. I have masked any PII and flagged this response for human review before it is sent to the customer. Risk score 22/100, compliance 98%, confidence 90%.",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Sidebar */}
      <GlassCard className="p-4 lg:col-span-1">
        <button
          onClick={() => setMessages([messages[0]])}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-purple to-electric-blue px-3 py-2 text-sm font-medium text-white glow-purple"
        >
          <Plus className="h-4 w-4" /> New chat
        </button>

        <div className="mt-5">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-cyan-glow/80">
            <Pin className="h-3 w-3" /> Pinned
          </div>
          <ul className="space-y-1 text-sm">
            {pinned.map((p) => (
              <li key={p} className="cursor-pointer truncate rounded-md px-2 py-1.5 hover:bg-white/[0.05]">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            History
          </div>
          <ul className="space-y-1 text-sm">
            {historyList.map((p) => (
              <li key={p} className="cursor-pointer truncate rounded-md px-2 py-1.5 text-muted-foreground hover:bg-white/[0.05] hover:text-foreground">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>

      {/* Chat main */}
      <GlassCard strong className="flex flex-col overflow-hidden lg:col-span-3" >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue glow-purple">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">VaultAI</div>
              <div className="text-[11px] text-muted-foreground">
                Post-Breach Security Co-Pilot · POPIA/FICA aligned
              </div>
            </div>
          </div>
          <span className="glass hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-muted-foreground sm:inline-flex">
            <ShieldCheck className="h-3 w-3 text-risk-safe" /> Human review required
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[420px] max-h-[60vh]">
          {messages.map((m, i) => (
            <MessageBubble key={i} msg={m} />
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="glass flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-2.5">
                <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggested.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="glass rounded-full px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-2xl border border-white/5 bg-black/40 px-3 py-2 focus-within:border-neon-purple/50 focus-within:ring-2 focus-within:ring-neon-purple/20"
          >
            <MessagesSquare className="h-4 w-4 text-muted-foreground" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask VaultAI anything about phishing, fraud, compliance…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button type="button" className="rounded-full p-2 text-muted-foreground hover:bg-white/5" aria-label="Voice input">
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-neon-purple to-electric-blue p-2 text-white glow-purple"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 text-[10px] text-muted-foreground">
            VaultAI drafts are reviewed by an authorised employee before customer delivery.
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-neon-purple/40 to-electric-blue/40 px-4 py-2.5 text-sm text-white shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1)]">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-electric-blue">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="max-w-[80%]">
        <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
          {msg.text}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
          <span className="rounded bg-risk-safe/15 px-1.5 py-0.5 text-risk-safe">Security 96</span>
          <span className="rounded bg-electric-blue/15 px-1.5 py-0.5 text-electric-blue">Compliance 98</span>
          <span className="rounded bg-neon-purple/15 px-1.5 py-0.5 text-neon-purple">Confidence 90</span>
          <span className="rounded bg-cyan-glow/15 px-1.5 py-0.5 text-cyan-glow">Policy 94</span>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-white/70"
      style={{ animation: `float-slow 1.2s ease-in-out ${delay}s infinite` }}
    />
  );
}
