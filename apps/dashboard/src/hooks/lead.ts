"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContactMessageQueryType,
  ContactMessageQueryResponse,
  ContactMessageResponse,
  UpdateContactMessageType,
} from "@workspace/contracts/contact";
import type {
  ConsultationRequestQueryType,
  ConsultationRequestQueryResponse,
  ConsultationRequestResponse,
  UpdateConsultationRequestType,
} from "@workspace/contracts/consultation";
import type {
  NewsletterSubscriberQueryResponse,
  NewsletterSubscriberQueryType,
  NewsletterSubscriberResponse,
} from "@workspace/contracts/newsletter";
import type { ApiException } from "@workspace/sdk";
import * as contact from "@workspace/sdk/contact";
import * as consultation from "@workspace/sdk/consultation";
import * as newsletter from "@workspace/sdk/newsletter";
import { parseDuration } from "@workspace/shared/utils";

const STALE_TIME = parseDuration("15m");

const queryDefaults = {
  staleTime: STALE_TIME,
  gcTime: STALE_TIME,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

type ListResult<T> = {
  data?: T;
  isLoading: boolean;
  isFetching: boolean;
  fetchError: ApiException | null;
};

type MutationResult<TData, TInput> = ListResult<TData> & {
  mutateAsync: (data: TInput) => Promise<TData>;
  isPending: boolean;
  mutateError: ApiException | null;
};

export function useContactMessages(
  params: ContactMessageQueryType,
): ListResult<ContactMessageQueryResponse> {
  const query = useQuery({
    queryKey: ["contactMessages", params],
    queryFn: () => contact.getContactMessages(params),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}

export function useContactMessage(
  id?: string,
): MutationResult<ContactMessageResponse, UpdateContactMessageType> {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["contactMessage", id],
    queryFn: () => contact.getContactMessage(id!),
    select: (res) => res.data,
    enabled: Boolean(id),
    ...queryDefaults,
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateContactMessageType) =>
      contact
        .replyContactMessage(id!, data)
        .then(() => contact.getContactMessage(id!))
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      queryClient.invalidateQueries({ queryKey: ["contactMessage", id] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    mutateError: mutation.error as ApiException | null,
  };
}

export function useConsultationRequests(
  params: ConsultationRequestQueryType,
): ListResult<ConsultationRequestQueryResponse> {
  const query = useQuery({
    queryKey: ["consultationRequests", params],
    queryFn: () => consultation.listConsultationRequests(params),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}

export function useConsultationRequest(
  id?: string,
): MutationResult<
  ConsultationRequestResponse,
  UpdateConsultationRequestType
> {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["consultationRequest", id],
    queryFn: () => consultation.getConsultationRequest(id!),
    select: (res) => res.data,
    enabled: Boolean(id),
    ...queryDefaults,
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateConsultationRequestType) =>
      consultation.updateConsultationRequest(id!, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationRequests"] });
      queryClient.invalidateQueries({
        queryKey: ["consultationRequest", id],
      });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    mutateError: mutation.error as ApiException | null,
  };
}

export function useNewsletterSubscribers(
  params: NewsletterSubscriberQueryType,
): ListResult<NewsletterSubscriberQueryResponse> {
  const query = useQuery({
    queryKey: ["newsletterSubscribers", params],
    queryFn: () => newsletter.listNewsletterSubscribers(params),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}

export function useNewsletterSubscriber(
  id?: string,
): ListResult<NewsletterSubscriberResponse> {
  const query = useQuery({
    queryKey: ["newsletterSubscriber", id],
    queryFn: () => newsletter.getNewsletterSubscriber(id!),
    select: (res) => res.data,
    enabled: Boolean(id),
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}
