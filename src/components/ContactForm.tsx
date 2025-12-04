"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormType } from "@/schemas/contactForm";
import InputField from "./InputField";
import { cn } from "@/lib/utils";

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
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

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
          name="firstName"
          label="First Name"
          placeholder="First name here"
          control={form.control}
        />
        <InputField
          name="lastName"
          label="Last Name"
          placeholder="Last name here"
          control={form.control}
        />
        <InputField
          name="email"
          label="Email Address"
          placeholder="Add email"
          control={form.control}
        />
        <InputField
          name="subject"
          label="Subject"
          placeholder="How ca we help you"
          control={form.control}
        />

        <InputField
          name="message"
          type="textarea"
          label="Comments / Questions"
          placeholder="comments"
          control={form.control}
        />

        <Button size="lg">Send Message</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
