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
 * Лента логотипов брендов прямо на холсте, без карточки и рамки.
 * Логотипы в родных цветах (по просьбе владельца — отступление от монохромной
 * Trust Logo Strip из DESIGN.md); белые SVG перекрашиваются маской в tint.
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
                className="whitespace-nowrap text-[15px] font-bold leading-none text-[var(--color-ink-navy)] lg:text-[19px]"
              >
                {b.name}
              </li>
            );
          }
          const { w, h } = logoSize(b.ratio);
          // --k: на мобиле логотипы на 18% мельче, в раскладке тоже (не transform).
          const size = { width: `calc(${w}px * var(--k))`, height: `calc(${h}px * var(--k))` };
          if (b.tint) {
            const mask = `url(${b.logo}) center / contain no-repeat`;
            return (
              <li key={b.name} className="[--k:0.82] lg:[--k:1]">
                <span
                  role="img"
                  aria-label={b.name}
                  className="block"
                  style={{ ...size, background: b.tint, WebkitMask: mask, mask }}
                />
              </li>
            );
          }
          return (
            <li key={b.name} className="[--k:0.82] lg:[--k:1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo}
                alt={b.name}
                width={w}
                height={h}
                loading="lazy"
                decoding="async"
                className="block object-contain"
                style={size}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
