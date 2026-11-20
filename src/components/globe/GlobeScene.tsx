"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import landPoints from "./land-points.json";

const R = 2;

const CITIES = {
  manchester: { lat: 53.48, lng: -2.24, label: "MAN" },
  london: { lat: 51.51, lng: -0.08, label: "LON" },
  newyork: { lat: 40.74, lng: -73.99, label: "NYC" },
  toronto: { lat: 43.65, lng: -79.38, label: "TOR" },
  sydney: { lat: -33.87, lng: 151.21, label: "SYD" },
  auckland: { lat: -36.85, lng: 174.76, label: "AKL" },
} as const;

function toVec(lat: number, lng: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function LandDots() {
  const geom = useMemo(() => {
    const pts = landPoints as number[];
    const positions = new Float32Array((pts.length / 2) * 3);
    for (let i = 0; i < pts.length / 2; i++) {
      const v = toVec(pts[i * 2], pts[i * 2 + 1]);
      positions.set([v.x, v.y, v.z], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  return (
    <points geometry={geom}>
      <pointsMaterial color="#5fd69a" size={0.022} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function Arc({ from, to, offset }: { from: THREE.Vector3; to: THREE.Vector3; offset: number }) {
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.25 + from.distanceTo(to) * 0.1));
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);
  const points = useMemo(() => curve.getPoints(80), [curve]);
  const lineRef = useRef<React.ComponentRef<typeof Line>>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.22 + offset) % 1;
    const mat = lineRef.current?.material as (THREE.Material & { dashOffset?: number }) | undefined;
    if (mat && "dashOffset" in mat) mat.dashOffset = -t * 2;
    if (headRef.current) {
      const p = curve.getPoint(t);
      headRef.current.position.copy(p);
      const s = 0.5 + Math.sin(t * Math.PI) * 0.8;
      headRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <Line ref={lineRef} points={points} color="#c9a46a" lineWidth={1.1} dashed dashScale={2} dashSize={0.25} gapSize={0.12} transparent opacity={0.9} />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ffe9c4" />
      </mesh>
    </group>
  );
}

function Marker({ lat, lng, home = false }: { lat: number; lng: number; home?: boolean }) {
  const v = useMemo(() => toVec(lat, lng, R * 1.004), [lat, lng]);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.getElapsedTime() % 1.8) / 1.8;
    ring.current.scale.setScalar(1 + t * 2.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
  });
  return (
    <group position={v} onUpdate={(g) => g.lookAt(v.clone().multiplyScalar(2))}>
      <mesh>
        <circleGeometry args={[home ? 0.055 : 0.045, 24]} />
        <meshBasicMaterial color={home ? "#ffd27f" : "#a8ebc6"} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.062, 32]} />
        <meshBasicMaterial color={home ? "#ffd27f" : "#5fd69a"} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const home = useMemo(() => toVec(CITIES.manchester.lat, CITIES.manchester.lng), []);
  const dests = useMemo(() => [toVec(CITIES.london.lat, CITIES.london.lng), toVec(CITIES.newyork.lat, CITIES.newyork.lng), toVec(CITIES.toronto.lat, CITIES.toronto.lng), toVec(CITIES.sydney.lat, CITIES.sydney.lng), toVec(CITIES.auckland.lat, CITIES.auckland.lng)], []);

  useFrame((_, delta) => {
    if (active && group.current) group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group} rotation={[0.35, 3.6, 0]}>
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0b1811" transparent opacity={0.92} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.06, 48, 48]} />
        <meshBasicMaterial color="#5fd69a" transparent opacity={0.035} side={THREE.BackSide} />
      </mesh>
      <LandDots />
      {dests.map((d, i) => <Arc key={i} from={home} to={d} offset={i * 0.2} />)}
      <Marker lat={CITIES.manchester.lat} lng={CITIES.manchester.lng} home />
      <Marker lat={CITIES.sydney.lat} lng={CITIES.sydney.lng} />
      <Marker lat={CITIES.auckland.lat} lng={CITIES.auckland.lng} />
      <Marker lat={CITIES.london.lat} lng={CITIES.london.lng} />
      <Marker lat={CITIES.newyork.lat} lng={CITIES.newyork.lng} />
      <Marker lat={CITIES.toronto.lat} lng={CITIES.toronto.lng} />
    </group>
  );
}

export default function GlobeScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause rendering off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full" aria-label="Interactive globe showing placement and study routes from Manchester to the UK, US, Canada, Australia and New Zealand" role="img">
      <Canvas camera={{ position: [0, 0.6, 5.4], fov: 42 }} dpr={[1, 1.75]} frameloop={active ? "always" : "never"} gl={{ antialias: true, alpha: true }}>
        <Scene active={active} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
