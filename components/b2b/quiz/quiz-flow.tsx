"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, CircleCheck } from "lucide-react";
import { Button } from "@/components/b2b/ui/button";
import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { BottleGroup } from "@/components/b2b/ui/bottles";
import { Container, Header } from "@/components/b2b/ui/chrome";
import { LogoStrip } from "@/components/b2b/ui/logo-strip";
import { OptionCard } from "@/components/b2b/ui/option-card";
import {
  Field,
  Input,
  PhoneInput,
  fullPhone,
  isPhoneValid,
  type DialChoice,
} from "@/components/b2b/ui/form-controls";
import {
  FACTS,
  LOW_VOLUME,
  PHONE,
  QUIZ_CATEGORIES,
  QUIZ_RETAIL,
  QUIZ_ROLES,
  TAG_LOW_VOLUME,
  VOLUMES,
  keepAmounts,
} from "@/lib/b2b/constants";
import {
  COUNTRIES,
  COUNTRY_LIST,
  GENERAL_DOSSIER,
  OTHER_FLAG,
  detectCountry,
  type CountryCode,
} from "@/lib/b2b/countries";
import { RETAIL_PARTNERS } from "@/lib/b2b/partners";
import { getAttribution, getMetaCookies } from "@/lib/b2b/attribution";
import { trackCustom } from "@/lib/fbpixel";
import { submitLead } from "@/lib/lead";
import { cn } from "@/lib/utils";
import { ResultPreview } from "./result-preview";

type Screen =
  | "start"
  | "who"
  | "retail"
  | "sell1"
  | "country"
  | "categories"
  | "sell2"
  | "volume"
  | "lowVolume"
  | "final"
  | "done";

type CountryChoice = CountryCode | "other" | "";

const AUTO_ADVANCE_MS = 250;
const Q_TITLE = "text-[38px] font-bold leading-[1.21] text-balance";

export function QuizFlow({ presetCountry }: { presetCountry?: CountryCode }) {
  const [history, setHistory] = useState<Screen[]>(["start"]);
  const screen = history[history.length - 1];

  const [role, setRole] = useState("");
  const [country, setCountry] = useState<CountryChoice>(presetCountry ?? "");
  const [categories, setCategories] = useState<string[]>([]);
  const [volume, setVolume] = useState("");

  const fired = useRef({ start: false, retail: false });
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = (s: Screen) => {
    window.clearTimeout(timer.current);
    setHistory((h) => [...h, s]);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const back = () => {
    window.clearTimeout(timer.current);
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  };
  // Одиночный выбор: подсветка ответа, затем переход.
  const later = (s: Screen) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => go(s), AUTO_ADVANCE_MS);
  };

  const questions: Screen[] = presetCountry
    ? ["who", "categories", "volume"]
    : ["who", "country", "categories", "volume"];
  const total = questions.length;

  const c = country && country !== "other" ? COUNTRIES[country] : undefined;
  const countryPhrase = c ? `для ${c.gen}` : "для вашего рынка";
  const categoryPhrase = (() => {
    const sel = QUIZ_CATEGORIES.filter((x) => categories.includes(x.label));
    if (sel.length === 0) return "выбранным категориям";
    if (sel.length === 1) return sel[0].dative;
    const s = sel.map((x) => x.short);
    return `${s.slice(0, -1).join(", ")} и ${s[s.length - 1]}`;
  })();

  const pickRole = (r: string) => {
    setRole(r);
    if (r === QUIZ_RETAIL) {
      if (!fired.current.retail) {
        fired.current.retail = true;
        trackCustom("RetailExit");
      }
      later("retail");
      return;
    }
    if (!fired.current.start) {
      fired.current.start = true;
      trackCustom("QuizB2BStart");
    }
    later("sell1");
  };

  const pickVolume = (v: string) => {
    setVolume(v);
    later(v === LOW_VOLUME ? "lowVolume" : "final");
  };

  const toggleCategory = (label: string) =>
    setCategories((cs) => (cs.includes(label) ? cs.filter((x) => x !== label) : [...cs, label]));

  /* ─────────── Прогресс ─────────── */
  const progress = (() => {
    const qi = questions.indexOf(screen);
    if (qi >= 0) return { step: qi + 1, fill: (qi + 1) / total };
    if (screen === "sell1") return { fill: 1 / total };
    if (screen === "sell2") return { fill: (questions.indexOf("categories") + 1) / total };
    if (screen === "lowVolume") return { fill: 1 };
    return null;
  })();

  return (
    <>
      <Header right={<Badge size="md">Только для бизнеса</Badge>} />
      <main className="pb-16 pt-8 lg:pt-14">
        {screen === "start" ? (
          <StartScreen
            total={total}
            countryName={presetCountry ? c?.name : undefined}
            onStart={() => go("who")}
          />
        ) : (
          <Container>
            <BlobbedVisual
              desktopOnly
              className={cn("mx-auto w-full", screen === "final" ? "max-w-[880px]" : "max-w-[640px]")}
            >
              <Card className="p-5 sm:p-8">
                {screen !== "done" && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-ink-navy)] hover:text-[var(--color-signal-blue)]"
                  >
                    <ArrowLeft aria-hidden className="size-4" strokeWidth={2} />
                    Назад
                  </button>
                )}

                {progress && (
                  <div className="mt-4">
                    {progress.step && (
                      <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
                        Шаг {progress.step} из {total}
                      </div>
                    )}
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-pebble)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-signal-blue)] transition-[width] duration-300"
                        style={{ width: `${progress.fill * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div key={screen} className="b2b-screen-in mt-6">
                  {screen === "who" && (
                    <>
                      <h2 className={Q_TITLE}>Кто вы?</h2>
                      <div role="group" aria-label="Кто вы" className="mt-6 grid gap-3">
                        {QUIZ_ROLES.map((r) => (
                          <OptionCard
                            key={r}
                            selected={role === r}
                            quiet={r === QUIZ_RETAIL}
                            onClick={() => pickRole(r)}
                          >
                            {r}
                          </OptionCard>
                        ))}
                      </div>
                    </>
                  )}

                  {screen === "retail" && (
                    <>
                      <h2 className={Q_TITLE}>Спасибо за интерес!</h2>
                      <p className="mt-4 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
                        KIQ Labs работает только с компаниями — оптовыми закупщиками от $5 000.
                      </p>
                      {RETAIL_PARTNERS.length > 0 && (
                        <>
                          <p className="mt-4 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
                            Купить продукцию в рознице можно у наших партнёров:
                          </p>
                          <ul className="mt-3 space-y-2">
                            {RETAIL_PARTNERS.map((p) => (
                              <li key={p.url}>
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[16px] font-semibold text-[var(--color-signal-blue)] underline-offset-4 hover:underline"
                                >
                                  {p.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  )}

                  {screen === "sell1" && (
                    <>
                      <h2 className={Q_TITLE}>Работаем напрямую с {FACTS.brands} фабриками США и ЕС</h2>
                      <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { v: FACTS.discount, l: "к закупке через трейдеров" },
                          { v: FACTS.shipping, l: "отгрузка" },
                          { v: FACTS.countries, l: "поставок" },
                        ].map((s) => (
                          <li
                            key={s.l}
                            className="rounded-[16px] border border-[var(--color-hairline)] p-3 sm:p-4"
                          >
                            <div className="text-[18px] font-bold leading-[1.21] sm:text-[24px]">{s.v}</div>
                            <div className="mt-1 text-[12px] leading-[1.5] text-[var(--color-slate-gray)] sm:text-[14px] sm:leading-[1.4]">
                              {s.l}
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <LogoStrip caption="Бренды с прямыми контрактами" />
                      </div>
                      <Button size="lg" full className="mt-8" onClick={() => go(presetCountry ? "categories" : "country")}>
                        Дальше
                      </Button>
                    </>
                  )}

                  {screen === "country" && (
                    <>
                      <h2 className={Q_TITLE}>Куда поставка?</h2>
                      <div role="group" aria-label="Страна поставки" className="mt-6 grid grid-cols-2 gap-3">
                        {COUNTRY_LIST.map((x) => (
                          <OptionCard
                            key={x.code}
                            selected={country === x.code}
                            onClick={() => {
                              setCountry(x.code);
                              later("categories");
                            }}
                          >
                            <span aria-hidden>{x.flag}</span> {x.name}
                          </OptionCard>
                        ))}
                        <OptionCard
                          selected={country === "other"}
                          onClick={() => {
                            setCountry("other");
                            later("categories");
                          }}
                        >
                          <span aria-hidden>{OTHER_FLAG}</span> Другая
                        </OptionCard>
                      </div>
                    </>
                  )}

                  {screen === "categories" && (
                    <>
                      <h2 className={Q_TITLE}>Какие категории интересуют?</h2>
                      <p className="mt-2 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
                        Можно выбрать несколько
                      </p>
                      <div role="group" aria-label="Категории" className="mt-6 grid gap-3">
                        {QUIZ_CATEGORIES.map((x) => (
                          <OptionCard
                            key={x.label}
                            multi
                            selected={categories.includes(x.label)}
                            onClick={() => toggleCategory(x.label)}
                          >
                            {x.label}
                          </OptionCard>
                        ))}
                      </div>
                      <Button
                        size="lg"
                        full
                        className="mt-8"
                        disabled={categories.length === 0}
                        onClick={() => go("sell2")}
                      >
                        Дальше
                      </Button>
                    </>
                  )}

                  {screen === "sell2" && (
                    <>
                      <h2 className={Q_TITLE}>
                        {c ? `Для ${c.gen} досье уже готово` : "Досье под ваш рынок подготовим"}
                      </h2>
                      <ul className="mt-6 space-y-3">
                        {(c?.dossier ?? GENERAL_DOSSIER).map((d) => (
                          <li key={d} className="flex items-start gap-3 text-[18px] font-medium leading-[1.4]">
                            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-badge-fill)] text-[var(--color-signal-blue)]">
                              <Check aria-hidden className="size-3.5" strokeWidth={3} />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <Button size="lg" full className="mt-8" onClick={() => go("volume")}>
                        Дальше
                      </Button>
                    </>
                  )}

                  {screen === "volume" && (
                    <>
                      <h2 className={Q_TITLE}>Объём закупки в месяц?</h2>
                      <div role="group" aria-label="Объём закупки" className="mt-6 grid gap-3">
                        {VOLUMES.map((v) => (
                          <OptionCard key={v} selected={volume === v} onClick={() => pickVolume(v)}>
                            {keepAmounts(v)}
                          </OptionCard>
                        ))}
                      </div>
                    </>
                  )}

                  {screen === "lowVolume" && (
                    <>
                      <h2 className={Q_TITLE}>Минимальный заказ — $5 000</h2>
                      <p className="mt-4 text-[18px] leading-[1.5] text-[var(--color-slate-gray)]">
                        Его можно собрать из разных брендов и категорий — менеджер поможет.
                      </p>
                      <Button size="lg" full className="mt-8" onClick={() => go("final")}>
                        Продолжить
                      </Button>
                    </>
                  )}

                  {screen === "final" && (
                    <FinalStep
                      role={role}
                      country={country}
                      categories={categories}
                      volume={volume}
                      title={`Покажем персональный прайс и маржу по ${categoryPhrase} ${countryPhrase}`}
                      onDone={() => {
                        // После брони «Назад» не нужен: история начинается с подтверждения.
                        setHistory(["done"]);
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                    />
                  )}

                  {screen === "done" && <DoneScreen />}
                </div>
              </Card>
            </BlobbedVisual>
          </Container>
        )}
      </main>
    </>
  );
}

/* ─────────── Старт ─────────── */

function StartScreen({
  total,
  countryName,
  onStart,
}: {
  total: number;
  countryName?: string;
  onStart: () => void;
}) {
  return (
    <>
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge size="md">60 секунд · {total} вопроса</Badge>
          <h1 className="b2b-display mt-5 text-balance">
            Узнайте закупочную цену на витамины и спортпит из США и ЕС для вашего бизнеса
          </h1>
          <p className="b2b-lead mt-5 max-w-[560px]">
            Только для юридических лиц. Минимальный заказ от $5 000
          </p>
          <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={onStart}>
            Начать расчёт
          </Button>
        </div>
        <div className="relative pb-12 lg:pb-14">
          <ResultPreview countryName={countryName} />
          <BottleGroup
            eager
            className="absolute -bottom-2 right-0 w-[54%] sm:w-[42%] lg:-right-6 lg:w-[46%]"
          />
        </div>
      </Container>
      <Container className="mt-14 lg:mt-20">
        <LogoStrip caption={`${FACTS.brands} брендов с прямыми контрактами`} />
      </Container>
    </>
  );
}

/* ─────────── Финал: бронь звонка ─────────── */

type FinalErrors = Partial<Record<"company" | "bin" | "name" | "phone" | "email", string>>;
const FINAL_ORDER = ["company", "bin", "name", "phone", "email"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function FinalStep({
  role,
  country,
  categories,
  volume,
  title,
  onDone,
}: {
  role: string;
  country: CountryChoice;
  categories: string[];
  volume: string;
  title: string;
  onDone: () => void;
}) {
  const c = country && country !== "other" ? COUNTRIES[country] : undefined;

  const [company, setCompany] = useState("");
  const [bin, setBin] = useState("");
  const [name, setName] = useState("");
  // Код телефона: страна из ответа квиза, иначе — по часовому поясу браузера.
  const [dial, setDial] = useState<DialChoice>(c?.code ?? detectCountry() ?? "other");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FinalErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const clear = (k: keyof FinalErrors) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e: FinalErrors = {};
    if (!company.trim()) e.company = "Укажите название компании";
    if (bin.trim().length < 5) e.bin = "Укажите БИН, ИНН или регистрационный номер";
    if (name.trim().length < 2) e.name = "Укажите имя";
    if (!isPhoneValid(dial, phone)) e.phone = "Проверьте номер телефона";
    if (!EMAIL_RE.test(email.trim())) e.email = "Укажите рабочий email";
    setErrors(e);
    const first = FINAL_ORDER.find((k) => e[k]);
    if (first) {
      const el = document.getElementById(`qf-${first}`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    const utm = Object.fromEntries(
      Object.entries(getAttribution()).filter(([, v]) => v),
    ) as Record<string, string>;
    const { fbp, fbc } = getMetaCookies();
    const res = await submitLead({
      source: "b2b-quiz",
      role,
      categories: categories.join(", "),
      volume,
      country: c?.name ?? (country === "other" ? "Другая" : ""),
      countryCode: c?.code ?? "",
      tags: volume === LOW_VOLUME ? TAG_LOW_VOLUME : "",
      company: company.trim(),
      bin: bin.trim(),
      name: name.trim(),
      phone: fullPhone(dial, phone),
      email: email.trim(),
      utm,
      fbp,
      fbc,
      locale: "ru",
    });
    if (res.ok) onDone();
    else setStatus("error");
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Badge size="md">Расчёт готов</Badge>
      <h2 className="mt-4 text-[28px] font-bold leading-[1.21] text-balance sm:text-[38px]">{title}</h2>
      <p className="mt-3 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
        15-минутный звонок с менеджером вашего региона
      </p>


      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Компания" htmlFor="qf-company" error={errors.company}>
          <Input
            id="qf-company"
            autoComplete="organization"
            value={company}
            invalid={!!errors.company}
            onChange={(e) => {
              setCompany(e.target.value);
              clear("company");
            }}
          />
        </Field>
        <Field label="БИН / ИНН" htmlFor="qf-bin" error={errors.bin}>
          <Input
            id="qf-bin"
            value={bin}
            invalid={!!errors.bin}
            onChange={(e) => {
              setBin(e.target.value);
              clear("bin");
            }}
          />
        </Field>
        <Field label="Имя" htmlFor="qf-name" error={errors.name}>
          <Input
            id="qf-name"
            autoComplete="name"
            value={name}
            invalid={!!errors.name}
            onChange={(e) => {
              setName(e.target.value);
              clear("name");
            }}
          />
        </Field>
        <Field label="Рабочий email" htmlFor="qf-email" error={errors.email}>
          <Input
            id="qf-email"
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
        <Field label="Телефон" htmlFor="qf-phone" error={errors.phone} className="sm:col-span-2">
          <PhoneInput
            id="qf-phone"
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
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-[14px] leading-[1.5] text-[var(--color-error)]">
          Не удалось отправить заявку. Попробуйте ещё раз или позвоните: {PHONE}.
        </p>
      )}

      <Button type="submit" size="lg" full className="mt-6" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Получить расчёт"}
      </Button>
      <p className="mt-3 text-center text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
        Только для юрлиц. Звонок проводит менеджер по вашему региону
      </p>
    </form>
  );
}

/* ─────────── Подтверждение ─────────── */

function DoneScreen() {
  return (
    <div className="text-center">
      <CircleCheck aria-hidden className="mx-auto size-12 text-[var(--color-signal-blue)]" strokeWidth={1.5} />
      <h2 className="mt-5 text-[38px] font-bold leading-[1.21] text-balance">Заявка принята</h2>
      <p className="mx-auto mt-3 max-w-[460px] text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
        Менеджер свяжется в течение 2 часов и согласует удобное время звонка.
      </p>
      <div className="mt-8 rounded-[16px] bg-[var(--color-pebble)] p-5 text-left sm:p-6">
        <div className="text-[18px] font-semibold leading-[1.4]">Что подготовить к звонку</div>
        <ul className="mt-3 space-y-2.5">
          {["Список SKU или категорий", "Текущие закупочные цены", "Планируемый объём"].map((t) => (
            <li key={t} className="flex items-center gap-3 text-[16px] leading-[1.4]">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-badge-fill)] text-[var(--color-signal-blue)]">
                <Check aria-hidden className="size-3.5" strokeWidth={3} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
