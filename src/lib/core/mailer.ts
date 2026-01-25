import nodemailer from "nodemailer";
import * as templates from "@lib/templates/auth.email";
import { publicEnv } from "./public-env";
import { serverEnv } from "./server-env";
import {
  contactAdminTemplate,
  contactUserTemplate,
} from "@lib/templates/contact.email";
import { Otp } from "@generated/prisma";
import { ContactFormType } from "@schemas/contact";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export interface TemplateProps {
  user?: UserResponse;
  otp?: Otp;
  email?: string;
  newEmail?: string;
  message?: string;
  contactData?: ContactFormType;
}

export interface TemplateReturn {
  subject: string;
  html: string;
  text: string;
}

const templateFactory: Record<
  NotificationPurpose,
  (data: TemplateProps) => TemplateReturn
> = {
  signin: templates.signinTemplate,
  signup: templates.signupTemplate,
  verifyEmail: templates.verifyEmailTemplate,
  setPassword: templates.setPasswordTemplate,
  resetPassword: templates.resetPasswordTemplate,
  changeEmail: templates.changeEmailTemplate,
  contactAdmin: contactAdminTemplate,
  contactUser: contactUserTemplate,
};

export const sendMail = async (
  to: string,
  purpose: NotificationPurpose,
  metadata: TemplateProps,
) => {
  try {
    const templateFn = templateFactory[purpose];
    if (!templateFn) {
      throw new Error(`Undefined template purpose: ${purpose}`);
    }

    const { html, subject } = templateFn(metadata);
    const from = `${publicEnv.NEXT_PUBLIC_APP_NAME} <${serverEnv.SMTP_USER}>`;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    throw error;
  }
};
