import { publicEnv } from "@lib/core/public-env";
import { TemplateProps } from "@lib/core/mailer";

const appName = publicEnv.NEXT_PUBLIC_APP_NAME;

/* ======================================================
   Shared styles (reuse if already defined elsewhere)
====================================================== */

const baseStyles = `
  margin:0;
  padding:0;
  background:#f7f9fb;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  color:#111827;
`;

const containerStyles = `
  max-width:600px;
  margin:0 auto;
  background:#ffffff;
  border-radius:10px;
  padding:24px;
`;

const headerStyles = `
  font-size:22px;
  font-weight:700;
  margin-bottom:8px;
  color:#7846FF;
`;

const textStyles = `
  font-size:15px;
  line-height:1.6;
  margin:12px 0;
`;

const mutedTextStyles = `
  font-size:13px;
  color:#6b7280;
`;

const boxStyles = `
  background:#F3EDFF;
  padding:16px;
  border-radius:8px;
  margin-top:16px;
`;

/* ======================================================
   Layout helpers
====================================================== */

const EmailLayout = (content: string) => `
<div style="${baseStyles}">
  <div style="${containerStyles}">
    <img
      src="https://www.mimedcarellc.com/_next/image?url=%2Fimages%2Flogo-t.png&w=640&q=75"
      alt="${appName}"
      style="width:180px;margin-bottom:24px;"
    />
    ${content}
    ${EmailFooter()}
  </div>
</div>
`;

const EmailHeader = (title: string, subtitle?: string) => `
<div style="margin-bottom:20px;">
  <h1 style="${headerStyles}">${title}</h1>
  ${subtitle ? `<p style="${mutedTextStyles}">${subtitle}</p>` : ""}
</div>
`;

const EmailFooter = () => `
<hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
<p style="${mutedTextStyles}">
  ${appName} | Website Inquiry<br/>
  © ${new Date().getFullYear()} ${appName}
</p>
`;

/* ======================================================
   Admin – New contact submission
====================================================== */

export const contactAdminTemplate = ({ contactData }: TemplateProps) => ({
  subject: `New contact form submission`,
  html: EmailLayout(`
    ${EmailHeader("New Contact Form Submission", "A new message was received")}
    <p style="${textStyles}">
      A user has submitted a new inquiry through your website.
    </p>

    <div style="${boxStyles}">
      <p><strong>Name:</strong> ${contactData?.name}</p>
      <p><strong>Email:</strong> ${contactData?.email}</p>
      <p><strong>Phone:</strong> ${contactData?.phone}</p>
      <p><strong>Message:</strong><br/>${contactData?.message}</p>
    </div>
  `),
  text: `
New contact form submission

Name: ${contactData?.name}
Email: ${contactData?.email}
Phone: ${contactData?.phone}
Message: ${contactData?.message}
  `.trim(),
});

/* ======================================================
   User – Thank you email
====================================================== */

export const contactUserTemplate = ({ contactData }: TemplateProps) => ({
  subject: `Thanks for contacting ${appName}`,
  html: EmailLayout(`
    ${EmailHeader("Thank you for contacting us!")}
    <p style="${textStyles}">
      Hi <strong>${contactData?.name}</strong>,
    </p>
    <p style="${textStyles}">
      Thank you for reaching out to <strong>${appName}</strong>.
      We’ve received your message and our team will get back to you shortly.
    </p>

    <div style="${boxStyles}">
      <p><strong>Email:</strong> ${contactData?.email}</p>
      <p><strong>Phone:</strong> ${contactData?.phone}</p>
      <p><strong>Your Message:</strong><br/>${contactData?.message}</p>
    </div>
  `),
  text: `
Hi ${contactData?.name},

Thanks for contacting ${appName}.
We’ve received your message and will get back to you shortly.

Your message:
${contactData?.message}
  `.trim(),
});
