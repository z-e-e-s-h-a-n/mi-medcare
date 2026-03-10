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
import { Loader2, Mail, Send, User } from "lucide-react";
import { useSubscribeNewsletter } from "@/hooks/useNewsletter";
import { toast } from "sonner";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
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
      footer={
        <p className="text-xs text-muted-foreground">
          We only send healthcare billing insights. No spam.
        </p>
      }
    >
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
                  Subscribe
                  <Send className="ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </form.Subscribe>
    </Form>
  );
}
