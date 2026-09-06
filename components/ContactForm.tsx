"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type SubmitState = "idle" | "sending" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

function validate(form: FormState): string | null {
  if (!form.name.trim()) {
    return "Please enter your name.";
  }

  if (!form.email.trim()) {
    return "Please enter your email address.";
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  if (!isValidEmail) {
    return "Please enter a valid email address.";
  }

  if (form.message.trim().length < 12) {
    return "Please include a bit more detail in your message.";
  }

  return null;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const disabled = useMemo(() => submitState === "sending", [submitState]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validate(form);
    if (validationError) {
      setSubmitState("error");
      setStatusMessage(validationError);
      return;
    }

    setSubmitState("sending");
    setStatusMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Could not send message.");
      }

      setSubmitState("success");
      setStatusMessage("Thanks, your message has been sent.");
      setForm(initialState);
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to send message right now. Please try again soon.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <label className="field" htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            disabled={disabled}
            required
          />
        </label>

        <label className="field" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            disabled={disabled}
            required
          />
        </label>
      </div>

      <label className="field" htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          rows={7}
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          disabled={disabled}
          required
        />
      </label>

      <label className="field honeypot" htmlFor="company">
        Company
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(event) =>
            setForm((current) => ({ ...current, company: event.target.value }))
          }
          disabled={disabled}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="button button-solid" disabled={disabled}>
          {submitState === "sending" ? "Sending" : "Send message"}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
