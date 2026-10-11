import { LOW_VOLUME, PLANNING_LAUNCH, TAG_LOW_VOLUME } from "./constants";

type QualifyInput = {
  volume?: string;
  tags?: string;
  role?: string;
};

/**
 * Квалифицированный лид (событие QualifiedLead) — единое правило для сервера.
 * От него зависит, на кого оптимизируется реклама, поэтому решает только сервер:
 *  - лендинг: объём от $5 000;
 *  - квиз: объём не «до $5 000» (нет тега low_volume);
 *  - гайд: тип бизнеса не «Планирую запуск».
 * Поля БИН/ИНН в формах больше нет. Остальные формы сайта QualifiedLead не отправляют.
 */
export function isQualifiedLead(source: string, d: QualifyInput): boolean {
  switch (source) {
    case "b2b-landing":
      return !!d.volume && d.volume !== LOW_VOLUME;
    case "b2b-quiz": {
      const tags = (d.tags ?? "").split(",").map((t) => t.trim());
      return !!d.volume && !tags.includes(TAG_LOW_VOLUME);
    }
    case "b2b-guide":
      return !!d.role && d.role !== PLANNING_LAUNCH;
    default:
      return false;
  }
}
