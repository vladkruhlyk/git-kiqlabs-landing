import { BRANDS } from "@/lib/b2b/constants";

/**
 * Trust Logo Strip: монохромные «логотипы» в Mist Gray прямо на холсте, без
 * карточки и рамки. Файлов логотипов в проекте нет, поэтому — названия брендов.
 */
export function LogoStrip({ caption }: { caption: string }) {
  return (
    <div>
      <p className="text-center text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
        {caption}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-12">
        {BRANDS.map((b) => (
          <li
            key={b}
            className="whitespace-nowrap text-[18px] font-bold leading-[1.4] text-[var(--color-mist-gray)] lg:text-[20px]"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
