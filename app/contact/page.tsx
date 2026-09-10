import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Eric Hancock",
  description:
    "Contact Eric Hancock in Brooklyn, NY about software engineering leadership, financial systems, collaborations, or project notes.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Eric Hancock",
    description:
      "Contact Eric Hancock in Brooklyn, NY about software engineering leadership, financial systems, collaborations, or project notes.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="page-stack" aria-labelledby="contact-heading">
      <p className="home-kicker">Contact</p>
      <h1 id="contact-heading">Contact Eric Hancock.</h1>
      <p>
        Use the form to reach Eric Hancock in Brooklyn, NY about software
        engineering leadership, financial systems, collaborations, print
        requests, or project notes.
      </p>
      <ContactForm />
    </section>
  );
}
