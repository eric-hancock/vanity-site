import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact form for collaborations, print requests, and project notes.",
};

export default function ContactPage() {
  return (
    <section className="page-stack" aria-labelledby="contact-heading">
      <p className="home-kicker">Contact</p>
      <h1 id="contact-heading">Get in touch.</h1>
      <p>
        Use the form to reach out for collaborations, print requests, or project
        notes. Messages are delivered through Resend.
      </p>
      <ContactForm />
    </section>
  );
}
