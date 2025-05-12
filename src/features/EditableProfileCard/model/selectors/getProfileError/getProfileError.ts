// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getProfileError = (state: StateSchema) => state.profile?.error
