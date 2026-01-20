"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { contactSource, formSchema, FormType } from "@/schemas/contactForm";
import { InputField } from "./ui/input-field";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { SelectField } from "./ui/select-field";

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
  titleCn,
  messageCn,
  classname,
}: ContactFormProps) => {
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: undefined,
      source: "website",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    } as FormType,
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        setFormMessage("");

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        const result = await res.json();

        if (!result?.success) {
          throw Error("Failed to send message.");
        }

        setFormMessage(
          "We respond within 1 business day. All information is kept confidential.",
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setFormMessage("Error:" + (err?.message ?? "Something went wrong."));
      } finally {
        setLoading(false);
        form.reset();
        setTimeout(() => setFormMessage(""), 3000);
      }
    },
  });

  return (
    <Form form={form} id="contact-form" className={classname}>
      {title && <h4 className={titleCn}>Contact Us</h4>}
      {message && <p className={messageCn}>{message}</p>}
      <div className="flex items-center gap-4">
        <InputField
          form={form}
          name="name"
          label="Name *"
          placeholder="e.g., John"
        />
        <InputField
          form={form}
          name="phone"
          label="Phone *"
          placeholder="e.g., +1 (555) 123-4567"
        />
      </div>
      <InputField
        form={form}
        name="email"
        label="Email *"
        placeholder="e.g., billing@clinicname.com"
      />
      <SelectField
        form={form}
        name="source"
        label="Source"
        options={contactSource.options}
      />
      <InputField
        form={form}
        name="message"
        type="textarea"
        label="Message"
        placeholder="your message"
      />

      {formMessage && (
        <p
          className={cn(
            "text-xs",
            formMessage.includes("Error:")
              ? "text-destructive"
              : "text-primary",
          )}
        >
          <span>{formMessage}</span>
        </p>
      )}

      <Button size="lg" disabled={loading}>
        Send Message
        {loading && <LoaderCircle className="animate-spin" />}
      </Button>
    </Form>
  );
};

export default ContactForm;
