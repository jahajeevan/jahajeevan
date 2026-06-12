import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import { useMounted } from "./useMounted";

const TECHS = [
  { l: "React", c: "#61dafb" },
  { l: "Node", c: "#8cc84b" },
  { l: "Express", c: "#a3a3a3" },
  { l: "Postgres", c: "#336791" },
  { l: "Supabase", c: "#3ecf8e" },
  { l: "Docker", c: "#2496ed" },
  { l: "JWT", c: "#d63aff" },
  { l: "Razorpay", c: "#3b82f6" },
  { l: "Tailwind", c: "#38bdf8" },
  { l: "Git", c: "#f05033" },
  { l: "GitHub", c: "#222" },
  { l: "Vercel", c: "#111" },
];

function Cloud() {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.18;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.12) * 0.15;
  });
  const N = TECHS.length;
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#c8a26a" emissive="#a07a3a" emissiveIntensity={0.4} roughness={0.3} metalness={0.7} />
      </mesh>
      {TECHS.map((t, i) => {
        const phi = Math.acos(-1 + (2 * i) / N);
        const theta = Math.sqrt(N * Math.PI) * phi;
        const r = 2.4;
        const x = r * Math.cos(theta) * Math.sin(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(phi);
        return (
          <group key={t.l} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color={t.c} metalness={0.5} roughness={0.3} />
            </mesh>
            <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
              <div className="whitespace-nowrap rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-[#3a2f1f] shadow backdrop-blur">
                {t.l}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function SkillsOrbit() {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full" />;
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Cloud />
      </Suspense>
    </Canvas>
  );
}