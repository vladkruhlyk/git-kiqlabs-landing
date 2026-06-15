"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/ui/lang-provider";
import { submitLead } from "@/lib/lead";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { t, lang } = useLang();

  return (
    <section id="contact" className="relative py-16 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">
              <span className="inline-block h-px w-8 bg-[var(--color-ink)]" />
              <span>{t.contact.eyebrow}</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="mt-6 font-display text-[36px] sm:text-[52px] lg:text-[68px] leading-[1.02] tracking-[-0.025em] text-balance"
            >
              {t.contact.headline1}{" "}
              <span className="font-display text-[var(--color-grass)]">
                {t.contact.headlineHl}
              </span>
              {t.contact.headline2}
            </motion.h2>
            <p className="mt-6 max-w-md text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
              {t.contact.description}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--color-line)] pt-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {t.contact.phoneLabel}
                </div>
                <a
                  href="tel:+13126817103"
                  className="mt-2 block font-display text-[22px] leading-tight"
                >
                  +1 (312) 681‑7103
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {t.contact.emailLabel}
                </div>
                <a
                  href="mailto:info@kiqlabs.global"
                  className="mt-2 block font-display text-[22px] leading-tight"
                >
                  info@kiqlabs.global
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {t.contact.hqLabel}
                </div>
                <div className="mt-2 font-display text-[22px] leading-tight">
                  Chicago, IL · USA
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {t.contact.channelsLabel}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                  {["Telegram", "WhatsApp", "LinkedIn", "Instagram"].map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 border border-[var(--color-line)] rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: form */}
          <div className="col-span-12 lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--color-ink)] text-[var(--color-bone)] p-10 lg:p-14 rounded-2xl"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-lime)]">
                  {t.contact.success.label}
                </div>
                <h3 className="mt-4 font-display text-[28px] lg:text-[36px] leading-tight">
                  {t.contact.success.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] text-[var(--color-stone-soft)] leading-relaxed">
                  {t.contact.success.body}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const get = (k: string) => (fd.get(k)?.toString() ?? "").trim();
                  // Оптимистично показываем успех — заявку не теряем из-за сети.
                  setSubmitted(true);
                  void submitLead({
                    source: "contact",
                    name: get("name"),
                    company: get("company"),
                    email: get("email"),
                    phone: get("phone"),
                    country: get("country"),
                    inquiry: get("inquiry"),
                    message: get("message"),
                    locale: lang,
                  });
                }}
                className="flex flex-col gap-5 bg-[var(--color-bone)] border border-[var(--color-line)] rounded-2xl p-6 lg:p-8 shadow-[0_1px_0_var(--color-line)] relative"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-line)]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]">
                    {t.contact.formCardLabel}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--color-lime)]/15 border border-[var(--color-lime-deep)]/40 text-[var(--color-lime-deep)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lime-deep)]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] font-semibold">
                      {t.contact.formCardBadge}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field
                    label={t.contact.fields.name.label}
                    name="name"
                    placeholder={t.contact.fields.name.placeholder}
                  />
                  <Field
                    label={t.contact.fields.company.label}
                    name="company"
                    placeholder={t.contact.fields.company.placeholder}
                  />
                  <Field
                    label={t.contact.fields.email.label}
                    name="email"
                    type="email"
                    placeholder={t.contact.fields.email.placeholder}
                  />
                  <Field
                    label={t.contact.fields.phone.label}
                    name="phone"
                    type="tel"
                    placeholder={t.contact.fields.phone.placeholder}
                  />
                  <CountrySelect />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-2">
                    {t.contact.inquiryLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.inquiryOptions.map((opt, i) => (
                      <label
                        key={opt}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-line)] rounded-full text-[13px] cursor-pointer hover:border-[var(--color-ink)] transition-colors has-[:checked]:bg-[var(--color-ink)] has-[:checked]:text-[var(--color-bone)] has-[:checked]:border-[var(--color-ink)]"
                      >
                        <input
                          type="radio"
                          name="inquiry"
                          value={opt}
                          defaultChecked={i === 0}
                          className="appearance-none w-0 h-0 absolute"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-2">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] focus:border-[var(--color-ink)] rounded-lg px-4 py-3 text-[14px] outline-none placeholder:text-[var(--color-stone-soft)] resize-none transition-colors"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="font-mono text-[10px] text-[var(--color-ink-soft)] max-w-xs leading-relaxed">
                    {t.contact.consent}
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] text-[var(--color-bone)] pl-6 pr-2 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-[var(--color-grass)] transition-colors"
                  >
                    {t.contact.submit}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] transition-transform group-hover:translate-x-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type CountryOpt = { code: string; name: string; flag: string };

function CountrySelect() {
  const { t } = useLang();
  const countries: readonly CountryOpt[] = t.contact.countries;
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string>(countries[0].code);
  const selected =
    countries.find((c) => c.code === selectedCode) ?? countries[0];

  return (
    <div className="md:col-span-2 relative">
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-2">
        {t.contact.fields.country.label}
      </label>
      <input type="hidden" name="country" value={selected.name} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 bg-[var(--color-paper)] border border-[var(--color-line)] hover:border-[var(--color-ink)] focus:border-[var(--color-ink)] rounded-lg px-4 py-3 text-[14px] outline-none transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="text-[20px] leading-none">{selected.flag}</span>
          <span className="text-[var(--color-ink)]">{selected.name}</span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={cn(
            "text-[var(--color-ink-soft)] transition-transform",
            open && "rotate-180",
          )}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            data-lenis-prevent
            onWheelCapture={(e) => e.stopPropagation()}
            className="absolute left-0 right-0 top-full mt-1 z-30 bg-[var(--color-bone)] border border-[var(--color-line)] rounded-lg shadow-[0_8px_24px_rgba(18,23,42,0.12)] max-h-[280px] overflow-y-auto overscroll-contain py-1"
            role="listbox"
          >
            {countries.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCode(c.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-[var(--color-bone-deep)] transition-colors",
                    selected.code === c.code &&
                      "bg-[var(--color-lime)]/15 text-[var(--color-ink)]",
                  )}
                >
                  <span className="text-[20px] leading-none">{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  <span className="font-mono text-[10px] text-[var(--color-stone)]">
                    {c.code}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] focus:border-[var(--color-ink)] rounded-lg px-4 py-3 text-[14px] outline-none placeholder:text-[var(--color-stone-soft)] transition-colors"
      />
    </div>
  );
}
