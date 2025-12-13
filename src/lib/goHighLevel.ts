import { FormType } from "@/schemas/contactForm";

export async function addLeadToGHL(data: FormType) {
  const searchRes = await fetch(
    `https://rest.gohighlevel.com/v1/contacts/?email=${encodeURIComponent(
      data.email
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!searchRes.ok) {
    const error = await searchRes.text();
    throw new Error(`GHL API Search Error: ${error}`);
  }
  const searchData = await searchRes.json();
  if (searchData.contacts && searchData.contacts.length > 0) {
    console.log("Contact already exists in GHL", searchData.contacts[0]);
    return;
  }

  const res = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      "Content-Type": "application/json",
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
    const error = await res.text();
    throw new Error(`GHL API Error: ${error}`);
  }
  return res.json();
}
