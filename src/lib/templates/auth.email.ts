import { publicEnv } from "@lib/core/public-env";
import { TemplateProps } from "@lib/core/mailer";

const appName = publicEnv.NEXT_PUBLIC_APP_NAME;
const clientUrl = publicEnv.NEXT_PUBLIC_APP_ENDPOINT;

/* ======================================================
   Base styles (Gmail safe)
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
  font-size:22px;
  font-weight:700;
  margin-bottom:8px;
  color:#7c3aed;
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

const codeStyles = `
  font-size:20px;
  font-weight:700;
  letter-spacing:4px;
  background:#f3f4f6;
  padding:12px 20px;
  border-radius:8px;
  display:inline-block;
  font-family:monospace;
  color:#7c3aed;
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
  Medical Billing Services
</p>
<p style="${mutedTextStyles}">
  © ${new Date().getFullYear()} ${appName}
</p>
`;

const Greeting = (name?: string) => `
<p style="${textStyles}">Hello <strong>${name ?? "there"}</strong>,</p>
`;

/* ======================================================
   Action block (Gmail-safe)
====================================================== */

const ActionBlock = (link: string, label: string, secret?: string) =>
  secret
    ? `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#f3f4f6;border-radius:10px;">
  <tr>
    <td align="center" style="padding:24px;">
      <div style="${codeStyles}">${secret}</div>
      <div style="margin-top:16px;">
        <a href="${link}" style="${buttonStyles}">${label}</a>
      </div>
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
    ${EmailHeader("Welcome 👋", "Your medical billing account is ready")}
    ${Greeting(user?.displayName)}
    <p style="${textStyles}">
      Your account with MI MedCare LLC is now active.
    </p>
    <p style="${textStyles}">
      Sign in to access your medical billing dashboard.
    </p>
  `),
  text: `Welcome to ${appName}. Account ready.`,
});

export const signinTemplate = ({ user }: TemplateProps) => ({
  subject: `New sign-in detected`,
  html: EmailLayout(`
    ${EmailHeader("New sign-in 🔐")}
    ${Greeting(user?.displayName)}
    <p style="${textStyles}">
      A sign-in to your medical billing account was detected.
    </p>
    <p style="${textStyles}">
      Secure your account if this wasn't you.
    </p>
  `),
  text: `New sign-in detected.`,
});

export const setPasswordTemplate = ({ user, otp, email }: TemplateProps) =>
  otp
    ? {
      subject: `Set your password`,
      html: EmailLayout(`
          ${EmailHeader("Set your password 🔑")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Create your password to access MI MedCare services.
          </p>
          ${ActionBlock(
        `${clientUrl}/set-password?email=${email}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
        "Set password",
        otp.secret
      )}
        `),
      text: `Setup code: ${otp.secret}`,
    }
    : {
      subject: `Password set successfully`,
      html: EmailLayout(`
          ${EmailHeader("Password updated ✅")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your MI MedCare password is now set.
          </p>
        `),
      text: `Password set.`,
    };

export const resetPasswordTemplate = ({ user, otp, email }: TemplateProps) =>
  otp
    ? {
      subject: `Reset your password`,
      html: EmailLayout(`
          ${EmailHeader("Reset password 🔄")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Reset your MI MedCare billing account password.
          </p>
          ${ActionBlock(
        `${clientUrl}/reset-password?email=${email}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
        "Reset password",
        otp.secret
      )}
        `),
      text: `Reset code: ${otp.secret}`,
    }
    : {
      subject: `Password reset successful`,
      html: EmailLayout(`
          ${EmailHeader("Password updated ✅")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your password has been reset.
          </p>
        `),
      text: `Password reset.`,
    };

export const verifyEmailTemplate = ({ user, otp, email }: TemplateProps) => {
  const link = `${clientUrl}/verify?email=${email}&purpose=${otp?.purpose}&secret=${otp?.secret}&type=${otp?.type}`;

  return {
    subject: `Verify your account`,
    html: EmailLayout(`
      ${EmailHeader("Verification required")}
      ${Greeting(user?.displayName)}
      <p style="${textStyles}">
        Verify your email for MI MedCare access.
      </p>
      ${otp ? ActionBlock(link, "Verify", otp.secret) : ""}
    `),
    text: `Code: ${otp?.secret}`,
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
      subject: `Confirm change request`,
      html: EmailLayout(`
          ${EmailHeader("Confirm change 🔄")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Confirm updating your MI MedCare contact info.
          </p>
          ${ActionBlock(
        `${clientUrl}/confirm-change?email=${email}&newEmail=${newEmail}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`,
        "Confirm change",
        otp.secret
      )}
        `),
      text: `Confirm change.`,
    }
    : {
      subject: `Update successful`,
      html: EmailLayout(`
          ${EmailHeader("Update completed ✅")}
          ${Greeting(user?.displayName)}
          <p style="${textStyles}">
            Your contact info is updated.
          </p>
        `),
      text: `Info updated.`,
    };

export const securityAlertTemplate = ({ user, message }: TemplateProps) => ({
  subject: `Security alert`,
  html: EmailLayout(`
    ${EmailHeader("Security alert 🚨")}
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
  text: `Alert: ${message}`,
});
