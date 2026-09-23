import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Enquiry {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  suite?: string;
  purpose?: string;
  message?: string;
  consent: boolean;
  website?: string; // honeypot
}

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * Receives the contact form. If RESEND_API_KEY is configured the enquiry is
 * emailed to bookings@; otherwise it is acknowledged and the client hands the
 * guest to WhatsApp with a pre-filled message so nothing is lost.
 */
export async function POST(req: Request) {
  let raw: Partial<Enquiry>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (clean(raw.website)) return NextResponse.json({ ok: true, delivered: false }); // bot

  const data: Enquiry = {
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 160),
    checkIn: clean(raw.checkIn, 20),
    checkOut: clean(raw.checkOut, 20),
    guests: clean(raw.guests, 4),
    suite: clean(raw.suite, 60),
    purpose: clean(raw.purpose, 80),
    message: clean(raw.message, 2000),
    consent: raw.consent === true,
  };

  if (!data.name || !data.phone || !data.email || !data.checkIn || !data.checkOut || !data.guests || !data.consent) {
    return NextResponse.json({ ok: false, error: "Please complete the required fields." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? SITE.email;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "Aurora Elite Suites <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[enquiry] no RESEND_API_KEY configured; enquiry acknowledged only", { name: data.name, checkIn: data.checkIn });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const lines = [
    `Name: ${data.name}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Email: ${data.email}`,
    `Check-in: ${data.checkIn}`,
    `Check-out: ${data.checkOut}`,
    `Guests: ${data.guests}`,
    `Suite: ${data.suite || "-"}`,
    `Purpose: ${data.purpose || "-"}`,
    ``,
    `Message:`,
    data.message || "-",
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Enquiry: ${data.name}, ${data.checkIn} to ${data.checkOut} (${data.guests} guests)`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] resend failed", res.status, await res.text());
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] error", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
