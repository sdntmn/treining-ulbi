const classNames = (cls: string, additional: string[] = []): string => {
  return [cls, ...additional.filter(Boolean)].join(" ")
}

export const cn = classNames
