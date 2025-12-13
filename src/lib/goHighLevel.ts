export async function addLeadToGHL(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}) {
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
