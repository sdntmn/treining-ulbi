/* eslint-disable no-undef */

module.exports = (componentName) => `import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"

import "./${componentName}.module.scss"

interface ${componentName}Props {
  className?: string
}

export const ${componentName}: React.FC<${componentName}Props> = memo(function ${componentName}({
  className,
}: ${componentName}Props) {

  const { t } = useTranslation()

  return (
    <div className={cn("${componentName}", [className])}></div>
  )
})`
