import type z from "zod";
import type {
  CUTagSchema,
  CUPostSchema,
  CUCategorySchema,
  contentViewSchema,
  tagQuerySchema,
  postQuerySchema,
  categoryQuerySchema,
} from "./schema";
import type { Category, ContentView, Post, Tag } from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";
import type { MediaResponse } from "../media/types";
import type { BaseUserResponse } from "../user/types";

export type CategoryType = z.input<typeof CUCategorySchema>;
export type CategoryQueryType = z.input<typeof categoryQuerySchema>;

export type TagType = z.input<typeof CUTagSchema>;
export type TagQueryType = z.input<typeof tagQuerySchema>;

export type PostType = z.input<typeof CUPostSchema>;
export type PostQueryType = z.input<typeof postQuerySchema>;

export type ContentViewType = z.input<typeof contentViewSchema>;

export interface CategoryResponse extends Sanitize<Category> {
  parent?: Sanitize<Category>;
  children?: Sanitize<Category>[];
}

export type TagResponse = Sanitize<Tag>;

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

export interface PostQueryResponse extends BaseQueryResponse {
  posts: PostResponse[];
}

export type ContentViewResponse = Sanitize<ContentView>;
