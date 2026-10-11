"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck, Download } from "lucide-react";
import { Button, ButtonLink } from "@/components/b2b/ui/button";
import { Card } from "@/components/b2b/ui/card";
import {
  Field,
  Input,
  PhoneInput,
  Select,
  fullPhone,
  isPhoneValid,
  type DialChoice,
} from "@/components/b2b/ui/form-controls";
import { FACTS, GUIDE_BUSINESS_TYPES, PHONE } from "@/lib/b2b/constants";
import type { CountryCode } from "@/lib/b2b/countries";
import { getAttribution, getMetaCookies } from "@/lib/b2b/attribution";
import { submitLead } from "@/lib/lead";

type FieldKey = "company" | "businessType" | "email" | "phone";
type Errors = Partial<Record<FieldKey, string>>;
const ORDER: FieldKey[] = ["company", "businessType", "email", "phone"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPE_OPTIONS = GUIDE_BUSINESS_TYPES.map((t) => ({ value: t, label: t }));

export function GuideForm({
  countryCode,
  countryName,
  pdfUrl,
  guideTitle,
}: {
  countryCode?: CountryCode;
  countryName: string;
  pdfUrl: string;
  guideTitle: string;
}) {
  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState<DialChoice>(countryCode ?? "kz");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done") doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const clear = (k: FieldKey) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e: Errors = {};
    if (!company.trim()) e.company = "Укажите название компании";
    if (!businessType) e.businessType = "Выберите тип бизнеса";
    if (!EMAIL_RE.test(email.trim())) e.email = "Укажите рабочий email";
    if (!isPhoneValid(dial, phone)) e.phone = "Проверьте номер телефона";
    setErrors(e);
    const first = ORDER.find((k) => e[k]);
    if (first) {
      document.getElementById(`gf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const utm = Object.fromEntries(
      Object.entries(getAttribution()).filter(([, v]) => v),
    ) as Record<string, string>;
    const { fbp, fbc } = getMetaCookies();
    const res = await submitLead(
      {
        source: "b2b-guide",
        inquiry: guideTitle,
        company: company.trim(),
        role: businessType,
        email: email.trim(),
        phone: fullPhone(dial, phone),
        country: countryName,
        countryCode: countryCode ?? "",
        utm,
        fbp,
        fbc,
        locale: "ru",
      },
      { contentName: "guide" },
    );
    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    const quizHref = `/b2b/quiz${countryCode ? `?country=${countryCode}` : ""}`;
    return (
      <div ref={doneRef} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <CircleCheck aria-hidden className="size-10 text-[var(--color-signal-blue)]" strokeWidth={1.5} />
          <h3 className="mt-4 text-[28px] font-semibold leading-[1.4]">Гайд готов</h3>
          <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">{guideTitle}</p>
          <ButtonLink href={pdfUrl} target="_blank" rel="noopener" size="lg" full className="mt-6">
            <Download aria-hidden className="size-5" strokeWidth={2} />
            Скачать PDF
          </ButtonLink>
        </Card>
        {/* Вторая кнопка — в отдельной карточке: синяя и тёмная CTA рядом конкурируют (Don'ts). */}
        <div className="rounded-[24px] bg-[var(--color-badge-fill)] p-6 sm:p-8">
          <h3 className="text-[24px] font-semibold leading-[1.4] text-[var(--color-ink-navy)]">
            Хотите такой же расчёт по вашим SKU?
          </h3>
          <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-deep-cobalt)]">
            Персональный прайс за {FACTS.priceIn}
          </p>
          <ButtonLink href={quizHref} variant="dark" size="lg" full className="mt-6">
            Рассчитать закупку
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-5 sm:p-8">
      <form noValidate onSubmit={onSubmit} className="space-y-5">
        <Field label="Компания" htmlFor="gf-company" error={errors.company}>
          <Input
            id="gf-company"
            autoComplete="organization"
            value={company}
            invalid={!!errors.company}
            onChange={(e) => {
              setCompany(e.target.value);
              clear("company");
            }}
          />
        </Field>
        <Field label="Тип бизнеса" htmlFor="gf-businessType" error={errors.businessType}>
          <Select
            id="gf-businessType"
            placeholder="Выберите"
            options={TYPE_OPTIONS}
            value={businessType}
            invalid={!!errors.businessType}
            onChange={(e) => {
              setBusinessType(e.target.value);
              clear("businessType");
            }}
          />
        </Field>
        <Field label="Рабочий email" htmlFor="gf-email" error={errors.email}>
          <Input
            id="gf-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            invalid={!!errors.email}
            onChange={(e) => {
              setEmail(e.target.value);
              clear("email");
            }}
          />
        </Field>
        <Field label="Телефон или WhatsApp" htmlFor="gf-phone" error={errors.phone}>
          <PhoneInput
            id="gf-phone"
            dial={dial}
            onDialChange={(d) => {
              setDial(d);
              setPhone("");
              clear("phone");
            }}
            value={phone}
            invalid={!!errors.phone}
            onChange={(v) => {
              setPhone(v);
              clear("phone");
            }}
          />
        </Field>

        {status === "error" && (
          <p role="alert" className="text-[14px] leading-[1.5] text-[var(--color-error)]">
            Не удалось отправить форму. Попробуйте ещё раз или позвоните: {PHONE}.
          </p>
        )}

        <Button type="submit" size="lg" full disabled={status === "sending"}>
          {status === "sending" ? "Отправляем…" : "Получить гайд"}
        </Button>
        <p className="text-center text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
          Ссылка на PDF появится сразу после отправки.
        </p>
      </form>
    </Card>
  );
}
