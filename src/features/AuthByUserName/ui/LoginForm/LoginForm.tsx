import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { TextParagraf, TextVar } from "@/shared/ui/TextParagraf/TextParagraf"

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

  // DEVTOOLS?.log('username', username)

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
      <div className={cn("login-form", [className])}>
        <TextParagraf title={t("titleForm")} />
        {error && <TextParagraf text={error} textVar={TextVar.ERROR} />}
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
          buttonVar={ButtonVar.PRIMARY}
          className={cn("login-form__btn", [className])}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t("enter")}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default LoginForm
