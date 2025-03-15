/**
 * Объединяет имена классов в одну строку.
 *
 * @param cls - Основное имя класса.
 * @param additional - Массив дополнительных имен классов.
 * @returns Строка объединенных имен классов.
 */
const classNames = (
  cls: string,
  additional: Array<string | null | undefined> = []
): string => {
  return [cls, ...additional.filter(Boolean).map(String)].join(" ")
}

export const cn = classNames
