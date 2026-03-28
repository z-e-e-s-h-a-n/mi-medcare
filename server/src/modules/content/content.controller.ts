import type { Request, Response } from "express";
import { Controller, Get, Param, Query, Req, Res } from "@nestjs/common";
import {
  CategoryQueryDto,
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
    return this.contentService.queryCategories(query, true);
  }

  @Get("categories/:slug")
  async getCategory(@Param("slug") slug: string) {
    return this.contentService.getCategoryBySlug(slug, true);
  }

  @Get("tags")
  async getTags(@Query() query: TagQueryDto) {
    return this.contentService.queryTags(query, true);
  }

  @Get("tags/:slug")
  async getTag(@Param("slug") slug: string) {
    return this.contentService.getTagBySlug(slug, true);
  }

  @Get("posts")
  async getPosts(@Query() query: PostQueryDto) {
    return this.contentService.queryPosts(query, true);
  }

  @Get("posts/:slug")
  async getPost(
    @Param("slug") slug: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.contentService.getPostBySlug(slug, req, res);
  }
}
