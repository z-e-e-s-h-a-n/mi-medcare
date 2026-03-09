/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import { Form } from "@workspace/ui/components/form";
import { InputField } from "@workspace/ui/components/input-field";
import { SelectField } from "@workspace/ui/components/select-field";
import { createContactMessageSchema } from "@workspace/contracts/contact";
import {
  Building2,
  Calendar,
  Clock,
  FileText,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";
import {
  ContactTimePreferenceEnum,
  PracticeTypeEnum,
} from "@workspace/contracts";
import { Button } from "@workspace/ui/components/button";
import { useCreateMessage } from "@/hooks/useContact";
import { toast } from "sonner";

export function ContactForm() {
  const { isPending, mutateAsync } = useCreateMessage();

  const form = useForm({
    defaultValues: {
      bestContactTime: "afternoon",
      practiceType: "privatePractice",
    } as CreateContactMessageType,
    validators: {
      onSubmit: createContactMessageSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await mutateAsync(value);
        toast.success(res.message);
      } catch (err: any) {
        toast.error(err.message);
      }
    },
  });

  return (
    <Form
      form={form}
      className="space-y-5"
      header={
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3"> Send Us a Message</h2>
          Fill out the form below and we&apos;ll get back to you within 24
          hours.
          <p className="text-muted-foreground"></p>
        </div>
      }
      footer={
        <p className="text-xs text-center text-muted-foreground mt-4">
          🔒 Your information is secure and confidential. We&apos;ll never share
          your details.
        </p>
      }
    >
      {/* Name & Practice Row */}
      <div className="grid sm:grid-cols-2 gap-4">
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
              <Building2 className="w-4 h-4 text-primary" />
              Practice Name
            </>
          }
          placeholder="Smith Medical Group"
        />
      </div>

      {/* Email & Phone Row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField
          form={form}
          name="email"
          label={
            <>
              <Mail className="text-primary" />
              Email Address *
            </>
          }
          placeholder="john@medical.com"
        />

        <InputField
          form={form}
          name="phone"
          label={
            <>
              <Phone className="text-primary" />
              Phone Number *
            </>
          }
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Practice Type & Best Time */}
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="practiceType"
          label={
            <>
              <Calendar className="text-primary" />
              Practice Type
            </>
          }
          placeholder="Practice Type"
          options={PracticeTypeEnum.options}
        />

        <SelectField
          form={form}
          name="bestContactTime"
          label={
            <>
              <Clock className="text-primary" />
              Best Time to Contact
            </>
          }
          placeholder="Best Contact Time"
          options={ContactTimePreferenceEnum.options}
        />
      </div>

      {/* Message */}
      <InputField
        form={form}
        name="message"
        type="textarea"
        label={
          <>
            <FileText className="w-4 h-4 text-primary" />
            How can we help? *
          </>
        }
        placeholder="Tell us about your practice and RCM needs..."
        className="bg-background/50 min-h-30"
      />

      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              className="w-full text-base"
              disabled={isPending || !canSubmit}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
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
