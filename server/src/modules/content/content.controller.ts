import type { Request, Response } from "express";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import {
  CategoryQueryDto,
  PostQueryDto,
  PostViewDto,
  TagQueryDto,
} from "@workspace/contracts/content";
import { ulid } from "ulid";

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

  @Post("post-views")
  async trackView(
    @Body() dto: PostViewDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const visitorKey = req.cookies["postVisitorKey"] ?? ulid();

    if (!req.cookies["postVisitorKey"]) {
      res.cookie("postVisitorKey", visitorKey, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }

    return this.contentService.createPostView({
      ...dto,
      visitorKey,
    });
  }
}
