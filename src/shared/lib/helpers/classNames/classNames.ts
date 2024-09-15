type Mods = Record<string, boolean | string>

const classNames = (
  cls: string,
  mods: Mods = {},
  additional: string[] = []
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_className, value]) => Boolean(value))
      .map(([className, _value]) => className),
  ].join(" ")
}

export const cn = classNames
export const cls = classNames
