import { adminEmailTemplate, userEmailTemplate } from "@/lib/templates";
import { FormType } from "@/schemas/contactForm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data: FormType = await req.json();

    //
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `MI MedCare <${process.env.CONTACT_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: "New Contact Form Submission",
      html: adminEmailTemplate(data),
    });

    await transporter.sendMail({
      from: `MI MedCare <${process.env.CONTACT_EMAIL}>`,
      to: data.email,
      subject: "We received your message",
      html: userEmailTemplate(data),
    });

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
