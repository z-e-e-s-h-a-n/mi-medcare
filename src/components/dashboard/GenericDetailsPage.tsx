/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ArrowLeft, Edit, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@utils/general";
import DetailsPageSkeleton from "./DetailsPageSkeleton";
import { ApiException } from "@lib/http/http-exception";

export interface DetailFieldConfig<TData> {
  label: string;
  accessor: keyof TData | ((data: TData) => React.ReactNode);
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  format?: (value: any) => string;
  render?: (value: any, data: TData) => React.ReactNode;
}

export interface SectionConfig<TData> {
  title: string;
  fields: DetailFieldConfig<TData>[];
  columns?: 1 | 2 | 3;
}

interface RelatedEntityConfig<TData> {
  title: string;
  dataKey: keyof TData;
  columns: Array<{
    header: string;
    accessor: keyof any | ((item: any) => React.ReactNode);
  }>;
  viewPath?: (item: any) => string;
}

interface GenericDetailsPageProps<TData extends BaseResponse> {
  entityId: string;
  entityName: string;
  sections: SectionConfig<TData>[];
  useQuery: (entityId: string) => {
    data?: TData;
    isFetching?: boolean;
    fetchError: ApiException | null;
  };
  editPath?: string;
  backPath: string;
  relatedEntities?: RelatedEntityConfig<TData>[];
  renderHeader?: (data: TData) => React.ReactNode;
  renderActions?: (data: TData) => React.ReactNode;
  children?: (data: TData) => React.ReactNode;
}

export function GenericDetailsPage<TData extends BaseResponse>({
  entityId,
  entityName,
  sections,
  useQuery,
  editPath,
  backPath,
  relatedEntities,
  renderHeader,
  renderActions,
  children,
}: GenericDetailsPageProps<TData>) {
  const router = useRouter();
  const { data, isFetching, fetchError } = useQuery(entityId);

  if (isFetching) {
    return <DetailsPageSkeleton sections={sections} />;
  }

  if (fetchError || !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backPath)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Error</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-destructive text-lg">
                {fetchError?.message || `Failed to load ${entityName}`}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push(backPath)}
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getFieldValue = (field: DetailFieldConfig<TData>, data: TData) => {
    if (typeof field.accessor === "function") {
      return field.accessor(data);
    }

    const value = data[field.accessor];

    if (field.format && value) {
      return field.format(value);
    }

    if (field.render) {
      return field.render(value, data);
    }

    return value ?? "—";
  };

  const getGridColumns = (columns: 1 | 2 | 3 = 2) => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(backPath)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold capitalize">
                {entityName} Details
              </h1>
              <p className="text-muted-foreground">
                Viewing details for {entityName.toLowerCase()}: {entityId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {renderActions?.(data)}
            {editPath && (
              <Button asChild>
                <Link href={editPath}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
            )}
          </div>
        </div>

        {renderHeader ? (
          renderHeader(data)
        ) : (
          <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {(data as any).name || (data as any).title || entityName}
                  </h2>
                  {(data as any).description && (
                    <p className="text-muted-foreground mt-1">
                      {(data as any).description}
                    </p>
                  )}
                </div>
                {(data as any).status && (
                  <Badge variant="outline" className="text-sm">
                    {(data as any).status}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content Sections */}
      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn("grid gap-4", getGridColumns(section.columns))}
              >
                {section.fields.map((field, fieldIndex) => {
                  const Icon = field.icon;
                  const value = getFieldValue(field, data);

                  return (
                    <div
                      key={fieldIndex}
                      className={cn("space-y-2", field.className)}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{field.label}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {value as string}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Related Entities */}
      {relatedEntities?.map((related, index) => {
        const relatedData = data[related.dataKey];
        if (
          !relatedData ||
          (Array.isArray(relatedData) && relatedData.length === 0)
        ) {
          return null;
        }

        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{related.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {related.columns.map((col, colIndex) => (
                        <th
                          key={colIndex}
                          className="px-4 py-2 text-left font-medium"
                        >
                          {col.header}
                        </th>
                      ))}
                      {related.viewPath && <th className="w-20"></th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {Array.isArray(relatedData) ? (
                      relatedData.map((item: any, itemIndex: number) => (
                        <tr key={itemIndex} className="hover:bg-muted/50">
                          {related.columns.map((col, colIndex) => (
                            <td key={colIndex} className="px-4 py-3">
                              {typeof col.accessor === "function"
                                ? col.accessor(item)
                                : (item[col.accessor] ?? "—")}
                            </td>
                          ))}
                          {related.viewPath && (
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={related.viewPath(item)}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={related.columns.length + 1}
                          className="px-4 py-3 text-center"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Custom Children */}
      {children?.(data)}
    </div>
  );
}
