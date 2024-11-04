import { useAppDispatch } from "app/providers/StoreProvider/configStore/store"
import {
  fetchProfileData,
  getProfileData,
  getProfileForm,
  Profile,
  profileReducer,
} from "entities/Profile"
import { HeaderProfilePage } from "features/HeaderProfilePage"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import { useParams } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
// import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { CardEditingProfile } from "widgets/CardEditingProfile"
import { Page } from "widgets/Page/ui/Page"

// import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import "./ProfilePage.module.scss"

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  // const dispatch = useAppDispatch()

  // const { id } = useParams<{ id: string }>()


  // useInitialEffect(() => {
  //   if (id) {
  //     dispatch(fetchProfileData(id))
  //   }
  // })

  // useEffect(() => {
  //   dispatch(fetchProfileData(id!)) as Profile
  // }, [dispatch, id])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("profile-page", [className])}>
        <HeaderProfilePage />
        <CardEditingProfile />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
