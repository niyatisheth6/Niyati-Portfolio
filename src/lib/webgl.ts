let cached: boolean | null = null;

export const hasWebGL = () => {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
};
