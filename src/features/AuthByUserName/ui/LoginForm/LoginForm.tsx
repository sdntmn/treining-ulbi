import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button as ButtonDeprecated, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input"
import {
  TextParagraf as TextParagrafDeprecated,
  TextVar,
} from "@/shared/ui/deprecated/TextParagraf"
import { Button } from "@/shared/ui/redesigned/Button"
import { Input } from "@/shared/ui/redesigned/Input"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { getLoginError } from "../../model/selectors/getLoginError/getLoginError"
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading"
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword"
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername"
import { loginByUsername } from "../../model/services/LoginByUserName/loginByUserName"
import { loginActions, loginReducer } from "../../model/slice/LoginSlice"

import "./LoginForm.module.scss"

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm: React.FC<LoginFormProps> = memo(function LoginForm({
  className,
  onSuccess,
}: LoginFormProps) {
  const { t } = useTranslation("formAuth")

  const dispatch = useAppDispatch()

  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const error = useSelector(getLoginError)
  const isLoading = useSelector(getLoginIsLoading)

  const onChangeUserName = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess()
    }
  }, [dispatch, onSuccess, password, username])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
          <VStack gap="8" className={cn("login-form", [className])}>
            <Text title={t("titleForm")} />
            {error && <Text text={error} variant={"error"} />}
            <Input
              autofocus
              className={cn("login-form__input", [className])}
              type="text"
              placeholder={t("enterName")}
              onChange={onChangeUserName}
              value={username}
            />
            <Input
              className={cn("login-form__input", [className])}
              type="text"
              placeholder={t("enterPassword")}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              className={cn("login-form__btn", [className])}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("enter")}
            </Button>
          </VStack>
        }
        off={
          <div className={cn("login-form", [className])}>
            <TextParagrafDeprecated title={t("titleForm")} />
            {error && <TextParagrafDeprecated text={error} textVar={TextVar.ERROR} />}
            <InputDeprecated
              autofocus
              className={cn("login-form__input", [className])}
              type="text"
              placeholder={t("enterName")}
              onChange={onChangeUserName}
              value={username}
            />
            <InputDeprecated
              className={cn("login-form__input", [className])}
              type="text"
              placeholder={t("enterPassword")}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              buttonVar={ButtonVar.PRIMARY}
              className={cn("login-form__btn", [className])}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("enter")}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  )
})

export default LoginForm
