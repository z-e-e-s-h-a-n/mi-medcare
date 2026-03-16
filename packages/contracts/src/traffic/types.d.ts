import type z from "zod";
import type {
  createTrafficSourceSchema,
  trafficSourceQuerySchema,
} from "./schema";
import type { TrafficSource } from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";

export type CreateTrafficSourceType = z.input<typeof createTrafficSourceSchema>;
export type TrafficSourceQueryType = z.input<typeof trafficSourceQuerySchema>;

export interface TrafficSourceResponse extends Sanitize<TrafficSource> {}

export interface TrafficSourceQueryResponse extends BaseQueryResponse {
  sources: TrafficSourceResponse[];
}
