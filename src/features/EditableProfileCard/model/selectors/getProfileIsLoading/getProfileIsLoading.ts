// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getProfileIsLoading = (state: StateSchema) =>
  state.profile?.isLoading
