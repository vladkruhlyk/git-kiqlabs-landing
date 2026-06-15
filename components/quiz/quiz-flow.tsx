"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store,
  Building2,
  ShoppingCart,
  FlaskConical,
  HelpCircle,
  Dumbbell,
  Pill,
  Heart,
  Leaf,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/ui/lang-provider";
import type { Dictionary } from "@/lib/i18n";
import { LangToggle } from "@/components/ui/lang-toggle";
import { submitLead } from "@/lib/lead";

type Answers = {
  role?: string;
  categories?: string[];
  country?: string;
  volume?: string;
  name?: string;
  company?: string;
  email?: string;
  contact?: string;
};

const COUNTRY_FLAGS: Record<string, string> = {
  KZ: "🇰🇿",
  UZ: "🇺🇿",
  TJ: "🇹🇯",
  KG: "🇰🇬",
  AZ: "🇦🇿",
  GE: "🇬🇪",
  AM: "🇦🇲",
  MN: "🇲🇳",
  AE: "🇦🇪",
  OT: "🌍",
};

const ROLE_ICONS = {
  distributor: Building2,
  retail: Store,
  marketplace: ShoppingCart,
  private: FlaskConical,
  other: HelpCircle,
};

const CATEGORY_ICONS = {
  sports: Dumbbell,
  vitamins: Pill,
  clinical: Heart,
  wellness: Leaf,
};

const TOTAL_STEPS = 5;

export function QuizFlow() {
  const { t, lang } = useLang();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0); // 0..4 = quiz, 5 = thanks
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const ROLES = t.quiz.step1.roles.map((r) => ({
    ...r,
    icon: ROLE_ICONS[r.id as keyof typeof ROLE_ICONS],
  }));
  const CATEGORIES = t.quiz.step2.categories.map((c) => ({
    ...c,
    icon: CATEGORY_ICONS[c.id as keyof typeof CATEGORY_ICONS],
  }));
  const VOLUMES = t.quiz.step4.volumes;
  const COUNTRIES = (
    Object.entries(t.quiz.step3.countryNames) as [string, string][]
  ).map(([code, ru]) => ({
    code,
    ru,
    flag: COUNTRY_FLAGS[code] || "🌍",
  }));

  if (!started) {
    return <Intro onStart={() => setStarted(true)} />;
  }

  const update = (patch: Partial<Answers>) =>
    setAnswers((a) => ({ ...a, ...patch }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  /** Выбор + авто-переход на следующий шаг (для single-select). */
  const pick = (patch: Partial<Answers>) => {
    setAnswers((a) => ({ ...a, ...patch }));
    setTimeout(() => {
      setDirection(1);
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }, 320);
  };

  const canProceed = (() => {
    if (step === 0) return !!answers.role;
    if (step === 1) return !!answers.categories && answers.categories.length > 0;
    if (step === 2) return !!answers.country;
    if (step === 3) return !!answers.volume;
    if (step === 4)
      return !!answers.name && !!answers.email && !!answers.contact;
    return true;
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    setStep(TOTAL_STEPS);
    void submitLead({
      source: "quiz",
      name: answers.name,
      company: answers.company,
      email: answers.email,
      phone: answers.contact,
      country: answers.country,
      role: answers.role,
      categories: (answers.categories || []).join(", "),
      volume: answers.volume,
      locale: lang,
    });
  };

  const progress = Math.min(step / TOTAL_STEPS, 1);

  return (
    <main className="relative min-h-screen bg-[var(--color-ink)] text-[var(--color-bone)] overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 500px at 80% -20%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(700px 500px at -10% 110%, rgba(19,72,194,0.20), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 lg:px-10 pt-6 lg:pt-8">
        <div className="mx-auto max-w-[1080px] flex items-center justify-between gap-4">
          <a
            href={lang === "en" ? "/en" : "/"}
            className="group flex items-center"
            aria-label="KIQ Labs"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-light.webp"
              alt="KIQ Labs Global"
              className="h-9 lg:h-10 w-auto select-none"
              draggable={false}
            />
          </a>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-stone-soft)]">
            <LangToggle inverted />
            <span>
              {t.quiz.common.step} {Math.min(step + 1, TOTAL_STEPS)}
            </span>
            <span className="opacity-50">/</span>
            <span>{TOTAL_STEPS}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mx-auto max-w-[1080px] mt-4 h-1 rounded-full bg-[var(--color-bone)]/10 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-lime)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </header>

      {/* Steps */}
      <div className="relative z-10 px-6 lg:px-10 py-10 lg:py-16">
        <div className="mx-auto max-w-[720px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <Step
                  eyebrow={t.quiz.step1.eyebrow}
                  title={t.quiz.step1.title}
                  hint={t.quiz.step1.hint}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ROLES.map((r) => {
                      const Icon = r.icon;
                      const active = answers.role === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => pick({ role: r.id })}
                          className={cn(
                            "group flex items-start gap-4 p-4 lg:p-5 rounded-xl border text-left transition-all",
                            active
                              ? "border-[var(--color-lime)] bg-[var(--color-lime)]/10"
                              : "border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03] hover:border-[var(--color-bone)]/35 hover:bg-[var(--color-bone)]/[0.06]",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-10 w-10 place-items-center rounded-lg shrink-0",
                              active
                                ? "bg-[var(--color-lime)] text-[var(--color-bone)]"
                                : "bg-[var(--color-bone)]/10 text-[var(--color-bone)]",
                            )}
                          >
                            <Icon size={18} strokeWidth={2} />
                          </span>
                          <div className="min-w-0">
                            <div className="font-display text-[15px] lg:text-[17px] leading-tight">
                              {r.title}
                            </div>
                            <div className="mt-1 text-[12px] lg:text-[13px] text-[var(--color-stone-soft)] leading-snug">
                              {r.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step
                  eyebrow={t.quiz.step2.eyebrow}
                  title={t.quiz.step2.title}
                  hint={t.quiz.step2.hint}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CATEGORIES.map((c) => {
                      const Icon = c.icon;
                      const selected = (answers.categories || []).includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            const cur = answers.categories || [];
                            update({
                              categories: selected
                                ? cur.filter((x) => x !== c.id)
                                : [...cur, c.id],
                            });
                          }}
                          className={cn(
                            "group flex items-center gap-4 p-4 lg:p-5 rounded-xl border text-left transition-all",
                            selected
                              ? "border-[var(--color-lime)] bg-[var(--color-lime)]/10"
                              : "border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03] hover:border-[var(--color-bone)]/35",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-10 w-10 place-items-center rounded-lg shrink-0",
                              selected
                                ? "bg-[var(--color-lime)] text-[var(--color-bone)]"
                                : "bg-[var(--color-bone)]/10 text-[var(--color-bone)]",
                            )}
                          >
                            <Icon size={18} strokeWidth={2} />
                          </span>
                          <div className="flex-1 font-display text-[15px] lg:text-[17px] leading-tight">
                            {c.title}
                          </div>
                          <span
                            className={cn(
                              "h-5 w-5 rounded-md border-2 grid place-items-center shrink-0 transition-colors",
                              selected
                                ? "border-[var(--color-lime)] bg-[var(--color-lime)]"
                                : "border-[var(--color-bone)]/30",
                            )}
                          >
                            {selected && (
                              <Check
                                size={12}
                                strokeWidth={3.5}
                                className="text-[var(--color-ink)]"
                              />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step
                  eyebrow={t.quiz.step3.eyebrow}
                  title={t.quiz.step3.title}
                  hint={t.quiz.step3.hint}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {COUNTRIES.map((c) => {
                      const active = answers.country === c.code;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => pick({ country: c.code })}
                          className={cn(
                            "flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all",
                            active
                              ? "border-[var(--color-lime)] bg-[var(--color-lime)]/10"
                              : "border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03] hover:border-[var(--color-bone)]/35",
                          )}
                        >
                          <span className="text-[24px] leading-none">{c.flag}</span>
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-stone-soft)]">
                              {c.code}
                            </div>
                            <div className="font-display text-[14px] leading-tight mt-0.5">
                              {c.ru}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step
                  eyebrow={t.quiz.step4.eyebrow}
                  title={t.quiz.step4.title}
                  hint={t.quiz.step4.hint}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VOLUMES.map((v) => {
                      const active = answers.volume === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => pick({ volume: v.id })}
                          className={cn(
                            "flex flex-col gap-1 p-5 rounded-xl border text-left transition-all min-h-[120px]",
                            active
                              ? "border-[var(--color-lime)] bg-[var(--color-lime)]/10"
                              : "border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03] hover:border-[var(--color-bone)]/35",
                          )}
                        >
                          <div className="font-display text-[18px] lg:text-[20px] leading-tight">
                            {v.title}
                          </div>
                          <div className="mt-1 text-[13px] text-[var(--color-stone-soft)] leading-snug">
                            {v.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 4 && (
                <Step
                  eyebrow={t.quiz.step5.eyebrow}
                  title={t.quiz.step5.title}
                  hint={t.quiz.step5.hint}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <QField
                      label={t.quiz.step5.name.label}
                      placeholder={t.quiz.step5.name.placeholder}
                      value={answers.name || ""}
                      onChange={(v) => update({ name: v })}
                    />
                    <QField
                      label={t.quiz.step5.company.label}
                      placeholder={t.quiz.step5.company.placeholder}
                      value={answers.company || ""}
                      onChange={(v) => update({ company: v })}
                    />
                    <QField
                      label={t.quiz.step5.email.label}
                      type="email"
                      placeholder={t.quiz.step5.email.placeholder}
                      value={answers.email || ""}
                      onChange={(v) => update({ email: v })}
                    />
                    <QField
                      label={t.quiz.step5.contact.label}
                      placeholder={t.quiz.step5.contact.placeholder}
                      value={answers.contact || ""}
                      onChange={(v) => update({ contact: v })}
                    />
                    {/* hidden submit so Enter works; visible button is in nav row */}
                    <button type="submit" className="hidden" />
                  </form>
                </Step>
              )}

              {step === TOTAL_STEPS && submitted && (
                <ThankYou answers={answers} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < TOTAL_STEPS && (
            <div className="mt-10 lg:mt-12 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className={cn(
                  "inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.18em] transition-colors",
                  step === 0
                    ? "text-[var(--color-stone-soft)]/40 cursor-not-allowed"
                    : "text-[var(--color-stone-soft)] hover:text-[var(--color-bone)]",
                )}
              >
                <ArrowLeft size={14} />
                {t.quiz.common.back}
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed}
                  className={cn(
                    "group inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2.5 text-[13px] font-semibold tracking-wide transition-all",
                    canProceed
                      ? "bg-[var(--color-lime)] text-[var(--color-bone)] hover:bg-[var(--color-lime-soft)]"
                      : "bg-[var(--color-bone)]/10 text-[var(--color-stone-soft)] cursor-not-allowed",
                  )}
                >
                  {t.quiz.common.next}
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full transition-transform",
                      canProceed
                        ? "bg-[var(--color-ink)] text-[var(--color-lime)] group-hover:translate-x-0.5"
                        : "bg-[var(--color-bone)]/15 text-[var(--color-stone-soft)]",
                    )}
                  >
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  className={cn(
                    "group inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2.5 text-[13px] font-semibold tracking-wide transition-all",
                    canProceed
                      ? "bg-[var(--color-lime)] text-[var(--color-bone)] hover:bg-[var(--color-lime-soft)]"
                      : "bg-[var(--color-bone)]/10 text-[var(--color-stone-soft)] cursor-not-allowed",
                  )}
                >
                  {t.quiz.common.getPrice}
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full transition-transform",
                      canProceed
                        ? "bg-[var(--color-ink)] text-[var(--color-lime)] group-hover:translate-x-0.5"
                        : "bg-[var(--color-bone)]/15 text-[var(--color-stone-soft)]",
                    )}
                  >
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Trust strip */}
          {step < TOTAL_STEPS && (
            <div className="mt-12 lg:mt-16 pt-6 border-t border-[var(--color-bone)]/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-stone-soft)]">
              <span className="flex items-center gap-2">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-lime)] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                </span>
                {t.quiz.common.opt}
              </span>
              <span className="hidden sm:inline">
                {t.quiz.common.usEu}
              </span>
              <span>{t.quiz.common.noRetail}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Step({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-lime)]">
        {eyebrow}
      </div>
      <h1 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em]">
        {title}
      </h1>
      {hint && (
        <p className="mt-3 text-[14px] lg:text-[15px] text-[var(--color-stone-soft)] leading-relaxed max-w-[52ch]">
          {hint}
        </p>
      )}
      <div className="mt-8 lg:mt-10">{children}</div>
    </div>
  );
}

function QField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone-soft)] mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[var(--color-bone)]/[0.05] border border-[var(--color-bone)]/15 focus:border-[var(--color-lime)] rounded-lg px-4 py-3 text-[15px] outline-none placeholder:text-[var(--color-stone-soft)]/60 text-[var(--color-bone)] transition-colors"
      />
    </label>
  );
}

function ThankYou({ answers }: { answers: Answers }) {
  const { t, lang } = useLang();
  const title = answers.name
    ? t.quiz.thanks.thanksName.replace("{name}", answers.name)
    : `${t.quiz.thanks.title}!`;
  return (
    <div className="text-center py-8 lg:py-16">
      <div className="inline-flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full bg-[var(--color-lime)]/15 border border-[var(--color-lime)]/30 mb-6">
        <Check
          size={32}
          strokeWidth={2.5}
          className="text-[var(--color-lime)]"
        />
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-lime)]">
        {t.quiz.thanks.accepted}
      </div>
      <h1 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-4 text-[14px] lg:text-[16px] text-[var(--color-stone-soft)] leading-relaxed max-w-[44ch] mx-auto">
        {t.quiz.thanks.body}
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href="https://t.me/kiqlabs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-bone)]/10 hover:bg-[var(--color-bone)]/15 transition-colors px-5 py-3 text-[13px] font-semibold"
        >
          {t.quiz.thanks.tg}
        </a>
        <a
          href="https://wa.me/13126817103"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-bone)]/10 hover:bg-[var(--color-bone)]/15 transition-colors px-5 py-3 text-[13px] font-semibold"
        >
          {t.quiz.thanks.wa}
        </a>
      </div>

      <a
        href={lang === "en" ? "/en" : "/"}
        className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone-soft)] hover:text-[var(--color-bone)] transition-colors"
      >
        {t.quiz.thanks.backToSite}
      </a>
    </div>
  );
}

/* ───────── Intro / Welcome screen ───────── */

const INTRO_BOTTLES = [
  { src: "/media/photo1.png", alt: "OstroVit Omega 3" },
  { src: "/media/photo2.png", alt: "OstroVit Triple Zinc" },
  { src: "/media/photo3.png", alt: "OstroVit Biotin Plus" },
];

function Intro({ onStart }: { onStart: () => void }) {
  const { t, lang } = useLang();
  return (
    <main className="relative min-h-screen bg-[var(--color-ink)] text-[var(--color-bone)] overflow-hidden">
      {/* Backgrounds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 90% -10%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(800px 500px at -10% 110%, rgba(19,72,194,0.22), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 lg:px-10 pt-6 lg:pt-8">
        <div className="mx-auto max-w-[1240px] flex items-center justify-between gap-4">
          <a
            href={lang === "en" ? "/en" : "/"}
            className="group flex items-center"
            aria-label="KIQ Labs"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-light.webp"
              alt="KIQ Labs Global"
              className="h-9 lg:h-10 w-auto select-none"
              draggable={false}
            />
          </a>
          <div className="flex items-center gap-3">
            <LangToggle inverted />
            <a
              href={lang === "en" ? "/en" : "/"}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone-soft)] hover:text-[var(--color-bone)] transition-colors"
            >
              {t.quiz.intro.backToSite}
            </a>
          </div>
        </div>
      </header>

      {/* Hero block */}
      <div className="relative z-10 px-6 lg:px-10 py-8 lg:py-14">
        <div className="mx-auto max-w-[1240px] grid grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: copy + CTA (compact) */}
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-lime)]/40 bg-[var(--color-lime)]/10 text-[var(--color-lime)]">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-lime)] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
                  {t.quiz.intro.eyebrowOpt}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.05] text-[var(--color-stone-soft)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
                  {t.quiz.intro.eyebrowNoRetail}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-[30px] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[56px] leading-[1.05] tracking-[-0.02em] text-balance"
            >
              <span className="text-[var(--color-lime)]">
                {t.quiz.intro.headline1}
              </span>{" "}
              {t.quiz.intro.headline2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 text-[14px] lg:text-[16px] text-[var(--color-stone-soft)] leading-relaxed max-w-[52ch]"
            >
              {t.quiz.intro.description1}{" "}
              <span className="text-[var(--color-bone)] font-medium">
                {t.quiz.intro.descriptionHl}
              </span>{" "}
              {t.quiz.intro.description2}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 lg:mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onStart}
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] pl-6 pr-2 py-3 text-[14px] lg:text-[15px] font-semibold tracking-wide hover:bg-[var(--color-lime-soft)] transition-colors shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
              >
                {t.quiz.intro.cta}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-lime)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-stone-soft)] flex items-center gap-2">
                <Check size={12} className="text-[var(--color-lime)]" />
                {t.quiz.intro.ctaHint}
              </span>
            </motion.div>
          </div>

          {/* Right: floating bottles bigger */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <IntroBottles />
          </div>
        </div>

        {/* Perks — full-width band under hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto max-w-[1240px] mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {t.quiz.intro.perks.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.04] p-4 lg:p-5"
            >
              <div className="font-display text-[16px] lg:text-[20px] leading-tight text-[var(--color-bone)]">
                {p.title}
              </div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-stone-soft)] leading-snug">
                {p.body}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust footer */}
      <div className="relative z-10 px-6 lg:px-10 pb-10">
        <div className="mx-auto max-w-[1240px] pt-6 border-t border-[var(--color-bone)]/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-stone-soft)]">
          <span>{t.quiz.common.opt}</span>
          <span className="hidden sm:inline">{t.quiz.common.usEu}</span>
          <span>{t.quiz.common.noRetail}</span>
        </div>
      </div>
    </main>
  );
}

function IntroBottles() {
  const { t } = useLang();
  return (
    <div className="relative h-[320px] sm:h-[440px] lg:h-[560px] pointer-events-none -mx-2 sm:mx-0">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.22), transparent 65%)",
        }}
      />

      {/* Bottle 1 — left */}
      <IntroBottle
        bottle={INTRO_BOTTLES[0]}
        className="absolute top-[8%] left-[4%] w-[44%] sm:w-[42%] lg:w-[44%] z-20"
        rotate={-6}
        delay={0.2}
        floatDuration={5.4}
        floatDelay={0}
      />
      {/* Bottle 2 — top-right */}
      <IntroBottle
        bottle={INTRO_BOTTLES[1]}
        className="absolute top-[2%] right-[4%] w-[40%] sm:w-[38%] lg:w-[42%] z-10"
        rotate={5}
        delay={0.35}
        floatDuration={6.2}
        floatDelay={0.8}
      />
      {/* Bottle 3 — front */}
      <IntroBottle
        bottle={INTRO_BOTTLES[2]}
        className="absolute bottom-[2%] left-[26%] w-[52%] sm:w-[50%] lg:w-[52%] z-30"
        rotate={-2}
        delay={0.5}
        floatDuration={5.8}
        floatDelay={1.6}
      />

      {/* Floating chip — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[20%] right-[2%] z-40 hidden sm:block"
      >
        <div className="rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] px-3.5 py-1.5 shadow-[0_10px_28px_rgba(59,130,246,0.5)]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-90">
              {t.hero.tagDiscount}
            </span>
            <span className="font-display text-[16px] font-bold leading-none">
              −35%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[16%] right-[6%] z-40 hidden sm:block"
      >
        <div className="rounded-full bg-[var(--color-bone)]/[0.08] backdrop-blur-sm border border-[var(--color-bone)]/15 text-[var(--color-bone)] px-3.5 py-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
              GMP · US & EU
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IntroBottle({
  bottle,
  className,
  rotate,
  delay,
  floatDuration,
  floatDelay,
}: {
  bottle: (typeof INTRO_BOTTLES)[number];
  className: string;
  rotate: number;
  delay: number;
  floatDuration: number;
  floatDelay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [rotate, rotate + 1.5, rotate] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ filter: "drop-shadow(0 30px 40px rgba(0, 0, 0, 0.35))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottle.src}
          alt={bottle.alt}
          width={520}
          height={680}
          loading="eager"
          className="w-full h-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
