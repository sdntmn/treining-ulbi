import {
  getProfileData,
  getProfileReadonly,
  profileActions,
} from "entities/Profile"
import { getUserAuthData } from "entities/User"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

import "./HeaderProfilePage.module.scss"

interface HeaderProfilePageProps {
  className?: string
}

export const HeaderProfilePage = ({ className }: HeaderProfilePageProps) => {
  const { t } = useTranslation("profile")
  const readOnly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id
  console.info(profileData?.id)
  console.info(authData?.id)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  // const onSave = useCallback(() => {
  //   dispatch(updateProfileData())
  // }, [dispatch])

  return (
    <div className={cn("header-profile-page", [className])}>
      <TextParagraf title={t("headerProfileTitle")} />
      {canEdit && (
        <div className={"header-profile-page__buttons"}>
          {readOnly ? (
            <Button
              className={"header-profile-page__btn"}
              buttonVar={ButtonVar.OUTLINE}
              onClick={onEdit}
            >
              {t("btnProfileEdit")}
            </Button>
          ) : (
            <>
              <Button
                className={"header-profile-page__btn"}
                buttonVar={ButtonVar.OUTLINE_ERROR}
                onClick={onCancelEdit}
              >
                {t("btnProfileCancel")}
              </Button>
              <Button
                className={"header-profile-page__btn"}
                buttonVar={ButtonVar.OUTLINE}
                // onClick={onSave}
              >
                {t("btnProfileSave")}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
