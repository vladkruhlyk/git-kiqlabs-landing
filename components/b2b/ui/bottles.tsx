import { BOTTLE_IMAGES, type BottleId } from "@/lib/b2b/constants";
import { cn } from "@/lib/utils";

// У каждой банки своя скорость и задержка, чтобы они не «дышали» синхронно.
const TIMING = [
  { dur: "5.6s", delay: "0s" },
  { dur: "6.4s", delay: "-1.8s" },
  { dur: "6s", delay: "-3.2s" },
  { dur: "5.8s", delay: "-2.4s" },
  { dur: "6.2s", delay: "-0.9s" },
  { dur: "5.4s", delay: "-4.1s" },
  { dur: "6.6s", delay: "-2.9s" },
  { dur: "5.9s", delay: "-1.2s" },
];

// Раскладки групп: центральная банка крупнее и впереди, крайние заходят под неё.
const PRESETS: Record<number, string[]> = {
  2: ["z-10 w-[46%] -mr-[8%]", "z-20 w-[54%]"],
  3: ["z-10 w-[31%] -mr-[6%]", "z-20 w-[40%]", "z-10 w-[29%] -ml-[6%]"],
};

function BottleImg({
  id,
  index,
  eager,
  className,
  style,
}: {
  id: BottleId;
  index: number;
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const b = BOTTLE_IMAGES[id];
  const t = TIMING[index % TIMING.length];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={b.src}
      alt=""
      width={b.w}
      height={b.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cn("b2b-float b2b-bottle-shadow select-none", className)}
      style={{ animationDuration: t.dur, animationDelay: t.delay, ...style }}
    />
  );
}

/**
 * Группа из 2–3 банок с мягким «плаванием» (CSS, без JS). Ставится поверх
 * карточки-мокапа как коллаж; ширину задаёт className родителя.
 * sizes — свои ширины для каждой банки (например, для широких пакетов).
 */
export function BottleGroup({
  ids,
  sizes,
  className,
  eager,
}: {
  ids: BottleId[];
  sizes?: string[];
  className?: string;
  eager?: boolean;
}) {
  const layout = sizes ?? PRESETS[ids.length] ?? PRESETS[3];
  return (
    <div aria-hidden className={cn("pointer-events-none flex items-end justify-center", className)}>
      {ids.map((id, i) => (
        <BottleImg key={id} id={id} index={i} eager={eager} className={cn("h-auto", layout[i])} />
      ))}
    </div>
  );
}

/**
 * «Полка»: ряд банок разных форм, выровненных по высоте с учётом реального
 * размера упаковки (scale). На мобиле видны только первые mobile позиций.
 */
export function ProductShelf({ ids, mobile }: { ids: BottleId[]; mobile: BottleId[] }) {
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto max-w-[1000px] [--shelf-h:118px] lg:[--shelf-h:168px]">
      <div className="relative z-10 flex items-end justify-center gap-1 px-2 sm:gap-3 lg:gap-5">
        {ids.map((id, i) => (
          <BottleImg
            key={id}
            id={id}
            index={i}
            className={cn("w-auto", !mobile.includes(id) && "hidden sm:block")}
            style={{ height: `calc(var(--shelf-h) * ${BOTTLE_IMAGES[id].scale})` }}
          />
        ))}
      </div>
      {/* Сама полка: белая планка с мягкой тенью системы. */}
      <div className="relative -mt-2 h-4 rounded-full border border-[var(--color-hairline)] bg-[var(--color-paper)] b2b-shadow-card" />
    </div>
  );
}
