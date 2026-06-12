import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useMounted } from "./useMounted";

function Laptop() {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.15;
    ref.current.rotation.x = -0.25 + Math.sin(s.clock.elapsedTime * 0.3) * 0.04;
  });
  return (
    <group ref={ref} position={[0, -0.4, 0]}>
      {/* base */}
      <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color="#e8e2d6" metalness={0.45} roughness={0.35} />
      </RoundedBox>
      {/* screen */}
      <group position={[0, 1.05, -0.95]} rotation={[-0.35, 0, 0]}>
        <RoundedBox args={[3.2, 2.0, 0.08]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#d9d2c2" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.0, 1.85]} />
          <meshStandardMaterial color="#1d1a2e" emissive="#7a5a2a" emissiveIntensity={0.25} roughness={0.2} />
        </mesh>
        <Html transform position={[0, 0, 0.06]} scale={0.18} occlude>
          <div style={{ width: 360, height: 220 }} className="rounded-md bg-[#0f0f1a]/90 p-3 font-mono text-[10px] text-emerald-300 shadow-2xl">
            <div className="flex items-center gap-1 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div><span className="text-violet-300">const</span> <span className="text-cyan-300">engineer</span> = {`{`}</div>
            <div className="pl-3">name: <span className="text-amber-200">"Jahajeevan"</span>,</div>
            <div className="pl-3">stack: [<span className="text-amber-200">"React"</span>, <span className="text-amber-200">"Node"</span>],</div>
            <div className="pl-3">shipping: <span className="text-cyan-300">true</span>,</div>
            <div>{`}`};</div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function TechCube({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.25;
    ref.current.rotation.x = s.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={ref}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
        </mesh>
        <Html center position={[0, -0.55, 0]} distanceFactor={6}>
          <div className="pointer-events-none rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[#3a2f1f] shadow backdrop-blur">
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Scene() {
  const items = useMemo(
    () => [
      { p: [-2.6, 1.6, 0.6] as [number, number, number], c: "#61dafb", l: "React" },
      { p: [2.6, 1.4, 0.4] as [number, number, number], c: "#8cc84b", l: "Node" },
      { p: [-2.2, -1.0, 1.2] as [number, number, number], c: "#3ecf8e", l: "Supabase" },
      { p: [2.4, -1.2, 1.0] as [number, number, number], c: "#2496ed", l: "Docker" },
      { p: [0, 2.4, -0.4] as [number, number, number], c: "#f3a847", l: "Postgres" },
      { p: [-3.1, 0.2, -0.6] as [number, number, number], c: "#a78bfa", l: "Cloud" },
    ],
    []
  );
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#ffd9a8" />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
        <Laptop />
      </Float>
      {items.map((it) => (
        <TechCube key={it.l} position={it.p} color={it.c} label={it.l} />
      ))}
    </>
  );
}

export function HeroScene() {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full" />;
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!h-full !w-full"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}