export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  AUTHOR = "AUTHOR",
  MANAGER = "MANAGER",
}

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
