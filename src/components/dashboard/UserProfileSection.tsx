/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@components/ui/form";
import { InputField } from "@components/ui/input-field";
import { SelectField } from "@components/ui/select-field";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@components/ui/card";
import { ThemeModeEnum } from "@schemas/enums";
import { userProfileSchema } from "@schemas/user";
import { useForm } from "@tanstack/react-form";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { toast } from "sonner";
import { Loader2, User, Camera, Bell, Mail } from "lucide-react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useMediaLibrary } from "@hooks/media";
import { useState } from "react";
import { Separator } from "@components/ui/separator";
import { Switch } from "@components/ui/switch";
import { Badge } from "@components/ui/badge";
import { useTheme } from "next-themes";

interface ProfileFormProps {
  user: UserResponse;
  onUpdate: UseMutateAsyncFunction<any, any, UserProfileType>;
  isUpdating: boolean;
}

const ProfileSection = ({ user, onUpdate, isUpdating }: ProfileFormProps) => {
  const { onMediaSelect } = useMediaLibrary();
  const [userImage, setUserImage] = useState(user.image);
  const { setTheme } = useTheme();

  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName || undefined,
      displayName: user.displayName,
      imageId: user.imageId ?? undefined,
      theme: user.theme || "system",
      emailNotifications: user.emailNotifications ?? true,
      pushNotifications: user.pushNotifications ?? true,
    } as UserProfileType,
    validators: { onSubmit: userProfileSchema },
    onSubmit: async ({ value }) => {
      try {
        await onUpdate({ ...value, imageId: userImage?.id });
        toast.success("Profile updated successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
      }
    },
  });

  return (
    <Form form={form}>
      <Card>
        {/* ---------- Header ---------- */}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Manage your personal info, preferences, and notifications
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* ---------- Profile Identity ---------- */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Avatar */}
            <Avatar className="size-28 shrink-0">
              <AvatarImage src={userImage?.url} />
              <AvatarFallback className="text-3xl uppercase">
                {user.firstName.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 flex items-center justify-between space-y-3">
              <div className="">
                <p className="text-lg font-semibold leading-tight">
                  {user.displayName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="space-x-4 mt-1">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge variant="outline" className="text-green-600">
                    Email verified
                  </Badge>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMediaSelect(setUserImage)}
                  className="w-fit"
                >
                  <Camera className="mr-2 size-4" />
                  Change photo
                </Button>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                  {user.lastLoginAt && (
                    <p>
                      Last login:{" "}
                      {new Date(user.lastLoginAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* ---------- Basic Details ---------- */}
          <div className="space-y-4">
            <h4 className="font-medium">Basic Details</h4>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="firstName" label="First Name" />
              <InputField form={form} name="lastName" label="Last Name" />
              <InputField
                form={form}
                name="displayName"
                label="Display Name"
                className="md:col-span-2"
              />
            </div>
          </div>

          <Separator />

          {/* ---------- Preferences ---------- */}
          <div className="space-y-6">
            <form.Subscribe
              selector={(state) => ({ theme: state.values.theme })}
            >
              {({ theme }) => {
                if (theme) setTheme(theme);

                return (
                  <SelectField
                    form={form}
                    name="theme"
                    label="Theme"
                    options={ThemeModeEnum.options}
                    className="max-w-sm"
                  />
                );
              }}
            </form.Subscribe>

            {/* Email Notifications */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium flex items-center gap-2">
                  <Mail className="size-4" />
                  Email notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive important updates and activity via email
                </p>
              </div>

              <form.Field name="emailNotifications">
                {(field) => (
                  <Switch
                    checked={field.state.value}
                    disabled={!user.isEmailVerified}
                    onCheckedChange={field.handleChange}
                  />
                )}
              </form.Field>
            </div>

            {/* Push Notifications */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium flex items-center gap-2">
                  <Bell className="size-4" />
                  Push notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Get notified instantly about important actions
                </p>
              </div>

              <form.Field name="pushNotifications">
                {(field) => (
                  <Switch
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                )}
              </form.Field>
            </div>
          </div>
        </CardContent>

        {/* ---------- Footer ---------- */}
        <CardFooter className="flex justify-end">
          <Button
            size="lg"
            type="submit"
            disabled={isUpdating}
            className="min-w-40"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default ProfileSection;
