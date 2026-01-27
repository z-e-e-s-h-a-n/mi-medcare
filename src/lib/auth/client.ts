/* =========================
   AUTH
   ========================= */

import apiClient, { executeApi } from "@lib/http/api-client";

export const signUp = (data: SignUpType) =>
  executeApi(() => apiClient.post("/auth/signup", data));

export const signIn = (data: SignInType) =>
  executeApi<SignInResponse>(() => apiClient.post("/auth/signin", data));

export const signOut = () => executeApi(() => apiClient.post("/auth/signout"));

/* =========================
   OTP
   ========================= */

export const requestOtp = (data: RequestOtpType) =>
  executeApi(() => apiClient.post("/auth/request-otp", data));

export const validateOtp = (params: ValidateOtpType) =>
  executeApi<ValidateOtpResponse>(() =>
    apiClient.get("/auth/validate-otp", { params }),
  );

/* =========================
   PASSWORD
   ========================= */

export const resetPassword = (data: ResetPasswordType) =>
  executeApi(() => apiClient.post("/auth/reset-password", data));

/* =========================
   IDENTIFIER CHANGE
   ========================= */

export const requestChangeEmail = (data: ChangeEmailType) =>
  executeApi(() => apiClient.post("/auth/change-email", data));

export const verifyChangeEmail = (params: ChangeEmailType) =>
  executeApi(() => apiClient.get("/auth/change-email", { params }));

/* =========================
   OAuth
   ========================= */

export const redirectToOAuth = (provider: OAuthProvider) => {
  const clientUrl = window.location.origin;
  window.location.href = `api/oauth/${provider}?clientUrl=${clientUrl}`;
};
