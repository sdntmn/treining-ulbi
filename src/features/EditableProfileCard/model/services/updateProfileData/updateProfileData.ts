import { createAsyncThunk } from "@reduxjs/toolkit"

import { Profile } from "@/entities/Profile"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"
import { ValidateProfileError } from "../../types/EditableProfileCardSchema"
import { validateProfileData } from "../validateProfileData/validateProfileData"

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData: Profile | undefined = getProfileForm(getState())
  const errors: ValidateProfileError[] = validateProfileData(formData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)
    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]) || e
  }
})
