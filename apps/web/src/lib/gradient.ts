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

export const splitGradient = (gradient: string): [from: string, to: string] => {
  const [from, to] = gradient.trim().split(/\s+/);
  return [from ?? "", to ?? from ?? ""];
};

export function gradientClass(
  gradient: string,
  { type = "bg", direction = "r", opacity }: GradientClassOptions = {},
): string {
  const [from, to] = splitGradient(gradient);

  const resolvedOpacity =
    typeof opacity === "number"
      ? Math.max(0, Math.min(100, Math.round(opacity)))
      : undefined;

  const opacitySuffix =
    typeof resolvedOpacity === "number" ? `/${resolvedOpacity}` : "";

  const base = `bg-linear-to-${direction} from-${from}${opacitySuffix} to-${to}${opacitySuffix}`;

  if (type === "text") {
    return `${base} bg-clip-text text-transparent`;
  }

  return base;
}
