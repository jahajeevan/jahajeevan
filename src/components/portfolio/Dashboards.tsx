import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Stethoscope, ClipboardList, Pill, Shield } from "lucide-react";

const roles = [
  {
    id: "patient",
    label: "Patient",
    icon: User,
    accent: "#7a9d6f",
    headline: "Book, pay, and track care",
    bullets: ["Search doctors & book slots", "Razorpay checkout", "Live token queue", "E-prescriptions"],
  },
  {
    id: "doctor",
    label: "Doctor",
    icon: Stethoscope,
    accent: "#8b9a5f",
    headline: "Consult with focus",
    bullets: ["Today's queue at a glance", "Patient history & vitals", "Write prescriptions", "Lab requests"],
  },
  {
    id: "reception",
    label: "Reception",
    icon: ClipboardList,
    accent: "#a48a55",
    headline: "Orchestrate the front desk",
    bullets: ["Walk-in registration", "Token allocation", "Payment reconciliation", "Daily roster"],
  },
  {
    id: "pharmacist",
    label: "Pharmacist",
    icon: Pill,
    accent: "#b8945a",
    headline: "Dispense without friction",
    bullets: ["Live prescription feed", "Inventory & stock alerts", "Billing & invoices", "Batch tracking"],
  },
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    accent: "#a07a3a",
    headline: "Run the entire operation",
    bullets: ["Role & access control", "Revenue analytics", "Department insights", "Audit logs"],
  },
];

export function Dashboards() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % roles.length), 4200);
    return () => clearInterval(t);
  }, []);

  const role = roles[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1 w-1 rounded-full" style={{ background: role.accent }} /> Five dashboards · one platform
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          One product, five workflows.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Each role gets a purpose-built dashboard — shared design language, fully role-scoped data.
        </p>

        <div className="mt-5 grid gap-2">
          {roles.map((r, i) => {
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
                  <div className="font-display text-sm font-semibold">{r.label} Dashboard</div>
                  <div className="text-[11px] text-muted-foreground">{r.headline}</div>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="dashboard-rail"
                    className="absolute inset-y-0 left-0 w-[3px]"
                    style={{ background: role.accent }}
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
          style={{ background: `radial-gradient(closest-side, ${role.accent}33, transparent 70%)` }}
        />
        <div className="overflow-hidden rounded-2xl border border-foreground/5 bg-white/85 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-foreground/5 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10.5px] text-muted-foreground">
              jkhospital.app / {role.id}
            </span>
            <span className="text-[10px] text-muted-foreground">v1.0</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-semibold">{role.label} Dashboard</div>
                  <div className="text-xs text-muted-foreground">{role.headline}</div>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white"
                  style={{ background: role.accent }}
                >
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-foreground/5 bg-white/70 p-3"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      Metric
                    </div>
                    <div className="mt-1 font-display text-lg font-semibold">
                      {[128, 42, 96][i]}
                    </div>
                    <div
                      className="mt-1 h-1 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${role.accent}, ${role.accent}55)` }}
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-foreground/5 bg-white/60 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-medium">{role.label} workflows</div>
                  <div className="font-mono text-[10px] text-muted-foreground">5 / 5</div>
                </div>
                <ul className="grid grid-cols-2 gap-1.5">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 rounded-md bg-white/70 px-2 py-1.5 text-[11px] text-foreground/80"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: role.accent }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end gap-1 rounded-lg border border-foreground/5 bg-white/60 p-3">
                {[40, 65, 50, 80, 60, 92, 55, 70, 45, 88].map((h, i) => (
                  <motion.div
                    key={`${role.id}-${i}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: 0.05 * i }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: `linear-gradient(to top, ${role.accent}, ${role.accent}66)`,
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