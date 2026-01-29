// app/api/oauth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@lib/core/server-env";
import { oauthService } from "@lib/auth/oauth.service";
import { tokenService } from "@lib/auth/token.service";
import { authService } from "@lib/auth/auth.service";
import { ForbiddenException } from "@lib/http/http-exception";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state") || "/";

    if (!code) throw new Error("Missing code from Google");

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: serverEnv.GOOGLE_CLIENT_ID,
        client_secret: serverEnv.GOOGLE_CLIENT_SECRET,
        redirect_uri: serverEnv.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Failed to get access token");

    // Fetch user profile from Google
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    const profile = await profileRes.json();

    // Normalize profile for your oauthService
    const normalizedProfile = {
      provider: "google" as const,
      id: profile.id,
      email: profile.email,
      displayName: profile.name,
      firstName: profile.given_name || "",
      lastName: profile.family_name || "",
      imageUrl: profile.picture,
    };

    const user = await oauthService.validateOAuthLogin(normalizedProfile);
    authService.checkUserStatus(user.status);

    await tokenService.createAuthSession(req, user);

    const redirectUrl = Buffer.from(state, "base64").toString();
    return NextResponse.redirect(
      new URL(
        `/auth/verify?purpose=oauthSuccess&redirectUrl=${encodeURIComponent(redirectUrl)}`,
        req.url,
      ),
    );
  } catch (err) {
    console.error("Google OAuth error:", err);

    let message = "";
    let code = "oauth_failed";
    if (err instanceof ForbiddenException) {
      message = err.message;
      code = "forbidden";
    }

    return NextResponse.redirect(
      new URL(`/auth/sign-in?error=${code}&message=${message}`, req.url),
    );
  }
}
