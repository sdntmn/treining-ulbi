import Prism from "prismjs"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import React, { memo, useCallback, useEffect } from "react"

import CopyIconNew from "@/shared/assets/icons/copy.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"

import CopyIcon from "../../../assets/icons/copy_file.svg"
import { Button, ButtonVar } from "../../deprecated/Button/Button"
import { Icon } from "../Icon"
import "./Code.module.scss"

interface CodeProps {
  className?: string
  text: string
  language?: "javascript" | "typescript" | "jsx" | "css"
}

export const Code: React.FC<CodeProps> = memo(function Code(props: CodeProps) {
  const { className, text, language = "javascript" } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  useEffect(() => {
    Prism.highlightAll()
  }, [text, language])

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <pre className={cn("code", [className])}>
          <Icon clickable onClick={onCopy} className={"code__copy-btn"} Svg={CopyIconNew} />
          <code className={`language-${language}`}>{text}</code>
        </pre>
      }
      off={
        <pre className={cn("code-deprecated", [className])}>
          <Button
            onClick={onCopy}
            className="code-deprecated__copy-btn"
            buttonVar={ButtonVar.CLEAR}
          >
            <CopyIcon className="code-deprecated__copy-icon" />
          </Button>
          <code className={`language-${language}`}>{text}</code>
        </pre>
      }
    />
  )
})
