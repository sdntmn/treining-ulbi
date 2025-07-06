import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "@/shared/ui/deprecated/Button"
import { HStack } from "@/shared/ui/deprecated/Stack"
import { TextParagraf } from "@/shared/ui/deprecated/TextParagraf"

import { getUserAuthData } from "@/entities/User"

import { getProfileData } from "../../model/selectors/getProfileData/getProfileData"
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly"
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData"
import { profileActions } from "../../model/slice/profileSlice"

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader: React.FC<EditableProfileCardHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile")
  const readOnly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack justify="between" max className={cn("", [className])}>
      <TextParagraf title={t("headerProfileTitle")} />
      {canEdit && (
        <HStack gap="16">
          {readOnly ? (
            <Button
              buttonVar={ButtonVar.OUTLINE}
              onClick={onEdit}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t("btnProfileEdit")}
            </Button>
          ) : (
            <>
              <Button
                buttonVar={ButtonVar.OUTLINE_ERROR}
                onClick={onCancelEdit}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t("btnProfileCancel")}
              </Button>
              <Button
                buttonVar={ButtonVar.OUTLINE}
                onClick={onSave}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t("btnProfileSave")}
              </Button>
            </>
          )}
        </HStack>
      )}
    </HStack>
  )
}
