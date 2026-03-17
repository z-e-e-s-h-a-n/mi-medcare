import * as emailTemplates from "@workspace/templates/email";
import type { NotificationPurpose } from "@workspace/contracts";
import type { EmailTemplateComponent } from "../types/global";

export const emailTemplateMap: Record<
  NotificationPurpose,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EmailTemplateComponent<any>
> = {
  signIn: emailTemplates.SignIn,
  signUp: emailTemplates.SignUp,
  verifyMfa: emailTemplates.VerifyMfa,
  updateMfa: emailTemplates.UpdateMfa,
  verifyEmail: emailTemplates.VerifyEmail,
  updateEmail: emailTemplates.UpdateEmail,
  updatePassword: emailTemplates.UpdatePassword,
  userStatus: emailTemplates.UserStatus,
  newsletter: emailTemplates.Newsletter,
  contactMessage: emailTemplates.ContactMessage,
  consultationRequest: emailTemplates.ConsultationRequest,
  securityAlert: emailTemplates.SecurityAlert,
};
