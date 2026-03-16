import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  CategoryQueryDto,
  ContentViewDto,
  PostQueryDto,
  TagQueryDto,
} from "@workspace/contracts/content";

import { ContentService } from "./content.service";
import { Public } from "@/decorators/public.decorator";

@Public()
@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("categories")
  async getCategories(@Query() query: CategoryQueryDto) {
    return this.contentService.queryCategories(query);
  }

  @Get("categories/:slug")
  async getCategory(@Param("slug") slug: string) {
    return this.contentService.getCategoryBySlug(slug);
  }

  @Get("tags")
  async getTags(@Query() query: TagQueryDto) {
    return this.contentService.queryTags(query);
  }

  @Get("tags/:slug")
  async getTag(@Param("slug") slug: string) {
    return this.contentService.getTagBySlug(slug);
  }

  @Get("posts")
  async getPosts(@Query() query: PostQueryDto) {
    return this.contentService.queryPosts(query, true);
  }

  @Get("posts/:slug")
  async getPost(@Param("slug") slug: string) {
    return this.contentService.getPostBySlug(slug);
  }

  @Post("content/views")
  async trackView(@Body() dto: ContentViewDto) {
    return this.contentService.createContentView(dto);
  }
}
