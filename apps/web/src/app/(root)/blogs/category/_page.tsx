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

  const categories = data?.categories;

  const rootCategories = categories?.filter((cat) => !cat.parentId) || [];
  const nestedCategories = categories?.filter((cat) => cat.parentId) || [];

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

      {/* Main Content */}
      <section className="section-wrapper section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* All Categories */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <FolderTree className="h-6 w-6" />
                  All Categories
                </h2>
                <Badge variant="outline">
                  {categories?.length || 0} categories
                </Badge>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rootCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              )}
            </section>

            {/* Nested Categories */}
            {nestedCategories.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6">Subcategories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nestedCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blogs/category/${category.slug}`}
                    >
                      <Card className="hover:shadow-md transition-shadow">
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
                            <p className="text-xs text-muted-foreground mt-2">
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
};
