"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  COUNTRIES,
  COUNTRY_LIST,
  OTHER_FLAG,
  phoneLength,
  type CountryCode,
} from "@/lib/b2b/countries";

// Поле ввода по системе: заливка Pebble, hairline-рамка, радиус 8px.
// 16px текста — чтобы iOS не зумил страницу при фокусе.
export const inputClass =
  "w-full rounded-[8px] border border-[var(--color-hairline)] bg-[var(--color-pebble)] px-4 py-3 text-[16px] leading-[1.4] text-[var(--color-ink-navy)] outline-none transition-colors placeholder:text-[var(--color-mist-gray)] focus:border-[var(--color-signal-blue)] focus:bg-[var(--color-paper)]";

const invalidClass = "border-[var(--color-error)]";

export function Field({
  label,
  htmlFor,
  optional,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[14px] font-medium leading-[1.4] text-[var(--color-ink-navy)]"
      >
        {label}
        {optional && (
          <span className="font-normal text-[var(--color-slate-gray)]"> (необязательно)</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] leading-[1.5] text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({
  invalid,
  className,
  ...rest
}: { invalid?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(inputClass, invalid && invalidClass, className)}
      {...rest}
    />
  );
}

export function Textarea({
  invalid,
  className,
  ...rest
}: { invalid?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(inputClass, "min-h-[96px] resize-y", invalid && invalidClass, className)}
      {...rest}
    />
  );
}

export function Select({
  invalid,
  placeholder,
  options,
  className,
  value,
  ...rest
}: {
  invalid?: boolean;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        value={value}
        className={cn(
          inputClass,
          "appearance-none pr-10",
          !value && "text-[var(--color-mist-gray)]",
          invalid && invalidClass,
          className,
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-[var(--color-ink-navy)]">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[var(--color-slate-gray)]"
      />
    </div>
  );
}

/* ─────────── Телефон с кодом страны ─────────── */

export type DialChoice = CountryCode | "other";

function formatByMask(digits: string, mask: string): string {
  let out = "";
  let i = 0;
  for (const ch of mask) {
    if (i >= digits.length) break;
    out += ch === "X" ? digits[i++] : ch;
  }
  return out;
}

/** Полный номер для заявки: «+7 701 123 45 67». */
export function fullPhone(dial: DialChoice, value: string): string {
  if (dial === "other") return value.trim();
  const c = COUNTRIES[dial];
  return `${c.dial} ${formatByMask(value, c.mask)}`;
}

export function isPhoneValid(dial: DialChoice, value: string): boolean {
  if (dial === "other") return value.replace(/\D/g, "").length >= 8;
  return value.length === phoneLength(COUNTRIES[dial]);
}

/**
 * Номер с маской по стране. value — только цифры национального номера
 * (для «Другой» — номер целиком, как ввёл пользователь).
 */
export function PhoneInput({
  id,
  dial,
  onDialChange,
  value,
  onChange,
  invalid,
}: {
  id?: string;
  dial: DialChoice;
  onDialChange: (d: DialChoice) => void;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const country = dial === "other" ? undefined : COUNTRIES[dial];
  const shown = country ? formatByMask(value, country.mask) : value;

  const handle = (raw: string) => {
    if (!country) {
      onChange(raw.replace(/[^\d+\s()-]/g, "").slice(0, 20));
      return;
    }
    let digits = raw.replace(/\D/g, "").slice(0, phoneLength(country));
    // Стёрли разделитель маски — цифры не изменились, значит удаляем последнюю.
    if (raw.length < shown.length && digits === value) digits = digits.slice(0, -1);
    onChange(digits);
  };

  return (
    <div className="flex gap-2">
      <div className="relative w-[128px] shrink-0">
        <select
          aria-label="Код страны"
          value={dial}
          onChange={(e) => onDialChange(e.target.value as DialChoice)}
          className={cn(inputClass, "appearance-none pr-8")}
        >
          {COUNTRY_LIST.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial}
            </option>
          ))}
          <option value="other">{OTHER_FLAG} Другой</option>
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-slate-gray)]"
        />
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete={country ? "tel-national" : "tel"}
        aria-invalid={invalid || undefined}
        value={shown}
        onChange={(e) => handle(e.target.value)}
        placeholder={country ? country.mask.replace(/X/g, "0") : "+000 000 000 000"}
        className={cn(inputClass, "min-w-0 flex-1", invalid && invalidClass)}
      />
    </div>
  );
}
