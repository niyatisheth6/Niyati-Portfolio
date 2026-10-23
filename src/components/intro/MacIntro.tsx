import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#10B981";
const ALUMINIUM = "#9A9AA3";
const LID_OPEN_ANGLE = 1.85;
const FADE_AT = 2.85;
const END_AT = 3.3;

const SCREEN_W = 1024;
const SCREEN_H = 640;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (t: number, start: number, end: number) => clamp01((t - start) / (end - start));
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeIn = (x: number) => x * x * x;

const createCanvas = (w: number, h: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
};

const paintScreen = (ctx: CanvasRenderingContext2D, boot: number, wallpaper: number) => {
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (boot > 0 && wallpaper < 1) {
    ctx.globalAlpha = Math.min(1, boot * 4) * (1 - wallpaper);
    ctx.fillStyle = ACCENT;
    ctx.shadowColor = ACCENT;
    ctx.shadowBlur = 40;
    ctx.font = "bold 150px system-ui, -apple-system, sans-serif";
    ctx.fillText("N", SCREEN_W / 2, SCREEN_H / 2 - 40);
    ctx.shadowBlur = 0;

    const barW = 260;
    const barX = (SCREEN_W - barW) / 2;
    const barY = SCREEN_H / 2 + 90;
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(barX, barY, barW, 6);
    ctx.fillStyle = "#F5F5F5";
    ctx.fillRect(barX, barY, barW * boot, 6);
  }

  if (wallpaper > 0) {
    ctx.globalAlpha = wallpaper;
    ctx.fillStyle = "#0A0A0B";
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    const glow = ctx.createRadialGradient(SCREEN_W / 2, SCREEN_H * 0.45, 0, SCREEN_W / 2, SCREEN_H * 0.45, SCREEN_W * 0.6);
    glow.addColorStop(0, "rgba(16,185,129,0.25)");
    glow.addColorStop(1, "rgba(16,185,129,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= SCREEN_W; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, SCREEN_H);
      ctx.stroke();
    }
    for (let y = 0; y <= SCREEN_H; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(SCREEN_W, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#F5F5F5";
    ctx.font = "bold 76px system-ui, -apple-system, sans-serif";
    ctx.fillText("Niyati Sheth", SCREEN_W / 2, SCREEN_H / 2 - 10);
    ctx.fillStyle = ACCENT;
    ctx.font = "500 30px ui-monospace, Menlo, Consolas, monospace";
    ctx.fillText("<Frontend Developer />", SCREEN_W / 2, SCREEN_H / 2 + 60);
  }

  ctx.globalAlpha = 1;
};

const createLogoTexture = () => {
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ACCENT;
  ctx.shadowColor = ACCENT;
  ctx.shadowBlur = 30;
  ctx.font = "bold 170px system-ui, -apple-system, sans-serif";
  ctx.fillText("N", 128, 136);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const KEY_ROWS = 5;
const KEY_COLS = 13;

const Keyboard = ({ materialRef }: { materialRef: RefObject<THREE.MeshStandardMaterial> }) => {
  const keys = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!keys.current) return;
    const matrix = new THREE.Matrix4();
    let i = 0;
    for (let row = 0; row < KEY_ROWS; row++) {
      for (let col = 0; col < KEY_COLS; col++) {
        matrix.setPosition(-1.2 + col * 0.2, 0.092, -0.66 + row * 0.18);
        keys.current.setMatrixAt(i++, matrix);
      }
    }
    keys.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={keys} args={[undefined, undefined, KEY_ROWS * KEY_COLS]}>
      <boxGeometry args={[0.17, 0.02, 0.15]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#18181B"
        emissive={ACCENT}
        emissiveIntensity={0}
        roughness={0.6}
      />
    </instancedMesh>
  );
};

const IntroScene = ({ onFade, onEnd }: { onFade: () => void; onEnd: () => void }) => {
  const laptop = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Mesh>(null);
  const keysMaterial = useRef<THREE.MeshStandardMaterial>(null);

  const screenCanvas = useMemo(() => createCanvas(SCREEN_W, SCREEN_H), []);
  const screenCtx = useMemo(() => screenCanvas.getContext("2d")!, [screenCanvas]);
  const screenTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(screenCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [screenCanvas]);
  const logoTexture = useMemo(createLogoTexture, []);

  const startTime = useRef<number | null>(null);
  const painted = useRef({ boot: -1, wallpaper: -1 });
  const fired = useRef({ fade: false, end: false });
  const v = useMemo(
    () => ({
      start: new THREE.Vector3(0, 3.4, 6.2),
      mid: new THREE.Vector3(0, 2.1, 5.6),
      base: new THREE.Vector3(),
      screenPos: new THREE.Vector3(),
      screenNormal: new THREE.Vector3(),
      dive: new THREE.Vector3(),
      lookStart: new THREE.Vector3(0, 0.55, 0),
      look: new THREE.Vector3(),
    }),
    []
  );

  useEffect(() => {
    paintScreen(screenCtx, 0, 0);
    screenTexture.needsUpdate = true;
    return () => {
      screenTexture.dispose();
      logoTexture.dispose();
    };
  }, [screenCtx, screenTexture, logoTexture]);

  useFrame((state) => {
    if (!laptop.current || !lid.current || !screen.current) return;
    const now = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = now;
    const t = now - startTime.current;

    const open = easeInOut(range(t, 0.3, 1.4));
    lid.current.rotation.x = -LID_OPEN_ANGLE * open;
    laptop.current.rotation.y = -0.55 * (1 - open);
    if (keysMaterial.current) keysMaterial.current.emissiveIntensity = open * 0.12;

    const boot = range(t, 1.2, 2.0);
    const wallpaper = easeInOut(range(t, 2.0, 2.3));
    if (Math.abs(boot - painted.current.boot) > 0.01 || wallpaper !== painted.current.wallpaper) {
      paintScreen(screenCtx, boot, wallpaper);
      screenTexture.needsUpdate = true;
      painted.current = { boot, wallpaper };
    }

    const fit = Math.max(1, 1.1 / (state.size.width / state.size.height));
    v.base.lerpVectors(v.start, v.mid, easeInOut(range(t, 0, 1.4))).multiplyScalar(fit);

    screen.current.getWorldPosition(v.screenPos);
    screen.current.getWorldDirection(v.screenNormal);
    v.dive.copy(v.screenPos).addScaledVector(v.screenNormal, 0.25);

    state.camera.position.lerpVectors(v.base, v.dive, easeIn(range(t, 2.1, END_AT)));
    v.look.lerpVectors(v.lookStart, v.screenPos, easeInOut(range(t, 0.6, 2.1)));
    state.camera.lookAt(v.look);

    if (t >= FADE_AT && !fired.current.fade) {
      fired.current.fade = true;
      onFade();
    }
    if (t >= END_AT && !fired.current.end) {
      fired.current.end = true;
      onEnd();
    }
  });

  return (
    <>
      <color attach="background" args={["#0A0A0B"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <directionalLight position={[-4, 3, 2]} intensity={0.8} />
      <pointLight position={[0, 2, -3]} intensity={10} color={ACCENT} distance={12} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.2} color={ACCENT} position={[-5, 1, -2]} rotation-y={Math.PI / 2} scale={[3, 5, 1]} />
        <Lightformer intensity={0.8} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
      </Environment>

      <group ref={laptop}>
        <RoundedBox args={[3.2, 0.1, 2.2]} radius={0.04} smoothness={4} position={[0, 0.05, 0]}>
          <meshStandardMaterial color={ALUMINIUM} metalness={0.45} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.1005, -0.3]}>
          <boxGeometry args={[2.7, 0.002, 1.0]} />
          <meshStandardMaterial color="#0E0E10" roughness={0.8} />
        </mesh>
        <Keyboard materialRef={keysMaterial} />
        <mesh position={[0, 0.1005, 0.62]}>
          <boxGeometry args={[1.1, 0.002, 0.62]} />
          <meshStandardMaterial color="#2E2E33" metalness={0.6} roughness={0.45} />
        </mesh>

        <group ref={lid} position={[0, 0.104, -1.1]}>
          <RoundedBox args={[3.2, 0.07, 2.2]} radius={0.035} smoothness={4} position={[0, 0.035, 1.1]}>
            <meshStandardMaterial color={ALUMINIUM} metalness={0.45} roughness={0.35} />
          </RoundedBox>
          <mesh position={[0, 0.0712, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.002, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.12, 2.12]} />
            <meshStandardMaterial color="#050506" roughness={0.3} />
          </mesh>
          <mesh ref={screen} position={[0, -0.004, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.9, 1.82]} />
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={9} blur={2.4} far={2} />
    </>
  );
};

interface MacIntroProps {
  onReveal: () => void;
  onFinish: () => void;
}

export default function MacIntro({ onReveal, onFinish }: MacIntroProps) {
  const [fading, setFading] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setFading(true);
    setLeaving(true);
    onReveal();
    window.setTimeout(onFinish, 600);
  }, [onReveal, onFinish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [finish]);

  return (
    <div
      className={`force-dark fixed inset-0 z-[100] bg-ink-950 transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={leaving}
    >
      <Canvas dpr={[1, 2]} camera={{ fov: 40, position: [0, 3.4, 6.2] }}>
        <IntroScene onFade={() => setFading(true)} onEnd={finish} />
      </Canvas>
      <div
        className={`absolute inset-0 bg-ink-950 pointer-events-none transition-opacity duration-500 ${
          fading ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        onClick={finish}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 bg-line/5 border border-line/10 backdrop-blur hover:text-emerald-400 hover:border-emerald-500/50"
      >
        Skip intro →
      </button>
    </div>
  );
}
