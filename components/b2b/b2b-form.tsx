"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/lead";
import { TelegramChannelCTA } from "@/components/ui/telegram-cta";

const ROLES = [
  "Дистрибьютор / оптовик",
  "Аптечная сеть / сеть магазинов",
  "Маркетплейс (WB, Ozon, Kaspi, Uzum)",
  "Private label",
  "Другое",
];

const VOLUMES = ["Опт от $5 000", "Опт от $20 000", "Контейнер (FCL / LCL)"];

export function B2BForm() {
  const [role, setRole] = useState("");
  const [volume, setVolume] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    company.trim() !== "" && name.trim() !== "" && contact.trim() !== "";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitted) return;
    setSubmitted(true);
    void submitLead({
      source: "b2b",
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: contact.trim(),
      role,
      volume,
      locale: "ru",
    });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone-deep)] p-7 lg:p-9">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-grass)]/10 border border-[var(--color-grass)]/25">
          <Check size={22} strokeWidth={2.5} className="text-[var(--color-grass)]" />
        </div>
        <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-grass)]">
          Заявка принята
        </div>
        <h3 className="mt-2 font-sans font-bold text-[24px] lg:text-[28px] leading-tight tracking-[-0.02em]">
          {name ? `Спасибо, ${name}!` : "Спасибо!"}
        </h3>
        <p className="mt-3 max-w-md text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
          Менеджер свяжется с вами в течение одного рабочего дня — пришлём B2B-прайс
          и обсудим условия под ваш объём.
        </p>
        <TelegramChannelCTA lang="ru" className="mt-7 max-w-md" />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] p-6 lg:p-8"
    >
      <ChipGroup label="Тип бизнеса">
        {ROLES.map((r) => (
          <Chip key={r} active={role === r} onClick={() => setRole(r)}>
            {r}
          </Chip>
        ))}
      </ChipGroup>

      <ChipGroup label="Объём закупки">
        {VOLUMES.map((v) => (
          <Chip key={v} active={volume === v} onClick={() => setVolume(v)}>
            {v}
          </Chip>
        ))}
      </ChipGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-6">
        <Field label="Компания" value={company} onChange={setCompany} placeholder="ООО «Дистрибуция»" required />
        <Field label="Имя" value={name} onChange={setName} placeholder="Иван" required />
        <Field label="Телефон / Telegram" value={contact} onChange={setContact} placeholder="@username · +7 …" required />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="ivan@company.com" />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-wide transition-colors",
          canSubmit
            ? "bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-grass)]"
            : "bg-[var(--color-line)] text-[var(--color-stone)] cursor-not-allowed",
        )}
      >
        Запросить B2B-прайс
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-transform",
            canSubmit
              ? "bg-[var(--color-lime)] text-[var(--color-bone)] group-hover:translate-x-0.5"
              : "bg-[var(--color-stone-soft)] text-[var(--color-bone)]",
          )}
        >
          <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      </button>

      <p className="font-mono text-[10px] leading-relaxed text-[var(--color-stone)]">
        Обрабатываем только B2B-заявки. Минимальный заказ — от $5 000. Розницу и
        частные заказы не обслуживаем.
      </p>
    </form>
  );
}

function ChipGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border text-[13px] transition-colors",
        active
          ? "bg-[var(--color-ink)] text-[var(--color-bone)] border-[var(--color-ink)]"
          : "border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-ink)]",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] mb-2">
        {label}
        {required && <span className="text-[var(--color-grass)]"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] focus:border-[var(--color-ink)] rounded-lg px-4 py-3 text-[14px] outline-none placeholder:text-[var(--color-stone-soft)] transition-colors"
      />
    </label>
  );
}
