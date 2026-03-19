"use client";

import Link from "next/link";
import { Folder, FolderTree } from "lucide-react";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useCategories } from "@/hooks/content";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import CategoryCard from "@/components/blogs/CategoryCard";
import { PageHeader } from "@/components/layout/page-header";

export const CategoryListClient = () => {
  const { data, isLoading } = useCategories();

  const categories =
    data?.categories?.filter((cat) => (cat._count?.posts || 0) > 0) || [];

  const rootCategories = categories.filter((cat) => !cat.parentId);
  const nestedCategories = categories.filter((cat) => cat.parentId);
  const hasCategories = categories.length > 0;

  return (
    <>
      <PageHeader
        title="Blog Categories"
        description="Browse our articles organized by topics and categories. Find exactly what you're looking for."
        actions={
          <Button href="/blogs" size="lg" variant="outline">
            Back to Blog
          </Button>
        }
      />

      <section className="section-wrapper section-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-3xl font-bold">
                  <FolderTree className="h-6 w-6" />
                  All Categories
                </h2>
                <Badge variant="outline">{categories.length} categories</Badge>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="mb-2 h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : hasCategories ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {rootCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed bg-muted/30 px-6 py-16 text-center">
                  <FolderTree className="mx-auto h-14 w-14 text-muted-foreground" />
                  <h3 className="mt-6 text-2xl font-bold">
                    No blog categories yet
                  </h3>
                  <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    We do not have any categories with published blog posts
                    right now. Once articles are published, their categories
                    will appear here.
                  </p>
                </div>
              )}
            </section>

            {nestedCategories.length > 0 && (
              <section>
                <h3 className="mb-6 text-2xl font-bold">Subcategories</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {nestedCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blogs/category/${category.slug}`}
                    >
                      <Card className="transition-shadow hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Folder className="h-4 w-4" />
                              <span className="font-medium">
                                {category.name}
                              </span>
                            </div>
                            <Badge variant="outline">
                              {category._count?.posts || 0}
                            </Badge>
                          </div>
                          {category.parent && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              In: {category.parent.name}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
};
