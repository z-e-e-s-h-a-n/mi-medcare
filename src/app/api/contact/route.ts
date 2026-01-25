import { NextResponse } from "next/server";
import { ContactFormType } from "@schemas/contact";
import { sendMail } from "@lib/core/mailer";
import { serverEnv } from "@lib/core/server-env";
import { addLeadToSheet } from "@lib/integrations/googleSheets";
import { addLeadToGHL } from "@lib/integrations/goHighLevel";

export async function POST(req: Request) {
  try {
    const data: ContactFormType = await req.json();

    await sendMail(serverEnv.ADMIN_EMAIL, "contactAdmin", { contactData: data });
    await sendMail(data.email, "contactUser", { contactData: data });

    await addLeadToSheet(data);
    await addLeadToGHL(data);

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
