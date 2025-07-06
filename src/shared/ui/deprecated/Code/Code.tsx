import Prism from "prismjs"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import React, { memo, useCallback, useEffect } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import CopyIcon from "../../../assets/icons/copy_file.svg"
import { Button, ButtonVar } from "../Button/Button"

import "./Code.module.scss"

interface CodeProps {
  className?: string
  text: string
  language?: "javascript" | "typescript" | "jsx" | "css"
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Code: React.FC<CodeProps> = memo(function Code(props: CodeProps) {
  const { className, text, language = "javascript" } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  useEffect(() => {
    Prism.highlightAll()
  }, [text, language])

  return (
    <pre className={cn("code", [className])}>
      <Button onClick={onCopy} className="code__copy-btn" buttonVar={ButtonVar.CLEAR}>
        <CopyIcon className="code__copy-icon" />
      </Button>
      <code className={`language-${language}`}>{text}</code>
    </pre>
  )
})
