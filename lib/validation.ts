import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(320, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(12, "Please include a bit more detail in your message.")
    .max(6000, "Message is too long."),
  company: z.string().optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;
