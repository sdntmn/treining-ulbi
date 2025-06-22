import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { HStack } from "@/shared/ui/Stack"

import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors"
import { addCommentFormActions, addCommentFormReducer } from "../../model/slice/addCommentFormSlice"

import "./AddCommentForm.module.scss"

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}: AddCommentFormProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("article")
  const text = useSelector(getAddCommentFormText)

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value))
    },
    [dispatch]
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text)
    onCommentTextChange("")
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack data-testid={"AddCommentForm"} className={cn("add-comment-form", [className])}>
        <Input
          data-testid={"AddCommentForm.Input"}
          className="add-comment-form__input"
          placeholder={t("articleInputPlaceholder")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button
          data-testid={"AddCommentForm.Button"}
          buttonVar={ButtonVar.OUTLINE}
          onClick={onSendHandler}
          disabled={!text}
        >
          {t("articleBtnSendComment")}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  )
}

export default AddCommentForm
