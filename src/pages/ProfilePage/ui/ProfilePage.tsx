import React from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { cn } from "@/shared/lib/classNames/classNames"
import { VStack } from "@/shared/ui/deprecated/Stack"
import { TextParagraf } from "@/shared/ui/deprecated/TextParagraf"

import { EditableProfileCard } from "@/features/EditableProfileCard"

import { Page } from "@/widgets/Page"

import "./ProfilePage.module.scss"

interface ProfilePageProps {
  className?: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation("profile")

  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <TextParagraf text={t("profileNotFound")} />
  }

  return (
    <Page data-testid="ProfilePage" className={cn("profile-page", [className])}>
      <VStack gap="16" max={true}>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
