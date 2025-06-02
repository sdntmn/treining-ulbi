/**
 * Объединяет имена классов в одну строку.
 *
 * @param cls - Основное имя класса.
 * @param additional - Массив дополнительных имен классов.
 * @returns Строка объединенных имен классов.
 */
const classNames = (
  cls: string,
  additional: Array<string | null | undefined | boolean> = []
): string => {
  return [
    cls,
    ...additional
      .filter((item) => typeof item === "string" || (typeof item === "boolean" && item))
      .map(String),
  ].join(" ")
}

export const cn = classNames
