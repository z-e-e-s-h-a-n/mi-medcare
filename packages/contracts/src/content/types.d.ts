import type z from "zod";
import type {
  CUTagSchema,
  CUPostSchema,
  CUCategorySchema,
  tagQuerySchema,
  postQuerySchema,
  categoryQuerySchema,
} from "./schema";
import type { Category, Post, PostView, Tag } from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";
import type { MediaResponse } from "../media/types";
import type { UserResponse } from "../user";

export type CategoryType = z.input<typeof CUCategorySchema>;
export type CategoryQueryType = z.input<typeof categoryQuerySchema>;

export type TagType = z.input<typeof CUTagSchema>;
export type TagQueryType = z.input<typeof tagQuerySchema>;

export type PostType = z.input<typeof CUPostSchema>;
export type PostQueryType = z.input<typeof postQuerySchema>;

export interface CategoryResponse extends Sanitize<Category> {
  parent?: CategoryResponse;
  children?: CategoryResponse[];
  _count: { posts: number };
}

export interface TagResponse extends Sanitize<Tag> {
  _count: { posts: number };
}

export interface PostResponse extends Sanitize<Post> {
  author: UserResponse;
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

export type PostViewResponse = Sanitize<PostView>;

export interface TrackPostViewResponse {
  tracked: boolean;
  viewsCount: number;
}
