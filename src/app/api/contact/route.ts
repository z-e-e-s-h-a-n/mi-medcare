import nodemailer from "nodemailer";
import { FormType } from "@/schemas/contactForm";
import { NextResponse } from "next/server";
import { addLeadToSheet } from "@/lib/googleSheets";
import { adminEmailTemplate, userEmailTemplate } from "@/lib/templates";

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
      from: `MI MedCare <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: "New Contact Form Submission – MI MedCare LLC",
      html: adminEmailTemplate(data),
    });

    await transporter.sendMail({
      from: `MI MedCare <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "We've Received Your Message – MI MedCare LLC",
      html: userEmailTemplate(data),
    });

    await addLeadToSheet(data);

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
