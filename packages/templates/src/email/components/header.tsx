import { Heading, Text } from "@react-email/components";
import { emailTheme } from "./theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => (
  <>
    <Heading
      className="mb-1 text-xl font-semibold"
      style={{ color: emailTheme.foreground }}
    >
      {title}
    </Heading>
    {subtitle && (
      <Text
        className="mb-6 text-sm"
        style={{ color: emailTheme.mutedForeground }}
      >
        {subtitle}
      </Text>
    )}
  </>
);
