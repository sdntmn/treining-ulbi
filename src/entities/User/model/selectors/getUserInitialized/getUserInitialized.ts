// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getUserInitialized = (state: StateSchema) => state.user.initializedUser
