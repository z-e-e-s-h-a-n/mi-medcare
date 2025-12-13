import { google } from "googleapis";
import type { FormType } from "@/schemas/contactForm";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = "contact-form";

const formatDate = () => {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export async function addLeadToSheet(data: FormType) {
  const sheets = google.sheets({ version: "v4", auth });

  const email = data.email.toLowerCase().trim();

  //
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!C:C`,
  });

  const emails =
    existing.data.values?.flat().map((e) => e.toLowerCase().trim()) || [];

  if (emails.includes(email)) {
    console.log("Duplicate lead skipped:", email);
    return { inserted: false, reason: "DUPLICATE_EMAIL" };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.firstName,
          data.lastName,
          email,
          data.phone,
          data.message,
          formatDate(),
        ],
      ],
    },
  });

  return { inserted: true };
}
