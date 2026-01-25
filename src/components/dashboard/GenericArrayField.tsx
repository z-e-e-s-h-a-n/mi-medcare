/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import type { BaseFieldProps } from "@components/ui/form";
import { Button } from "@components/ui/button";
import GenericFormTable from "./GenericFormTable";
import { Label } from "@components/ui/label";

export interface ArrayColumnConfig<TItem> {
  header: string;
  accessor: keyof TItem | ((item: TItem) => React.ReactNode);
  className?: string;
}

interface GenericArrayFieldProps<
  TFormData,
  TFormKey extends keyof TFormData,
  TItem = ArrayItem<TFormData[TFormKey]>,
> extends BaseFieldProps<TFormData> {
  title?: string;
  entityKey: string;
  disabled?: boolean;
  columns: ArrayColumnConfig<TItem>[];
  FormItem: React.ComponentType<{
    onSubmit: (item: TItem) => void;
    disabled?: boolean;
    children: (func: () => void) => React.ReactNode;
  }>;
}

function GenericArrayField<
  TFormData extends Record<string, unknown>,
  TFormKey extends keyof TFormData,

>({
  form,
  name,
  entityKey,
  FormItem,
  columns,
  title,
  disabled = false,
}: GenericArrayFieldProps<TFormData, TFormKey>) {

  return (
    <div className="space-y-4">
      <Label className="capitalize">{entityKey}</Label>

      <form.Subscribe
        selector={(state) => ({
          items: state.values[name] ?? [],
        })}
      >
        {({ items }) => {
          return (
            <form.Field name={name} mode="array">
              {(field) => {
                const handleAdd = (item: any) => field.pushValue(item);
                const handleEdit = (i: number, item: any) => {
                  field.replaceValue(i, item);
                };
                const handleRemove = (index: number) =>
                  field.removeValue(index);

                const itemsArray = Array.isArray(items) ? items : [];

                return (
                  <>
                    {/* Add Form Card */}
                    <Card className="bg-input/30">
                      <CardHeader>
                        <CardTitle>{title || `Add ${entityKey}`}</CardTitle>
                      </CardHeader>
                      <CardContent>

                        <FormItem onSubmit={handleAdd} disabled={disabled}>
                          {(handleSubmit) => (
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                Total {entityKey}: <b>{itemsArray.length}</b>
                              </p>
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={handleSubmit}
                                disabled={disabled}
                              >
                                {`Add ${entityKey}`}
                              </Button>
                            </div>
                          )}
                        </FormItem>

                      </CardContent>
                    </Card>

                    {/* History Card */}
                    {itemsArray.length > 0 && (
                      <Card className="p-0 pt-6 bg-input/30">
                        <div className="px-6 flex items-center justify-between">
                          <CardTitle className="capitalize">
                            {entityKey} History
                          </CardTitle>
                          <Badge variant="outline">
                            {itemsArray.length} items
                          </Badge>
                        </div>
                        <CardContent className="p-0">
                          <GenericFormTable
                            items={itemsArray}
                            columns={columns}
                            entityTitle={entityKey}
                            onEdit={handleEdit}
                            onRemove={handleRemove}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </>
                );
              }}
            </form.Field>
          );
        }}
      </form.Subscribe>
    </div>
  );
}

export default GenericArrayField;
