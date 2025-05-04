import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "entities/Profile"
import { getUserAuthData } from "entities/User"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { HStack } from "shared/ui/Stack"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

export const HeaderProfilePage: React.FC = () => {
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
    <HStack justify="between" max>
      <TextParagraf title={t("headerProfileTitle")} />
      {canEdit && (
        <HStack gap="16">
          {readOnly ? (
            <Button buttonVar={ButtonVar.OUTLINE} onClick={onEdit}>
              {t("btnProfileEdit")}
            </Button>
          ) : (
            <>
              <Button
                buttonVar={ButtonVar.OUTLINE_ERROR}
                onClick={onCancelEdit}
              >
                {t("btnProfileCancel")}
              </Button>
              <Button buttonVar={ButtonVar.OUTLINE} onClick={onSave}>
                {t("btnProfileSave")}
              </Button>
            </>
          )}
        </HStack>
      )}
    </HStack>
  )
}
