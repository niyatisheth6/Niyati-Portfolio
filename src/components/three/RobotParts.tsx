import type { Ref } from "react";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ROBOT_ACCENT, type RobotMaterials } from "./robotConfig";

interface PartProps {
  m: RobotMaterials;
}

export const RobotLights = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[3, 5, 4]} intensity={1.6} />
    <pointLight position={[-3, 2, -2]} intensity={12} color={ROBOT_ACCENT} distance={10} />
    <Environment resolution={128}>
      <Lightformer intensity={2} position={[0, 5, 3]} scale={[10, 3, 1]} />
      <Lightformer intensity={1} color={ROBOT_ACCENT} position={[-5, 2, -1]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} />
      <Lightformer intensity={0.8} position={[5, 2, 2]} rotation-y={-Math.PI / 2} scale={[3, 6, 1]} />
    </Environment>
  </>
);

export const FloorRing = ({ materialRef }: { materialRef?: Ref<THREE.MeshBasicMaterial> }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <ringGeometry args={[0.62, 0.66, 64]} />
    <meshBasicMaterial ref={materialRef} color={ROBOT_ACCENT} transparent opacity={0.4} toneMapped={false} />
  </mesh>
);

export const Thruster = ({ m }: PartProps) => (
  <>
    <mesh position={[0, 0.42, 0]} material={m.dark}>
      <cylinderGeometry args={[0.24, 0.14, 0.18, 32]} />
    </mesh>
    <mesh position={[0, 0.325, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.chest}>
      <circleGeometry args={[0.13, 32]} />
    </mesh>
    <pointLight position={[0, 0.15, 0]} intensity={1.5} color={ROBOT_ACCENT} distance={1.6} />
  </>
);

export const Torso = ({ m }: PartProps) => (
  <>
    <RoundedBox args={[1.05, 0.95, 0.8]} radius={0.3} smoothness={6} position={[0, 0.95, 0]} material={m.body} />
    <RoundedBox args={[0.58, 0.36, 0.06]} radius={0.03} smoothness={4} position={[0, 1.0, 0.39]} material={m.visor} />
    <mesh position={[0, 1.0, 0.425]} material={m.chest}>
      <circleGeometry args={[0.07, 32]} />
    </mesh>
    {[-0.18, 0.18].map((x) => (
      <mesh key={x} position={[x, 1.0, 0.425]}>
        <circleGeometry args={[0.025, 16]} />
        <meshBasicMaterial color="#3F3F46" />
      </mesh>
    ))}
  </>
);

/** Geometry relative to the shoulder pivot; the parent group positions and rotates it. */
export const Arm = ({ m }: PartProps) => (
  <>
    <mesh material={m.dark}>
      <sphereGeometry args={[0.14, 24, 24]} />
    </mesh>
    <mesh position={[0, -0.32, 0]} material={m.body}>
      <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
    </mesh>
    <mesh position={[0, -0.64, 0]} material={m.dark}>
      <sphereGeometry args={[0.13, 24, 24]} />
    </mesh>
  </>
);

export const Neck = ({ m }: PartProps) => (
  <mesh position={[0, 1.48, 0]} material={m.dark}>
    <cylinderGeometry args={[0.14, 0.17, 0.14, 24]} />
  </mesh>
);

/** Geometry relative to the head pivot at (0, 1.5, 0). */
export const Head = ({ m, eyesRef }: PartProps & { eyesRef?: Ref<THREE.Group> }) => (
  <>
    <RoundedBox args={[1.35, 0.95, 1.0]} radius={0.3} smoothness={6} position={[0, 0.48, 0]} material={m.body} />
    <RoundedBox args={[1.1, 0.62, 0.12]} radius={0.06} smoothness={4} position={[0, 0.48, 0.46]} material={m.visor} />

    <group ref={eyesRef}>
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.53, 0.53]} material={m.eyes}>
          <capsuleGeometry args={[0.075, 0.12, 8, 16]} />
        </mesh>
      ))}
    </group>
    <mesh position={[0, 0.33, 0.53]} rotation={[0, 0, Math.PI]} material={m.mouth}>
      <torusGeometry args={[0.09, 0.018, 8, 24, Math.PI]} />
    </mesh>

    {[-1, 1].map((side) => (
      <group key={side} position={[side * 0.7, 0.48, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={m.dark}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        </mesh>
        <mesh position={[side * 0.055, 0, 0]} rotation={[0, side * (Math.PI / 2), 0]} material={m.ears}>
          <torusGeometry args={[0.09, 0.015, 8, 32]} />
        </mesh>
      </group>
    ))}
  </>
);

/** Geometry relative to the head pivot at (0, 1.5, 0). */
export const Antenna = ({ m }: PartProps) => (
  <>
    <mesh position={[0, 1.08, 0]} material={m.dark}>
      <cylinderGeometry args={[0.02, 0.02, 0.28, 12]} />
    </mesh>
    <mesh position={[0, 1.25, 0]} material={m.antenna}>
      <sphereGeometry args={[0.07, 24, 24]} />
    </mesh>
  </>
);
