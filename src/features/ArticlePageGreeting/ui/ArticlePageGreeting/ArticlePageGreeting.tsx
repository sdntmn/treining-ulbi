import { memo, useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { TextParagraf } from "@/shared/ui/deprecated/TextParagraf"
import { Drawer } from "@/shared/ui/redesigned/Drawer"
import { Modal } from "@/shared/ui/redesigned/Modal"

import { saveJsonSettings, useJsonSettings } from "@/entities/User"

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageWasOpened } = useJsonSettings()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true)
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }))
    }
  }, [dispatch, isArticlesPageWasOpened])

  const onClose = () => setIsOpen(false)

  const text = (
    <TextParagraf
      title={t("Добро пожаловать на страницу статей")}
      text={t("Здесь вы можете искать и просматривать статьи на различные темы")}
    />
  )

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    )
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  )
})

ArticlePageGreeting.displayName = "ArticlePageGreeting"
