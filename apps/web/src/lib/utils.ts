import type { BusinessAddress } from "@workspace/contracts/business";

export type GradientType = "bg" | "text";
export type GradientDirection =
  | "r"
  | "l"
  | "t"
  | "b"
  | "tr"
  | "tl"
  | "br"
  | "bl";

export interface GradientClassOptions {
  type?: GradientType;
  direction?: GradientDirection;
  opacity?: number;
}

const DIRECTION_CLASSES: Record<GradientDirection, string> = {
  r: "bg-linear-to-r",
  l: "bg-linear-to-l",
  t: "bg-linear-to-t",
  b: "bg-linear-to-b",
  tr: "bg-linear-to-tr",
  tl: "bg-linear-to-tl",
  br: "bg-linear-to-br",
  bl: "bg-linear-to-bl",
};

const GRADIENT_OPACITY_SAFE_LIST =
  "from-amber-400/8 to-amber-400/8 from-amber-400/10 to-amber-400/10 from-amber-400/50 to-amber-400/50 from-amber-500/8 to-amber-500/8 from-amber-500/10 to-amber-500/10 from-amber-500/50 to-amber-500/50 from-blue-500/8 to-blue-500/8 from-blue-500/10 to-blue-500/10 from-blue-500/50 to-blue-500/50 from-blue-600/8 to-blue-600/8 from-blue-600/10 to-blue-600/10 from-blue-600/50 to-blue-600/50 from-cyan-500/8 to-cyan-500/8 from-cyan-500/10 to-cyan-500/10 from-cyan-500/50 to-cyan-500/50 from-emerald-500/8 to-emerald-500/8 from-emerald-500/10 to-emerald-500/10 from-emerald-500/50 to-emerald-500/50 from-fuchsia-500/8 to-fuchsia-500/8 from-fuchsia-500/10 to-fuchsia-500/10 from-fuchsia-500/50 to-fuchsia-500/50 from-gray-500/8 to-gray-500/8 from-gray-500/10 to-gray-500/10 from-gray-500/50 to-gray-500/50 from-green-500/8 to-green-500/8 from-green-500/10 to-green-500/10 from-green-500/50 to-green-500/50 from-indigo-500/8 to-indigo-500/8 from-indigo-500/10 to-indigo-500/10 from-indigo-500/50 to-indigo-500/50 from-indigo-600/8 to-indigo-600/8 from-indigo-600/10 to-indigo-600/10 from-indigo-600/50 to-indigo-600/50 from-lime-500/8 to-lime-500/8 from-lime-500/10 to-lime-500/10 from-lime-500/50 to-lime-500/50 from-orange-400/8 to-orange-400/8 from-orange-400/10 to-orange-400/10 from-orange-400/50 to-orange-400/50 from-orange-500/8 to-orange-500/8 from-orange-500/10 to-orange-500/10 from-orange-500/50 to-orange-500/50 from-orange-600/8 to-orange-600/8 from-orange-600/10 to-orange-600/10 from-orange-600/50 to-orange-600/50 from-pink-500/8 to-pink-500/8 from-pink-500/10 to-pink-500/10 from-pink-500/50 to-pink-500/50 from-purple-500/8 to-purple-500/8 from-purple-500/10 to-purple-500/10 from-purple-500/50 to-purple-500/50 from-purple-600/8 to-purple-600/8 from-purple-600/10 to-purple-600/10 from-purple-600/50 to-purple-600/50 from-red-500/8 to-red-500/8 from-red-500/10 to-red-500/10 from-red-500/50 to-red-500/50 from-rose-400/8 to-rose-400/8 from-rose-400/10 to-rose-400/10 from-rose-400/50 to-rose-400/50 from-rose-500/8 to-rose-500/8 from-rose-500/10 to-rose-500/10 from-rose-500/50 to-rose-500/50 from-sky-500/8 to-sky-500/8 from-sky-500/10 to-sky-500/10 from-sky-500/50 to-sky-500/50 from-slate-500/8 to-slate-500/8 from-slate-500/10 to-slate-500/10 from-slate-500/50 to-slate-500/50 from-slate-600/8 to-slate-600/8 from-slate-600/10 to-slate-600/10 from-slate-600/50 to-slate-600/50 from-teal-500/8 to-teal-500/8 from-teal-500/10 to-teal-500/10 from-teal-500/50 to-teal-500/50 from-violet-500/8 to-violet-500/8 from-violet-500/10 to-violet-500/10 from-violet-500/50 to-violet-500/50 from-yellow-500/8 to-yellow-500/8 from-yellow-500/10 to-yellow-500/10 from-yellow-500/50 to-yellow-500/50";
void GRADIENT_OPACITY_SAFE_LIST;

export const splitGradient = (gradient: string): [string, string] => {
  const tokens = gradient.trim().split(/\s+/).filter(Boolean);

  const [from = "from-transparent", to = from] = tokens;
  return [from, to];
};

export function gradientClass(
  gradient: string,
  { type = "bg", direction = "r", opacity }: GradientClassOptions = {},
): string {
  const [from, to] = splitGradient(gradient);

  const o =
    typeof opacity === "number"
      ? `/${Math.min(100, Math.max(0, Math.round(opacity)))}`
      : "";

  const directionClass = DIRECTION_CLASSES[direction] ?? DIRECTION_CLASSES.r;
  const base = `${directionClass} ${from}${o} ${to}${o}`.trim();

  return type === "text" ? `${base} bg-clip-text text-transparent` : base;
}

export const formatBusinessAddress = (address: BusinessAddress, full = false) =>
  `${address.line1}, ${address.city}, ${address.state} ${address.zip}${full ? ", " + address.country : ""}`.trim();

export const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
};
