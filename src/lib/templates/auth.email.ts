import { publicEnv } from "@lib/core/public-env";
import { serverEnv } from "@lib/core/server-env";
import { TemplateProps } from "@lib/core/mailer";
import { Otp } from "@generated/prisma";

/* ======================================================
   Config
====================================================== */

const appName = publicEnv.NEXT_PUBLIC_APP_NAME;
const clientUrl = publicEnv.NEXT_PUBLIC_APP_ENDPOINT;

/* ======================================================
   Base styles (Email safe)
====================================================== */

const baseStyles = `
  margin:0;
  padding:0;
  background-color:#f9fafb;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  color:#111827;
`;

const containerStyles = `
  width:600px;
  background-color:#ffffff;
  border-radius:10px;
  padding:32px;
  border:1px solid #e5e7eb;
`;

const headerStyles = `
  font-size:20px;
  font-weight:600;
  margin-bottom:6px;
  color:#111827;
`;

const textStyles = `
  font-size:15px;
  line-height:1.6;
  margin:12px 0;
  color:#111827;
`;

const mutedTextStyles = `
  font-size:13px;
  color:#6b7280;
`;

const buttonStyles = `
  display:inline-block;
  padding:12px 22px;
  background-color:#7c3aed;
  color:#ffffff;
  text-decoration:none;
  border-radius:8px;
  font-weight:600;
`;

const otpBoxStyles = `
  display:inline-block;
  min-width:44px;
  padding:12px 0;
  margin:0 4px;
  background:#f9fafb;
  border:1px solid #e5e7eb;
  border-radius:8px;
  font-size:20px;
  font-weight:700;
  font-family:monospace;
  color:#111827;
`;

/* ======================================================
   Layout helpers (TABLE BASED)
====================================================== */

const EmailLayout = (content: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="${baseStyles}">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" style="${containerStyles}">
        ${content}
        ${EmailFooter()}
      </table>
    </td>
  </tr>
</table>
`;

const EmailHeader = (title: string, subtitle?: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
  <tr>
    <td>
      <h1 style="${headerStyles}">${title}</h1>
      ${subtitle ? `<p style="${mutedTextStyles}">${subtitle}</p>` : ""}
    </td>
  </tr>
</table>
`;

const EmailFooter = () => `
<hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
<p style="${mutedTextStyles}">
  Sent by <strong>${appName}</strong><br/>
  © ${new Date().getFullYear()} ${appName}
</p>
`;

const Greeting = (name?: string) => `
<p style="${textStyles}">Hello <strong>${name ?? "there"}</strong>,</p>
`;

/* ======================================================
   OTP helpers
====================================================== */

const NumericCode = (code: string) => `
<div style="margin:20px 0;text-align:center;">
  ${code
    .split("")
    .map((d) => `<span style="${otpBoxStyles}">${d}</span>`)
    .join("")}
</div>
`;

const ExpiryNotice = () => `
<p style="${mutedTextStyles};text-align:center;">
  This code expires in ${serverEnv.OTP_EXP}.
</p>
`;

/* ======================================================
   Action block
====================================================== */

const ActionBlock = (link: string, label: string, otp?: Otp) =>
  otp?.type === "numericCode"
    ? `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
  <tr>
    <td align="center">
      <p style="${mutedTextStyles}">
        Use the verification code below
      </p>
      ${NumericCode(otp.secret)}
      ${ExpiryNotice()}
      <a href="${link}" style="${buttonStyles}">${label}</a>
    </td>
  </tr>
</table>`
    : `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr>
    <td align="center">
      <a href="${link}" style="${buttonStyles}">${label}</a>
    </td>
  </tr>
</table>`;

/* ======================================================
   Templates
====================================================== */

export const signupTemplate = ({ user }: TemplateProps) => ({
  subject: `Welcome to ${appName}`,
  html: EmailLayout(`
    ${EmailHeader("Welcome to MI MedCare", "Your account is ready")}
    ${Greeting(user?.displayName)}
    <p style="${textStyles}">
      Your medical billing account has been successfully created.
    </p>
    <p style="${textStyles}">
      You can now sign in and access your dashboard.
    </p>
  `),
  text: `Welcome to ${appName}. Your account is ready.`,
});

export const signinTemplate = ({ user }: TemplateProps) => ({
  subject: `New sign-in detected`,
  html: EmailLayout(`
    ${EmailHeader("New Sign-in Detected")}
    ${Greeting(user?.displayName)}
    <p style="${textStyles}">
      A sign-in to your account was detected.
    </p>
    <p style="${textStyles}">
      If this wasn't you, please secure your account immediately.
    </p>
  `),
  text: `New sign-in detected.`,
});

export const setPasswordTemplate = ({ user, otp, email }: TemplateProps) =>
  otp
    ? {
        subject: `Set your password`,
        html: EmailLayout(`
          ${EmailHeader("Set Your Password")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Create a password to access your MI MedCare account.
          </p>
          ${ActionBlock(
            `${clientUrl}/auth/set-password?email=${email}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
            "Set password",
            otp,
          )}
        `),
        text: `Your setup code is ${otp.secret}`,
      }
    : {
        subject: `Password set successfully`,
        html: EmailLayout(`
          ${EmailHeader("Password Set Successfully")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your password has been created successfully.
          </p>
        `),
        text: `Password set.`,
      };

export const resetPasswordTemplate = ({ user, otp, email }: TemplateProps) =>
  otp
    ? {
        subject: `Reset your password`,
        html: EmailLayout(`
          ${EmailHeader("Reset Your Password")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Use the code below to reset your password.
          </p>
          ${ActionBlock(
            `${clientUrl}/auth/reset-password?email=${email}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
            "Reset password",
            otp,
          )}
        `),
        text: `Reset code: ${otp.secret}`,
      }
    : {
        subject: `Password reset successful`,
        html: EmailLayout(`
          ${EmailHeader("Password Reset Successful")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your password has been updated.
          </p>
        `),
        text: `Password reset.`,
      };

export const verifyEmailTemplate = ({ user, otp, email }: TemplateProps) => {
  const link = `${clientUrl}/auth/verify?email=${email}&purpose=${otp?.purpose}&secret=${otp?.secret}&type=${otp?.type}`;

  return {
    subject: `Verify your email address`,
    html: EmailLayout(`
      ${EmailHeader("Verify Your Email Address")}
      ${Greeting(user?.displayName)}
      <p style="${textStyles}">
        Please verify your email to activate your account.
      </p>
      ${otp ? ActionBlock(link, "Verify email", otp) : ""}
    `),
    text: `Verification code: ${otp?.secret}`,
  };
};

export const changeEmailTemplate = ({
  user,
  otp,
  email,
  newEmail,
}: TemplateProps) =>
  otp
    ? {
        subject: `Email change request`,
        html: EmailLayout(`
          ${EmailHeader(
            "Email Change Request",
            "Confirm your new email address",
          )}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            A request was made to change your email address.
          </p>
          <p style="${textStyles}">
            New email: <strong>${newEmail}</strong>
          </p>
          ${ActionBlock(
            `${clientUrl}/auth/verify?email=${email}&newEmail=${newEmail}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
            "Confirm email change",
            otp,
          )}
        `),
        text: `Confirm email change.`,
      }
    : {
        subject: `Email address updated`,
        html: EmailLayout(`
          ${EmailHeader("Email Address Updated")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your email address has been successfully updated.
          </p>
        `),
        text: `Email updated.`,
      };

export const securityAlertTemplate = ({ user, message }: TemplateProps) => ({
  subject: `Security alert`,
  html: EmailLayout(`
    ${EmailHeader("Security Alert")}
    ${Greeting(user?.displayName)}
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border-radius:8px;margin:16px 0;">
      <tr>
        <td style="padding:16px;">
          <p style="margin:0;color:#991b1b;font-weight:600;">
            ${message}
          </p>
        </td>
      </tr>
    </table>
  `),
  text: `Security alert: ${message}`,
});
