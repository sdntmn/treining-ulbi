import { UserRole } from "@/shared/const/enums"

export interface User {
  id: string
  username: string
  avatar?: string
  roles?: UserRole[]
}

export interface UserSchema {
  authData?: User
  initializedUser: boolean
}
