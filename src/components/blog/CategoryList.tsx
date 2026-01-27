"use client";

import Link from "next/link";
import { Folder, FolderTree } from "lucide-react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { useCategories } from "@hooks/category";
import { Skeleton } from "@components/ui/skeleton";
import BlogSidebar from "@components/blog/BlogSidebar";
import CategoryCard from "@components/blog/CategoryCard";

const CategoryList = () => {
  const { data, isFetching } = useCategories();

  const categories = data?.categories;

  const rootCategories = categories?.filter((cat) => !cat.parentId) || [];
  const nestedCategories = categories?.filter((cat) => cat.parentId) || [];

  const getCategoryPostsCount = (category: CategoryResponse) => {
    const directPosts = category.posts?.length || 0;
    const childPosts =
      category.children?.reduce(
        (sum: number, child: CategoryResponse) =>
          sum + (child.posts?.length || 0),
        0,
      ) || 0;
    return directPosts + childPosts;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Blog{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our articles organized by topics and categories. Find exactly
            what you&apos;re looking for.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">Back to Blog</Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section>
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

              {isFetching ? (
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
                    <CategoryCard
                      key={category.id}
                      category={category}
                      postCount={getCategoryPostsCount(category)}
                    />
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
                              {category.posts?.length || 0}
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

export default CategoryList;
