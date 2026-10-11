"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/b2b/ui/button";
import { Card, InfoNote } from "@/components/b2b/ui/card";
import {
  Field,
  Input,
  PhoneInput,
  Select,
  Textarea,
  fullPhone,
  isPhoneValid,
  type DialChoice,
} from "@/components/b2b/ui/form-controls";
import { OptionCard } from "@/components/b2b/ui/option-card";
import {
  BUSINESS_TYPES,
  LOW_VOLUME,
  PHONE,
  TAG_LOW_VOLUME,
  VOLUMES,
  keepAmounts,
} from "@/lib/b2b/constants";
import { COUNTRIES, COUNTRY_LIST, phoneLength, type CountryCode } from "@/lib/b2b/countries";
import { getAttribution, getMetaCookies } from "@/lib/b2b/attribution";
import { submitLead } from "@/lib/lead";

type FieldKey = "company" | "bin" | "businessType" | "country" | "volume" | "name" | "email" | "phone";
type Errors = Partial<Record<FieldKey, string>>;

// Порядок полей на экране — для фокуса на первой ошибке.
const ORDER: FieldKey[] = ["company", "bin", "businessType", "country", "volume", "name", "email", "phone"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const BUSINESS_OPTIONS = BUSINESS_TYPES.map((t) => ({ value: t, label: t }));
const COUNTRY_OPTIONS = [
  ...COUNTRY_LIST.map((c) => ({ value: c.code, label: c.name })),
  { value: "other", label: "Другая" },
];

export function LeadForm() {
  const [company, setCompany] = useState("");
  const [bin, setBin] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [country, setCountry] = useState<"" | CountryCode | "other">("");
  const [volume, setVolume] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState<DialChoice>("kz");
  const [dialTouched, setDialTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done") doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const clear = (k: FieldKey) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const onCountry = (v: "" | CountryCode | "other") => {
    setCountry(v);
    clear("country");
    // Код телефона следует за страной, пока его не меняли вручную и номер не начат.
    if (!dialTouched && !phone && v && v !== "other") setDial(v);
  };

  const onDial = (d: DialChoice) => {
    setDial(d);
    setDialTouched(true);
    setPhone((p) => (d === "other" || dial === "other" ? "" : p.slice(0, phoneLength(COUNTRIES[d]))));
    clear("phone");
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!company.trim()) e.company = "Укажите название компании";
    if (bin.trim().length < 5) e.bin = "Укажите БИН, ИНН или регистрационный номер";
    if (!businessType) e.businessType = "Выберите тип бизнеса";
    if (!country) e.country = "Выберите страну поставки";
    if (!volume) e.volume = "Выберите объём закупки";
    if (name.trim().length < 2) e.name = "Укажите ФИО";
    if (!EMAIL_RE.test(email.trim())) e.email = "Укажите рабочий email";
    if (!isPhoneValid(dial, phone)) e.phone = "Проверьте номер телефона";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e = validate();
    setErrors(e);
    const first = ORDER.find((k) => e[k]);
    if (first) {
      document.getElementById(`lf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const utm = Object.fromEntries(
      Object.entries(getAttribution()).filter(([, v]) => v),
    ) as Record<string, string>;
    const { fbp, fbc } = getMetaCookies();
    const res = await submitLead({
      source: "b2b-landing",
      company: company.trim(),
      bin: bin.trim(),
      role: businessType,
      volume,
      country: country === "other" ? "Другая" : COUNTRIES[country as CountryCode].name,
      countryCode: country === "other" ? "" : country,
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone(dial, phone),
      message: comment.trim(),
      tags: volume === LOW_VOLUME ? TAG_LOW_VOLUME : "",
      utm,
      fbp,
      fbc,
      locale: "ru",
    });
    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    return (
      <Card ref={doneRef} className="p-8 text-center sm:p-10">
        <CircleCheck aria-hidden className="mx-auto size-12 text-[var(--color-signal-blue)]" strokeWidth={1.5} />
        <h3 className="mt-5 text-[28px] font-semibold leading-[1.4]">Заявка принята</h3>
        <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
          Менеджер свяжется в течение 2 часов. Подготовьте список SKU или категорий — так
          прайс будет точнее.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-8">
      <form noValidate onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Компания" htmlFor="lf-company" error={errors.company}>
            <Input
              id="lf-company"
              autoComplete="organization"
              value={company}
              invalid={!!errors.company}
              onChange={(e) => {
                setCompany(e.target.value);
                clear("company");
              }}
            />
          </Field>
          <Field label="БИН / ИНН / регистрационный номер" htmlFor="lf-bin" error={errors.bin}>
            <Input
              id="lf-bin"
              value={bin}
              invalid={!!errors.bin}
              onChange={(e) => {
                setBin(e.target.value);
                clear("bin");
              }}
            />
          </Field>
          <Field label="Тип бизнеса" htmlFor="lf-businessType" error={errors.businessType}>
            <Select
              id="lf-businessType"
              placeholder="Выберите"
              options={BUSINESS_OPTIONS}
              value={businessType}
              invalid={!!errors.businessType}
              onChange={(e) => {
                setBusinessType(e.target.value);
                clear("businessType");
              }}
            />
          </Field>
          <Field label="Страна поставки" htmlFor="lf-country" error={errors.country}>
            <Select
              id="lf-country"
              placeholder="Выберите"
              options={COUNTRY_OPTIONS}
              value={country}
              invalid={!!errors.country}
              onChange={(e) => onCountry(e.target.value as "" | CountryCode | "other")}
            />
          </Field>
        </div>

        <div role="group" aria-labelledby="lf-volume-label">
          <div
            id="lf-volume-label"
            className="mb-2 text-[14px] font-medium leading-[1.4] text-[var(--color-ink-navy)]"
          >
            Объём закупки в месяц
          </div>
          <div className="grid grid-cols-2 gap-3">
            {VOLUMES.map((v, i) => (
              <OptionCard
                key={v}
                id={i === 0 ? "lf-volume" : undefined}
                selected={volume === v}
                onClick={() => {
                  setVolume(v);
                  clear("volume");
                }}
              >
                {keepAmounts(v)}
              </OptionCard>
            ))}
          </div>
          {volume === LOW_VOLUME && (
            <InfoNote className="mt-3">
              Минимальный заказ — $5 000. Можно собрать из разных брендов и категорий.
              Отправьте заявку — менеджер подскажет.
            </InfoNote>
          )}
          {errors.volume && (
            <p role="alert" className="mt-1.5 text-[12px] leading-[1.5] text-[var(--color-error)]">
              {errors.volume}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="ФИО" htmlFor="lf-name" error={errors.name}>
            <Input
              id="lf-name"
              autoComplete="name"
              value={name}
              invalid={!!errors.name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name");
              }}
            />
          </Field>
          <Field label="Рабочий email" htmlFor="lf-email" error={errors.email}>
            <Input
              id="lf-email"
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
        </div>

        <Field label="Телефон" htmlFor="lf-phone" error={errors.phone}>
          <PhoneInput
            id="lf-phone"
            dial={dial}
            onDialChange={onDial}
            value={phone}
            invalid={!!errors.phone}
            onChange={(v) => {
              setPhone(v);
              clear("phone");
            }}
          />
        </Field>

        <Field label="Комментарий или список SKU" htmlFor="lf-comment" optional>
          <Textarea
            id="lf-comment"
            rows={3}
            value={comment}
            placeholder="Например: NOW Foods D3, Optimum Nutrition Whey"
            onChange={(e) => setComment(e.target.value)}
          />
        </Field>

        {status === "error" && (
          <p role="alert" className="text-[14px] leading-[1.5] text-[var(--color-error)]">
            Не удалось отправить заявку. Попробуйте ещё раз или позвоните: {PHONE}.
          </p>
        )}

        <Button type="submit" size="lg" full disabled={status === "sending"}>
          {status === "sending" ? "Отправляем…" : "Получить B2B-прайс"}
        </Button>
        <p className="text-center text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
          Только для юридических лиц. Ответим в течение 2 часов в рабочее время.
        </p>
      </form>
    </Card>
  );
}
