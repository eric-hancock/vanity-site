import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkContactRateLimit(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests from this network. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSeconds),
          },
        },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstIssue?.message || "Invalid contact form payload.",
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;

    if (payload.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resendApiKey = getRequiredEnv("RESEND_API_KEY");
    const toEmail = getRequiredEnv("CONTACT_TO_EMAIL");
    const fromEmail = getRequiredEnv("CONTACT_FROM_EMAIL");

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New message from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      {
        error: "Unable to send message right now. Please try again soon.",
      },
      { status: 500 },
    );
  }
}
