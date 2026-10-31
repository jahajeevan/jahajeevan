import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ExternalLink,
  Server,
  Database,
  Wrench,
  Sparkles,
  BrainCircuit,
  Terminal,
  Briefcase,
  GraduationCap,
  ChevronRight,
  MessageCircle,
  BadgeCheck,
} from "lucide-react";
import { HeroScene } from "./HeroScene";
import { IntroLoader } from "./IntroLoader";
import { Cursor } from "./Cursor";
import { TiltCard } from "./TiltCard";

const EMAIL = "jahajeevanv@gmail.com";
const GITHUB = "https://github.com/jahajeevan";
const LINKEDIN = "https://www.linkedin.com/in/jahajeevan-v-99774a379";
const WHATSAPP_NUMBER = "+91 78452 65507";
const WHATSAPP_URL = "https://wa.me/917845265507";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ──────────────────────────────────────────────────────────── NAV */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const ids = ["about", "skills", "projects", "experience", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] font-display text-[13px] font-bold text-background">
            J
          </span>
          <span className="hidden sm:inline">Jahajeevan</span>
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 text-sm md:flex ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          {links.map(([label, href]) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                className={`relative rounded-full px-3 py-1.5 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
        >
          Let's talk
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
        </a>
      </div>
    </motion.header>
  );
}

/* ──────────────────────────────────────────────────────────── HERO */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Animated background */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.88_0.07_75_/_0.55),transparent)]"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.86_0.06_180_/_0.45),transparent)]"
        />
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-cyan)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-cyan)]" />
            </span>
            Available for internships & freelance
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            I build <span className="text-gradient">software</span>
            <br />
            <span className="text-foreground/90">and AI systems</span>
            <br />
            <span className="text-foreground/90">people actually use.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm <span className="text-foreground">Jahajeevan</span> — a Full Stack Engineer building
            production software and local-first AI systems. React, Node.js, Python, and
            cloud-native infrastructure, shipped end-to-end.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] glow-cyan"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Me
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact Me <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
            <SocialIcon href={GITHUB} label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
            <SocialIcon href={LINKEDIN} label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
            <SocialIcon href={`mailto:${EMAIL}`} label="Email"><Mail className="h-4 w-4" /></SocialIcon>
            <span className="ml-2 font-mono text-xs text-muted-foreground">{EMAIL}</span>
          </motion.div>
        </motion.div>

          {/* 3D Workspace */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[460px] w-full lg:block"
          >
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[oklch(0.93_0.05_75_/_0.4)] to-[oklch(0.90_0.05_180_/_0.3)] blur-2xl" />
            <HeroScene />
          </motion.div>
        </div>

        {/* Code card (smaller screens) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 hidden md:block lg:hidden"
        >
          <HeroCodeCard />
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
    >
      {children}
    </a>
  );
}

function HeroCodeCard() {
  return (
    <div className="glass-strong overflow-hidden rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">~ jahajeevan / engineer.ts</span>
        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-foreground/85">
        <code>
          <span className="text-[var(--color-accent-violet)]">const</span>{" "}
          <span className="text-[var(--color-accent-cyan)]">engineer</span> = {"{"}
          {"\n"}  name: <span className="text-emerald-300">"Jahajeevan V"</span>,
          {"\n"}  role: <span className="text-emerald-300">"Full Stack Developer"</span>,
          {"\n"}  stack: [<span className="text-emerald-300">"React"</span>,{" "}
          <span className="text-emerald-300">"Node.js"</span>,{" "}
          <span className="text-emerald-300">"Python"</span>,{" "}
          <span className="text-emerald-300">"MongoDB"</span>],
          {"\n"}  focus: <span className="text-emerald-300">"production software + AI systems"</span>,
          {"\n"}  shipping: <span className="text-[var(--color-accent-cyan)]">true</span>,
          {"\n"}
          {"};"}
        </code>
      </pre>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── SECTION HELPERS */
function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14 max-w-2xl"
    >
      <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-[var(--color-accent-cyan)]" />
        {eyebrow}
      </motion.div>
      <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────── ABOUT */
function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="About"
          title="Engineer-first. Product-minded."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 lg:col-span-2"
          >
            <p className="text-base leading-relaxed text-foreground/85">
              I'm a <span className="text-foreground">B.Tech Computer Science</span> student who
              builds real, deployed software — full-stack web platforms, local-first AI
              assistants for macOS, and production websites for real clients. I care about clean
              architecture, honest scope, and the small details that make software feel premium.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Every project here was designed, built, and shipped by me end-to-end: data models,
              APIs, authentication, payments, deployment, and the interface people touch.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <Fact label="Based in" value="India" />
              <Fact label="Open to" value="Internships, Freelance" />
              <Fact label="Focus" value="Full Stack + AI systems" />
              <Fact label="Currently" value="B.Tech CSE" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-violet)]/20">
                <GraduationCap className="h-5 w-5 text-[var(--color-accent-cyan)]" />
              </div>
              <h3 className="font-display text-lg font-semibold">Education</h3>
            </div>
            <div className="mt-5">
              <div className="font-display text-base font-semibold leading-snug">
                B.Tech, Computer Science & Engineering
              </div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">2025 — Present · India</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Foundations in data structures, algorithms, databases, networks, and software
                engineering — applied directly in the projects I ship.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── SKILLS */
const skillGroups = [
  {
    icon: Sparkles,
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  },
  {
    icon: Terminal,
    title: "Frontend Development",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "React Router", "Axios"],
  },
  {
    icon: Server,
    title: "Backend Development",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT", "Nodemailer"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Supabase", "H2"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Intelligent Systems",
    items: ["NVIDIA NIM", "Ollama", "Whisper", "Vosk", "Kokoro TTS", "RAG", "Multi-agent orchestration"],
  },
  {
    icon: Wrench,
    title: "Development Tools & Cloud",
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Vercel", "Render", "VS Code", "Postman"],
  },
];

const learning = ["System Design", "Kubernetes", "LLM application engineering"];

function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Toolkit"
          title="The stack I ship with."
          description="Technologies I've used in shipped projects — organized by where they work, not how they look."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((g) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:bg-white/[0.05]"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-violet)]/20">
                    <Icon className="h-4 w-4 text-[var(--color-accent-cyan)]" />
                  </div>
                  <h3 className="font-display text-sm font-semibold">{g.title}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-foreground/10 bg-white/30 p-5"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Currently learning
          </span>
          {learning.map((s) => (
            <span
              key={s}
              className="rounded-md border border-dashed border-[var(--color-accent-violet)]/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── PROJECTS */
type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  accent: "cyan" | "violet" | "emerald";
};

const accentMap = {
  cyan: "from-[var(--color-accent-cyan)] to-sky-400",
  violet: "from-[var(--color-accent-violet)] to-fuchsia-400",
  emerald: "from-emerald-400 to-teal-400",
};

const featuredProjects: Project[] = [
  {
    name: "JK Hospital",
    tagline: "Hospital appointment & token-management platform · Live",
    description:
      "A full-stack hospital platform for appointment booking, real-time token queues, online payments, invoices, refunds, and staff administration — with multi-role dashboards and JWT-secured access. Deployed and live.",
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Nodemailer"],
    liveUrl: "https://jk-hospital-six.vercel.app",
    repoUrl: "https://github.com/jahajeevan/jk-hospital",
    accent: "cyan",
  },
  {
    name: "Scout",
    tagline: "Native macOS AI assistant",
    description:
      "Wake word, streaming voice, screen vision, and a multi-agent orchestrator with permission-gated tools, Code Mode, RAG, and persistent memory — built on NVIDIA NIM.",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "NVIDIA NIM", "RAG"],
    repoUrl: "https://github.com/jahajeevan/Scout",
    accent: "violet",
  },
  {
    name: "J.A.R.V.I.S.",
    tagline: "Local-first desktop assistant for macOS",
    description:
      "A cinematic, local-first assistant powered by Ollama and Qwen — offline speech recognition, gesture control, private memory, and a native shell. Nothing leaves the machine.",
    stack: ["TypeScript", "React", "Three.js", "Ollama", "Computer Vision"],
    repoUrl: "https://github.com/jahajeevan/jarvis",
    accent: "emerald",
  },
  {
    name: "Merkle Sentinel",
    tagline: "Dataset integrity verification case study",
    description:
      "A local-first application for verifying dataset integrity with a Java SHA-256 Merkle tree — separating computed roots from signed trusted checkpoints, with a proof explorer, tamper detection, audit history, and benchmarks.",
    stack: ["Java", "Spring Boot", "React", "TypeScript", "Docker", "PostgreSQL"],
    repoUrl: "https://github.com/jahajeevan/merkle-sentinel",
    accent: "violet",
  },
  {
    name: "Campus Connect",
    tagline: "Live canteen menus for Amrita Vishwa Vidyapeetham · Live",
    description:
      "A real-time canteen menu platform — staff manage their own menus from a dashboard and changes appear instantly on the public site, with a super-admin console and a zero-backend demo mode. Deployed and live.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "React Query", "Zod"],
    liveUrl: "https://campus-connect-flax-eight.vercel.app",
    repoUrl: "https://github.com/jahajeevan/Campus-Connect",
    accent: "emerald",
  },
  {
    name: "JeevVPN",
    tagline: "Flutter Android VPN client",
    description:
      "A Flutter-based Android VPN client with automated release pipelines and in-app updates.",
    stack: ["Flutter", "Dart", "Android", "GitHub Actions"],
    repoUrl: "https://github.com/jahajeevan/JeevVPN",
    accent: "cyan",
  },
];

const otherProjects: Project[] = [
  {
    name: "Amrita Nexus",
    tagline: "Campus event & operations platform",
    description:
      "Campus event registration, QR-based venue access control, and an admin analytics dashboard.",
    stack: ["React", "Node.js", "Express.js", "PostgreSQL"],
    repoUrl: "https://github.com/jahajeevan/Amrita-Nexus",
    accent: "violet",
  },
  {
    name: "Simbells Wedding & Events",
    tagline: "Client project · Production website",
    description:
      "Production website for a wedding & events business, with booking journeys and administration.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/jahajeevan/simbells-wedding-events",
    accent: "emerald",
  },
  {
    name: "Hearth & Bloom Designs",
    tagline: "Client project · Services website",
    description:
      "Interior-design portfolio and services website with an editorial, conversion-focused layout.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/jahajeevan/hearth-bloom-designs",
    accent: "cyan",
  },
];

function Projects() {
  const [flagship, ...rest] = featuredProjects;
  return (
    <section id="projects" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects that ship value."
          description="Real systems — designed, built, and deployed end-to-end. Descriptions come straight from the repositories; live links only where a deployment is verified."
        />

        {/* Flagship */}
        <FeaturedProject project={flagship} />

        {/* Grid of remaining featured projects */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </motion.div>

        {/* Other projects */}
        <div className="mt-24">
          <SectionTitle
            eyebrow="Also shipped"
            title="Other projects & client work."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {otherProjects.map((p, i) => (
              <CompactProjectCard key={p.name} project={p} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <motion.article
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="group relative overflow-hidden rounded-3xl glass-strong"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative order-2 p-8 lg:order-1 lg:p-12">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-violet)]/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-accent-cyan)]">
            <Sparkles className="h-3 w-3" /> Flagship project
          </motion.div>
          <motion.h3 variants={fadeUp} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-2 text-sm text-muted-foreground">
            {project.tagline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-foreground/85">
            {project.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] px-4 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> View Code
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative order-1 min-h-[320px] overflow-hidden border-b border-white/5 lg:order-2 lg:border-b-0 lg:border-l">
          <ProjectMockup accent={project.accent} />
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-strong"
      >
        <div className="relative h-40 overflow-hidden border-b border-white/5">
          <ProjectMockup accent={project.accent} compact />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Github className="h-3.5 w-3.5" /> View Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-cyan)] transition-colors hover:text-foreground"
              >
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}

function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group flex h-full flex-col rounded-2xl glass p-6 transition-colors hover:bg-white/[0.05]"
    >
      <h3 className="font-display text-lg font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 border-t border-white/5 pt-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <Github className="h-3.5 w-3.5" /> View Code
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </motion.article>
  );
}

function ProjectMockup({ accent, compact = false }: { accent: Project["accent"]; compact?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]} opacity-20`} />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl glass-strong p-3 shadow-2xl">
          <div className="flex items-center gap-1.5 pb-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="grid gap-1.5">
            <div className="flex gap-1.5">
              <div className="h-12 flex-1 rounded-md bg-white/[0.06]" />
              <div className="h-12 flex-1 rounded-md bg-white/[0.06]" />
              <div className="h-12 flex-1 rounded-md bg-gradient-to-br from-[var(--color-accent-cyan)]/40 to-[var(--color-accent-violet)]/40" />
            </div>
            <div className={`${compact ? "h-16" : "h-24"} rounded-md bg-white/[0.04] flex items-end p-2 gap-1`}>
              {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[var(--color-accent-cyan)]/60 to-[var(--color-accent-violet)]/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              <div className="h-6 flex-[2] rounded-md bg-white/[0.05]" />
              <div className="h-6 flex-1 rounded-md bg-white/[0.08]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── EXPERIENCE */
const experience = [
  {
    role: "Independent Full Stack Developer",
    org: "Self-directed projects",
    period: "2025 — Present",
    bullets: [
      "Designed, built, and deployed full-stack platforms end-to-end — JK Hospital (appointments, token queues, payments) and Campus Connect (live canteen menus).",
      "Owned everything: schema design, REST APIs, authentication, payments, deployment, and UI.",
    ],
  },
  {
    role: "AI Systems Development",
    org: "Scout · J.A.R.V.I.S.",
    period: "Ongoing",
    bullets: [
      "Building local-first macOS AI assistants with wake word, streaming voice, screen vision, RAG, and persistent memory.",
      "Multi-agent orchestration with permission-gated tools — on NVIDIA NIM and Ollama.",
    ],
  },
  {
    role: "Freelance / Client Work",
    org: "Simbells Wedding & Events · Hearth & Bloom Designs",
    period: "Delivered",
    bullets: [
      "Designed and delivered production websites for real clients, from concept to deployment.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Experience"
          title="Hands-on engineering."
          description="Independent development and client work — treated with production rigor, no inflated titles."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Briefcase className="h-3 w-3" /> {e.period}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{e.role}</h3>
              <p className="text-sm text-[var(--color-accent-cyan)]">{e.org}</p>
              <ul className="mt-4 space-y-2">
                {e.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent-violet)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── CONTACT */
function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,oklch(0.86_0.07_75_/_0.55),transparent)]" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,oklch(0.85_0.06_155_/_0.45),transparent)]" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-[var(--color-accent-cyan)]" /> Get in touch
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Let's build something <span className="text-gradient">exceptional.</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Open to internships, freelance opportunities, collaborations, and ambitious
                software projects. I reply within 24 hours.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] glow-cyan"
                >
                  <Mail className="h-4 w-4" /> Send Email
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Me
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              <ContactRow icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactRow icon={Linkedin} label="LinkedIn" value="jahajeevan-v" href={LINKEDIN} />
              <ContactRow icon={Github} label="GitHub" value="jahajeevan" href={GITHUB} />
              <ContactRow icon={MessageCircle} label="WhatsApp" value={WHATSAPP_NUMBER} href={WHATSAPP_URL} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-xl glass p-4 transition-all hover:bg-white/[0.06]"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-violet)]/20">
          <Icon className="h-4 w-4 text-[var(--color-accent-cyan)]" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="text-sm">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

/* ──────────────────────────────────────────────────────────── FOOTER */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] font-display text-sm font-bold text-background">
            J
          </span>
          <div>
            <div className="font-display text-sm font-semibold">Jahajeevan V</div>
            <div className="text-xs text-muted-foreground">Full Stack Developer & Software Engineer</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SocialIcon href={GITHUB} label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
          <SocialIcon href={LINKEDIN} label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
          <SocialIcon href={WHATSAPP_URL} label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialIcon>
          <SocialIcon href={`mailto:${EMAIL}`} label="Email"><Mail className="h-4 w-4" /></SocialIcon>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Jahajeevan. Crafted with care.
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────── ROOT */
export function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <IntroLoader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
