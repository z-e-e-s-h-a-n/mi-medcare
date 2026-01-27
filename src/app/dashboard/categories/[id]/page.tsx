"use client";
import { GenericDetailsPage } from "@components/dashboard/GenericDetailsPage";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useCategory } from "@hooks/category";
import {
  BookOpen,
  Calendar,
  FileText,
  FolderTree,
  Hash,
  Layers,
  Link as LinkIcon,
} from "lucide-react";
import React from "react";

const CategoryDetailsPage = ({ params }: AppPageProps<{ id: string }>) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<CategoryResponse>
      entityId={id}
      entityName="Category"
      useQuery={useCategory}
      editPath={`/dashboard/categories/${id}/edit`}
      backPath="/dashboard/categories"
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
                // Calculate category depth based on parent hierarchy
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
            { header: "Name", accessor: "name" },
            { header: "Slug", accessor: "slug" },
            {
              header: "Posts",
              accessor: (item) => item.posts?.length || 0,
            },
            {
              header: "Description",
              accessor: "description",
              render: (value) => value || "—",
            },
          ],
          viewPath: (item) => `/dashboard/categories/${item.id}`,
        },
        {
          title: "Posts in this Category",
          dataKey: "posts",
          columns: [
            {
              header: "Title",
              accessor: (item) => (
                <div className="space-y-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    /{item.slug}
                  </div>
                </div>
              ),
            },
            {
              header: "Status",
              accessor: (item) => (
                <Badge variant="outline">{item.status}</Badge>
              ),
            },
            {
              header: "Views",
              accessor: (item) => item.views.toLocaleString(),
            },
            {
              header: "Published",
              accessor: (item) =>
                item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString()
                  : "—",
            },
          ],
          viewPath: (item) => `/dashboard/posts/${item.id}`,
        },
      ]}
      renderHeader={(data) => (
        <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{data.name}</h2>
                  <Badge variant="outline" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    {data.posts?.length || 0} posts
                  </Badge>
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
                    <span className="text-sm text-muted-foreground">
                      Parent:
                    </span>
                    <Badge variant="secondary" className="gap-1">
                      <FolderTree className="h-3 w-3" />
                      {data.parent.name}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary/50">
                  {data.posts?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    >
      {(data) => (
        <>
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
                    let current = data;
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
                          href={`/dashboard/categories/${category.id}`}
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
                          <a href={`/dashboard/categories/${child.id}`}>
                            <FolderTree className="h-3 w-3" />
                            {child.name}
                            <span className="text-xs text-muted-foreground">
                              ({child.posts?.length || 0})
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
                    {data.posts?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Posts
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-secondary/5">
                  <div className="text-2xl font-bold">
                    {data.children?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subcategories
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-green-500/5">
                  <div className="text-2xl font-bold">
                    {(() => {
                      // Calculate total views from all posts in this category
                      return (
                        data.posts?.reduce(
                          (total, post) => total + (post.views || 0),
                          0,
                        ) || 0
                      ).toLocaleString();
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
                      return (
                        data.posts?.filter(
                          (post) => post.status === "published",
                        ).length || 0
                      );
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
