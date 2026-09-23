"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT_PAGE } from "@/data/legal";
import { SITE } from "@/data/site";
import { cn, EASE_EXPO, whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "handoff" | "error";

const inputCls =
  "peer w-full rounded-[4px] border-b border-charcoal/20 bg-transparent px-0 pb-2.5 pt-6 font-sans text-[1rem] text-charcoal outline-none transition-colors placeholder:text-transparent focus:border-fairway";
const labelCls =
  "pointer-events-none absolute left-0 top-6 font-sans text-[0.95rem] text-stone transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-oak peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-oak";

function Field({ id, label, children, className }: { id: string; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
    </div>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const presetSuite = params.get("suite");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const today = new Date().toISOString().slice(0, 10);
  const f = CONTACT_PAGE.form;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const payload = { ...data, consent: fd.get("consent") === "on" };

    const text = `Hi, I'd like to check availability at Aurora Elite Suites.\nName: ${data.name}\nDates: ${data.checkIn} to ${data.checkOut}\nGuests: ${data.guests}\nSuite: ${data.suite || "Either is fine"}\nPurpose: ${data.purpose || "-"}${data.message ? `\nNotes: ${data.message}` : ""}`;
    setSummary(text);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? f.error);
        setStatus("error");
        return;
      }
      setStatus(json.delivered ? "sent" : "handoff");
      form.reset();
    } catch {
      setError(f.error);
      setStatus("error");
    }
  };

  return (
    <div className="relative rounded-[6px] bg-cream p-6 ring-1 ring-charcoal/8 sm:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" || status === "handoff" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="flex flex-col items-start gap-5 py-6">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-fairway text-ivory">
              <Check className="h-6 w-6" strokeWidth={2} />
            </span>
            {status === "sent" ? (
              <>
                <h3 className="font-display text-[1.9rem] leading-tight text-charcoal">Thank you!</h3>
                <p className="max-w-[52ch] text-[1rem] leading-relaxed text-charcoal/80">{f.success}</p>
              </>
            ) : (
              <>
                <h3 className="font-display text-[1.9rem] leading-tight text-charcoal">One more tap.</h3>
                <p className="max-w-[52ch] text-[1rem] leading-relaxed text-charcoal/80">
                  Your details are ready to send. Tap below to open WhatsApp with your enquiry pre-filled, and the team will reply with availability and today&apos;s rate, usually within the hour.
                </p>
                <Button href={whatsappLink(summary)} size="lg" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}>
                  Send on WhatsApp
                </Button>
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Booking enquiry - Aurora Elite Suites")}&body=${encodeURIComponent(summary)}`} className="inline-flex items-center gap-1 font-sans text-[0.875rem] text-fairway underline-offset-2 hover:underline" data-cursor="link">
                  Or send it by email <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </>
            )}
            <button type="button" onClick={() => setStatus("idle")} className="font-sans text-[0.8125rem] text-stone underline-offset-2 hover:underline" data-cursor="link">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-7" noValidate={false}>
            <div>
              <p className="eyebrow">Enquiry form</p>
              <h3 className="mt-3 font-display text-[2rem] leading-tight text-charcoal">{f.heading}</h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Full name *">
                <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={inputCls} />
              </Field>
              <Field id="phone" label="Phone / WhatsApp *">
                <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Mobile number (with WhatsApp)" className={inputCls} />
              </Field>
              <Field id="email" label="Email *" className="sm:col-span-2">
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="Your email address" className={inputCls} />
              </Field>
              <div className="relative">
                <label htmlFor="checkIn" className="block font-sans text-[0.7rem] uppercase tracking-[0.16em] text-oak">
                  Check-in date *
                </label>
                <input id="checkIn" name="checkIn" type="date" required min={today} className="mt-2 w-full border-b border-charcoal/20 bg-transparent pb-2.5 pt-1 font-sans text-[1rem] text-charcoal outline-none focus:border-fairway" />
              </div>
              <div className="relative">
                <label htmlFor="checkOut" className="block font-sans text-[0.7rem] uppercase tracking-[0.16em] text-oak">
                  Check-out date *
                </label>
                <input id="checkOut" name="checkOut" type="date" required min={today} className="mt-2 w-full border-b border-charcoal/20 bg-transparent pb-2.5 pt-1 font-sans text-[1rem] text-charcoal outline-none focus:border-fairway" />
              </div>
              <Select id="guests" name="guests" label="Guests *" required options={f.guests} />
              <Select id="suite" name="suite" label="Suite" options={f.suites} defaultValue={presetSuite && f.suites.includes(presetSuite) ? presetSuite : undefined} />
              <Select id="purpose" name="purpose" label="Purpose of stay" options={f.purposes} className="sm:col-span-2" />
              <div className="relative sm:col-span-2">
                <label htmlFor="message" className="block font-sans text-[0.7rem] uppercase tracking-[0.16em] text-oak">
                  Message
                </label>
                <textarea id="message" name="message" rows={3} placeholder="Anything we should know? Early check-in, a pet, extra bedding..." className="mt-2 w-full resize-none border-b border-charcoal/20 bg-transparent pb-2.5 pt-1 font-sans text-[1rem] text-charcoal outline-none placeholder:text-stone/60 focus:border-fairway" />
              </div>
            </div>

            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <label className="flex items-start gap-3 font-sans text-[0.875rem] text-charcoal/80">
              <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-fairway" />
              <span>{f.consent} *</span>
            </label>

            {status === "error" && error && (
              <p role="alert" className="rounded-[4px] bg-oak/10 px-4 py-3 font-sans text-[0.875rem] text-oak-2">
                {error}
              </p>
            )}

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" disabled={status === "sending"} magnetic={false}>
                {status === "sending" ? "Sending…" : f.submit}
              </Button>
              <p className="font-sans text-[0.75rem] text-stone">We reply on WhatsApp or email, usually within the hour.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Select({ id, name, label, options, required, defaultValue, className }: { id: string; name: string; label: string; options: readonly string[]; required?: boolean; defaultValue?: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="block font-sans text-[0.7rem] uppercase tracking-[0.16em] text-oak">
        {label}
      </label>
      <select id={id} name={name} required={required} defaultValue={defaultValue ?? ""} className="mt-2 w-full appearance-none border-b border-charcoal/20 bg-transparent pb-2.5 pt-1 font-sans text-[1rem] text-charcoal outline-none focus:border-fairway">
        <option value="" disabled={required}>
          {required ? "Select" : "Optional"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-[2.1rem] text-stone">▾</span>
    </div>
  );
}
