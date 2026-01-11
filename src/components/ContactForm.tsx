"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormType } from "@/schemas/contactForm";
import InputField from "./InputField";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface ContactFormProps {
  title?: string;
  message?: string;
  classname?: string;
  titleCn?: string;
  messageCn?: string;
}

const ContactForm = ({
  title,
  message,
  classname,
  titleCn,
  messageCn,
}: ContactFormProps) => {
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: undefined,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true);
      setFormMessage("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (!result?.success) {
        throw Error("Failed to send message.");
      }

      setFormMessage(
        "We respond within 1 business day. All information is kept confidential."
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFormMessage("Error:" + (err?.message ?? "Something went wrong."));
    } finally {
      setLoading(false);
      form.reset();
      setTimeout(() => setFormMessage(""), 3000);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", classname)}
        id="contact-form"
      >
        {title && <h4 className={titleCn}>Contact Us</h4>}
        {message && <p className={messageCn}>{message}</p>}
        <InputField
          name="name"
          label="Name *"
          placeholder="e.g., John"
          control={form.control}
        />
        <InputField
          name="phone"
          label="Phone *"
          placeholder="e.g., +1 (555) 123-4567"
          control={form.control}
        />
        <InputField
          name="email"
          label="Email *"
          placeholder="e.g., billing@clinicname.com"
          control={form.control}
        />

        <InputField
          name="message"
          type="textarea"
          label="Message"
          placeholder="your message"
          control={form.control}
        />

        {formMessage && (
          <p
            className={cn(
              "text-xs",
              formMessage.includes("Error:")
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <span>{formMessage}</span>
          </p>
        )}

        <Button size="lg" disabled={loading}>
          Send Message
          {loading && <LoaderCircle className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
