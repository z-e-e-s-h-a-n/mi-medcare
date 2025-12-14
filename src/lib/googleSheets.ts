import { google } from "googleapis";
import type { FormType } from "@/schemas/contactForm";
import { formatDate } from "./utils";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = "contact-form";

export async function addLeadToSheet(data: FormType) {
  const sheets = google.sheets({ version: "v4", auth });

  const email = data.email.toLowerCase().trim();

  // Get all existing emails
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!C:C`,
  });

  const emails =
    existing.data.values?.flat().map((e) => e.toLowerCase().trim()) || [];

  const isDuplicate = emails.includes(email);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.firstName,
          data.lastName,
          email,
          data.phone,
          data.message,
          formatDate(data.timeZone),
          isDuplicate ? "DUPLICATE" : "NEW",
        ],
      ],
    },
  });

  return { inserted: true, duplicate: isDuplicate };
}
