import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { Country } from "@/shared/const/enums"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups"
import { ListBox } from "@/shared/ui/redesigned/Popups"

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

export const CountrySelect: React.FC<CountrySelectProps> = memo(function CurrencySelect({
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

  const props = {
    label: t("specifyCountry"),
    defaultValue: t("specifyCountry"),
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
