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
  Sparkles,
  Star,
  Menu,
  X,
  Github,
  BookOpen,
  Heart,
  Users,
  GitFork,
  Sun,
  Moon,
  AlertTriangle,
  BrainCircuit,
  ClipboardCheck,
  CheckCircle2,
  PlugZap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";
type ProjectId = "attesta" | "memproof" | "trailproof";

const THEME_KEY = "kyberon-theme";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
    q: "Are both projects open source?",
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

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-400/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-cyan-300 backdrop-blur">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <motion.div variants={fadeUp} custom={0}>
        <SectionBadge>{badge}</SectionBadge>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-4 text-base text-slate-500 dark:text-slate-400 sm:text-lg"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-400/20 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-sky-400/40 hover:text-sky-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-sky-300"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

function Navbar({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Failure Modes", href: "#failure-modes" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-300/40 bg-white/75 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#030712]/70"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-base font-bold tracking-tight">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-slate-900 dark:text-white">
            Kyberon<span className="text-blue-500 dark:text-blue-400">AI</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <a
            href="https://github.com/orgs/KyberonAi/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>
        </div>

        <button
          className="p-2 text-slate-600 dark:text-slate-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
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
            className="overflow-hidden border-t border-slate-300/40 dark:border-white/10 md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <div className="flex items-center justify-between gap-3 px-1">
                  <ThemeToggle theme={theme} onToggle={onToggle} />
                  <a
                    href="https://github.com/orgs/KyberonAi/repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white"
                  >
                    <Github className="h-4 w-4" />
                    Star
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-radial from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-400/20 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-blue-600 backdrop-blur dark:bg-white/[0.03] dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open Source Ecosystem
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
        >
          Open Source Software for{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-purple-400">
            Autonomous AI Agents
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl dark:text-slate-400"
        >
          Trust actions. Trust memory. KyberonAI gives teams focused reliability
          layers for production agent systems.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#integrations"
            className="inline-flex items-center gap-2 rounded-full border border-slate-400/25 bg-white/70 px-8 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.06]"
          >
            <BookOpen className="h-4 w-4" />
            Integrations
          </a>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} className="mt-14">
          <div className="hero-flow rounded-2xl p-5 sm:p-6">
            <div className="hero-flow-rail" aria-hidden="true">
              <div className="hero-flow-dot" />
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {["Agent Action", "Policy Check", "Human Verify", "Memory Guard"].map((item) => (
                <div
                  key={item}
                  className="hero-flow-node rounded-lg px-3 py-2 text-xs font-semibold tracking-wide"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={5}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-75"
        >
          {[
            { icon: Star, label: "MIT" },
            { icon: GitFork, label: "Fork Friendly" },
            { icon: Users, label: "Community Driven" },
            { icon: Heart, label: "Built in Public" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-slate-500"
            >
              <badge.icon className="h-3.5 w-3.5" />
              {badge.label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectsSection({
  activeProject,
  setActiveProject,
}: {
  activeProject: ProjectId;
  setActiveProject: (id: ProjectId) => void;
}) {
  const selected = projects.find((p) => p.id === activeProject) ?? projects[0];
  const selectedAccent =
    selected.color === "green"
      ? "text-emerald-500"
      : selected.color === "cyan"
        ? "text-sky-500"
        : "text-violet-500";

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Projects"
          title="Focused modules for agent reliability"
          subtitle="Select a project to see the problem it solves and how it works in production stacks."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project.id)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i}
              className={cn(
                "glass-card group relative rounded-2xl p-6 text-left transition",
                activeProject === project.id && project.color === "green" && "ring-1 ring-emerald-500/50",
                activeProject === project.id && project.color === "purple" && "ring-1 ring-violet-500/50",
                activeProject === project.id && project.color === "cyan" && "ring-1 ring-sky-500/50"
              )}
            >
              <span
                className={cn(
                  "absolute right-4 top-4 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white",
                  project.status === "LIVE" ? "bg-blue-500" : "bg-emerald-500"
                )}
              >
                {project.status}
              </span>

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br",
                    project.color === "purple" &&
                      "from-violet-500/20 to-violet-600/5 text-violet-500 dark:text-violet-400",
                    project.color === "green" &&
                      "from-emerald-500/20 to-emerald-600/5 text-emerald-500 dark:text-emerald-400",
                    project.color === "cyan" &&
                      "from-sky-500/20 to-sky-600/5 text-sky-500 dark:text-sky-400"
                  )}
                >
                  {project.logoSrc ? (
                    <Image
                      src={project.logoSrc}
                      alt={`${project.name} logo`}
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  ) : (
                    <project.icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {project.name}
                </span>
              </div>

              <p
                className={cn(
                  "mt-3 text-sm font-medium italic",
                  project.color === "purple" && "text-violet-600 dark:text-violet-400",
                  project.color === "green" && "text-emerald-600 dark:text-emerald-400",
                  project.color === "cyan" && "text-sky-600 dark:text-sky-400"
                )}
              >
                {project.tagline}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-500">
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-slate-300/60 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <ArrowRight className="mt-5 h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-500" />
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-card mt-8 rounded-2xl p-6"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Problem
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {selected.problem}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  How It Works
                </h3>
                <ul className="mt-3 space-y-2">
                  {selected.howItWorks.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", selectedAccent)} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={selected.docsHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-400/25 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.06]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Docs
              </a>
              <a
                href={selected.repoHref}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
              >
                <Github className="h-3.5 w-3.5" />
                Repository
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FailureModesSection() {
  const items = [
    {
      title: "Unsafe autonomous actions",
      desc: "Agents can call tools with real-world impact faster than teams can review. Verification should scale with risk.",
      icon: AlertTriangle,
    },
    {
      title: "Compounding memory errors",
      desc: "Bad memory writes poison downstream steps. Reliability requires guardrails on both writes and retrieval.",
      icon: BrainCircuit,
    },
    {
      title: "No operational accountability",
      desc: "Without auditability, debugging incidents and proving compliance becomes costly and slow.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section id="failure-modes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Failure Modes"
          title="Designed around real production breakpoints"
          subtitle="Kyberon prioritizes high-impact failure patterns that teams hit when agents move from demo to production."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i}
              className="glass-card rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Integrations"
          title="Plugs into your existing agent stack"
          subtitle="Use Kyberon with the frameworks and workflow tools your team already runs."
        />

        <div className="space-y-5">
          {integrationGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i}
              className="glass-card rounded-2xl p-5"
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <PlugZap className="h-4 w-4" />
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="integration-chip rounded-full border border-slate-300/60 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:text-slate-300"
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

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          subtitle="The basics teams ask before adopting Kyberon modules in production."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              variants={fadeUp}
              custom={i}
              className="glass-card overflow-hidden rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-slate-800 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300"
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300",
                    openIndex === i && "rotate-180 text-blue-500"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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

function CTABanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative overflow-hidden rounded-3xl border border-slate-300/50 bg-gradient-to-br from-sky-300/20 via-cyan-200/15 to-transparent p-12 text-center dark:border-white/[0.08] dark:from-blue-500/10 dark:via-cyan-500/5 sm:p-16"
        >
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"
            aria-hidden="true"
          />

          <motion.h2
            variants={fadeUp}
            custom={0}
            className="relative text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Build trusted agents in the open
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="relative mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            Adopt Attesta, MemProof, or TrailProof today and help shape the open
            reliability layer for autonomous AI systems.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="https://github.com/orgs/KyberonAi/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-400/30 bg-white/70 px-8 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.06]"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Projects",
      links: ["Attesta", "MemProof", "TrailProof"],
    },
    {
      title: "Developers",
      links: ["Documentation", "API Reference", "Examples", "Roadmap"],
    },
    {
      title: "Community",
      links: ["GitHub Discussions", "Contributing", "Blog"],
    },
    {
      title: "About",
      links: ["Mission", "Contact"],
    },
  ];

  return (
    <footer className="border-t border-slate-300/40 py-16 dark:border-white/[0.06]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 text-base font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-slate-900 dark:text-white">
                Kyberon<span className="text-blue-500 dark:text-blue-400">AI</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-500">
              Open-source reliability infrastructure for AI agents.
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-600">MIT Licensed</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-300/40 pt-8 dark:border-white/[0.06] sm:flex-row">
          <p className="text-xs text-slate-500 dark:text-slate-600">
            &copy; {new Date().getFullYear()} KyberonAI. Open source under MIT.
          </p>
          <div className="flex gap-6">
            {["GitHub", "Discord", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-slate-500 transition hover:text-slate-700 dark:text-slate-600 dark:hover:text-slate-400"
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

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeProject, setActiveProject] = useState<ProjectId>("attesta");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <>
      <Navbar
        theme={theme}
        onToggle={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />
      <main>
        <HeroSection />
        <div className="section-glow-line" />
        <ProjectsSection activeProject={activeProject} setActiveProject={setActiveProject} />
        <div className="section-glow-line" />
        <FailureModesSection />
        <div className="section-glow-line" />
        <IntegrationsSection />
        <div className="section-glow-line" />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
