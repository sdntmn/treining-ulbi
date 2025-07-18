/* eslint-disable paths-import/imports-layers */
import { createAsyncThunk } from "@reduxjs/toolkit"

import { FeatureFlags } from "@/shared/types/featureFlags"

import { ThunkConfig } from "@/app/providers/StoreProvider"

import { updateFeatureFlagsMutation } from "../api/featureFlagsApi"
import { getAllFeatureFlags } from "../lib/setGetFeatures"

interface UpdateFeatureFlagOptions {
  userId: string

  newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>("features/saveJsonSettings", async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,

        features: {
          ...getAllFeatureFlags(),

          ...newFeatures,
        },
      })
    )

    window.location.reload()

    return undefined
  } catch (e) {
    console.log(e)

    return rejectWithValue("")
  }
})
