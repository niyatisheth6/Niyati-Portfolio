import { useEffect, useMemo } from "react";
import * as THREE from "three";

export const ROBOT_BODY = "#E9E9EE";
export const ROBOT_DARK = "#0E0E11";
export const ROBOT_ACCENT = "#10B981";

export const ARM_REST = 0.18;
export const BASE_YAW = -0.25;
export const WAVE_RAISED = -2.5;

/** Hero canvas and robot intro share this camera so the intro robot can hand off to the hero robot pixel-for-pixel. */
export const ROBOT_CAMERA = { position: [0, 1.7, 6.2] as [number, number, number], fov: 35 };
export const ROBOT_LOOK_AT = new THREE.Vector3(0, 1.4, 0);

export const GLOW = { eyes: 2.2, mouth: 1.2, ears: 1.5, chest: 1.4, antenna: 2 };

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const range = (t: number, start: number, end: number) => clamp01((t - start) / (end - start));
export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeOutBack = (x: number, overshoot = 1.70158) =>
  1 + (overshoot + 1) * Math.pow(x - 1, 3) + overshoot * Math.pow(x - 1, 2);

const glowMaterial = (intensity: number) => {
  const material = new THREE.MeshStandardMaterial({
    color: ROBOT_ACCENT,
    emissive: ROBOT_ACCENT,
    emissiveIntensity: intensity,
  });
  material.toneMapped = false;
  return material;
};

export const useRobotMaterials = () => {
  const materials = useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({ color: ROBOT_BODY, roughness: 0.35, metalness: 0.1 }),
      dark: new THREE.MeshStandardMaterial({ color: ROBOT_DARK, roughness: 0.35, metalness: 0.5 }),
      visor: new THREE.MeshStandardMaterial({ color: ROBOT_DARK, roughness: 0.15, metalness: 0.6 }),
      eyes: glowMaterial(GLOW.eyes),
      mouth: glowMaterial(GLOW.mouth),
      ears: glowMaterial(GLOW.ears),
      chest: glowMaterial(GLOW.chest),
      antenna: glowMaterial(GLOW.antenna),
    }),
    []
  );

  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  return materials;
};

export type RobotMaterials = ReturnType<typeof useRobotMaterials>;
