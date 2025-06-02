// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || ""
