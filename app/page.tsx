'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  FileSearch,
  ArrowRight,
  Github,
  ShieldCheck,
  Workflow,
  Bot,
  Cpu,
  Lock,
  BarChart3,
  Sparkles,
  Radar,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const featureHighlights = [
  {
    icon: FileSearch,
    title: 'Unified Ingestion',
    highlight: 'Upload code, logs, binaries, or configs in seconds.',
    description:
      'Normalize every artifact automatically with metadata extraction, redaction, and provenance tracking built in.',
  },
  {
    icon: Bot,
    title: 'Agentic Intelligence',
    highlight: 'Coordinated AI agents dissect every signal.',
    description:
      'Data, intent, and reporting agents work together to contextualize risk so you can focus on mitigation, not triage.',
  },
  {
    icon: Lock,
    title: 'Security-First Controls',
    highlight: 'Enterprise controls with audit-ready trails.',
    description:
      'Fine-grained policy enforcement, deterministic replay, and immutable evidence bundles for every decision.',
  },
  {
    icon: BarChart3,
    title: 'Actionable Insights',
    highlight: 'From raw inputs to prioritized remediation.',
    description:
      'Surface true positives with severity scoring, exploitability insights, and guided fixes directly in your workflow.',
  },
];

const workflow = [
  {
    step: '01',
    title: 'Ingest & Normalize',
    description: 'Drop artifacts or connect repos. SentinelForge resolves dependencies and builds a searchable knowledge graph.',
  },
  {
    step: '02',
    title: 'Contextual AI Parsing',
    description: 'The Data Agent structures the signal stream with schema-aware parsing and redaction rules you can trust.',
  },
  {
    step: '03',
    title: 'Intent & Threat Analysis',
    description: 'Intent Agent evaluates motive and impact using chained reasoning models, stress-tested against real exploits.',
  },
  {
    step: '04',
    title: 'Report & Act',
    description: 'Dashboards, exports, and integrations push results to Jira, Slack, or your SIEM in a single click.',
  },
];

const metrics = [
  { value: '98%', label: 'Detection accuracy across OSS ecosystems' },
  { value: '3x', label: 'Faster remediation cycles for security teams' },
  { value: '15+', label: 'Agent heuristics tuned for threat modeling' },
];

const trustedBy = ['QuantumOps', 'NebulaSec', 'CipherStack', 'Atlas Cloud', 'Vertex Labs'];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-[460px] w-[460px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <nav className="relative border-b border-white/5 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <span className="text-lg font-semibold text-white">SentinelForge</span>
              <p className="text-xs text-slate-400">AI-Powered Defense Fabric</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a className="hover:text-primary transition-colors" href="#features">
              Platform
            </a>
            <a className="hover:text-primary transition-colors" href="#workflow">
              How it works
            </a>
            <a className="hover:text-primary transition-colors" href="#preview">
              Live preview
            </a>
            <a className="hover:text-primary transition-colors" href="#cta">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 md:inline-flex">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-slate-900 hover:from-cyan-400 hover:to-emerald-400">
                Start free trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-20">
        <section className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-lg shadow-cyan-500/20"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Version 2.1 • Agent orchestration reimagined</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Autonomous security intelligence for the velocity of modern software.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-300"
            >
              SentinelForge coordinates specialist AI agents to ingest, interpret, and act on code risk in real time. Eliminate manual triage and ship secure releases with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex gap-3">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-primary px-7 text-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.25)]">
                    Launch Sentinel
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-slate-200 hover:bg-white/10">
                    View demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                No credit card • Cancel anytime
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <p className="text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/10 blur-2xl" />
            <Card className="relative overflow-hidden border border-white/10 bg-slate-900/60 p-8 shadow-[0_30px_100px_rgba(15,118,110,0.25)]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <Radar className="h-4 w-4 text-primary" />
                  Threat Surface Sweep
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Real-time
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <div className="rounded-xl border border-white/5 bg-black/30 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Current Scan</p>
                      <p className="mt-2 text-xl font-semibold text-white">OSS Supply Chain Audit</p>
                    </div>
                    <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-slate-200">Session 03 • 04:26</span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                      <p className="text-xs uppercase tracking-wide text-cyan-300">Confidence</p>
                      <p className="mt-2 text-2xl font-semibold text-white">0.97</p>
                    </div>
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="text-xs uppercase tracking-wide text-emerald-300">Signals</p>
                      <p className="mt-2 text-2xl font-semibold text-white">128</p>
                    </div>
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                      <p className="text-xs uppercase tracking-wide text-blue-300">Escalations</p>
                      <p className="mt-2 text-2xl font-semibold text-white">3</p>
                    </div>
                    <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                      <p className="text-xs uppercase tracking-wide text-purple-300">Coverage</p>
                      <p className="mt-2 text-2xl font-semibold text-white">98%</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Intent Agent verdict</p>
                      <p className="text-xs text-slate-400">Possible credential exfiltration via obfuscated script.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Response playbook suggested
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">Triage ETA • 6m</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="mt-4 text-slate-400">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by secure engineering teams</p>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 text-sm font-medium tracking-wide text-slate-300">
            {trustedBy.map((company) => (
              <span key={company} className="rounded-full border border-white/5 bg-white/5 px-4 py-2">
                {company}
              </span>
            ))}
          </div>
        </section>

        <section id="features" className="space-y-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Secure more. Build more. Stress less.</h2>
              <p className="mt-3 max-w-3xl text-slate-300">
                Every capability is designed for autonomy. Our agents analyze terabytes of telemetry, explain decisions, and integrate with the tools you already trust.
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10">
                Explore the agent console
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featureHighlights.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ translateY: -4 }}
                transition={{ duration: 0.2 }}
                className="group h-full"
              >
                <Card className="flex h-full flex-col gap-5 border border-white/10 bg-slate-900/60 p-8 shadow-[0_20px_60px_rgba(15,118,110,0.15)] transition-all group-hover:border-primary/60">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-primary/80">{feature.highlight}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{feature.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm text-primary group-hover:gap-3">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="workflow" className="space-y-12">
          <div className="flex items-center gap-3 text-sm text-primary">
            <Workflow className="h-4 w-4" />
            SentinelForge Pipeline
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {workflow.map((stage, index) => (
              <div key={stage.title} className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_14px_45px_rgba(15,118,110,0.15)]">
                <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-lg font-semibold text-primary">
                  {stage.step}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">{stage.title}</h3>
                  <span className="text-sm text-slate-400">Phase {index + 1}</span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-300">{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="preview" className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/90 p-8 shadow-[0_24px_80px_rgba(34,211,238,0.18)]">
          <div className="absolute -left-12 top-0 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Live Agent Console
              </div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Meet the cockpit your responders deserve.</h2>
              <p className="text-slate-300">
                Drill into agent conversations, inspect provenance documents, and approve mitigation steps without leaving the console. It is transparent, explainable, and designed for humans in the loop.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">
                  <h4 className="text-xl font-semibold">Incident Forecast</h4>
                  <p className="mt-2 text-sm text-emerald-100/90">Predict exploitability before it lands in production.</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-cyan-100">
                  <h4 className="text-xl font-semibold">Explainable AI</h4>
                  <p className="mt-2 text-sm text-cyan-100/90">Trace every conclusion back to the originating signal.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Active Agents</span>
                <span>Session ID • 7F-29B</span>
              </div>
              <div className="mt-5 space-y-4 text-sm text-slate-200">
                {[{
                  title: 'Data Agent',
                  status: 'Completed • 2.3m',
                  detail: 'Normalized 312KB of log artifacts and extracted 7 code clusters.',
                },
                {
                  title: 'Intent Agent',
                  status: 'In Review',
                  detail: 'Detected credential harvesting via lateral movement script.',
                },
                {
                  title: 'Report Agent',
                  status: 'Queued',
                  detail: 'Compiling executive summary with remediation guidance.',
                }].map((agent) => (
                  <div key={agent.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{agent.title}</p>
                      <span className="text-xs text-slate-400">{agent.status}</span>
                    </div>
                    <p className="mt-3 text-xs text-slate-300">{agent.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" /> Connected to github.com/sentinelforge/core
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1">Audit log synced</span>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="relative overflow-hidden rounded-[32px] border border-primary/30 bg-gradient-to-r from-cyan-500/20 via-slate-900/60 to-emerald-500/20 p-10">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.6), transparent 45%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.6), transparent 45%)' }} />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Deploy SentinelForge in under 10 minutes.</h2>
              <p className="mt-3 text-slate-200">
                Self-host or use our managed cloud. SOC2-ready controls, on-prem connectors, and API-first design included by default.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white px-7 text-slate-900 hover:bg-slate-100">
                  Create secure workspace
                </Button>
              </Link>
              <Link href="mailto:hello@sentinelforge.ai">
                <Button size="lg" variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white/10">
                  Talk to an expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">SentinelForge</p>
              <p className="text-xs text-slate-400">© 2025 SentinelForge. Open Source Security, built for developers.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <span>•</span>
            <a className="hover:text-primary" href="#">Privacy</a>
            <span>•</span>
            <a className="hover:text-primary" href="#">Terms</a>
            <span>•</span>
            <a className="hover:text-primary" href="mailto:hello@sentinelforge.ai">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
