"use client";

import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import { Form } from "@workspace/ui/components/form";
import { InputField } from "@workspace/ui/components/input-field";
import { Button } from "@workspace/ui/components/button";
import {
  newsletterSubscriberSchema,
  type NewsletterSubscriberType,
} from "@workspace/contracts/newsletter";
import { ArrowRight, Loader2, Mail, User } from "lucide-react";
import { useSubscribeNewsletter } from "@/hooks/newsletter";
import { toast } from "sonner";

interface NewsletterCtaFormProps {
  className?: string;
}

export function NewsletterCtaForm({ className }: NewsletterCtaFormProps) {
  const { isPending, mutateAsync } = useSubscribeNewsletter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    } as NewsletterSubscriberType,
    validators: {
      onSubmit: newsletterSubscriberSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await mutateAsync(value);
        toast.success(res.message);
        form.reset();
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Failed to subscribe.",
        );
      }
    },
  });

  return (
    <Form
      form={form}
      className={className || "space-y-4"}
      header={
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Newsletter</p>
          <h3 className="text-xl font-semibold">Get billing insights weekly</h3>
          <p className="text-sm text-muted-foreground">
            Short, practical tips to improve collections and reduce denials.
          </p>
        </div>
      }
      footer={
        <p className="text-xs text-muted-foreground">
          One email per week. Unsubscribe anytime.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          form={form}
          name="name"
          label={
            <>
              <User className="text-primary" />
              Name *
            </>
          }
          placeholder="Your name"
        />

        <InputField
          form={form}
          name="email"
          type="email"
          label={
            <>
              <Mail className="text-primary" />
              Email *
            </>
          }
          placeholder="you@clinic.com"
        />
      </div>

      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !canSubmit}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Join the newsletter
                  <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </form.Subscribe>
    </Form>
  );
}
