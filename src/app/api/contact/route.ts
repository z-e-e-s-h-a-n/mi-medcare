import { adminEmailTemplate, userEmailTemplate } from "@/lib/templates";
import { FormType } from "@/schemas/contactForm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data: FormType = await req.json();

    await resend.emails.send({
      from: `MI MedCare <${process.env.CONTACT_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: "New Contact Form Submission",
      html: adminEmailTemplate(data),
    });

    await resend.emails.send({
      from: `MI MedCare <${process.env.CONTACT_EMAIL}>`,
      to: data.email,
      subject: "We received your message",
      html: userEmailTemplate(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
