// app/api/oauth/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@lib/core/server-env";

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state") || "/";

  const encodedState = Buffer.from(state).toString("base64");

  const params = new URLSearchParams({
    client_id: serverEnv.GOOGLE_CLIENT_ID,
    redirect_uri: serverEnv.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "profile email",
    state: encodedState,
    access_type: "offline",
    prompt: "consent",
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(googleAuthUrl);
}
