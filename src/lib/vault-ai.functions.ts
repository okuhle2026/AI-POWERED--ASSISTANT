import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  tool: z.enum([
    "meeting-notes",
    "call-notes",
    "task-planner",
    "daily-schedule",
    "policy-summary",
    "deadline-extractor",
    "priority-matrix",
    "fraud-report",
  ]),
  input: z.string().min(1).max(20000),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  "meeting-notes":
    "You are VaultAI, a banking SOC assistant. Summarise the meeting transcript/notes into: 1) Executive summary (2-3 sentences), 2) Key decisions, 3) Action items with owners and deadlines, 4) Risks/compliance flags (POPIA/FICA). Use crisp markdown with headings.",
  "call-notes":
    "You are VaultAI. Convert the raw call notes into a structured customer/SOC call report: Caller context, Issue summary, Verification steps taken, Resolution/next steps, Compliance notes (POPIA), Follow-up tasks. Mask any obvious PII (ID numbers, full card numbers) with ***. Markdown format.",
  "task-planner":
    "You are VaultAI. Turn the user's brain-dump into a prioritised task list. For each task: title, priority (P1/P2/P3), estimated time, SLA/risk rationale. Sort by priority. Return as a markdown table then a short recommended order-of-work.",
  "daily-schedule":
    "You are VaultAI. Build a realistic frontline banking-consultant daily schedule from the tasks provided. Include 09:00-17:00 time blocks, breaks, SLA windows, and buffer time for escalations. Markdown table with Time | Task | Rationale.",
  "policy-summary":
    "You are VaultAI. Summarise the policy text into: TL;DR (3 bullets), What changed, Who it affects, Required actions for frontline staff, POPIA/FICA touchpoints. Markdown.",
  "deadline-extractor":
    "You are VaultAI. Extract every deadline, due date, or time-bound obligation from the text. Return a markdown table: Deadline | Obligation | Owner (if mentioned) | Source line. Then list the top 3 most urgent.",
  "priority-matrix":
    "You are VaultAI. Place each item into an Eisenhower matrix (Urgent+Important, Important-not-urgent, Urgent-not-important, Delegate/Batch). Return 4 markdown sections with bullet lists and 1-line rationale per item.",
  "fraud-report":
    "You are VaultAI. Package the incident details into a formal fraud-report memo for SOC Tier-2: Case reference (generate FR-YYYYMMDD-XXX), Incident summary, Timeline, Evidence checklist, Indicators of compromise, Customer impact, Recommended containment, POPIA notification assessment. Redact ID numbers, full card PANs and CVVs with ***. Professional markdown.",
};

export const runVaultTool = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.tool] },
          { role: "user", content: data.input },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 429)
        throw new Error("Rate limit reached. Please retry shortly.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Add credits to continue.");
      throw new Error(`AI gateway error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
