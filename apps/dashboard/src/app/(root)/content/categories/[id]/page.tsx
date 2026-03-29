"use client";

import {
  Calendar,
  Eye,
  FileText,
  FolderTree,
  Hash,
  Layers,
  LinkIcon,
} from "lucide-react";

import type { CategoryResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@workspace/ui/shared/GenericDetailsPage";
import { useCategory, usePosts } from "@/hooks/content";
import type { AppPageProps } from "@workspace/contracts";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const CategoryDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  const { data } = usePosts({
    categoryId: id,
  });

  const relatedPosts = data?.posts ?? [];

  return (
    <GenericDetailsPage<CategoryResponse>
      entityId={id}
      entityName="Category"
      useQuery={useCategory}
      sections={[
        {
          title: "Basic Information",
          fields: [
            {
              label: "Name",
              accessor: "name",
              icon: FileText,
            },
            {
              label: "Slug",
              accessor: "slug",
              icon: Hash,
            },
            {
              label: "Parent Category",
              accessor: "parent",
              icon: FolderTree,
              render: (value) =>
                value ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{value.name}</Badge>
                    <span className="text-sm text-muted-foreground">
                      /{value.slug}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                ),
            },
            {
              label: "Level",
              accessor: (data) => {
                let depth = 0;
                let current = data.parent;
                while (current) {
                  depth++;
                  current = current.parent;
                }
                return depth + 1;
              },
              icon: Layers,
              render: (value) => (
                <Badge variant="outline">
                  Level {value} {value === 1 ? "(Root)" : "(Nested)"}
                </Badge>
              ),
            },
          ],
          columns: 2,
        },
        {
          title: "Content",
          fields: [
            {
              label: "Description",
              accessor: "description",
              className: "col-span-full",
            },
          ],
          columns: 1,
        },
        {
          title: "Timeline",
          fields: [
            {
              label: "Created At",
              accessor: "createdAt",
              icon: Calendar,
              format: (value) => new Date(value).toLocaleDateString(),
            },
            {
              label: "Updated At",
              accessor: "updatedAt",
              icon: Calendar,
              format: (value) => new Date(value).toLocaleDateString(),
            },
            {
              label: "Deleted At",
              accessor: "deletedAt",
              icon: Calendar,
              format: (value) =>
                value ? new Date(value).toLocaleDateString() : "—",
            },
          ],
          columns: 3,
        },
      ]}
      relatedEntities={[
        {
          title: "Subcategories",
          dataKey: "children",
          columns: [
            { header: "Name", accessor: (i) => i.name },
            { header: "Slug", accessor: (i) => i.slug },
            {
              header: "Posts",
              accessor: (item) => item.posts?.length,
            },
            {
              header: "Description",
              accessor: (i) => i.description,
            },
          ],
          viewPath: (item) => `/content/categories/${item.id}`,
        },
      ]}
      renderHeader={(data) => (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              {data.children && data.children.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <FolderTree className="h-3 w-3" />
                  {data.children.length} subcategories
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <LinkIcon className="h-4 w-4" />
              <span className="font-mono text-sm">/{data.slug}</span>
            </div>
            {data.description && (
              <p className="text-muted-foreground">{data.description}</p>
            )}
            {data.parent && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Parent:</span>
                <Badge variant="secondary" className="gap-1">
                  <FolderTree className="h-3 w-3" />
                  {data.parent.name}
                </Badge>
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-xl font-semibold text-primary">
              {data._count.posts || 0} Posts
            </span>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
        </div>
      )}
    >
      {(data) => (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Posts in this Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Title</th>
                      <th className="px-4 py-2 text-left font-medium">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-medium">Views</th>
                      <th className="px-4 py-2 text-left font-medium">
                        Published
                      </th>
                      <th className="w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {relatedPosts.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">
                              /{item.slug}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{item.status}</Badge>
                        </td>
                        <td className="px-4 py-3">{item.viewsCount}</td>
                        <td className="px-4 py-3">
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/content/posts/${item.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Category Hierarchy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Category Hierarchy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    // Build the hierarchy path
                    const path = [];
                    let current: CategoryResponse | undefined = data;
                    while (current) {
                      path.unshift({
                        name: current.name,
                        slug: current.slug,
                        id: current.id,
                      });

                      current = current.parent;
                    }
                    return path.map((category, index) => (
                      <React.Fragment key={category.id}>
                        {index > 0 && (
                          <span className="text-muted-foreground">›</span>
                        )}
                        <a
                          href={`/content/categories/${category.id}`}
                          className="text-primary hover:underline"
                        >
                          {category.name}
                        </a>
                      </React.Fragment>
                    ));
                  })()}
                </div>
                {data.children && data.children.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Direct Subcategories:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.children.map((child) => (
                        <Badge
                          key={child.id}
                          variant="outline"
                          className="gap-1"
                          asChild
                        >
                          <a href={`/content/categories/${child.id}`}>
                            <FolderTree className="h-3 w-3" />
                            {child.name}
                            <span className="text-xs text-muted-foreground">
                              ({child._count.posts ?? 0})
                            </span>
                          </a>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Category Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2 p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold">
                    {data._count?.posts || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Posts
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-secondary/5">
                  <div className="text-2xl font-bold">
                    {data.children?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subcategories
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-green-500/5">
                  <div className="text-2xl font-bold">
                    {(() => {
                      // Calculate total views from all posts in this category
                      return relatedPosts?.reduce(
                        (total, post) => total + post.viewsCount,
                        0,
                      );
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Views
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-blue-500/5">
                  <div className="text-2xl font-bold">
                    {(() => {
                      // Count published posts
                      return relatedPosts?.filter(
                        (post) => post.status === "published",
                      ).length;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Published Posts
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </GenericDetailsPage>
  );
};

export default CategoryDetailsPage;
