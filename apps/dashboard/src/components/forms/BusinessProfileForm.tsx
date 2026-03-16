"use client";

import { Building2, Globe, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { InputField } from "@workspace/ui/components/input-field";
import { MediaField } from "../media/mediaField";
import type { BaseCUFormProps } from "@workspace/contracts";
import { GenericForm } from "../shared/GenericForm";
import { useBusinessProfile } from "@/hooks/business";
import { businessProfileSchema } from "@workspace/contracts/business";

const BusinessProfileForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Business Profile"
      description="Manage the company profile used across your platform."
      useQuery={useBusinessProfile}
      schema={businessProfileSchema}
      defaultValues={{
        name: "",
        legalName: "",
        description: "",
        faviconId: "",
        logoId: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        metaTitle: "",
        metaDescription: "",
      }}
    >
      {(form, _, data) => (
        <>
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

              <div className="grid gap-6 lg:grid-cols-3">
                <MediaField
                  form={form}
                  name="faviconId"
                  label="Favicon"
                  defaultMedia={data?.favicon}
                />
                <MediaField
                  form={form}
                  name="logoId"
                  label="Logo"
                  defaultMedia={data?.logo}
                />
                <MediaField
                  form={form}
                  name="coverId"
                  label="Cover Image"
                  defaultMedia={data?.cover}
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
              <InputField
                form={form}
                name="website"
                label="Website"
                type="url"
              />
              <div />
              <InputField
                form={form}
                name="facebook"
                label="Facebook"
                type="url"
              />
              <InputField
                form={form}
                name="instagram"
                label="Instagram"
                type="url"
              />
              <InputField
                form={form}
                name="twitter"
                label="Twitter / X"
                type="url"
              />
              <InputField
                form={form}
                name="linkedin"
                label="LinkedIn"
                type="url"
              />
              <InputField
                form={form}
                name="youtube"
                label="YouTube"
                type="url"
              />
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
          </Card>
        </>
      )}
    </GenericForm>
  );
};

export default BusinessProfileForm;
