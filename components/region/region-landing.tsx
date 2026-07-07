"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { RegionForm } from "./region-form";
import type { Region } from "@/lib/regions";

const BOTTLES = [
  { src: "/media/photo1.png", alt: "OstroVit Omega 3" },
  { src: "/media/photo2.png", alt: "OstroVit Triple Zinc" },
  { src: "/media/photo3.png", alt: "OstroVit Biotin Plus" },
];

export function RegionLanding({ region }: { region: Region }) {
  const c = region.content;
  const isEn = region.lang === "en";
  const backHref = isEn ? "/en" : "/";
  const backLabel = isEn ? "Main site" : "На основной сайт";
  const propsLabel = isEn ? "Why KIQ Labs" : "Почему KIQ Labs";

  return (
    <main className="relative bg-[var(--color-bone)] text-[var(--color-ink)]">
      {/* ─── HERO (dark) ─── */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-bone)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 88% -10%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(800px 500px at -10% 110%, rgba(19,72,194,0.22), transparent 60%)",
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

        {/* Top bar */}
        <header className="relative z-10 px-6 lg:px-10 pt-6 lg:pt-8">
          <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-4">
            <a href={backHref} className="flex items-center" aria-label="KIQ Labs Global">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/logo-light.webp"
                alt="KIQ Labs Global"
                className="h-9 lg:h-10 w-auto select-none"
                draggable={false}
              />
            </a>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.05] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-stone-soft)]">
                <span className="text-[16px] leading-none">{region.flag}</span>
                {region.name}
              </span>
              <a
                href={backHref}
                className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone-soft)] hover:text-[var(--color-bone)] transition-colors"
              >
                {backLabel}
              </a>
            </div>
          </div>
        </header>

        {/* Hero body */}
        <div className="relative z-10 px-6 lg:px-10 py-10 lg:py-20">
          <div className="mx-auto max-w-[1200px] grid grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-lime)]/40 bg-[var(--color-lime)]/10 px-3.5 py-1.5 text-[var(--color-lime)]"
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-lime)] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
                  {c.heroEyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-5 font-display text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.025em] text-balance"
              >
                {c.heroTitle}{" "}
                <span className="text-[var(--color-lime)]">{c.heroAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-6 max-w-[54ch] text-[15px] lg:text-[17px] text-[var(--color-stone-soft)] leading-relaxed"
              >
                {c.heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#form"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] pl-6 pr-2 py-3 text-[15px] font-semibold tracking-wide hover:bg-[var(--color-lime-soft)] transition-colors shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
                >
                  {c.ctaPrimary}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-lime)] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </span>
                </a>
              </motion.div>

              {/* Triage strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-bone)]/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-stone-soft)]"
              >
                {c.triage.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check size={13} className="text-[var(--color-lime)]" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Bottles */}
            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
              <div className="relative h-[240px] sm:h-[340px] lg:h-[440px] pointer-events-none">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 55% 50%, rgba(59,130,246,0.22), transparent 65%)",
                  }}
                />
                <Bottle b={BOTTLES[0]} className="absolute top-[6%] left-[6%] w-[42%] z-20" rotate={-6} delay={0.2} />
                <Bottle b={BOTTLES[1]} className="absolute top-[2%] right-[8%] w-[40%] z-10" rotate={5} delay={0.32} />
                <Bottle b={BOTTLES[2]} className="absolute bottom-[2%] left-[28%] w-[50%] z-30" rotate={-2} delay={0.44} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS (light) ─── */}
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
            {propsLabel}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {c.valueProps.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] p-6 lg:p-7"
              >
                <div className="font-mono text-[11px] text-[var(--color-lime-deep)]">
                  0{i + 1}
                </div>
                <div className="mt-3 font-display text-[19px] lg:text-[21px] leading-tight">
                  {p.title}
                </div>
                <p className="mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM (light) ─── */}
      <section id="form" className="scroll-mt-8 px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1200px] grid grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="col-span-12 lg:col-span-5">
            <h2 className="font-display text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.025em] text-balance">
              {c.formTitle}
            </h2>
            <p className="mt-5 max-w-md text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
              {c.formSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-stone)]">
              {c.triage.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check size={13} className="text-[var(--color-lime-deep)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <RegionForm region={region} />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[var(--color-line)] px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-[var(--color-ink-soft)]">
          <span className="uppercase tracking-[0.16em]">
            {region.flag} KIQ Labs Global · {region.name}
          </span>
          <div className="flex items-center gap-5">
            <a href="tel:+13126817103" className="hover:text-[var(--color-ink)] transition-colors">
              +1 (312) 681‑7103
            </a>
            <a href="mailto:info@kiqlabs.global" className="hover:text-[var(--color-ink)] transition-colors">
              info@kiqlabs.global
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Bottle({
  b,
  className,
  rotate,
  delay,
}: {
  b: (typeof BOTTLES)[number];
  className: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ filter: "drop-shadow(0 24px 34px rgba(0,0,0,0.35))" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.src} alt={b.alt} className="w-full h-auto object-contain select-none" draggable={false} />
    </motion.div>
  );
}
