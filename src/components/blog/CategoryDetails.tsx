"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Folder, FolderTree, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useCategory } from "@hooks/category";
import { usePosts } from "@hooks/post";
import { Skeleton } from "@components/ui/skeleton";
import PostCard from "@components/blog/BlogCard";
import BlogSidebar from "@components/blog/BlogSidebar";
import CategorySkeleton from "@components/skeleton/CategorySkeleton";

const CategoryDetails = ({ slug }: BaseBlogPageProps) => {
  const { data: category, isFetching: categoryLoading } = useCategory(slug);
  const { data: postsData, isFetching: postsLoading } = usePosts({
    status: "published",
    sortBy: "publishedAt",
    searchBy: "category",
    search: slug,
    sortOrder: "desc",
    limit: 12,
  });

  if (categoryLoading) {
    return <CategorySkeleton />;
  }

  if (!category) {
    notFound();
  }

  const posts = postsData?.posts || [];
  const childCategories = category.children || [];

  // Build breadcrumb hierarchy
  const buildBreadcrumb = (
    cat: CategoryResponse,
  ): Array<{ name: string; slug: string }> => {
    const breadcrumbs = [{ name: cat.name, slug: cat.slug }];
    let current = cat.parent;
    while (current) {
      breadcrumbs.unshift({ name: current.name, slug: current.slug });
      current = current.parent;
    }
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumb(category);

  return (
    <>
      {/* Category Header */}
      <section className="py-12 md:py-16 bg-linear-to-r from-primary/10 to-primary/5">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs/category">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb) => (
              <React.Fragment key={crumb.slug}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/blogs/category/${crumb.slug}`}>
                    {crumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                {category.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {category.posts?.length || 0} posts
              </Badge>
              {childCategories.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <FolderTree className="h-3 w-3" />
                  {childCategories.length} subcategories
                </Badge>
              )}
              {category.parent && (
                <Badge variant="outline" asChild>
                  <Link
                    href={`/blogs/category/${category.parent.slug}`}
                    className="gap-1"
                  >
                    <Folder className="h-3 w-3" />
                    Parent: {category.parent.name}
                  </Link>
                </Badge>
              )}
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blogs/category">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Categories
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Subcategories */}
          {childCategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Subcategories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {childCategories.map((child: CategoryResponse) => (
                  <Link key={child.id} href={`/blogs/category/${child.slug}`}>
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4" />
                          <span className="font-medium">{child.name}</span>
                        </div>
                        <Badge variant="outline">
                          {child.posts?.length || 0}
                        </Badge>
                      </div>
                      {child.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {child.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Posts in this Category */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Posts in {category.name}</h2>
              <Badge variant="outline">
                {posts.length} of {category.posts?.length || 0} posts
              </Badge>
            </div>

            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  There are no published posts in this category yet.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/blog">Browse All Posts</Link>
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar />
        </div>
      </section>
    </>
  );
};

export default CategoryDetails;
