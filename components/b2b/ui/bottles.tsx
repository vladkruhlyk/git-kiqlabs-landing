import { BOTTLES } from "@/lib/b2b/constants";
import { cn } from "@/lib/utils";

// У каждой банки своя скорость и задержка, чтобы они не «дышали» синхронно.
const LAYOUT = [
  { cls: "z-10 w-[31%] -mr-[6%]", dur: "5.6s", delay: "0s" },
  { cls: "z-20 w-[40%]", dur: "6.4s", delay: "-1.8s" },
  { cls: "z-10 w-[29%] -ml-[6%]", dur: "6s", delay: "-3.2s" },
];

/**
 * Группа из трёх банок с мягким «плаванием» (CSS, без JS). Ставится поверх
 * карточки-мокапа как коллаж; ширину задаёт className родителя.
 */
export function BottleGroup({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none flex items-end justify-center", className)}>
      {BOTTLES.map((b, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={b.src}
          src={b.src}
          alt=""
          width={b.w}
          height={b.h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn("b2b-float h-auto select-none b2b-bottle-shadow", LAYOUT[i].cls)}
          style={{ animationDuration: LAYOUT[i].dur, animationDelay: LAYOUT[i].delay }}
        />
      ))}
    </div>
  );
}
