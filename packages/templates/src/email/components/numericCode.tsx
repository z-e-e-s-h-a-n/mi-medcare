import { emailTheme } from "./theme";

interface NumericCodeProps {
  code: string;
}

export const NumericCode = ({ code }: NumericCodeProps) => (
  <div className="my-5 text-center">
    {code.split("").map((digit, i) => (
      <span
        key={i}
        className="mx-1 inline-block min-w-11 rounded-xl border py-3 text-xl font-mono font-bold"
        style={{
          backgroundColor: emailTheme.background,
          borderColor: emailTheme.border,
          color: emailTheme.foreground,
        }}
      >
        {digit}
      </span>
    ))}
  </div>
);
