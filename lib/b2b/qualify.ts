import { LOW_VOLUME, PLANNING_LAUNCH, TAG_LOW_VOLUME } from "./constants";

type QualifyInput = {
  volume?: string;
  bin?: string;
  tags?: string;
  role?: string;
};

/**
 * Квалифицированный лид (событие QualifiedLead) — единое правило для сервера.
 * От него зависит, на кого оптимизируется реклама, поэтому решает только сервер:
 *  - лендинг: объём от $5 000 и заполнен БИН/ИНН;
 *  - квиз: нет тега low_volume и заполнен БИН/ИНН;
 *  - гайд: тип бизнеса не «Планирую запуск».
 * Остальные формы сайта QualifiedLead не отправляют.
 */
export function isQualifiedLead(source: string, d: QualifyInput): boolean {
  const hasBin = (d.bin ?? "").trim().length > 0;
  switch (source) {
    case "b2b-landing":
      return !!d.volume && d.volume !== LOW_VOLUME && hasBin;
    case "b2b-quiz": {
      const tags = (d.tags ?? "").split(",").map((t) => t.trim());
      return !tags.includes(TAG_LOW_VOLUME) && hasBin;
    }
    case "b2b-guide":
      return !!d.role && d.role !== PLANNING_LAUNCH;
    default:
      return false;
  }
}
