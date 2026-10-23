import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Antenna, Arm, FloorRing, Head, Neck, RobotLights, Thruster, Torso } from "./RobotParts";
import {
  ARM_REST,
  BASE_YAW,
  GLOW,
  ROBOT_CAMERA,
  ROBOT_LOOK_AT,
  WAVE_RAISED,
  easeInOut,
  useRobotMaterials,
} from "./robotConfig";

export type RobotMood = "hello" | "idle" | "excited" | "bye";

const { damp, clamp } = THREE.MathUtils;

const usePointerTarget = () => {
  const gl = useThree((s) => s.gl);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.35;
      target.current.x = clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
      target.current.y = clamp((cy - e.clientY) / (window.innerHeight / 2), -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  return target;
};

interface RobotProps {
  mood: RobotMood;
  reducedMotion: boolean;
  onClick: () => void;
  /** Keeps the robot in its neutral pose (no bob, head straight) so an intro robot can hand off to it seamlessly. */
  holdStill?: boolean;
}

const Robot = ({ mood, reducedMotion, onClick, holdStill = false }: RobotProps) => {
  const m = useRobotMaterials();
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const waveArm = useRef<THREE.Group>(null);
  const otherArm = useRef<THREE.Group>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);

  /** Own clock: R3F resets `state.clock` to 0 whenever the frameloop resumes (scrolling back up), which would break blink/jump timing. */
  const time = useRef(0);
  const pointer = usePointerTarget();
  const jumpStart = useRef(-1);
  const motion = useRef(holdStill ? 0 : 1);
  const blink = useRef({ start: -1, next: 2 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!reducedMotion) jumpStart.current = time.current;
    onClick();
  };

  useFrame((_, delta) => {
    if (!root.current || !head.current || !eyes.current || !waveArm.current || !otherArm.current) return;
    const dt = Math.min(delta, 0.05);
    const t = (time.current += dt);

    motion.current = holdStill ? 0 : damp(motion.current, 1, 2, dt);

    let y = reducedMotion ? 0 : Math.sin(t * 1.6) * 0.08 * motion.current;
    let spin = 0;
    if (jumpStart.current >= 0) {
      const j = (t - jumpStart.current) / 0.9;
      if (j >= 1) {
        jumpStart.current = -1;
      } else {
        y += Math.sin(j * Math.PI) * 0.6;
        spin = easeInOut(j) * Math.PI * 2;
      }
    }
    root.current.position.y = y;
    root.current.rotation.y = BASE_YAW + spin;

    const lookX = pointer.current.x * 0.6 * motion.current;
    const lookY = pointer.current.y * 0.35 * motion.current;
    head.current.rotation.y = damp(head.current.rotation.y, lookX, 6, dt);
    head.current.rotation.x = damp(head.current.rotation.x, -lookY, 6, dt);
    eyes.current.position.x = damp(eyes.current.position.x, pointer.current.x * 0.04, 8, dt);
    eyes.current.position.y = damp(eyes.current.position.y, pointer.current.y * 0.03, 8, dt);

    const wiggle = reducedMotion ? 0 : 1;
    let waveTarget = -ARM_REST + Math.sin(t * 1.6 + 1) * 0.05 * wiggle;
    if (mood === "hello" || mood === "bye") waveTarget = WAVE_RAISED + Math.sin(t * 9) * 0.35 * wiggle;
    else if (mood === "excited") waveTarget = -1.45 + Math.sin(t * 5) * 0.06 * wiggle;
    waveArm.current.rotation.z = damp(waveArm.current.rotation.z, waveTarget, 12, dt);
    otherArm.current.rotation.z = damp(
      otherArm.current.rotation.z,
      ARM_REST + Math.sin(t * 1.6) * 0.05 * wiggle,
      8,
      dt
    );

    if (t > blink.current.next) {
      blink.current.start = t;
      blink.current.next = t + 2.5 + Math.random() * 3;
    }
    const b = blink.current.start >= 0 ? (t - blink.current.start) / 0.18 : 1;
    eyes.current.scale.y = b < 1 ? 0.1 + 0.9 * Math.abs(Math.cos(b * Math.PI)) : 1;

    const bright = mood === "excited" || hovered;
    m.eyes.emissiveIntensity = damp(m.eyes.emissiveIntensity, bright ? 4 : GLOW.eyes, 6, dt);
    m.chest.emissiveIntensity = GLOW.chest + Math.sin(t * 3) * 0.8;
    m.antenna.emissiveIntensity = GLOW.antenna + Math.sin(t * 4) * 1.2;
    if (ringMaterial.current) ringMaterial.current.opacity = 0.35 + Math.sin(t * 1.6) * 0.15;
  });

  return (
    <>
      <FloorRing materialRef={ringMaterial} />
      <group
        ref={root}
        rotation={[0, BASE_YAW, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <Thruster m={m} />
        <Torso m={m} />
        <group ref={waveArm} position={[-0.6, 1.28, 0]} rotation={[0, 0, -ARM_REST]}>
          <Arm m={m} />
        </group>
        <group ref={otherArm} position={[0.6, 1.28, 0]} rotation={[0, 0, ARM_REST]}>
          <Arm m={m} />
        </group>
        <Neck m={m} />
        <group ref={head} position={[0, 1.5, 0]}>
          <Head m={m} eyesRef={eyes} />
          <Antenna m={m} />
        </group>
      </group>
    </>
  );
};

interface RobotSceneProps extends RobotProps {
  active: boolean;
}

export default function RobotScene({ active, ...robotProps }: RobotSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={ROBOT_CAMERA}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ camera }) => camera.lookAt(ROBOT_LOOK_AT)}
    >
      <RobotLights />
      <Robot {...robotProps} />
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={5} blur={2.6} far={3} />
    </Canvas>
  );
}
