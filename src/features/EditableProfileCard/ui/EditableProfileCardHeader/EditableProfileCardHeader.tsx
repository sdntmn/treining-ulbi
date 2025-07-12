import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button as ButtonDeprecated, ButtonVar } from "@/shared/ui/deprecated/Button"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { Button } from "@/shared/ui/redesigned/Button"
import { Card } from "@/shared/ui/redesigned/Card"
import { HStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

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
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <Card padding="24" max>
          <HStack justify="between" max className={cn("", [className])}>
            <Text title={t("headerProfileTitle")} />
            {canEdit && (
              <HStack gap="16">
                {readOnly ? (
                  <Button
                    variant={"outline"}
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    {t("btnProfileEdit")}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={"outline"}
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.CancelButton"
                      color="error"
                    >
                      {t("btnProfileCancel")}
                    </Button>
                    <Button
                      variant={"outline"}
                      color="success"
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
        </Card>
      }
      off={
        <HStack justify="between" max className={cn("", [className])}>
          <TextParagrafDeprecated title={t("headerProfileTitle")} />
          {canEdit && (
            <HStack gap="16">
              {readOnly ? (
                <ButtonDeprecated
                  buttonVar={ButtonVar.OUTLINE}
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t("btnProfileEdit")}
                </ButtonDeprecated>
              ) : (
                <>
                  <ButtonDeprecated
                    buttonVar={ButtonVar.OUTLINE_ERROR}
                    onClick={onCancelEdit}
                    data-testid="EditableProfileCardHeader.CancelButton"
                  >
                    {t("btnProfileCancel")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    buttonVar={ButtonVar.OUTLINE}
                    onClick={onSave}
                    data-testid="EditableProfileCardHeader.SaveButton"
                  >
                    {t("btnProfileSave")}
                  </ButtonDeprecated>
                </>
              )}
            </HStack>
          )}
        </HStack>
      }
    />
  )
}
