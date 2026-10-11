import { BRANDS } from "@/lib/b2b/constants";

// Логотипы выравниваются по площади, а не по высоте: иначе вытянутые
// (MyProtein) выглядят крупнее компактных (BSN).
const AREA = 3000; // px² на десктопе
const MAX_H = 36;

function logoSize(ratio: number) {
  const h = Math.min(Math.sqrt(AREA / ratio), MAX_H);
  return { w: Math.round(h * ratio), h: Math.round(h) };
}

/**
 * Trust Logo Strip: монохромные логотипы в Mist Gray прямо на холсте, без
 * карточки и рамки. SVG используются как маска, поэтому цвет у всех один.
 */
export function LogoStrip({ caption }: { caption: string }) {
  return (
    <div>
      <p className="text-center text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
        {caption}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:gap-x-12">
        {BRANDS.map((b) => {
          if (!b.logo || !b.ratio) {
            return (
              <li
                key={b.name}
                className="whitespace-nowrap text-[15px] font-bold leading-none text-[var(--color-mist-gray)] lg:text-[19px]"
              >
                {b.name}
              </li>
            );
          }
          const { w, h } = logoSize(b.ratio);
          const mask = `url(${b.logo}) center / contain no-repeat`;
          return (
            // --k: на мобиле логотипы на 18% мельче, в раскладке тоже (не transform).
            <li key={b.name} className="[--k:0.82] lg:[--k:1]">
              <span
                role="img"
                aria-label={b.name}
                className="block bg-[var(--color-mist-gray)]"
                style={{
                  width: `calc(${w}px * var(--k))`,
                  height: `calc(${h}px * var(--k))`,
                  WebkitMask: mask,
                  mask,
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
