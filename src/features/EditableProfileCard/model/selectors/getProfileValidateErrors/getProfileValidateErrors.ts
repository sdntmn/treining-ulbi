// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getProfileValidateErrors = (state: StateSchema) =>
  state.profile?.validateErrors
