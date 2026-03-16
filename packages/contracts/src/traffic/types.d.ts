import type z from "zod";
import type {
  createTrafficSourceSchema,
  trafficSourceQuerySchema,
} from "./schema";
import type {
  ConsultationRequest,
  ContactMessage,
  ContentView,
  NewsletterSubscriber,
  TrafficSource,
} from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";

export type CreateTrafficSourceType = z.input<typeof createTrafficSourceSchema>;
export type TrafficSourceQueryType = z.input<typeof trafficSourceQuerySchema>;

export interface TrafficSourceResponse extends Sanitize<TrafficSource> {
  contentViews?: Sanitize<ContentView>[];
  contactMessages?: Sanitize<ContactMessage>[];
  consultationRequests?: Sanitize<ConsultationRequest>[];
  newsletterSubs?: Sanitize<NewsletterSubscriber>[];
}

export interface TrafficSourceQueryResponse extends BaseQueryResponse {
  sources: TrafficSourceResponse[];
}
