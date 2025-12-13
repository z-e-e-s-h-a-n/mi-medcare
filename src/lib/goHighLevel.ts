import { FormType } from "@/schemas/contactForm";

export async function addLeadToGHL(data: FormType) {
  try {
    const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        tags: ["website-lead"],
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      if (error.message?.includes("duplicated contacts")) {
        console.log("Duplicate lead skipped in GHL:", data.email);
      }
      throw new Error(`GHL API Error: ${JSON.stringify(error)}`);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("duplicated contacts")
    ) {
      console.log("Duplicate lead skipped in GHL:", data.email);
    }
    throw error;
  }
}
