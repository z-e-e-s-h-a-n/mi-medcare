import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  CategoryDto,
  CategoryQueryDto,
  PageDto,
  PageQueryDto,
  PostDto,
  PostQueryDto,
  TagDto,
  TagQueryDto,
} from "@workspace/contracts/content";

import { ContentService } from "./content.service";
import { BooleanQuery } from "@/decorators/boolean-query.decorator";
import { Roles } from "@/decorators/roles.decorator";
import { User } from "@/decorators/user.decorator";

@Roles("admin")
@Controller("admin/content")
export class ContentAdminController {
  constructor(private readonly contentService: ContentService) {}

  @Post("categories")
  async createCategory(@Body() dto: CategoryDto, @User("id") userId: string) {
    return this.contentService.createCategory(dto, userId);
  }

  @Get("categories")
  async queryCategories(@Query() query: CategoryQueryDto) {
    return this.contentService.queryCategories(query);
  }

  @Get("categories/:id")
  async getCategory(@Param("id") id: string) {
    return this.contentService.getCategoryById(id);
  }

  @Put("categories/:id")
  async updateCategory(
    @Param("id") id: string,
    @Body() dto: CategoryDto,
    @User("id") userId: string,
  ) {
    return this.contentService.updateCategory(id, dto, userId);
  }

  @Delete("categories/:id")
  async deleteCategory(
    @Param("id") id: string,
    @BooleanQuery("force") force: boolean,
    @User("id") userId: string,
  ) {
    return this.contentService.deleteCategory(id, force, userId);
  }

  @Post("categories/:id/restore")
  async restoreCategory(@Param("id") id: string, @User("id") userId: string) {
    return this.contentService.restoreCategory(id, userId);
  }

  @Post("tags")
  async createTag(@Body() dto: TagDto, @User("id") userId: string) {
    return this.contentService.createTag(dto, userId);
  }

  @Get("tags")
  async queryTags(@Query() query: TagQueryDto) {
    return this.contentService.queryTags(query);
  }

  @Get("tags/:id")
  async getTag(@Param("id") id: string) {
    return this.contentService.getTagById(id);
  }

  @Put("tags/:id")
  async updateTag(
    @Param("id") id: string,
    @Body() dto: TagDto,
    @User("id") userId: string,
  ) {
    return this.contentService.updateTag(id, dto, userId);
  }

  @Delete("tags/:id")
  async deleteTag(
    @Param("id") id: string,
    @BooleanQuery("force") force: boolean,
    @User("id") userId: string,
  ) {
    return this.contentService.deleteTag(id, force, userId);
  }

  @Post("tags/:id/restore")
  async restoreTag(@Param("id") id: string, @User("id") userId: string) {
    return this.contentService.restoreTag(id, userId);
  }

  @Post("pages")
  async createPage(@Body() dto: PageDto, @User("id") userId: string) {
    return this.contentService.createPage(dto, userId);
  }

  @Get("pages")
  async queryPages(@Query() query: PageQueryDto) {
    return this.contentService.queryPages(query);
  }

  @Get("pages/:id")
  async getPage(@Param("id") id: string) {
    return this.contentService.getPageById(id);
  }

  @Put("pages/:id")
  async updatePage(
    @Param("id") id: string,
    @Body() dto: PageDto,
    @User("id") userId: string,
  ) {
    return this.contentService.updatePage(id, dto, userId);
  }

  @Delete("pages/:id")
  async deletePage(
    @Param("id") id: string,
    @BooleanQuery("force") force: boolean,
    @User("id") userId: string,
  ) {
    return this.contentService.deletePage(id, force, userId);
  }

  @Post("pages/:id/restore")
  async restorePage(@Param("id") id: string, @User("id") userId: string) {
    return this.contentService.restorePage(id, userId);
  }

  @Post("posts")
  async createPost(@Body() dto: PostDto, @User("id") userId: string) {
    return this.contentService.createPost(dto, userId);
  }

  @Get("posts")
  async queryPosts(@Query() query: PostQueryDto) {
    return this.contentService.queryPosts(query);
  }

  @Get("posts/:id")
  async getPost(@Param("id") id: string) {
    return this.contentService.getPostById(id);
  }

  @Put("posts/:id")
  async updatePost(
    @Param("id") id: string,
    @Body() dto: PostDto,
    @User("id") userId: string,
  ) {
    return this.contentService.updatePost(id, dto, userId);
  }

  @Delete("posts/:id")
  async deletePost(
    @Param("id") id: string,
    @BooleanQuery("force") force: boolean,
    @User("id") userId: string,
  ) {
    return this.contentService.deletePost(id, force, userId);
  }

  @Post("posts/:id/restore")
  async restorePost(@Param("id") id: string, @User("id") userId: string) {
    return this.contentService.restorePost(id, userId);
  }
}
