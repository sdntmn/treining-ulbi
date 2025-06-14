import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { Currency } from "@/shared/const/enums"
import { ListBox } from "@/shared/ui/Popups"

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

export const CurrencySelect: React.FC<CurrencySelectProps> = memo(function CurrencySelect({
  value,
  className,
  isReadonly,
  onChange,
}: CurrencySelectProps) {
  const { t } = useTranslation("formAuth")
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange]
  )

  return (
    <ListBox
      label={t("specifyCurrency")}
      defaultValue={t("specifyCurrency")}
      className={className}
      items={options}
      value={value}
      onChange={onChangeHandler}
      readonly={isReadonly}
      direction="bottom right"
    />
  )
})
