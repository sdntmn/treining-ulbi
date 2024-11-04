const classNames = (
  cls: string,
  additional: Array<string | undefined> = []
): string => {
  return [cls, ...additional.filter(Boolean)].join(" ")
}

export const cn = classNames
