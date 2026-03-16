import type z from "zod";
import type {
  categoryPayloadSchema,
  categoryQuerySchema,
  contentViewPayloadSchema,
  pagePayloadSchema,
  pageQuerySchema,
  postPayloadSchema,
  postQuerySchema,
  tagPayloadSchema,
  tagQuerySchema,
} from "./schema";
import type {
  Category,
  ContentView,
  Page,
  Post,
  Tag,
} from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";
import type { MediaResponse } from "../media/types";
import type { BaseUserResponse } from "../user/types";

export type CategoryType = z.input<typeof categoryPayloadSchema>;
export type CategoryQueryType = z.input<typeof categoryQuerySchema>;

export type TagType = z.input<typeof tagPayloadSchema>;
export type TagQueryType = z.input<typeof tagQuerySchema>;

export type PageType = z.input<typeof pagePayloadSchema>;
export type PageQueryType = z.input<typeof pageQuerySchema>;

export type PostType = z.input<typeof postPayloadSchema>;
export type PostQueryType = z.input<typeof postQuerySchema>;

export type ContentViewType = z.input<typeof contentViewPayloadSchema>;

export interface CategoryResponse extends Sanitize<Category> {
  parent?: Sanitize<Category>;
  children?: Sanitize<Category>[];
}

export interface TagResponse extends Sanitize<Tag> {}

export interface PageResponse extends Sanitize<Page> {
  cover?: MediaResponse;
}

export interface PostResponse extends Sanitize<Post> {
  author: BaseUserResponse;
  category: CategoryResponse;
  cover?: MediaResponse;
  tags: TagResponse[];
}

export interface CategoryQueryResponse extends BaseQueryResponse {
  categories: CategoryResponse[];
}

export interface TagQueryResponse extends BaseQueryResponse {
  tags: TagResponse[];
}

export interface PageQueryResponse extends BaseQueryResponse {
  pages: PageResponse[];
}

export interface PostQueryResponse extends BaseQueryResponse {
  posts: PostResponse[];
}

export interface ContentViewResponse extends Sanitize<ContentView> {}
