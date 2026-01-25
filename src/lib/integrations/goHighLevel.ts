import { ContactFormType } from "@schemas/contact";

export async function addLeadToGHL(data: ContactFormType) {
  const [firstName, ...lastName] = data.name.split(" ").map((v) => v.trim());

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      phone: data.phone,
      tags: ["website-lead"],
    }),
  });

  if (!res.ok) {
    const error = await res.json();

    if (error.message?.includes("duplicated contacts")) {
      console.log("Duplicate lead skipped in GHL:", data.email);
      return { skipped: true };
    }

    throw new Error(`GHL API Error: ${JSON.stringify(error)}`);
  }

  return { created: true };
}
