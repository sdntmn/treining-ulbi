// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getLoginError = (state: StateSchema) => state?.loginForm?.error
