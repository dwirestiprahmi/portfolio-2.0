"use client";

import * as React from "react";
import {
  site,
  about,
  skills,
  workExperience,
  education,
  projects,
  social,
} from "@/data/portfolio";

// line model
type Tone = "default" | "muted" | "accent" | "error";
type Line = { kind: "input" | "output"; text: string; tone?: Tone; prompt?: string };

const out = (text: string, tone: Tone = "default"): Line => ({
  kind: "output",
  text,
  tone,
});

// command outputs (all read from the CV data, so they never drift)
function cmdHelp(): Line[] {
  return [
    out("available commands:", "accent"),
    out("  whoami        who I am"),
    out("  about         a short bio"),
    out("  skills        languages, frameworks, tools"),
    out("  experience    work history"),
    out("  projects      selected projects"),
    out("  education     studies"),
    out("  contact       how to reach me"),
    out("  clear         clear the screen"),
    out(""),
    out("  cd chatbot    talk to an AI about me ;)"),
  ];
}

function chatHelp(): Line[] {
  return [
    out(`chatbot — ask me anything about ${site.name}.`, "accent"),
    out('e.g. "what\'s your experience with Java?", "how can I reach you?"'),
    out("commands here: exit / cd ..  (leave) · clear · help", "muted"),
  ];
}

function cmdWhoami(): Line[] {
  return [
    out(`${site.name} — ${site.role}`, "accent"),
    out(site.tagline),
    out(site.hashtag, "muted"),
    out(`based in ${site.location} · ${site.availability}`, "muted"),
  ];
}

function cmdAbout(): Line[] {
  return about.flatMap((p, i) =>
    i === 0 ? [out(p)] : [out(""), out(p, "muted")],
  );
}

function cmdSkills(): Line[] {
  return [
    out("skills", "accent"),
    ...skills.map((g) => out(`  ${g.category}: ${g.items.join(", ")}`)),
  ];
}

function cmdExperience(): Line[] {
  return [
    out("experience", "accent"),
    ...workExperience.flatMap((j) => [
      out(`  ${j.period}  ${j.role} @ ${j.company} · ${j.location}`),
      ...j.highlights.map((h) => out(`      - ${h}`, "muted")),
    ]),
  ];
}

function cmdProjects(): Line[] {
  return [
    out("projects", "accent"),
    ...projects.flatMap((p) => [
      out(`  ${p.title} (${p.year}) — ${p.role}`),
      out(`      ${p.summary}`, "muted"),
      out(`      stack: ${p.stack.join(", ")}`, "muted"),
    ]),
  ];
}

function cmdEducation(): Line[] {
  return [
    out("education", "accent"),
    ...education.flatMap((e) => [
      out(`  ${e.period}  ${e.degree}, ${e.school}`),
      ...(e.detail ? [out(`      ${e.detail}`, "muted")] : []),
    ]),
  ];
}

function cmdContact(): Line[] {
  return [
    out("contact", "accent"),
    out(`  email: ${site.email}`),
    ...social.map((s) => out(`  ${s.label.toLowerCase()}: ${s.href}`)),
  ];
}

function cmdLs(arg: string): Line[] {
  if (/project/i.test(arg))
    return [out(projects.map((p) => p.title).join("   "))];
  if (/skill/i.test(arg))
    return [out(skills.map((g) => g.category).join("   "))];
  return [
    out("about.md   experience/   projects/   skills/   contact", "muted"),
  ];
}

function cmdCat(arg: string): Line[] {
  if (/about/i.test(arg)) return cmdAbout();
  return [out(`cat: ${arg || "?"}: no such file`, "error")];
}

// free-text Q&A: keyword-matched against the CV data
function askAnswer(q: string): Line[] {
  const ql = q.toLowerCase().trim();
  if (!ql)
    return [out('ask me something — try "what\'s your experience?"', "muted")];

  const has = (...ks: string[]) => ks.some((k) => ql.includes(k));

  if (has("hello", "hi ", "hey", "hallo", "hi!"))
    return [
      out(
        `Hi! I'm ${site.name}. Ask about my skills, experience, projects, or how to reach me.`,
      ),
    ];

  for (const j of workExperience) {
    if (ql.includes(j.company.toLowerCase()))
      return [
        out(`${j.role} @ ${j.company} · ${j.period}`, "accent"),
        ...j.highlights.map((h) => out(`- ${h}`, "muted")),
      ];
  }
  for (const p of projects) {
    if (ql.includes(p.title.toLowerCase()))
      return [
        out(`${p.title} — ${p.role}, ${p.year}`, "accent"),
        out(p.summary, "muted"),
        out(`stack: ${p.stack.join(", ")}`, "muted"),
      ];
  }

  if (has("skill", "stack", "tech", "language", "framework", "tool"))
    return cmdSkills();
  if (has("experience", "work", "job", "role", "career", "company"))
    return cmdExperience();
  if (has("project", "built", "build", "made", "open source", "open-source"))
    return cmdProjects();
  if (has("study", "studied", "education", "degree", "university", "school"))
    return cmdEducation();
  if (has("contact", "email", "reach", "hire", "available", "availab"))
    return cmdContact();
  if (has("where", "based", "location", "live", "city"))
    return [out(`Based in ${site.location}.`)];
  if (has("who", "yourself", "about you", "you do")) return cmdWhoami();

  return [
    out("I don't have a scripted answer for that yet.", "error"),
    out(
      "Try: help · skills · experience · projects · education · contact — or name a company/project.",
      "muted",
    ),
    out(
      "...or try asking the chatbot instead: type 'cd chatbot' to interact with me! :D",
    ),
  ];
}

const CLEAR = "\u0000clear";

function run(raw: string): Line[] | typeof CLEAR {
  const cmd = raw.trim();
  if (!cmd) return [];
  const [name, ...rest] = cmd.split(/\s+/);
  const arg = rest.join(" ");
  switch (name.toLowerCase()) {
    case "help":
    case "?":
      return cmdHelp();
    case "whoami":
      return cmdWhoami();
    case "about":
    case "bio":
      return cmdAbout();
    case "skills":
      return cmdSkills();
    case "experience":
    case "work":
    case "history":
      return cmdExperience();
    case "projects":
      return cmdProjects();
    case "education":
      return cmdEducation();
    case "contact":
      return cmdContact();
    case "ls":
      return cmdLs(arg);
    case "cat":
      return cmdCat(arg);
    case "echo":
      return [out(arg)];
    case "pwd":
      return [out(`/home/${site.handle}`)];
    case "sudo":
      return [out("Permission denied: nice try.", "error")];
    case "clear":
      return CLEAR;
    case "ask":
      return askAnswer(arg);
    default:
      return askAnswer(cmd);
  }
}

// Tokens handled locally & instantly (everything else is treated as a question).
const COMMANDS = new Set([
  "help",
  "?",
  "whoami",
  "about",
  "bio",
  "skills",
  "experience",
  "work",
  "history",
  "projects",
  "education",
  "contact",
  "ls",
  "cat",
  "echo",
  "pwd",
  "sudo",
  "clear",
]);

type ChatTurn = { role: "user" | "assistant"; content: string };

// Ask the real LLM via /api/chat. Falls back to the scripted matcher if chat isn't configured (no API key) or the request fails — so it always answers.
async function askLLM(
  question: string,
  chat: ChatTurn[],
): Promise<{ lines: Line[]; chat: ChatTurn[] }> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: [...chat, { role: "user", content: question }],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const reply: string = (data?.reply ?? "").trim();
      if (!reply) return { lines: askAnswer(question), chat };
      return {
        lines: reply.split("\n").map((t: string) => out(t)),
        chat: [
          ...chat,
          { role: "user", content: question },
          { role: "assistant", content: reply },
        ],
      };
    }

    // 501 = no key configured
    if (res.status === 501) return { lines: askAnswer(question), chat };

    // Configured but errored (rate limit, upstream, etc.)
    return {
      lines: [
        out("(couldn't reach the model — answering from my notes)", "muted"),
        ...askAnswer(question),
      ],
      chat,
    };
  } catch {
    return {
      lines: [
        out("(offline — answering from my notes)", "muted"),
        ...askAnswer(question),
      ],
      chat,
    };
  }
}

const toneClass: Record<Tone, string> = {
  default: "text-[#ECE3D5]",
  muted: "text-[#A99B8C]",
  accent: "text-[#C08A7D]",
  error: "text-[#C97B6A]",
};

type Mode = "home" | "chat";

// const PROMPT = `${site.handle}@portfolio:~$`;
const promptFor = (mode: Mode) =>
  mode === "chat"
    ? `${site.handle}@portfolio:~/chatbot$`
    : `${site.handle}@portfolio:~$`;

// const initialLines: Line[] = [
//   out("interactive terminal — type a command or 'cd chatbot' to ask an AI.", "muted"),
//   out("start with: help", "muted"),
//   out(""),
// ];

export function Terminal() {
  const [lines, setLines] = React.useState<Line[]>([]);
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [busy, setBusy] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>("home");

  const bodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatRef = React.useRef<ChatTurn[]>([]);

  React.useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    const raw = input;
    const trimmed = raw.trim();
    setInput("");
    if (!trimmed) return;

    const echo: Line = { kind: "input", text: raw, prompt: promptFor(mode) };
    setHistory((prev) => [raw, ...prev].slice(0, 50));
    setHistIdx(-1);

    const parts = trimmed.split(/\s+/);
    const first = trimmed.split(/\s+/)[0].toLowerCase();
    const rest = trimmed.slice(parts[0].length).trim();

    if (first === "clear") {
      setLines([]);
      return;
    }

    // navigation between modes
    if (first === "cd" || first === "exit") {
      if (mode === "chat") {
        setMode("home");
        setLines((prev) => [
          ...prev,
          echo,
          out("left chatbot. back at ~", "muted"),
        ]);
        return;
      }
      if (first === "cd" && rest === "chatbot") {
        setMode("chat");
        setLines((prev) => [...prev, echo, ...chatHelp()]);
        return;
      }
      if (first === "exit") {
        setLines((prev) => [...prev, echo, out("already home.", "muted")]);
        return;
      }
      setLines((prev) => [
        ...prev,
        echo,
        out(`cd: no such directory: ${rest || "?"}`, "error"),
        out("the only room here is 'chatbot' — try: cd chatbot", "muted"),
      ]);
      return;
    }

    // HOME: commands only. never the chatbot
    if (mode === "home") {
      if (COMMANDS.has(first)) {
        const result = run(raw);
        setLines((prev) => [
          ...prev,
          echo,
          ...(result === CLEAR ? [] : result),
        ]);
        return;
      }
      setLines((prev) => [
        ...prev,
        echo,
        out(`command not found: ${first}`, "error"),
        out(
          `type 'help', or 'cd chatbot' to ask an AI about ${site.name}.`,
          "muted",
        ),
      ]);
      return;
    }

    // CHAT: everything is a question (help is the only meta command) ──
    if (first === "help") {
      setLines((prev) => [...prev, echo, ...chatHelp()]);
      return;
    }

    setLines((prev) => [...prev, echo, out("…", "muted")]);
    setBusy(true);
    const res = await askLLM(trimmed, chatRef.current);
    chatRef.current = res.chat;
    setBusy(false);
    setLines((prev) => [...prev.slice(0, -1), ...res.lines]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (next >= 0) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="cursor-text border-2 border-[#3A322B] bg-[#211B17] shadow-[5px_5px_0_0_hsl(var(--foreground))]"
    >
      <div className="flex items-center gap-2 border-b border-[#3A322B] px-4 py-2.5">
        <span className="inline-block h-2.5 w-2.5 bg-[#4A423A]" aria-hidden />
        <span className="inline-block h-2.5 w-2.5 bg-[#4A423A]" aria-hidden />
        <span className="inline-block h-2.5 w-2.5 bg-[#4A423A]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-[#8A7D6E]">
          ~/portfolio — zsh
        </span>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-live="polite"
        className="h-72 overflow-y-auto p-5 font-mono text-base leading-relaxed sm:h-80 sm:p-6"
      >
        <div>
          <p className="font-medium leading-tight text-[#C08A7D] mb-2">
            {site.handle}@portfolio:~${" "}
            <span className="text-[#ECE3D5]">whoami</span>
          </p>
          <p className="font-medium leading-tight text-[#A99B8C]">
            {site.name} - {site.role}
          </p>
          <p className="mt-1 text-[#C08A7D]">
            Full-Stack Developer, working across frontend and backend, building
            smooth interfaces up front and reliable systems behind the scenes.
          </p>
        </div>

        <p className="text-sm text-[#6F6456] mb-4">
          # always learning, always building, one tab too many open
        </p>
        <p className="text-[#6F6456]">
          # interactive terminal — type a command, or type 'cd chatbot' to ask an AI about ami (my nickname :D).
        </p>
        <p className="text-[#6F6456]">
          start with: help
        </p>

        {lines.map((l, i) =>
          l.kind === "input" ? (
            <p
              key={i}
              className="whitespace-pre-wrap break-words text-[#ECE3D5]"
            >
              <span className="text-[#C08A7D]">{l.prompt ?? promptFor("home")}</span> {l.text}
            </p>
          ) : (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words ${toneClass[l.tone ?? "default"]}`}
            >
              {l.text}
            </p>
          ),
        )}

        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-[#C08A7D]">
            {promptFor(mode)}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input — type a command or a question"
            className="flex-1 border-0 bg-transparent p-0 text-[#ECE3D5] caret-[#C08A7D] outline-none"
          />
        </form>
      </div>
    </div>
  );
}
