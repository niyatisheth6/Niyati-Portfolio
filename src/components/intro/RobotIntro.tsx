import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Antenna, Arm, FloorRing, Head, Neck, RobotLights, Thruster, Torso } from "../three/RobotParts";
import {
  ARM_REST,
  BASE_YAW,
  GLOW,
  ROBOT_ACCENT,
  ROBOT_CAMERA,
  ROBOT_DARK,
  ROBOT_LOOK_AT,
  WAVE_RAISED,
  easeOut,
  easeOutBack,
  range,
  useRobotMaterials,
} from "../three/robotConfig";

type Vec3 = [number, number, number];

interface Flight {
  from: Vec3;
  spin?: Vec3;
  start: number;
  end: number;
}

// 👇 Assembly speed: 1 = base timing, higher = slower & smoother (e.g. 1.5), lower = faster (e.g. 0.8)
const PACE = 1.25;
/** How far parts overshoot before settling ("click" feel). 0 = no bounce, 1.7 = snappy. */
const LANDING_BOUNCE = 0.9;

const at = (seconds: number) => seconds * PACE;
const flight = (from: Vec3, start: number, end: number, spin?: Vec3): Flight => ({
  from,
  spin,
  start: at(start),
  end: at(end),
});

const FLIGHTS = {
  thruster: flight([0, -4, 0], 0.1, 0.75),
  torso: flight([-5, -1.5, 1], 0.3, 1.05, [0, 0, -1.2]),
  waveArm: flight([-6, 2.5, 0], 0.8, 1.45, [0, 0, 2.5]),
  otherArm: flight([6, 2.5, 0], 0.95, 1.6, [0, 0, -2.5]),
  neck: flight([0, 0, 4], 1.25, 1.75),
  head: flight([0, 6, 0], 1.4, 2.25, [0, Math.PI * 2, 0]),
  antenna: flight([0, 4, 0], 2.05, 2.55),
};

const LANDINGS = Object.values(FLIGHTS).map((f) => f.end);
const POWER_ON: [number, number] = [at(2.55), at(2.55) + 0.4];
const GREET: [number, number] = [POWER_ON[1], POWER_ON[1] + 1.3];
const MOVE_AT = GREET[1] + 0.1;
const MOVE_MS = 800;
const END_AT = MOVE_AT + MOVE_MS / 1000 + 0.3;

/** Pulls the camera back on narrow screens so the waving arm isn't clipped; the handoff scale compensates. */
const cameraDistanceFactor = (aspect: number) => Math.max(1, 0.65 / aspect);

const LOOK_AT = ROBOT_LOOK_AT.clone();
const CAMERA_OFFSET = new THREE.Vector3(...ROBOT_CAMERA.position).sub(LOOK_AT);

const OFF_COLOR = new THREE.Color(ROBOT_DARK);
const ON_COLOR = new THREE.Color(ROBOT_ACCENT);

const spinOf = (f: Flight, axis: 0 | 1 | 2) => f.spin?.[axis] ?? 0;

/** Positions `obj` along its flight path and returns how much of its spin is still left (1 → 0). */
const fly = (obj: THREE.Object3D, flight: Flight, base: Vec3, t: number) => {
  const p = range(t, flight.start, flight.end);
  const k = 1 - easeOutBack(p, LANDING_BOUNCE);
  obj.visible = t >= flight.start;
  obj.position.set(base[0] + flight.from[0] * k, base[1] + flight.from[1] * k, base[2] + flight.from[2] * k);
  return 1 - easeOut(p);
};

interface AssemblySceneProps {
  onGreet: () => void;
  onMove: () => void;
  onEnd: () => void;
}

const AssemblyScene = ({ onGreet, onMove, onEnd }: AssemblySceneProps) => {
  const m = useRobotMaterials();
  const root = useRef<THREE.Group>(null);
  const thruster = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const waveArm = useRef<THREE.Group>(null);
  const otherArm = useRef<THREE.Group>(null);
  const neck = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const antenna = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const flash = useRef<THREE.PointLight>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);

  const startTime = useRef<number | null>(null);
  const fired = useRef({ greet: false, move: false, end: false });
  const glowParts = useMemo(
    () => [
      [m.eyes, GLOW.eyes],
      [m.mouth, GLOW.mouth],
      [m.ears, GLOW.ears],
      [m.chest, GLOW.chest],
      [m.antenna, GLOW.antenna],
    ] as const,
    [m]
  );

  useFrame((state, delta) => {
    const parts = [root, thruster, torso, waveArm, otherArm, neck, head, antenna, eyes];
    if (parts.some((p) => !p.current)) return;
    const now = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = now;
    const t = now - startTime.current;
    const dt = Math.min(delta, 0.05);

    const f = cameraDistanceFactor(state.size.width / state.size.height);
    state.camera.position.copy(LOOK_AT).addScaledVector(CAMERA_OFFSET, f);
    state.camera.lookAt(LOOK_AT);

    fly(thruster.current!, FLIGHTS.thruster, [0, 0, 0], t);
    const torsoSpin = fly(torso.current!, FLIGHTS.torso, [0, 0, 0], t);
    torso.current!.rotation.z = spinOf(FLIGHTS.torso, 2) * torsoSpin;
    fly(neck.current!, FLIGHTS.neck, [0, 0, 0], t);
    const headSpin = fly(head.current!, FLIGHTS.head, [0, 1.5, 0], t);
    head.current!.rotation.y = spinOf(FLIGHTS.head, 1) * headSpin;
    fly(antenna.current!, FLIGHTS.antenna, [0, 1.5, 0], t);

    const otherSpin = fly(otherArm.current!, FLIGHTS.otherArm, [0.6, 1.28, 0], t);
    otherArm.current!.rotation.z = ARM_REST + spinOf(FLIGHTS.otherArm, 2) * otherSpin;

    const waveSpin = fly(waveArm.current!, FLIGHTS.waveArm, [-0.6, 1.28, 0], t);
    if (t < FLIGHTS.waveArm.end) {
      waveArm.current!.rotation.z = -ARM_REST + spinOf(FLIGHTS.waveArm, 2) * waveSpin;
    } else {
      const greeting = t >= GREET[0] + 0.05 && t < GREET[1];
      const target = greeting ? WAVE_RAISED + Math.sin(t * 9) * 0.35 : -ARM_REST;
      waveArm.current!.rotation.z = THREE.MathUtils.damp(waveArm.current!.rotation.z, target, 12, dt);
    }

    const power = range(t, POWER_ON[0], POWER_ON[1]);
    for (const [material, intensity] of glowParts) {
      material.color.lerpColors(OFF_COLOR, ON_COLOR, power);
      material.emissiveIntensity = intensity * power;
    }
    eyes.current!.scale.y = 0.1 + 0.9 * easeOutBack(power);
    if (ring.current) ring.current.opacity = power * (0.35 + Math.sin(t * 1.6) * 0.15);

    let landingFlash = 0;
    for (const end of LANDINGS) {
      if (t >= end) landingFlash += Math.exp(-(t - end) * 10);
    }
    if (flash.current) flash.current.intensity = landingFlash * 8 + power * Math.exp(-Math.max(0, t - POWER_ON[1]) * 4) * 10;

    const bob = range(t, POWER_ON[0], POWER_ON[1] + 0.3) * (1 - range(t, MOVE_AT, MOVE_AT + 0.4));
    root.current!.position.y = Math.sin(t * 1.6) * 0.08 * bob;

    if (t >= GREET[0] && !fired.current.greet) {
      fired.current.greet = true;
      onGreet();
    }
    if (t >= MOVE_AT && !fired.current.move) {
      fired.current.move = true;
      onMove();
    }
    if (t >= END_AT && !fired.current.end) {
      fired.current.end = true;
      onEnd();
    }
  });

  return (
    <>
      <RobotLights />
      <pointLight ref={flash} position={[0, 1.4, 1.6]} intensity={0} color={ROBOT_ACCENT} distance={6} />
      <FloorRing materialRef={ring} />
      <group ref={root} rotation={[0, BASE_YAW, 0]}>
        <group ref={thruster} visible={false}>
          <Thruster m={m} />
        </group>
        <group ref={torso} visible={false}>
          <Torso m={m} />
        </group>
        <group ref={waveArm} visible={false}>
          <Arm m={m} />
        </group>
        <group ref={otherArm} visible={false}>
          <Arm m={m} />
        </group>
        <group ref={neck} visible={false}>
          <Neck m={m} />
        </group>
        <group ref={head} visible={false}>
          <Head m={m} eyesRef={eyes} />
        </group>
        <group ref={antenna} visible={false}>
          <Antenna m={m} />
        </group>
      </group>
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={5} blur={2.6} far={3} />
    </>
  );
};

interface RobotIntroProps {
  onReveal: () => void;
  onFinish: () => void;
}

type Phase = "build" | "greet" | "move" | "leave";

export default function RobotIntro({ onReveal, onFinish }: RobotIntroProps) {
  const [phase, setPhase] = useState<Phase>("build");
  const [moveStyle, setMoveStyle] = useState<CSSProperties>({});
  const done = useRef(false);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const startMove = useCallback(() => {
    const target = document.getElementById("hero-robot");
    if (target) {
      const r = target.getBoundingClientRect();
      const scale = (r.height / window.innerHeight) * cameraDistanceFactor(window.innerWidth / window.innerHeight);
      const dx = r.left + r.width / 2 - window.innerWidth / 2;
      const dy = r.top + r.height / 2 - window.innerHeight / 2;
      setMoveStyle({ transform: `translate(${dx}px, ${dy}px) scale(${scale})` });
    }
    setPhase("move");
    onReveal();
  }, [onReveal]);

  const end = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onFinish();
  }, [onFinish]);

  const skip = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setPhase("leave");
    onReveal();
    window.setTimeout(onFinish, 500);
  }, [onReveal, onFinish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [skip]);

  const leaving = phase === "move" || phase === "leave";

  return (
    <div
      className={`force-dark fixed inset-0 z-[100] transition-opacity duration-500 ${leaving ? "pointer-events-none" : ""} ${
        phase === "leave" ? "opacity-0" : ""
      }`}
      aria-hidden={leaving}
    >
      <div
        className={`absolute inset-0 bg-ink-950 transition-opacity duration-700 ${leaving ? "opacity-0" : ""}`}
      />
      <div
        className="absolute inset-0 transition-transform ease-[cubic-bezier(0.65,0,0.25,1)]"
        style={{ ...moveStyle, transitionDuration: `${MOVE_MS}ms` }}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && e.propertyName === "transform") end();
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={ROBOT_CAMERA}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ camera }) => camera.lookAt(ROBOT_LOOK_AT)}
        >
          <AssemblyScene onGreet={() => setPhase("greet")} onMove={startMove} onEnd={end} />
        </Canvas>
        {phase === "greet" && (
          <div
            role="status"
            className="speech-bubble absolute top-[6%] z-10 w-max max-w-[80vw] px-5 py-3 rounded-2xl text-base font-medium text-zinc-100 bg-ink-800 border border-emerald-500/35 shadow-lg shadow-emerald-500/10"
          >
            Hi! I'm Niyati's assistant 👋
          </div>
        )}
      </div>
      {!leaving && (
        <button
          onClick={skip}
          className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 bg-line/5 border border-line/10 backdrop-blur hover:text-emerald-400 hover:border-emerald-500/50"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}
