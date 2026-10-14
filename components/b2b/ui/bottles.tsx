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
  still,
  className,
  style,
}: {
  id: BottleId;
  index: number;
  eager?: boolean;
  /** Без «плавания»: банка стоит (полка). */
  still?: boolean;
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
      className={cn(
        "select-none",
        still ? "b2b-shelf-shadow" : "b2b-float b2b-bottle-shadow",
        className,
      )}
      style={still ? style : { animationDuration: t.dur, animationDelay: t.delay, ...style }}
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

// Места в композиции «пирамидой»: чем дальше банка, тем она меньше и выше.
// Координаты — в % от контейнера, поэтому раскладка одинакова на любом экране.
const CLUSTER_SLOTS = [
  // задний ярус: выглядывает между передними
  "left-[17%] bottom-[44%] w-[17%] z-0",
  "left-[41.5%] bottom-[50%] w-[17%] z-0",
  "right-[17%] bottom-[44%] w-[17%] z-0",
  // средний ярус — по краям
  "left-[4%] bottom-[18%] w-[21%] z-10",
  "right-[4%] bottom-[18%] w-[21%] z-10",
  // передний ярус — в центре, крупнее всех
  "left-[23%] bottom-[2%] w-[26%] z-20",
  "right-[23%] bottom-[2%] w-[26%] z-20",
];

/**
 * Групповой снимок банок: не ряд, а «пирамида» с глубиной — крупные спереди
 * в центре, поменьше по краям, самые маленькие сзади. ids идут от заднего
 * яруса к переднему (до 7 штук). Плавает вся группа целиком.
 */
export function ProductCluster({ ids, className }: { ids: BottleId[]; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative", className)}>
      <div className="b2b-float relative aspect-[100/80]" style={{ animationDuration: "7s" }}>
        {ids.slice(0, CLUSTER_SLOTS.length).map((id, i) => (
          <BottleImg key={id} id={id} index={i} still className={cn("absolute h-auto", CLUSTER_SLOTS[i])} />
        ))}
      </div>
      {/* Мягкая тень-«пол» под передним ярусом */}
      <div className="mx-auto -mt-6 h-6 w-[70%] rounded-[50%] bg-[rgba(71,103,136,0.16)] blur-[14px]" />
    </div>
  );
}
