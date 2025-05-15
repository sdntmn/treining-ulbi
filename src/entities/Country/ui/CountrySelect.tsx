import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { Country } from "@/shared/const/enums"
import { ListBox } from "@/shared/ui/Popups"

interface CountrySelectProps {
  value?: Country
  className?: string
  isReadonly?: boolean

  onChange?: (value: Country) => void
}
const options = [
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.China, content: Country.China },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
]

export const CountrySelect: React.FC<CountrySelectProps> = memo(
  function CurrencySelect({
    value,
    className,
    isReadonly,

    onChange,
  }: CountrySelectProps) {
    const { t } = useTranslation("formAuth")
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country)
      },
      [onChange]
    )

    return (
      <ListBox
        label={t("specifyCountry")}
        defaultValue={t("specifyCountry")}
        value={value}
        className={className}
        items={options}
        onChange={onChangeHandler}
        readonly={isReadonly}
        direction="bottom right"
      />
    )
  }
)
