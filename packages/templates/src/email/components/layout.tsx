import {
  Html,
  Body,
  Container,
  Hr,
  Text,
  Preview,
  Tailwind,
  Section,
} from "@react-email/components";
import { appName } from "@workspace/shared/constants";
import { emailTheme } from "./theme";

interface LayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

export const Layout = ({ children, previewText }: LayoutProps) => (
  <Html>
    {previewText && <Preview>{previewText}</Preview>}
    <Tailwind>
      <Body
        className="font-sans"
        style={{ backgroundColor: emailTheme.background }}
      >
        <Container
          className="mx-auto my-8 max-w-150 overflow-hidden rounded-3xl border p-0"
          style={{
            backgroundColor: emailTheme.surface,
            borderColor: emailTheme.border,
          }}
        >
          <Section
            className="px-8 py-5"
            style={{
              background: `linear-gradient(135deg, ${emailTheme.primary} 0%, ${emailTheme.accent} 100%)`,
            }}
          >
            <Text
              className="m-0 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: emailTheme.primaryForeground }}
            >
              MI MedCare
            </Text>
            <Text
              className="m-0 mt-2 text-sm"
              style={{ color: emailTheme.primaryForeground }}
            >
              Medical billing and revenue cycle operations
            </Text>
          </Section>

          <Section className="px-8 py-8">{children}</Section>
          <Hr className="my-0" style={{ borderColor: emailTheme.border }} />
          <Section className="px-8 py-6">
            <Text
              className="m-0 text-xs leading-6"
              style={{ color: emailTheme.mutedForeground }}
            >
              This email was sent by <strong>{appName.default}</strong> to help
              you manage your account, security, or service requests.
            </Text>
            <Text
              className="m-0 mt-3 text-xs"
              style={{ color: emailTheme.mutedForeground }}
            >
              © {new Date().getFullYear()} {appName.default}. All rights
              reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
