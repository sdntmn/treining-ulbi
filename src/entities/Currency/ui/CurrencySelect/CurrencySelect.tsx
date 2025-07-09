import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { Currency } from "@/shared/const/enums"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups"
import { ListBox } from "@/shared/ui/redesigned/Popups"

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

  const props = {
    label: t("specifyCurrency"),
    defaultValue: t("specifyCurrency"),
    className: className,
    items: options,
    value: value,
    onChange: onChangeHandler,
    readonly: isReadonly,
    direction: "top right" as const,
  }

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={<ListBox {...props} />}
      off={<ListBoxDeprecated {...props} />}
    />
  )
})
