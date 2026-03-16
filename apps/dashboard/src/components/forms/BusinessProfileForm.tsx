/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Building2, Globe, ImagePlus, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

import {
  businessProfileSchema,
  type BusinessProfileResponse,
  type BusinessProfileType,
} from "@workspace/contracts/business";
import type { MediaResponse } from "@workspace/contracts/media";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { InputField } from "@workspace/ui/components/input-field";

import { useMediaLibrary } from "@/hooks/media";

type BusinessProfileFormProps = {
  data?: BusinessProfileResponse;
  isLoading: boolean;
  isPending: boolean;
  onSubmit: (data: BusinessProfileType) => Promise<unknown>;
};

const emptyValues: BusinessProfileType = {
  name: "",
  legalName: "",
  description: "",
  faviconId: "",
  logoId: "",
  coverId: undefined,
  email: "",
  phone: "",
  website: "",
  tiktok: undefined,
  facebook: undefined,
  instagram: undefined,
  twitter: undefined,
  linkedin: undefined,
  youtube: undefined,
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  metaTitle: "",
  metaDescription: "",
};

function MediaPickerCard({
  label,
  helperText,
  media,
  onSelect,
}: {
  label: string;
  helperText: string;
  media?: MediaResponse;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="space-y-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{helperText}</p>
      </div>

      <div className="aspect-video rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center">
        {media?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.url}
            alt={media.altText || media.title || label}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImagePlus className="size-5" />
            <span className="text-sm">No media selected</span>
          </div>
        )}
      </div>

      <Button variant="secondary" className="w-full" onClick={onSelect}>
        Select {label}
      </Button>
    </div>
  );
}

const BusinessProfileForm = ({
  data,
  isLoading,
  isPending,
  onSubmit,
}: BusinessProfileFormProps) => {
  const { onMediaSelect } = useMediaLibrary();
  const [favicon, setFavicon] = useState<MediaResponse | undefined>(
    data?.favicon,
  );
  const [logo, setLogo] = useState<MediaResponse | undefined>(data?.logo);
  const [cover, setCover] = useState<MediaResponse | undefined>(data?.cover);

  const defaultValues = useMemo<BusinessProfileType>(
    () => ({
      ...emptyValues,
      ...data,
      faviconId: data?.faviconId ?? "",
      logoId: data?.logoId ?? "",
      coverId: data?.coverId ?? undefined,
    }),
    [data],
  );

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: businessProfileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await onSubmit({
          ...value,
          faviconId: favicon?.id ?? "",
          logoId: logo?.id ?? "",
          coverId: cover?.id ?? undefined,
        });

        toast.success("Business profile saved successfully.");
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to save business profile.");
      }
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
    setFavicon(data?.favicon);
    setLogo(data?.logo);
    setCover(data?.cover);
  }, [data, defaultValues, form]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="py-16 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 size-4 animate-spin" />
            Loading business profile...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Business Profile</h1>
        <p className="text-muted-foreground">
          Manage the singleton company profile used across your platform.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5" />
              Core Details
            </CardTitle>
            <CardDescription>
              Basic company information and brand assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="name" label="Business Name" />
              <InputField form={form} name="legalName" label="Legal Name" />
            </div>

            <InputField
              form={form}
              name="description"
              label="Description"
              type="textarea"
              rows={5}
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <MediaPickerCard
                label="Favicon"
                helperText="Used in browser tabs and metadata."
                media={favicon}
                onSelect={() =>
                  onMediaSelect((media) => {
                    setFavicon(media);
                    form.setFieldValue("faviconId", media.id);
                  })
                }
              />

              <MediaPickerCard
                label="Logo"
                helperText="Primary brand image for header and identity."
                media={logo}
                onSelect={() =>
                  onMediaSelect((media) => {
                    setLogo(media);
                    form.setFieldValue("logoId", media.id);
                  })
                }
              />

              <MediaPickerCard
                label="Cover Image"
                helperText="Optional hero/brand cover artwork."
                media={cover}
                onSelect={() =>
                  onMediaSelect((media) => {
                    setCover(media);
                    form.setFieldValue("coverId", media.id);
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-5" />
              Contact & Social
            </CardTitle>
            <CardDescription>
              Public contact points and social media links.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <InputField form={form} name="email" label="Email" type="email" />
            <InputField form={form} name="phone" label="Phone" type="tel" />
            <InputField form={form} name="website" label="Website" type="url" />
            <div />
            <InputField form={form} name="facebook" label="Facebook" type="url" />
            <InputField form={form} name="instagram" label="Instagram" type="url" />
            <InputField form={form} name="twitter" label="Twitter / X" type="url" />
            <InputField form={form} name="linkedin" label="LinkedIn" type="url" />
            <InputField form={form} name="youtube" label="YouTube" type="url" />
            <InputField form={form} name="tiktok" label="TikTok" type="url" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Address & SEO
            </CardTitle>
            <CardDescription>
              Physical location and metadata shown to search engines.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="address" label="Address" />
              <InputField form={form} name="city" label="City" />
              <InputField form={form} name="state" label="State" />
              <InputField form={form} name="country" label="Country" />
              <InputField form={form} name="postalCode" label="Postal Code" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="metaTitle" label="Meta Title" />
              <InputField
                form={form}
                name="metaDescription"
                label="Meta Description"
                type="textarea"
                rows={4}
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button size="lg" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Business Profile"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default BusinessProfileForm;
