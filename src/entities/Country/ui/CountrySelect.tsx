import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select/Select"

import { Country } from "../model/types/country"

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

export const CountrySelect = memo(function CurrencySelect({
  value,
  className,
  isReadonly,

  onChange,
}: CountrySelectProps) {
  const { t } = useTranslation("sharedComponents")
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country)
    },
    [onChange]
  )

  return (
    <Select
      label={t("specifyCountry")}
      className={className}
      options={options}
      value={value}
      onChange={onChangeHandler}
      isReadonly={isReadonly}
    />
  )
})
