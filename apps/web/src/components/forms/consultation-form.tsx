"use client";

import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import Link from "next/link";
import { Form } from "@workspace/ui/components/form";
import { InputField } from "@workspace/ui/components/input-field";
import { SelectField } from "@workspace/ui/components/select-field";
import { Button } from "@workspace/ui/components/button";
import {
  createConsultationRequestSchema,
  type CreateConsultationRequestType,
} from "@workspace/contracts/consultation";
import { MonthlyClaimsRangeEnum, PracticeTypeEnum } from "@workspace/contracts";
import {
  Building2,
  FileText,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
  BarChart3,
  Stethoscope,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { useCreateConsultationRequest } from "@/hooks/consultation";
import { toast } from "sonner";

interface ConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const monthlyClaimsOptions = [
  { value: "range_0_250", label: "0 to 250 claims / month" },
  { value: "range_251_1000", label: "251 to 1,000 claims / month" },
  { value: "range_1001_3000", label: "1,001 to 5,000 claims / month" },
  { value: "range_3000_plus", label: "5,001+ claims / month" },
] satisfies {
  label: string;
  value: (typeof MonthlyClaimsRangeEnum.options)[number];
}[];

export function ConsultationForm({
  open,
  onOpenChange,
}: ConsultationFormProps) {
  const { isPending, mutateAsync } = useCreateConsultationRequest();

  const form = useForm({
    defaultValues: {
      fullName: "",
      practiceName: "",
      email: "",
      phone: "",
      practiceType: "privatePractice",
      monthlyClaims: "range_0_250",
      message: "",
    } as CreateConsultationRequestType,
    validators: {
      onSubmit: createConsultationRequestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await mutateAsync(value);
        toast.success(res.message);
        form.reset();
        onOpenChange(false);
      } catch (err: unknown) {
        toast.error(
          err instanceof Error
            ? err.message
            : "Failed to submit consultation request.",
        );
      }
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-xl">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle>Book a Free Consultation</SheetTitle>
          <SheetDescription>
            Share your billing needs and our team will contact you shortly.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Form
            form={form}
            className="space-y-5"
            footer={
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Prefer a full inquiry?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Open contact form
                </Link>
                .
              </p>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                form={form}
                name="fullName"
                label={
                  <>
                    <User className="text-primary" />
                    Full Name *
                  </>
                }
                placeholder="Dr. John Smith"
              />

              <InputField
                form={form}
                name="practiceName"
                label={
                  <>
                    <Building2 className="text-primary" />
                    Practice Name *
                  </>
                }
                placeholder="Smith Medical Group"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                form={form}
                name="email"
                type="email"
                label={
                  <>
                    <Mail className="text-primary" />
                    Email Address *
                  </>
                }
                placeholder="john@practice.com"
              />

              <InputField
                form={form}
                name="phone"
                type="tel"
                label={
                  <>
                    <Phone className="text-primary" />
                    Phone Number *
                  </>
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                form={form}
                name="practiceType"
                label={
                  <>
                    <Stethoscope className="text-primary" />
                    Practice Type *
                  </>
                }
                placeholder="Practice Type"
                options={PracticeTypeEnum.options}
              />

              <SelectField
                form={form}
                name="monthlyClaims"
                label={
                  <>
                    <BarChart3 className="text-primary" />
                    Monthly Claims *
                  </>
                }
                placeholder="Monthly Claims"
                options={monthlyClaimsOptions}
              />
            </div>

            <InputField
              form={form}
              name="message"
              type="textarea"
              label={
                <>
                  <FileText className="text-primary" />
                  How can we help? *
                </>
              }
              placeholder="Tell us about your current billing workflow and challenges."
              className="min-h-30 bg-background/50"
            />

            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isPending || !canSubmit}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </form.Subscribe>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
