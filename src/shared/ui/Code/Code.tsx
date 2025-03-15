import React, { memo, useCallback } from "react"

import CopyIcon from "../../assets/icons/copy_file.svg"
import { cn } from "../../lib/classNames/classNames"
import { Button, ButtonVar } from "../Button/Button"

import "./Code.module.scss"

interface CodeProps {
  className?: string
  text: string
}

export const Code: React.FC<CodeProps> = memo(function Code(props: CodeProps) {
  const { className, text } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={cn("code", [className])}>
      <Button
        onClick={onCopy}
        className="code__copy-btn"
        buttonVar={ButtonVar.CLEAR}
      >
        <CopyIcon className="code__copy-icon" />
      </Button>
      <code>{text}</code>
    </pre>
  )
})
