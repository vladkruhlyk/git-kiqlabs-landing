"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dict } from "@/lib/i18n";
import { submitLead } from "@/lib/lead";
import type { Region } from "@/lib/regions";

export function RegionForm({ region }: { region: Region }) {
  const t = dict[region.lang].quiz;
  const roles = t.step1.roles;
  const categories = t.step2.categories;
  const volumes = t.step4.volumes;

  const [role, setRole] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const [volume, setVolume] = useState<string>("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim() !== "" && (contact.trim() !== "" || email.trim() !== "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitted) return;
    setSubmitted(true);
    const roleLabel = roles.find((r) => r.id === role)?.title ?? "";
    const catLabels = cats
      .map((id) => categories.find((c) => c.id === id)?.title ?? id)
      .join(", ");
    const volumeLabel = volumes.find((v) => v.id === volume)?.title ?? "";
    void submitLead({
      source: `region-${region.slug}`,
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: contact.trim(),
      country: `${region.flag} ${region.name}`,
      role: roleLabel,
      categories: catLabels,
      volume: volumeLabel,
      locale: region.lang,
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[var(--color-ink)] text-[var(--color-bone)] p-8 lg:p-12"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-lime)]/15 border border-[var(--color-lime)]/30 mb-5">
          <Check size={26} strokeWidth={2.5} className="text-[var(--color-lime)]" />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-lime)]">
          {t.thanks.accepted}
        </div>
        <h3 className="mt-3 font-display text-[26px] lg:text-[34px] leading-tight">
          {name ? t.thanks.thanksName.replace("{name}", name) : `${t.thanks.title}!`}
        </h3>
        <p className="mt-3 max-w-md text-[15px] text-[var(--color-stone-soft)] leading-relaxed">
          {t.thanks.body}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-2xl bg-[var(--color-bone)] border border-[var(--color-line)] p-6 lg:p-8 shadow-[0_1px_0_var(--color-line)]"
    >
      <ChipGroup label={t.step1.title}>
        {roles.map((r) => (
          <Chip key={r.id} active={role === r.id} onClick={() => setRole(r.id)}>
            {r.title}
          </Chip>
        ))}
      </ChipGroup>

      <ChipGroup label={t.step2.title}>
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={cats.includes(c.id)}
            onClick={() =>
              setCats((prev) =>
                prev.includes(c.id)
                  ? prev.filter((x) => x !== c.id)
                  : [...prev, c.id],
              )
            }
          >
            {c.title}
          </Chip>
        ))}
      </ChipGroup>

      <ChipGroup label={t.step4.title}>
        {volumes.map((v) => (
          <Chip key={v.id} active={volume === v.id} onClick={() => setVolume(v.id)}>
            {v.title}
          </Chip>
        ))}
      </ChipGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--color-line)]">
        <Field label={t.step5.name.label} value={name} onChange={setName} placeholder={t.step5.name.placeholder} required />
        <Field label={t.step5.company.label} value={company} onChange={setCompany} placeholder={t.step5.company.placeholder} />
        <Field label={t.step5.email.label} type="email" value={email} onChange={setEmail} placeholder={t.step5.email.placeholder} />
        <Field label={t.step5.contact.label} value={contact} onChange={setContact} placeholder={t.step5.contact.placeholder} required />
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
        {t.common.getPrice}
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
    </form>
  );
}

function ChipGroup({ label, children }: { label: string; children: React.ReactNode }) {
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
        {required && <span className="text-[var(--color-lime-deep)]"> *</span>}
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
