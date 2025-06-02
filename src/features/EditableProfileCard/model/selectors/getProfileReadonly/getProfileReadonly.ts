// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getProfileReadonly = (state: StateSchema) => state.profile?.isReadonly
