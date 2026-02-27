"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  MemoryStick,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Github,
  BookOpen,
  AlertTriangle,
  BrainCircuit,
  ClipboardCheck,
  CheckCircle2,
  PlugZap,
  Lock,
  Eye,
  Zap,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectId = "attesta" | "memproof" | "trailproof";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

type ProjectDefinition = {
  id: ProjectId;
  name: string;
  tagline: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  logoSrc?: string;
  status: "LIVE" | "NEW";
  color: "green" | "purple" | "cyan";
  badges: string[];
  problem: string;
  howItWorks: string[];
  docsHref: string;
  repoHref: string;
};

const projects: ProjectDefinition[] = [
  {
    id: "attesta",
    name: "Attesta",
    tagline: "Human verification and policy checks for AI actions",
    summary:
      "Open-source HITL verification for sensitive agent actions with risk-based challenges and tamper-evident audit trails.",
    icon: Shield,
    logoSrc: "/attesta-icon.svg",
    status: "LIVE",
    color: "green",
    badges: ["HITL", "Risk-based", "Audit trail"],
    problem:
      "Autonomous agents can execute high-impact actions without enough oversight. Teams need a standardized way to gate, verify, and audit those decisions.",
    howItWorks: [
      "Wrap agent actions and tool calls with policy evaluation.",
      "Escalate to challenge flows based on risk and context.",
      "Capture immutable audit events for compliance and debugging.",
    ],
    docsHref: "https://attesta.kyberon.dev",
    repoHref: "https://github.com/KyberonAi/attesta",
  },
  {
    id: "memproof",
    name: "MemProof",
    tagline: "Framework-agnostic memory reliability layer",
    summary:
      "Policy-driven memory controls with verifiable memory writes, retrieval checks, and auditability across runtimes.",
    icon: MemoryStick,
    status: "NEW",
    color: "purple",
    badges: ["Memory policy", "Integrity", "Framework agnostic"],
    problem:
      "Agents degrade when memory becomes stale, inconsistent, or poisoned. Teams need controls that make memory behavior predictable and reviewable.",
    howItWorks: [
      "Validate writes before committing memory updates.",
      "Enforce retrieval filters and recency/quality checks.",
      "Track memory lineage for replay and root-cause analysis.",
    ],
    docsHref: "https://memproof.kyberon.dev",
    repoHref: "https://github.com/KyberonAi/memproof",
  },
  {
    id: "trailproof",
    name: "TrailProof",
    tagline: "Tamper-evident audit trails for autonomous agent actions",
    summary:
      "Cryptographically verifiable execution logs that prove what your agents did, when, and why — built for compliance and post-incident analysis.",
    icon: ShieldCheck,
    logoSrc: "/trailproof-icon.svg",
    status: "NEW",
    color: "cyan",
    badges: ["Audit logs", "Tamper-evident", "Compliance"],
    problem:
      "When agents act autonomously, teams lack provable records of what happened. Debugging incidents and satisfying compliance requires verifiable, immutable execution trails.",
    howItWorks: [
      "Instrument agent actions to emit structured, signed audit events.",
      "Chain events with cryptographic hashes for tamper evidence.",
      "Query and replay trails for debugging, compliance, and root-cause analysis.",
    ],
    docsHref: "https://trailproof.kyberon.dev",
    repoHref: "https://github.com/KyberonAi/trailproof",
  },
];

const integrationGroups = [
  {
    label: "Frameworks",
    items: ["LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "OpenAI Agents"],
  },
  {
    label: "Protocols & Runtimes",
    items: ["MCP", "OpenAI-Compatible APIs", "LiteLLM", "Custom Sidecars"],
  },
  {
    label: "Workflow Tools",
    items: ["n8n", "Langflow", "Flowise", "Dify"],
  },
];

const faqs = [
  {
    q: "Are all projects open source?",
    a: "Yes. Attesta, MemProof, and TrailProof are open-source projects built for self-hosted and community-driven adoption.",
  },
  {
    q: "Do these replace LangGraph, CrewAI, or AutoGen?",
    a: "No. They are reliability layers that integrate with your existing orchestration/runtime choices.",
  },
  {
    q: "Can I adopt one project without the other?",
    a: "Yes. You can start with Attesta, MemProof, or TrailProof independently and combine them later.",
  },
  {
    q: "Is this focused on production use-cases?",
    a: "Yes. Kyberon focuses on the failure modes teams hit in production: unsafe actions, memory drift, and auditability gaps.",
  },
];

/* ─────────────── Shared Components ─────────────── */


function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="h-px w-8 bg-blue-500/50" />
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
        {children}
      </span>
    </div>
  );
}

/* ─────────────── Navbar ─────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { label: "Projects", href: "#projects" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" aria-hidden="true">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">
            KyberonAI
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/orgs/KyberonAi/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>

        <button
          className="p-2 text-zinc-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-800 md:hidden"
          >
            <ul className="space-y-1 p-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-3">
                <a
                  href="https://github.com/orgs/KyberonAi/repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────── Hero ─────────────── */

function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Open source software
          <br />
          <span className="text-zinc-500">for safe AI agents</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg"
        >
          Trust actions. Trust memory. KyberonAI gives teams focused
          reliability layers for production agent systems.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/orgs/KyberonAi/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </motion.div>

        {/* Code Preview */}
        <motion.div variants={fadeUp} custom={3} className="mt-16">
          <CodePreview />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Code Preview ─────────────── */

function CodePreview() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"python" | "typescript">("python");

  const pythonCode = `from attesta import PolicyEngine, Challenge

engine = PolicyEngine()

@engine.guard(risk="high")
async def transfer_funds(agent, amount, to):
    challenge = await Challenge.create(
        action="transfer_funds",
        context={"amount": amount, "to": to}
    )
    approval = await challenge.request_human_review()
    if approval.granted:
        return await agent.execute(amount, to)`;

  const tsCode = `import { PolicyEngine, Challenge } from "@kyberon/attesta";

const engine = new PolicyEngine();

const transfer = engine.guard({ risk: "high" },
  async (agent, amount: number, to: string) => {
    const challenge = await Challenge.create({
      action: "transfer_funds",
      context: { amount, to }
    });
    const approval = await challenge.requestHumanReview();
    if (approval.granted) {
      return agent.execute(amount, to);
    }
  }
);`;

  const code = tab === "python" ? pythonCode : tsCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block mx-auto max-w-2xl overflow-hidden rounded-xl text-left">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("python")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              tab === "python"
                ? "bg-zinc-700 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Python
          </button>
          <button
            onClick={() => setTab("typescript")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              tab === "typescript"
                ? "bg-zinc-700 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            TypeScript
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="text-zinc-300">
          {code.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-6 select-none text-right text-zinc-600">
                {i + 1}
              </span>
              <span>
                {highlightLine(line)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function highlightLine(line: string) {
  // Comment lines
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    const indent = line.slice(0, line.length - trimmed.length);
    return (
      <>
        {indent}
        <span className="text-zinc-500 italic">{trimmed}</span>
      </>
    );
  }

  // Tokenize and colorize
  const tokens: { text: string; color: string }[] = [];
  // Regex to match keywords, decorators, strings, function calls, numbers, types, and the rest
  const regex =
    /(@\w[\w.]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(from|import|async|await|def|if|return|const|let|new|class|export|throw|function)\b|\b(True|False|true|false|None|null|undefined)\b|\b(string|number|boolean|object|any|void|Promise)\b|\b([A-Z]\w*)\b|(\.\w+)\(|\b(\d+\.?\d*)\b/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    // Add plain text before match
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), color: "" });
    }

    if (match[1]) {
      // Decorator (@something)
      tokens.push({ text: match[1], color: "text-yellow-300" });
    } else if (match[2]) {
      // String
      tokens.push({ text: match[2], color: "text-amber-300" });
    } else if (match[3]) {
      // Keyword
      tokens.push({ text: match[3], color: "text-purple-400" });
    } else if (match[4]) {
      // Boolean/None/null
      tokens.push({ text: match[4], color: "text-orange-400" });
    } else if (match[5]) {
      // Type annotation
      tokens.push({ text: match[5], color: "text-cyan-300" });
    } else if (match[6]) {
      // Class name (PascalCase)
      tokens.push({ text: match[6], color: "text-teal-300" });
    } else if (match[7]) {
      // Method call (.methodName followed by open paren)
      tokens.push({ text: match[7], color: "text-sky-300" });
      tokens.push({ text: "(", color: "" });
    } else if (match[8]) {
      // Number
      tokens.push({ text: match[8], color: "text-orange-300" });
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), color: "" });
  }

  if (tokens.length === 0) {
    return <>{line}</>;
  }

  return (
    <>
      {tokens.map((t, i) =>
        t.color ? (
          <span key={i} className={t.color}>
            {t.text}
          </span>
        ) : (
          <span key={i}>{t.text}</span>
        )
      )}
    </>
  );
}

/* ─────────────── Stats ─────────────── */

function StatsSection() {
  const stats = [
    { value: "3", label: "Open source projects" },
    { value: "MIT", label: "Licensed" },
    { value: "14+", label: "Integrations" },
    { value: "100%", label: "Self-hostable" },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Project Code Snippets ─────────────── */

const projectCodeSnippets: Record<
  ProjectId,
  { python: { filename: string; code: string }; typescript: { filename: string; code: string } }
> = {
  attesta: {
    python: {
      filename: "guard.py",
      code: `from attesta import PolicyEngine, Challenge

engine = PolicyEngine()

@engine.guard(risk="high")
async def transfer_funds(agent, amount, to):
    challenge = await Challenge.create(
        action="transfer_funds",
        context={"amount": amount, "to": to}
    )
    approval = await challenge.request_human_review()
    if approval.granted:
        return await agent.execute(amount, to)`,
    },
    typescript: {
      filename: "guard.ts",
      code: `import { PolicyEngine, Challenge } from "@kyberon/attesta";

const engine = new PolicyEngine();

const transferFunds = engine.guard({ risk: "high" },
  async (agent, amount: number, to: string) => {
    const challenge = await Challenge.create({
      action: "transfer_funds",
      context: { amount, to }
    });
    const approval = await challenge.requestHumanReview();
    if (approval.granted) {
      return agent.execute(amount, to);
    }
  }
);`,
    },
  },
  memproof: {
    python: {
      filename: "memory.py",
      code: `from memproof import MemoryGuard, Policy

guard = MemoryGuard(
    policy=Policy(
        max_staleness="24h",
        require_source=True,
        conflict_strategy="reject"
    )
)

@guard.validate_write
async def store_context(key, value, source):
    quality = await guard.check_quality(value)
    if quality.score < 0.7:
        raise guard.RejectWrite("Low quality")
    return await guard.commit(key, value, source)

@guard.validate_read
async def recall(key, recency="7d"):
    return await guard.retrieve(
        key, max_age=recency, verify=True
    )`,
    },
    typescript: {
      filename: "memory.ts",
      code: `import { MemoryGuard, Policy } from "@kyberon/memproof";

const guard = new MemoryGuard({
  policy: new Policy({
    maxStaleness: "24h",
    requireSource: true,
    conflictStrategy: "reject"
  })
});

const storeContext = guard.validateWrite(
  async (key: string, value: any, source: string) => {
    const quality = await guard.checkQuality(value);
    if (quality.score < 0.7) {
      throw new guard.RejectWrite("Low quality");
    }
    return guard.commit(key, value, source);
  }
);

const recall = guard.validateRead(
  async (key: string, recency = "7d") => {
    return guard.retrieve(key, {
      maxAge: recency, verify: true
    });
  }
);`,
    },
  },
  trailproof: {
    python: {
      filename: "audit.py",
      code: `from trailproof import AuditTrail, Event

trail = AuditTrail(
    signing_key="sk_...",
    chain=True  # cryptographic hash chain
)

@trail.track
async def agent_action(action, context):
    event = Event.create(
        action=action,
        context=context,
        timestamp="auto",
        sign=True
    )
    result = await execute(action, context)
    await trail.append(event, result=result)
    return result

# Query & replay for debugging
history = await trail.query(
    action="transfer_funds",
    after="2025-01-01",
    verify_chain=True
)`,
    },
    typescript: {
      filename: "audit.ts",
      code: `import { AuditTrail, Event } from "@kyberon/trailproof";

const trail = new AuditTrail({
  signingKey: "sk_...",
  chain: true // cryptographic hash chain
});

const agentAction = trail.track(
  async (action: string, context: object) => {
    const event = Event.create({
      action,
      context,
      timestamp: "auto",
      sign: true
    });
    const result = await execute(action, context);
    await trail.append(event, { result });
    return result;
  }
);

// Query & replay for debugging
const history = await trail.query({
  action: "transfer_funds",
  after: "2025-01-01",
  verifyChain: true
});`,
    },
  },
};

/* ─────────────── Project Code Window ─────────────── */

function ProjectCodeWindow({ projectId }: { projectId: ProjectId }) {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<"python" | "typescript">("python");
  const snippet = projectCodeSnippets[projectId][lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLang("python")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              lang === "python"
                ? "bg-zinc-700 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Python
          </button>
          <button
            onClick={() => setLang("typescript")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              lang === "typescript"
                ? "bg-zinc-700 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            TypeScript
          </button>
          <span className="ml-2 text-xs text-zinc-600">{snippet.filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="text-zinc-300">
          {snippet.code.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-6 select-none text-right text-zinc-600">
                {i + 1}
              </span>
              <span>{highlightLine(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ─────────────── Projects ─────────────── */

function ProjectsSection({
  activeProject,
  setActiveProject,
}: {
  activeProject: ProjectId;
  setActiveProject: (id: ProjectId) => void;
}) {
  const selected = projects.find((p) => p.id === activeProject) ?? projects[0];

  const colorMap = {
    green: { ring: "ring-emerald-500/30", text: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    purple: { ring: "ring-violet-500/30", text: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/30" },
    cyan: { ring: "ring-sky-500/30", text: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  };

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Two-column layout: title+cards left, code right — aligned from top */}
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left column: title, description, project cards */}
          <div>
            <SectionLabel>Projects</SectionLabel>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {selected.name}
                </h2>
                <p className="mt-3 text-base text-zinc-400">
                  {selected.summary}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 space-y-3">
              {projects.map((project, i) => {
                const colors = colorMap[project.color];
                const isActive = activeProject === project.id;

                return (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setActiveProject(project.id)}
                    onClick={() => setActiveProject(project.id)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className={cn(
                      "card group relative w-full cursor-pointer rounded-xl p-5 text-left transition-all",
                      isActive && `ring-1 ${colors.ring}`
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", colors.bg)}>
                          {project.logoSrc ? (
                            <Image
                              src={project.logoSrc}
                              alt={`${project.name} logo`}
                              width={14}
                              height={14}
                              className="h-3.5 w-3.5"
                            />
                          ) : (
                            <project.icon className={cn("h-3.5 w-3.5", colors.text)} />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {project.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          project.status === "LIVE"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-emerald-500/10 text-emerald-500"
                        )}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {project.tagline}
                    </p>

                    {/* Expanded info when active */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.badges.map((badge) => (
                              <span
                                key={badge}
                                className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <a
                              href={project.docsHref}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <BookOpen className="h-3 w-3" />
                              Docs
                            </a>
                            <a
                              href={project.repoHref}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="h-3 w-3" />
                              Repository
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column: code window — starts at top, aligned with "PROJECTS" title */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <ProjectCodeWindow projectId={selected.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: code window below cards */}
          <div className="lg:hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <ProjectCodeWindow projectId={selected.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Problem & How it Works — single card for selected project */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`details-${selected.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="mt-12"
          >
            <div className="card rounded-xl p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left: Problem */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    Problem
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-300">
                    {selected.problem}
                  </p>
                </div>

                {/* Right: How it Works */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    How it Works
                  </h3>
                  <ul className="space-y-3">
                    {selected.howItWorks.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.15 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", colorMap[selected.color].text)} />
                        <span className="text-sm leading-relaxed text-zinc-300">
                          {step}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────── How It Works / Failure Modes ─────────────── */

function HowItWorksSection() {
  const items = [
    {
      title: "Unsafe autonomous actions",
      desc: "Agents call tools with real-world impact faster than teams can review. Verification should scale with risk.",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
    },
    {
      title: "Compounding memory errors",
      desc: "Bad memory writes poison downstream steps. Reliability requires guardrails on both writes and retrieval.",
      icon: BrainCircuit,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-500/10",
    },
    {
      title: "No operational accountability",
      desc: "Without auditability, debugging incidents and proving compliance becomes costly and slow.",
      icon: ClipboardCheck,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-500/10",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel>Why Kyberon</SectionLabel>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Designed around real
            <br />
            production breakpoints
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 max-w-xl text-base text-zinc-400"
          >
            Kyberon prioritizes high-impact failure patterns that teams hit when agents move from demo to production.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="card rounded-xl p-6"
            >
              <div className={cn("mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg", item.iconBg)}>
                <item.icon className={cn("h-5 w-5", item.iconColor)} />
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lock, label: "Policy enforcement" },
            { icon: Eye, label: "Human-in-the-loop" },
            { icon: Zap, label: "Framework agnostic" },
            { icon: Terminal, label: "Self-hostable" },
          ].map((feat, i) => (
            <motion.div
              key={feat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3"
            >
              <feat.icon className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-zinc-300">{feat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Integrations ─────────────── */

function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel>Integrations</SectionLabel>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Plugs into your
            <br />
            existing stack
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 max-w-xl text-base text-zinc-400"
          >
            Use Kyberon with the frameworks and workflow tools your team already runs.
          </motion.p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {integrationGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="card rounded-xl p-5"
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <PlugZap className="h-3.5 w-3.5" />
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FAQ ─────────────── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionLabel>FAQ</SectionLabel>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Frequently asked
          <br />
          questions
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-10 space-y-2"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              variants={fadeUp}
              custom={i}
              className="card overflow-hidden rounded-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-200 transition hover:text-white"
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-400">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */

function CTABanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center sm:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5"
            aria-hidden="true"
          />

          <motion.h2
            variants={fadeUp}
            custom={0}
            className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Build trusted agents
            <br />
            in the open
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="relative mx-auto mt-4 max-w-lg text-zinc-400"
          >
            Adopt Attesta, MemProof, or TrailProof today and help shape the
            reliability layer for autonomous AI systems.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <a
              href="https://github.com/orgs/KyberonAi/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */

function Footer() {
  const cols = [
    {
      title: "Projects",
      links: [
        { label: "Attesta", href: "https://attesta.kyberon.dev" },
        { label: "MemProof", href: "https://memproof.kyberon.dev" },
        { label: "TrailProof", href: "https://trailproof.kyberon.dev" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Examples", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: "https://github.com/orgs/KyberonAi/repositories" },
        { label: "Contributing", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-800/50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white" aria-hidden="true">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">KyberonAI</span>
            </a>
            <p className="mt-3 text-xs text-zinc-500">
              Open-source reliability infrastructure
              <br />
              for AI agents.
            </p>
            <p className="mt-2 text-xs text-zinc-600">MIT Licensed</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 transition hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-800/50 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} KyberonAI. Open source under MIT.
          </p>
          <div className="flex gap-5">
            {["GitHub", "Discord", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-zinc-600 transition hover:text-zinc-400"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Main ─────────────── */

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>("attesta");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <StatsSection />
        <div className="section-divider" />
        <ProjectsSection activeProject={activeProject} setActiveProject={setActiveProject} />
        <div className="section-divider" />
        <HowItWorksSection />
        <div className="section-divider" />
        <IntegrationsSection />
        <div className="section-divider" />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
