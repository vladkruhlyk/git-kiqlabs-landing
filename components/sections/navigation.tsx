"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/ui/lang-provider";
import { LangToggle } from "@/components/ui/lang-toggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, lang } = useLang();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#brands", label: t.nav.brands },
    { href: "#markets", label: t.nav.markets },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-md bg-[var(--color-bone)]/75 border-b border-[var(--color-line)]/70"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
          <a
            href="#top"
            className="group flex items-center"
            aria-label="KIQ Labs Global"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-dark.webp"
              alt="KIQ Labs Global"
              className="h-9 lg:h-10 w-auto select-none"
              draggable={false}
            />
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-center px-4 py-2 text-[13px] tracking-wide text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                >
                  <span className="font-mono mr-2 text-[10px] text-[var(--color-stone)] opacity-0 group-hover:opacity-100 transition-opacity">
                    ◆
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle />
            <a
              href={lang === "en" ? "/en/quiz" : "/quiz"}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[12px] tracking-wide text-[var(--color-ink)] hover:text-[var(--color-grass)] transition-colors"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-lime)] opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
              </span>
              {t.nav.quizCta}
            </a>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] text-[var(--color-bone)] px-4 py-2 text-[12px] tracking-wide hover:bg-[var(--color-grass)] transition-colors"
            >
              {t.nav.priceCta}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden backdrop-blur-md bg-[var(--color-bone)]/95"
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-10">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l, i) => (
              <motion.li
                key={l.href}
                initial={false}
                animate={{
                  x: open ? 0 : -20,
                  opacity: open ? 1 : 0,
                }}
                transition={{ delay: open ? 0.05 * i : 0, duration: 0.4 }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-[40px] leading-tight flex items-baseline gap-3 py-2 border-b border-[var(--color-line)]/60"
                >
                  <span className="font-mono text-[11px] text-[var(--color-stone)] translate-y-[-6px]">
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-2 font-mono text-[12px] text-[var(--color-ink-soft)]">
            <a href="tel:+13126817103">+1 (312) 681‑7103</a>
            <a href="mailto:info@kiqlabs.global">info@kiqlabs.global</a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
