import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CalendarDays,
  QrCode,
  MapPin,
  Megaphone,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

/* ── 1. Interactive Campus Platform Overview ─────────────────────── */
const portals = [
  {
    id: "student",
    label: "Student Portal",
    icon: GraduationCap,
    accent: "#7a9d6f",
    headline: "Discover, register, attend.",
    bullets: ["Browse upcoming events", "One-tap registration", "QR pass in wallet", "Personal schedule"],
  },
  {
    id: "faculty",
    label: "Faculty Portal",
    icon: Users,
    accent: "#8b9a5f",
    headline: "Run sessions with control.",
    bullets: ["Create & host sessions", "Approve registrations", "Live attendance view", "Export reports"],
  },
  {
    id: "admin",
    label: "Admin Portal",
    icon: ShieldCheck,
    accent: "#a07a3a",
    headline: "Operate the entire campus.",
    bullets: ["Role & access control", "Department-wide analytics", "System-wide announcements", "Audit logs"],
  },
  {
    id: "events",
    label: "Event Management",
    icon: CalendarDays,
    accent: "#a48a55",
    headline: "Plan, publish, scale.",
    bullets: ["Multi-day scheduling", "Capacity & waitlists", "Speaker management", "Custom forms"],
  },
  {
    id: "qr",
    label: "QR Registration",
    icon: QrCode,
    accent: "#b8945a",
    headline: "Frictionless check-in.",
    bullets: ["Signed QR tokens", "Offline-safe scanning", "Anti-replay validation", "Instant attendance"],
  },
  {
    id: "venue",
    label: "Venue Management",
    icon: MapPin,
    accent: "#6b8aa3",
    headline: "Right room, right time.",
    bullets: ["Block & reserve halls", "Conflict detection", "Capacity heatmaps", "Map directions"],
  },
  {
    id: "ann",
    label: "Announcements",
    icon: Megaphone,
    accent: "#9c7c3e",
    headline: "Reach the right people.",
    bullets: ["Targeted broadcasts", "Department channels", "Rich-text composer", "Read receipts"],
  },
];

export function NexusPlatformOverview() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % portals.length), 4200);
    return () => clearInterval(t);
  }, []);
  const p = portals[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1 w-1 rounded-full" style={{ background: p.accent }} /> Seven modules · one campus
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          One platform, every campus workflow.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Purpose-built portals for students, faculty, and admins — wired into a shared event, venue, and attendance system.
        </p>

        <div className="mt-5 grid gap-2">
          {portals.map((r, i) => {
            const Icon = r.icon;
            const isActive = i === active;
            return (
              <button
                key={r.id}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-foreground/15 bg-white/80 shadow-md"
                    : "border-foreground/5 bg-white/40 hover:bg-white/65"
                }`}
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-white shadow-sm transition-transform group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${r.accent}, ${r.accent}cc)` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold">{r.label}</div>
                  <div className="text-[11px] text-muted-foreground">{r.headline}</div>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="nexus-rail"
                    className="absolute inset-y-0 left-0 w-[3px]"
                    style={{ background: p.accent }}
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 -z-10 rounded-3xl blur-2xl transition-colors duration-700"
          style={{ background: `radial-gradient(closest-side, ${p.accent}33, transparent 70%)` }}
        />
        <div className="overflow-hidden rounded-2xl border border-foreground/5 bg-white/85 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-foreground/5 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10.5px] text-muted-foreground">
              amrita-nexus.app / {p.id}
            </span>
            <span className="text-[10px] text-muted-foreground">v1.0</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-semibold">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.headline}</div>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white"
                  style={{ background: p.accent }}
                >
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-foreground/5 bg-white/70 p-3">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      Metric
                    </div>
                    <div className="mt-1 font-display text-lg font-semibold">
                      {[214, 36, 89][i]}
                    </div>
                    <div
                      className="mt-1 h-1 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}55)` }}
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-foreground/5 bg-white/60 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-medium">{p.label} workflows</div>
                  <div className="font-mono text-[10px] text-muted-foreground">4 / 4</div>
                </div>
                <ul className="grid grid-cols-2 gap-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 rounded-md bg-white/70 px-2 py-1.5 text-[11px] text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end gap-1 rounded-lg border border-foreground/5 bg-white/60 p-3">
                {[55, 70, 48, 88, 60, 95, 50, 76, 42, 82].map((h, i) => (
                  <motion.div
                    key={`${p.id}-${i}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: 0.05 * i }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: `linear-gradient(to top, ${p.accent}, ${p.accent}66)`,
                      minHeight: 6,
                      maxHeight: 56,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Campus Workflow Visualization ────────────────────────────── */
const workflowSteps = [
  { id: "student", label: "Student", icon: GraduationCap, accent: "#7a9d6f" },
  { id: "register", label: "Event Registration", icon: CalendarDays, accent: "#8b9a5f" },
  { id: "qr", label: "QR Generation", icon: QrCode, accent: "#a48a55" },
  { id: "checkin", label: "Venue Check-In", icon: MapPin, accent: "#b8945a" },
  { id: "attendance", label: "Attendance Tracking", icon: Users, accent: "#9c7c3e" },
  { id: "analytics", label: "Admin Analytics", icon: BarChart3, accent: "#a07a3a" },
];

export function NexusWorkflow() {
  return (
    <div className="relative rounded-2xl border border-foreground/5 bg-gradient-to-br from-white/70 to-white/40 p-6 backdrop-blur sm:p-10">
      <div className="grid gap-4 md:grid-cols-6">
        {workflowSteps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-xl border border-foreground/10 bg-white/90 p-4 text-center shadow-md backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl">
                <div
                  className="mx-auto grid h-10 w-10 place-items-center rounded-lg text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-2 font-display text-xs font-semibold leading-tight">{s.label}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              {i < workflowSteps.length - 1 && (
                <svg
                  className="absolute top-1/2 right-[-18px] hidden h-3 w-9 -translate-y-1/2 md:block"
                  viewBox="0 0 36 12"
                  fill="none"
                >
                  <motion.path
                    d="M0 6 L30 6"
                    stroke="oklch(0.55 0.08 70)"
                    strokeOpacity="0.45"
                    strokeWidth="1.4"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i + 0.2 }}
                  />
                  <motion.circle
                    r="2"
                    fill="oklch(0.70 0.10 70)"
                    initial={{ cx: 0, opacity: 0 }}
                    animate={{ cx: [0, 30], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.6,
                      delay: 0.6 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1.4,
                      ease: "easeInOut",
                    }}
                    cy="6"
                  />
                  <path d="M30 6 L34 4 L34 8 Z" fill="oklch(0.55 0.08 70 / 0.6)" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 3. Amrita Nexus Architecture Diagram ────────────────────────── */
const archNodes = [
  { id: "react",    label: "React Frontend",      x: 18, y: 14, color: "#6b8aa3" },
  { id: "router",   label: "React Router",        x: 50, y: 14, color: "#7a9d6f" },
  { id: "axios",    label: "Axios Client",        x: 82, y: 14, color: "#8b9a5f" },
  { id: "node",     label: "Node.js + Express",   x: 50, y: 36, color: "#8a7340" },
  { id: "jwt",      label: "JWT Auth · RBAC",     x: 22, y: 56, color: "#a07a3a" },
  { id: "qrsvc",    label: "QR Token Service",    x: 50, y: 56, color: "#a48a55" },
  { id: "events",   label: "Events Service",      x: 78, y: 56, color: "#b8945a" },
  { id: "supabase", label: "Supabase",            x: 30, y: 78, color: "#5e8a6a" },
  { id: "pg",       label: "PostgreSQL",          x: 70, y: 78, color: "#5e8a6a" },
  { id: "admin",    label: "Admin Dashboard",     x: 50, y: 94, color: "#3a3a3a" },
];

const archEdges: [string, string][] = [
  ["react", "node"], ["router", "node"], ["axios", "node"],
  ["node", "jwt"], ["node", "qrsvc"], ["node", "events"],
  ["jwt", "supabase"], ["qrsvc", "supabase"], ["events", "pg"],
  ["supabase", "admin"], ["pg", "admin"],
];

function findArch(id: string) {
  return archNodes.find((n) => n.id === id)!;
}

export function NexusArchitecture() {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-foreground/5 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="nexus-edge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.08 155)" stopOpacity="0.12" />
            <stop offset="50%" stopColor="oklch(0.55 0.08 155)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.55 0.08 155)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="nexus-packet">
            <stop offset="0%" stopColor="oklch(0.70 0.10 155)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.70 0.10 155)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {archEdges.map(([a, b], i) => {
          const A = findArch(a);
          const B = findArch(b);
          return (
            <g key={`${a}-${b}`}>
              <motion.line
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="url(#nexus-edge)"
                strokeWidth="0.32"
                strokeDasharray="0.8 1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.08 * i, ease: "easeOut" }}
              />
              <motion.circle
                r="0.7"
                fill="url(#nexus-packet)"
                initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.4,
                  delay: 1.2 + (i % 5) * 0.35,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
      </svg>
      {archNodes.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          whileHover={{ scale: 1.06 }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className="relative whitespace-nowrap rounded-xl border border-foreground/10 bg-white/90 px-2.5 py-1.5 text-[10.5px] font-medium text-foreground shadow-md backdrop-blur transition-all hover:shadow-xl"
            style={{ boxShadow: `0 6px 24px -6px ${n.color}40` }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
            {n.label}
            <span
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
              style={{ boxShadow: `0 0 0 1px ${n.color}80, 0 0 24px ${n.color}55` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── 4. Feature Showcase Cards ───────────────────────────────────── */
type Feature = { title: string; body: string; icon: LucideIcon; accent: string };

const features: Feature[] = [
  { title: "Event Registration", body: "One-tap signup with capacity limits, waitlists, and custom intake forms.", icon: CalendarDays, accent: "#7a9d6f" },
  { title: "QR Access Control", body: "Signed, time-bound QR tokens with anti-replay validation at the door.", icon: QrCode, accent: "#b8945a" },
  { title: "Venue Management", body: "Reserve halls, detect conflicts, and visualize capacity in real time.", icon: MapPin, accent: "#6b8aa3" },
  { title: "Student Portal", body: "Personalized event feed, registrations, and wallet-style QR passes.", icon: GraduationCap, accent: "#8b9a5f" },
  { title: "Faculty Portal", body: "Host sessions, approve registrations, and track live attendance.", icon: Users, accent: "#a48a55" },
  { title: "Analytics Dashboard", body: "Department-level insights into attendance, engagement, and trends.", icon: BarChart3, accent: "#a07a3a" },
];

export function NexusFeatures() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-foreground/5 bg-white/80 p-6 shadow-sm backdrop-blur transition-all hover:shadow-xl"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(closest-side, ${f.accent}1f, transparent 70%)` }}
            />
            <div
              className="grid h-10 w-10 place-items-center rounded-lg text-white shadow-sm transition-transform group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${f.accent}, ${f.accent}cc)` }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <h4 className="mt-4 font-display text-base font-semibold tracking-tight">{f.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            <div
              className="mt-4 h-px w-10 transition-all duration-500 group-hover:w-full"
              style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}