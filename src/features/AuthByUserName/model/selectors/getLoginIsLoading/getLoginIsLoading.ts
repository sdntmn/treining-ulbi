// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getLoginIsLoading = (state: StateSchema) =>
  state?.loginForm?.isLoading || false
