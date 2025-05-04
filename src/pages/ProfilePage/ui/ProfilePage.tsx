import { fetchProfileData, profileReducer } from "entities/Profile"
import { HeaderProfilePage } from "features/HeaderProfilePage"
import React from "react"
import { useParams } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { VStack } from "shared/ui/Stack"
import { CardEditingProfile } from "widgets/CardEditingProfile"
import { Page } from "widgets/Page/ui/Page"

import "./ProfilePage.module.scss"

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  className,
}: ProfilePageProps) => {
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id: string }>()

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("profile-page", [className])}>
        <VStack gap="16" max={true}>
          <HeaderProfilePage />
          <CardEditingProfile />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
