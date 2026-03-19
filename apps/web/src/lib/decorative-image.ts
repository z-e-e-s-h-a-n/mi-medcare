const HERO_PALETTES = [
  ["#0f766e", "#14b8a6", "#99f6e4"],
  ["#1d4ed8", "#38bdf8", "#dbeafe"],
  ["#7c3aed", "#c084fc", "#ede9fe"],
  ["#be123c", "#fb7185", "#ffe4e6"],
  ["#b45309", "#f59e0b", "#fef3c7"],
  ["#166534", "#22c55e", "#dcfce7"],
  ["#0f172a", "#475569", "#e2e8f0"],
];

type ImageVariant = "hero" | "section" | "card";

const REMOTE_IMAGE_PATTERN = /^https?:\/\//i;

function hashSeed(seed: string) {
  return Array.from(seed).reduce(
    (hash, char, index) => (hash * 33 + char.charCodeAt(0) + index) >>> 0,
    5381,
  );
}

function buildSvg(seed: string, variant: ImageVariant) {
  const normalizedSeed = seed.trim() || "mi-medcare";
  const hash = hashSeed(normalizedSeed);
  const palette = HERO_PALETTES[hash % HERO_PALETTES.length];
  const [base, accent, highlight] = palette;

  const width = variant === "hero" ? 1600 : variant === "section" ? 1200 : 960;
  const height = variant === "hero" ? 900 : variant === "section" ? 720 : 640;
  const circleA = 130 + (hash % 220);
  const circleB = 480 + (hash % 280);
  const crossX = 120 + (hash % 520);
  const crossY = 90 + (hash % 260);
  const label = normalizedSeed
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${base}" />
          <stop offset="55%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${highlight}" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="${variant === "card" ? 40 : 68}" />
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <g opacity="0.22" filter="url(#blur)">
        <circle cx="${circleA}" cy="${Math.round(height * 0.22)}" r="${Math.round(height * 0.2)}" fill="${highlight}" />
        <circle cx="${circleB}" cy="${Math.round(height * 0.74)}" r="${Math.round(height * 0.28)}" fill="${base}" />
      </g>
      <g opacity="0.14" stroke="white" stroke-width="1.5">
        <path d="M0 ${Math.round(height * 0.68)} C ${Math.round(width * 0.18)} ${Math.round(height * 0.58)}, ${Math.round(width * 0.32)} ${Math.round(height * 0.84)}, ${Math.round(width * 0.5)} ${Math.round(height * 0.68)} S ${Math.round(width * 0.82)} ${Math.round(height * 0.52)}, ${width} ${Math.round(height * 0.66)}" />
        <path d="M0 ${Math.round(height * 0.82)} C ${Math.round(width * 0.2)} ${Math.round(height * 0.7)}, ${Math.round(width * 0.38)} ${height}, ${Math.round(width * 0.55)} ${Math.round(height * 0.78)} S ${Math.round(width * 0.82)} ${Math.round(height * 0.66)}, ${width} ${Math.round(height * 0.8)}" />
      </g>
      <g opacity="0.16" fill="white">
        <rect x="${crossX}" y="${crossY}" width="26" height="110" rx="13" />
        <rect x="${crossX - 42}" y="${crossY + 42}" width="110" height="26" rx="13" />
      </g>
      <g opacity="0.12" fill="white">
        <circle cx="${Math.round(width * 0.78)}" cy="${Math.round(height * 0.22)}" r="7" />
        <circle cx="${Math.round(width * 0.84)}" cy="${Math.round(height * 0.28)}" r="7" />
        <circle cx="${Math.round(width * 0.9)}" cy="${Math.round(height * 0.22)}" r="7" />
      </g>
      <text x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.84)}" fill="rgba(255,255,255,0.24)" font-family="Arial, sans-serif" font-size="${variant === "hero" ? 152 : variant === "section" ? 118 : 92}" font-weight="700" letter-spacing="10">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getDecorativeImage(
  seed: string,
  variant: ImageVariant,
  imageUrl?: string,
  preferGeneratedForRemote = false,
) {
  if (!imageUrl) {
    return buildSvg(seed, variant);
  }

  if (preferGeneratedForRemote && REMOTE_IMAGE_PATTERN.test(imageUrl)) {
    return buildSvg(seed, variant);
  }

  return imageUrl;
}
