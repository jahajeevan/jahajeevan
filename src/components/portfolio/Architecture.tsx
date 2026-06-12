import { motion } from "framer-motion";

const nodes = [
  { id: "patient", label: "Patient Dashboard", x: 50, y: 8, color: "#0ea5e9" },
  { id: "api", label: "API Layer (Node/Express)", x: 50, y: 28, color: "#a07a3a" },
  { id: "db", label: "Supabase + PostgreSQL", x: 20, y: 50, color: "#3ecf8e" },
  { id: "pay", label: "Razorpay", x: 80, y: 50, color: "#3b82f6" },
  { id: "doctor", label: "Doctor Dashboard", x: 15, y: 78, color: "#8b5cf6" },
  { id: "reception", label: "Reception Dashboard", x: 50, y: 90, color: "#f59e0b" },
  { id: "admin", label: "Admin Dashboard", x: 85, y: 78, color: "#ef4444" },
];

const edges: [string, string][] = [
  ["patient", "api"],
  ["api", "db"],
  ["api", "pay"],
  ["db", "doctor"],
  ["db", "reception"],
  ["db", "admin"],
  ["pay", "reception"],
];

function find(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function Architecture() {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-foreground/5 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.10 55)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="oklch(0.55 0.10 55)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.55 0.10 55)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const A = find(a);
          const B = find(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#edge)"
              strokeWidth="0.35"
              strokeDasharray="1 1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          whileHover={{ scale: 1.06 }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className="relative rounded-xl border border-foreground/10 bg-white/85 px-3 py-2 text-[11px] font-medium text-foreground shadow-md backdrop-blur transition-all hover:shadow-xl"
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