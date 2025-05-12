// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getProfileForm = (state: StateSchema) => state.profile?.form
