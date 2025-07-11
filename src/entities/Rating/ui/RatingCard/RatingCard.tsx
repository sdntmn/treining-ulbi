import React, { memo, useCallback, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { useTranslation } from "react-i18next"

import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Button as ButtonDeprecated, ButtonSize, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card"
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input"
import { StarRating as StarRatingDeprecated } from "@/shared/ui/deprecated/StarRating"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { Button } from "@/shared/ui/redesigned/Button"
import { Card } from "@/shared/ui/redesigned/Card"
import { Drawer } from "@/shared/ui/redesigned/Drawer"
import { Input } from "@/shared/ui/redesigned/Input"
import { Modal } from "@/shared/ui/redesigned/Modal"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard: React.FC<RatingCardProps> = memo((props: RatingCardProps) => {
  const { className, onAccept, feedbackTitle, hasFeedback, onCancel, title, rate = 0 } = props
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState("")

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount)
      if (hasFeedback) {
        setIsModalOpen(true)
      } else {
        onAccept?.(selectedStarsCount)
      }
    },
    [hasFeedback, onAccept]
  )

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid={"RatingCard.Input"}
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Ваш отзыв")}
          />
        </>
      }
      off={
        <>
          <TextParagrafDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid={"RatingCard.Input"}
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Ваш отзыв")}
          />
        </>
      }
    />
  )

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<Text title={starsCount ? t("Спасибо за оценку!") : title} />}
          off={<TextParagrafDeprecated title={starsCount ? t("Спасибо за оценку!") : title} />}
        />
        <StarRatingDeprecated selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <ToggleFeaturesComponent
              feature="isAppRedesigned"
              on={
                <HStack max gap="16" justify="end">
                  <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                    {t("Закрыть")}
                  </Button>
                  <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t("Отправить")}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap="16" justify="end">
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    buttonVar={ButtonVar.OUTLINE_ERROR}
                  >
                    {t("Закрыть")}
                  </ButtonDeprecated>
                  <ButtonDeprecated data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t("Отправить")}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <ToggleFeaturesComponent
              feature="isAppRedesigned"
              on={
                <Button fullWidth onClick={acceptHandle} size="l">
                  {t("Отправить")}
                </Button>
              }
              off={
                <ButtonDeprecated fullWidth onClick={acceptHandle} size={ButtonSize.L}>
                  {t("Отправить")}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  )
  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <Card max border="round" padding="24">
          {content}
        </Card>
      }
      off={
        <CardDeprecated className={className} max data-testid="RatingCard">
          {content}
        </CardDeprecated>
      }
    />
  )
})

RatingCard.displayName = "RatingCard"
