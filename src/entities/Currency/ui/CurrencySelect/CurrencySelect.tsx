import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select/Select"

import { Currency } from "../../model/types/currency"

interface CurrencySelectProps {
  value?: Currency
  className?: string
  isReadonly?: boolean

  onChange?: (value: Currency) => void
}
const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo(function CurrencySelect({
  value,
  className,
  isReadonly,
  onChange,
}: CurrencySelectProps) {
  const { t } = useTranslation("sharedComponents")
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange]
  )

  return (
    <Select
      label={t("specifyCurrency")}
      className={className}
      options={options}
      value={value}
      onChange={onChangeHandler}
      isReadonly={isReadonly}
    />
  )
})
