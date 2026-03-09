import { apiClient, executeApi } from "../lib";

// Subscribe to newsletter
export const subscribeNewsletter = (data: NewsletterSubscriberDto) =>
  executeApi<null>(() => apiClient.post("/newsletter/subscribe", data));

// Unsubscribe from newsletter
export const unsubscribeNewsletter = (data: NewsletterUnSubscriberDto) =>
  executeApi<null>(() => apiClient.post("/newsletter/unsubscribe", data));

// Admin: list subscribers
export const listNewsletterSubscribers = (
  params?: NewsletterSubscriberQueryDto,
) =>
  executeApi<NewsletterSubscriberQueryResponse>(() =>
    apiClient.get("/newsletter", { params }),
  );
