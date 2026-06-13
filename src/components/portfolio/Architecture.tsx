import { motion } from "framer-motion";

const nodes = [
  { id: "patient",    label: "Patient",       x: 8,  y: 10, color: "#7a9d6f" },
  { id: "doctor",     label: "Doctor",        x: 28, y: 10, color: "#8b9a5f" },
  { id: "reception",  label: "Reception",     x: 50, y: 10, color: "#a48a55" },
  { id: "pharmacist", label: "Pharmacist",    x: 72, y: 10, color: "#b8945a" },
  { id: "admin",      label: "Admin",         x: 92, y: 10, color: "#a07a3a" },
  { id: "api",        label: "Node.js + Express API", x: 50, y: 35, color: "#8a7340" },
  { id: "jwt",        label: "JWT Auth",      x: 50, y: 55, color: "#a07a3a" },
  { id: "db",         label: "Supabase · PostgreSQL", x: 22, y: 76, color: "#5e8a6a" },
  { id: "pay",        label: "Razorpay",      x: 50, y: 76, color: "#9c7c3e" },
  { id: "docker",     label: "Docker",        x: 78, y: 76, color: "#6b8aa3" },
  { id: "vercel",     label: "Vercel",        x: 50, y: 94, color: "#3a3a3a" },
];

const edges: [string, string][] = [
  ["patient", "api"], ["doctor", "api"], ["reception", "api"],
  ["pharmacist", "api"], ["admin", "api"],
  ["api", "jwt"],
  ["jwt", "db"], ["jwt", "pay"], ["jwt", "docker"],
  ["docker", "vercel"], ["db", "vercel"], ["pay", "vercel"],
];

function find(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function Architecture() {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-foreground/5 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.08 70)" stopOpacity="0.12" />
            <stop offset="50%" stopColor="oklch(0.55 0.08 70)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.55 0.08 70)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="packet">
            <stop offset="0%" stopColor="oklch(0.70 0.10 70)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.70 0.10 70)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const A = find(a);
          const B = find(b);
          return (
            <g key={`${a}-${b}`}>
              <motion.line
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="url(#edge)"
                strokeWidth="0.32"
                strokeDasharray="0.8 1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.08 * i, ease: "easeOut" }}
              />
              <motion.circle
                r="0.7"
                fill="url(#packet)"
                initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                animate={{
                  cx: [A.x, B.x],
                  cy: [A.y, B.y],
                  opacity: [0, 1, 1, 0],
                }}
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
      {nodes.map((n, i) => (
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