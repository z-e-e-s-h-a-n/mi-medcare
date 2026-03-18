import type { NotificationPurpose } from "@workspace/contracts";

export const NOTIFICATION_POLICY_MAP: Record<
  NotificationPurpose,
  { push: boolean }
> = {
  // AUTH
  signUp: {
    push: false,
  },
  signIn: {
    push: false,
  },

  updatePassword: {
    push: false,
  },
  verifyEmail: {
    push: false,
  },
  updateEmail: {
    push: false,
  },
  updateMfa: {
    push: false,
  },
  verifyMfa: {
    push: false,
  },

  // ACCOUNT
  userStatus: {
    push: true,
  },

  //Contact Message
  contactMessage: {
    push: true,
  },

  // Newsletter
  newsletter: {
    push: true,
  },

  //Consultation Request
  consultationRequest: {
    push: true,
  },

  securityAlert: {
    push: true,
  },
};
