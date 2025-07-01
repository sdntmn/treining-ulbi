import { UserRole } from "@/shared/const/enums"
import { FeatureFlags } from "@/shared/types/featureFlags"

import { JsonSettings } from "./jsonSettings"

export interface User {
  id: string
  username: string
  avatar?: string
  roles?: UserRole[]
  features?: FeatureFlags
  jsonSettings?: JsonSettings
}

export interface UserSchema {
  authData?: User
  initializedUser: boolean
}
